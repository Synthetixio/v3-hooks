const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPlugin = new HtmlWebpackPlugin({
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
});

const devServer = {
  port: '3000',

  hot: false,
  liveReload: false,

  historyApiFallback: true,

  devMiddleware: {
    writeToDisk: true,
    publicPath: '',
  },

  client: {
    logging: 'log',
    overlay: false,
    progress: false,
  },

  static: './public',

  headers: { 'Access-Control-Allow-Origin': '*' },
  allowedHosts: 'all',
  open: false,
  compress: false,
};

module.exports = {
  devtool: false,
  devServer,
  mode: 'development',
  entry: './playground/viem.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].js',
    assetModuleFilename: '[name].[contenthash:8][ext]',
    clean: true,
  },

  plugins: [htmlPlugin],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },

  module: {
    rules: [],
  },
};
