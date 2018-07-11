const path = require('path');
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel'],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        loaders: [
          // 'url-loader',
          'file-loader'
        ]
      }
    ],
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      components: 'src/components',
      style: 'src/style'
    },
    extensions: ['', '.js']
  }
};