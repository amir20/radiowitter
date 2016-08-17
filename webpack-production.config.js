var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/assets/javascripts',
    entry: {
        components: './_components.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/app/assets/javascripts',
    },
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
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};