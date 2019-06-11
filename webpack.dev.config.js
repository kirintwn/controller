/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.config');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './build/client'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    compress: true,
    port: 9000,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    ],
    stats: 'errors-warnings',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});
