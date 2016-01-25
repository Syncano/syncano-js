var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({

    files: [
        // all files ending in "_test"
        'test/dist/polyfill.js',
        'test/dist/*Test.js',
        'test/dist/**/*Test.js'
        // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
        // add webpack as preprocessor
        'test/dist/*Test.js': ['webpack'],
        'test/dist/**/*Test.js': ['webpack']
    },

    browsers: ['PhantomJS'],

    /**
     * Use Mocha as the test framework, Sinon for mocking, and
     * Chai for assertions.
     */
    frameworks: ['mocha'],

    reporters: ['progress'],

    webpack: webpackConfig[0],

    webpackMiddleware: {
      noInfo: true
    },

    singleRun: true,

    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-phantomjs-launcher'
    ]
  });
};