const path = require('path');
const { merge } = require('webpack-merge');

const base = require('./webpack.config.js');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    host: 'localhost',
    server: 'https',
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: 'https://localhost:3000/'
  }
});
