# gulp-comment2md

Generates markdown files from JavaScript comments

## Install

```sh
$ npm install gulp-comment2md --save-dev
```

## Example

```javascript
var gulp = require('gulp');
var comment2md = require('gulp-comment2md');

gulp.task('markdown', function () {
  gulp.src('./src/**/*.js')
    .pipe(comment2md())
    .pipe(gulp.dest('./doc'));
});
```

## License

MIT
