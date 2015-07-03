var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var istanbul = require('gulp-istanbul');
var stylish = require('jshint-stylish');

gulp.task('test', ['lint', 'jscs'], function() {
  return gulp.src('src/**/*.js')
  .pipe(istanbul({includeUntested: true}))
  .pipe(istanbul.hookRequire())
  .on('finish', function() {
    gulp.src('test/specs/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      dir: 'test/coverage',
      reporters: [ 'lcov' ],
      reportOpts: { dir: 'test/coverage'}
    }));
  });
});

gulp.task('jscs', function() {
  gulp.src(['src/*.js', 'test/specs/*.js', 'Gulpfile.js'])
  .pipe(plumber())
  .pipe(jscs());
});

gulp.task('lint', function() {
  gulp.src(['src/*.js', 'test/specs/*.js'])
  .pipe(plumber())
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(stylish))
  .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch(
    ['src/*.js', 'test/specs/*.js', '.jscsrc', '.jshintrc', 'Gulpfile.js'],
    ['test', 'lint', 'jscs']
  );
});


gulp.task('default', ['test', 'watch']);
