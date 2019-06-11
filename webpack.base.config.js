/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/client/index.tsx'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build/client'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|otf|eot|fnt)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(wav|mp3|ogg|m4a)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: 'BOILERPLATE',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/client/index.html'),
    }),
    new CopyPlugin([
      // path.resolve(__dirname, './assets/favicon.ico'),
    ]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
