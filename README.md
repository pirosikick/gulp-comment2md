# gulp-comment2md

gulp-commnet2md is a gulp plugin that generates markdown file from JavaScript comments.

## Install

```sh
$ npm install gulp-comment2md --save-dev
```

## Example

```javascript
// src/hello.js

/**md
 * # THIS FILE IS IMPORTANT!!!
 *
 * - one
 * - two
 * - three
 *
 */
function hello() {
  console.log('hello world');
}
```

```javascript
var gulp = require('gulp');
var comment2md = require('gulp-comment2md');

gulp.task('markdown', function () {
  gulp.src('./src/**/*.js')
    .pipe(comment2md())
    .pipe(gulp.dest('./doc')); // This task will generate `doc/hello.md`
});
```

If you want to rename output markdown files, you can pass String or Function as
comment2md argument:

```javascript
// String
gulp.task('markdown', function () {
  gulp.src('./src/**/*.js')
    .pipe(comment2md("new-name.md"))
    .pipe(gulp.dest('./doc')); // This task will generate `doc/new-name.md`
});

// Function
function rename (file) {
  return 'new-name.md';
}

gulp.task('markdown', function () {
  gulp.src('./src/**/*.js')
    .pipe(comment2md(rename))
    .pipe(gulp.dest('./doc')); // This task will generate `doc/new-name.md`
});
```

## License

MIT

