var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var bump = require('gulp-bump');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var istanbul = require('gulp-istanbul');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var argv = require('yargs').argv;

var handleError = function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('bump', function(){
  var type;
  if (argv.major) { type = "major"};
  if (argv.minor) { type = "minor"};
  if (argv.patch) { type = "patch"};
  if (argv.prerelease) { type = "prerelease"};

  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:type}))
  .pipe(gulp.dest('./'));
});

gulp.task('browserify', function() {
  var b = browserify({
    entries: './src/syncano.js',
    standalone: 'Syncano'
  })
  .ignore('Bluebird')
  .ignore('lodash');

  return b.bundle()
    .pipe(source('syncano.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('package', ['browserify'], function() {
  gulp.src('./dist/syncano.js')
  .pipe(rename('syncano.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
    .pipe(uglify({
      unused: true,
      dead_code: true,
      drop_console: true,
      comments: true
    }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'))
});


gulp.task('test', ['lint', 'jscs'], function() {
  return gulp.src('src/**/*.js')
  .pipe(istanbul({includeUntested: true}))
  .pipe(istanbul.hookRequire())
  .on('finish', function() {
    gulp.src('test/specs/*.js')
    .pipe(mocha({reporter: 'dot'}))
    .on('error', handleError)
    .pipe(istanbul.writeReports({
      dir: 'test/coverage',
      reporters: [ 'lcov' ],
      reportOpts: { dir: 'test/coverage'}
    }));
  });
});

gulp.task('jscs', function() {
  gulp.src(['src/**/*.js', 'test/specs/**/*.js', 'Gulpfile.js'])
  .pipe(plumber())
  .pipe(jscs());
});

gulp.task('lint', function() {
  gulp.src(['src/**/*.js', 'test/specs/**/*.js'])
  .pipe(plumber())
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter(stylish))
  .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch(
    ['src/**/*.js', 'test/specs/**/*.js', 'test/config.js', '.jscsrc', '.jshintrc', 'Gulpfile.js'],
    ['test', 'lint', 'jscs']
  );
});

gulp.task('browserify', function() {
  var b = browserify({
    entries: './src/syncano.js',
    standalone: 'Syncano'
  })
  .ignore('Bluebird')
  .ignore('lodash');

  return b.bundle()
    .pipe(source('syncano.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('package', ['browserify'], function() {
  gulp.src('./dist/syncano.js')
  .pipe(rename('syncano.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
    .pipe(uglify({
      unused: true,
      dead_code: true,
      drop_console: true,
      comments: true
    }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['test', 'watch']);
