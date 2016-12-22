const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client',
  output: {
    path: path.resolve(__dirname, 'dist', 'scripts'),
    filename: 'annuity-calc.js'
  },
  modules: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
