const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client-app.js',
  output: {
    path: './dist',
    filename: 'annuity-calc.js'
  },
	devtool: 'source-map',
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
