var browserify = require('browserify');
var derequire = require('derequire');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
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
    ['test', 'lint', 'jscs', 'dist']
  );
});

gulp.task('dist', function() {
  return browserify('src/syncano.js', {
    standalone: 'Syncano'
  })
		.bundle()
		.pipe(plumber())
		.pipe(source('syncano.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('default', ['test', 'dist', 'watch']);
