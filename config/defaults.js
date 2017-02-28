'use strict';

var webpack = require('webpack');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer');
var mixins = require('stylus-mixins');
var TextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var Svg = require('webpack-svgstore-plugin');
var config = require(__dirname + '/../app/config/compile.js');

module.exports = function(rootDir) {
  // assets source dir
  var srcInnerDir = '/app';
  var srcAbsoluteDir = rootDir + srcInnerDir;

  // assets destination dir
  var destInnerDir = '/web/assets';
  var destAbsoluteDir = rootDir + destInnerDir;

  // import package config
  var packageConfig = require(rootDir + '/package');

  return {
    // application entry points list
    entry: {
      index: './app/index.js',
      vendors: Object.keys(packageConfig.dependencies)
    },

    // modules output configurations
    output: {
      path: destAbsoluteDir,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: '/assets/'
    },

    // application configuration
    resolve: {
      modulesDirectories: ['node_modules'],
      alias: {
        '@core': srcAbsoluteDir,
        '@static': srcAbsoluteDir + '/static',
        '@helpers': srcAbsoluteDir + '/helpers',
        '@components': srcAbsoluteDir + '/components'
      }
    },

    // modules configuration
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        {test: /\.pug/, loader: 'pug-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.styl$/, include: /styles/, loader: TextPlugin.extract('style-loader', 'css-loader!postcss-loader!stylus-loader')},
        {test: /\.styl$/, exclude: /styles/, loader: TextPlugin.extract('style-loader', 'css-loader?modules!postcss-loader!stylus-loader')},
        {test: /\.svg$/, loader: 'raw-loader'}
      ]
    },

    // postprocessor configuration
    postcss: [autoprefixer({browsers: ['last 5 versions']})],

    // stylus configuration
    stylus: {
      use: [rupture(), mixins()]
    },

    node: {
      fs: 'empty'
    },

    // plugins configurations
    plugins: [
      // vendors entry point
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash].js'),

      // move require('style.css') into a separate ccs files
      new TextPlugin('[name].[chunkhash].css'),

      // provide libraries
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom'
      }),

      // generate index.html
      new HtmlPlugin({
        title: config.title,
        description: config.description,
        chunks: ['index', 'vendors'],
        filename: '../index.html',
        template: './app/templates/index.html'
      }),

      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      })
    ]
  };
};
