const path = require('path');

module.exports = {
  mode: 'production',
  entry: './frontend/index.jsx',
  output: {
    path: path.join(__dirname, 'static', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
};
