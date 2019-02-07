const path = require('path');

module.exports = {
  entry: [
    '@babel/polyfill',
    '@webcomponents/template',
    path.join(__dirname, 'examples', 'main.ts'),
  ],
  output: {
    filename: 'bundle-ie.min.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig-ie.json'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(lit-html))/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                  },
                },
              ],
            ],
            plugins: [['@babel/plugin-transform-runtime']],
          },
        },
      },
    ],
  },
};
