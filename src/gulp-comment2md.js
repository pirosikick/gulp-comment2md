'use strict';

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import through2 from 'through2';
import { File, PluginError } from 'gulp-util';

export default function (options) {
  return through2.obj(function (file, encode, callback) {
    if (file.isStream()) {
      this.emit('error', error('Streaming not supported'));
      return callback();
    }

    let markdown = file.clone()
      , contents = getContents(markdown)
      , markdownText = comment2md(contents);

    if (markdownText) {
      markdown.path = changeExtname(markdown.path);
      markdown.contents = new Buffer(markdownText);
      this.push(markdown);
    }

    callback();
  });
};

function error(message) {
  return new PluginError('gulp-comment2md', message)
}

function changeExtname(filepath, newExt = '.md') {
  let ext = path.extname(filepath);

  if (ext) {
    filepath = filepath.slice(0, filepath.lastIndexOf(ext));
  }

  return filepath + newExt;
}

function getContents(file) {
  if (file.isNull()) {
    return fs.readFileSync(file.path);
  }
  // file.contents is Buffer
  return file.contents.toString();
}

function comment2md(contents) {
  let comment = getComment(contents).map(removeAsterisk);
  comment = removeIndent(comment);

  return comment.join('\n');
}

function getComment(contents) {
  let comment = [];
  let inBlockComment = false;

  _.each(contents.split('\n'), function (line) {
    if (inBlockComment) {
      if (/(.*)\*\//.test(line)) {
        comment.push(RegExp.$1);
        inBlockComment = false;
      } else {
        comment.push(line);
      }

      return;
    }

    // find '/*markdown' or '/*md'
    inBlockComment = /\/\*\*?(markdown|md)/.test(line);
  });

  return comment;
}

function removeAsterisk(line) {
  return line.replace(/^\s+\*/, '');
}

function removeIndent(comment) {
  let length = indentLength(comment);
  let reg = new RegExp(`^\\s{1,${length}}`);

  return _.map(comment, (c) => {
    return c.replace(reg, '');
  });
}

function indentLength(comment) {
  let length = undefined;

  _.each(comment, function (line) {
    if (_.isUndefined(length) && /^(\s+)\S/.test(line)) {
      length = RegExp.$1.length;
    }
  });

  return length;
}
