'use strict';

import path from 'path';
import assert from 'power-assert';
import s_assert from 'stream-assert';
import comment2md from '../lib/gulp-comment2md';
import gulp from 'gulp';

function fixture(filename) {
  return path.join(__dirname, 'fixtures', filename);
}

describe('gulp-comment2md', function () {
  describe('comment2md()', function () {
    before(function () {
    });

    it('should generate markdown from comments', function (done) {
      let expected = [
          "Title"
        , "====="
        , ""
        , "Write description about this markdown"
        , ""
      ].join('\n');

      gulp.src(fixture('first.js'))
        .pipe(comment2md())
        .pipe(s_assert.length(1))
        .pipe(s_assert.first((file) => {
          assert(file.contents.toString() == expected);
          assert(path.basename(file.path) == 'first.md');
        }))
        .pipe(s_assert.end(done));
    });
  });
});
