var path = require('path');
var webpack = require('webpack');


module.exports = [
  {
    name: 'package',
    debug: false,
    profile: false,
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'syncano.js'),
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'syncano.js',
      library: 'Syncano'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.json']
    }
  },
  {
    name: 'uglified-package',
    debug: false,
    profile: false,
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'syncano.js'),
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'syncano.min.js',
      library: 'Syncano'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
      ]
    },
    resolve: {
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.json']
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: false
        }
      })
    ]
  },
  {
    name: 'fuse-package',
    debug: false,
    profile: false,
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'syncano.js'),
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'syncano.fuse.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.json$/, loader: 'json-loader'}
      ]
    },
    resolve: {
      alias: {
        'bluebird': path.join(__dirname, 'src/promise.js')
      },
      modulesDirectories: ['node_modules'],
      extensions: ['', '.js', '.json']
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin()
    ]
  }
]
