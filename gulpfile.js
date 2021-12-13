const { src, dest, series } = require('gulp');

function pagesTask() {
  return src('src/*.html').pipe(dest('dist'))
}

function scriptsTask() {
  return src('src/scripts/*.js').pipe(dest('dist/scripts'));
}

function stylesTask() {
  return src('src/styles/*.css').pipe(dest('dist/styles'));
}

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = series(pagesTask, scriptsTask, stylesTask);