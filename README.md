# gulp-comment2md

Generates markdown files from JavaScript comments

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

## License

MIT

