var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    plumber = require('gulp-plumber'),
    stylish = require('jshint-stylish');

gulp.task('mocha', ['lint', 'jscs'], function () {
    return gulp.src('test/specs/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
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
    ['mocha','lint', 'jscs']
  );
});


gulp.task('default', ['mocha', 'watch']);
