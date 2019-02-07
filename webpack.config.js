const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'examples', 'main.ts'),
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
};
