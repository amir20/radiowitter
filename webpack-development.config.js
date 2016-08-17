var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/assets/javascripts',
    entry: {components: './_components.js'},
    output: {
        filename: '[name].js',
        path: __dirname + '/app/assets/javascripts',
    },
    devtool: '#eval-source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};