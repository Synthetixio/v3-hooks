const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'Viem Playground / Synthetix V3 Hooks',
  scriptLoading: 'defer',
  minify: false,
  hash: false,
  xhtml: true,
});

const devServer = {
  port: '3001',

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

const babelRule = {
  test: /\.(js)$/,
  include: [
    // Only include code in the playground to ensure that library functions do not need compilation
    /cypress/,
    /playground/,
  ],
  resolve: {
    fullySpecified: false,
  },
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
  mode: 'development',
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
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
  },

  module: {
    rules: [babelRule],
  },
};
