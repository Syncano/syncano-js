var webpack = require('webpack-stream');
var buffer = require('vinyl-buffer');
var bump = require('gulp-bump');
var async = require('async');
var git = require('gulp-git');
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var gulpSequence = require('gulp-sequence');
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
var eslint = require('gulp-eslint');

var handleError = function handleError(err) {
  console.log(err.toString());
  this.emit('end');
};

gulp.task('git-bump', function(cb){
  async.series([
    function(callback) {
      git.checkout('devel', callback);
    },

    function(callback) {
      git.pull('origin', 'devel', callback);
    },

    function(callback) {
      git.merge('master', callback);
    },

    function(callback) {
      gulp
        .src(['./bower.json', './package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'))
        .on('finish', callback);
    },

    function(callback) {
      var version = 'v' + require('package.json').version;

      gulp.src(['./bower.json', './package.json'])
          .pipe(git.commit('Version bump: ' + version + ' [ci skip]'))
          .on('finish', callback);
    },

    function(callback) {
      git.push('origin', 'devel', callback);
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('git-add-tag', function(cb) {
  var version = 'v' + require('package.json').version;

  async.series([
    function(callback) {
      gulp
        .src(['./lib/**/*', './dist/**/*'])
        .pipe(git.add())
        .pipe(git.commit('Version bump: ' + version + ' [ci skip]'))
        .on('finish', callback);
    },

    function(callback) {
      git.push('origin', 'master', callback);
    },

    function(callback) {
      git.tag(version, 'Release ' + version, callback);
    },

    function(callback) {
      git.push('origin', version, callback);
    }
  ], function(err) {
    if (err) throw err;
    cb();
  });
});

gulp.task('webpack', function(cb) {
  return gulp.src('./src/syncano.js')
  pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('dist/'));
});

gulp.task('package', ['webpack'], function() {
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
  .pipe(gulp.dest('./dist'));
});


gulp.task('test', ['lint'], function() {
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

gulp.task('lint', function() {
  gulp.src(['src/**/*.js', 'test/specs/**/*.js'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(
    ['src/**/*.js', 'test/specs/**/*.js', 'test/config.js', 'Gulpfile.js'],
    ['test', 'lint']
  );
});


gulp.task('npm-build', function (cb) {
  spawn('npm', ['run-script', 'build'], { stdio: 'inherit' }).on('close', cb);
});

gulp.task('npm-publish', function (cb) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', cb);
});

gulp.task('default', ['test', 'watch']);
gulp.task('build-and-publish', gulpSequence(
  'npm-build',
  'package',
  'git-add-tag',
  'npm-publish',
  'git-bump'
));
