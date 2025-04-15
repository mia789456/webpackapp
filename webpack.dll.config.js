const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    lodash: ['lodash']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.join(__dirname, 'dll', '[name]-manifest.json')
    })
  ],
  optimization: {
    concatenateModules: false,
    minimize: false,
    usedExports: true,
  },
};