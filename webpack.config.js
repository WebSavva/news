const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

void require('dotenv').config();
const isDevelopment = process.env.NODE_ENV === 'development';

const getCssLoaders = (isDevelopment) => {
  const loaders = [
    isDevelopment ? 'style-loader': MiniCSSExtractPlugin.loader,
    'css-loader',
    'sass-loader'
  ];

  if (!isDevelopment) loaders.splice(loaders.length - 1, 0, 'postcss-loader');

  return loaders;
};

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/complex_components/main.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      title: 'News Website'
    }),
    new MiniCSSExtractPlugin({
      chunkFilename: 'style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        './src/assets'
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: getCssLoaders(isDevelopment)
      },
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};