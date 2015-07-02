var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    plumber = require('gulp-plumber'),
    istanbul = require('gulp-istanbul'),
    stylish = require('jshint-stylish');

gulp.task('test', ['lint', 'jscs'], function () {
    return gulp.src('src/**/*.js')
      .pipe(istanbul({includeUntested: true}))
      .pipe(istanbul.hookRequire())
      .on('finish', function () {
        gulp.src('test/specs/*.js')
          .pipe(mocha({reporter: 'spec'}))
          .pipe(istanbul.writeReports({
              dir: 'test/coverage',
              reporters: [ 'lcov' ],
              reportOpts: { dir: 'test/coverage'}
          }))
        });
});

gulp.task('jscs', function() {
    gulp.src(['src/*.js','test/specs/*.js'])
        .pipe(plumber())
        .pipe(jscs());
});

gulp.task('lint', function() {
    gulp.src(['src/*.js','test/specs/*.js'])
        .pipe(plumber())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch(
    ['src/*.js','test/specs/*.js', '.jscsrc', 'jshintrc'],
    ['test','lint', 'jscs']
  );
});


gulp.task('default', ['test', 'watch']);
