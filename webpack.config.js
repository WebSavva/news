const path = require('path');

module.exports = {
  entry: './complex_components/main.js',
  output: {
    filename: 'index.js',
    path: __dirname,
  },
  mode: 'production'
};