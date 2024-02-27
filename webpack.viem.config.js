const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  title: 'Viem Playground / Synthetix V3 Hooks',
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
});

const devServer = {
  port: '3001',

  hot: true,
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

const babelRule = {
  test: /\.(js)$/,
  include: [
    // Only include code in the playground to ensure that library functions do not need compilation
    /cypress/,
    /playground/,
  ],
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      configFile: path.resolve(__dirname, 'babel.config.js'),
    },
  },
};

module.exports = {
  devtool: 'source-map',
  devServer,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './playground/viem.js',

  output: {
    path: path.resolve(__dirname, 'dist/viem'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].js',
    assetModuleFilename: '[name].[contenthash:8][ext]',
    clean: true,
  },

  plugins: [
    htmlPlugin,
    new webpack.NormalModuleReplacementPlugin(
      new RegExp(`^debug$`),
      path.resolve(path.dirname(require.resolve(`debug/package.json`)), 'src', 'browser.js')
    ),
    ...(process.env.NODE_ENV === 'production'
      ? []
      : [new ReactRefreshWebpackPlugin({ overlay: false })]),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },

  module: {
    rules: [babelRule],
  },
};
