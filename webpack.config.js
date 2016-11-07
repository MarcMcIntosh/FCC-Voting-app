const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PLUGINS_CLIENT = [
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(['build/client']),
  new ExtractTextPlugin('styles.css', { allChunks: true }),
  new HtmlWebpackPlugin({
    inject: true,
    filename: 'index.html',
    template: 'src/index.ejs',
    files: {
      css: ['/styles.css'],
    },
  }),
];

const PLUGINS_SERVER = [
  // new webpack.optimize.OccurenceOrderPlugin(),
//  new webpack.optimize.DedupePlugin(),
//  new webpack.optimize.AggressiveMergingPlugin(),
//  new webpack.ResolverPlugin(
//    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
//      'package.json',
//      ['main']
//    )
//  ),
];

module.exports = [
  {
    name: 'client',
    entry: './src/client/index.jsx',
    target: 'web',
    devtool: 'cheap-source-map',
    devServer: {
      inline: true,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      filename: '[hash].js',
      path: './build/client',
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules'],
    },
    plugins: PLUGINS_CLIENT,
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    module: {
      preLoaders: [{
        loader: 'eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread'],
          },
        }, {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!postcss!sass'),
        }, {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000',
        },
      ],
    },
  }, {
    name: 'server',
    entry: './src/server/index.js',
    target: 'async-node',
    output: {
      filename: 'server.js',
      path: './build',
      libraryTarget: 'commonjs2',
    },
    resolve: {
      root: [
        path.resolve('node_modules'),
        path.resolve('/usr/lib/node_modules'),
        path.resolve('~/.npm'),
      ],
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['node_modules'],
    },
    resolveLoader: {
      root: path.resolve('node_modules'),
      fallback: path.resolve('~/.npm'),
    },
    plugins: PLUGINS_SERVER,
    module: {
      preLoaders: [{
        loader: 'eslint-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }],
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          // exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['transform-object-rest-spread'],
          },
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          // exclude: /node_modules/,
        },
      ],
    },
  },
];
