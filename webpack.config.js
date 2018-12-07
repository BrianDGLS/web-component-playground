const { resolve } = require('path')

module.exports = {
    entry: {
        src: './src/main.ts',
        examples: './examples/main.ts'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
    },
}
