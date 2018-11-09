const path = require('path');

module.exports = {
  mode: 'production',
  entry: './static/app/index.jsx',
  output: {
    path: path.join(__dirname, 'static'),
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
  }
};