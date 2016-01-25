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
          drop_console: true,
          drop_debugger: true
        }
      })
    ]
  }
]
