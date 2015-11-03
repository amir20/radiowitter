var webpack = require('webpack');

module.exports = {
    context: __dirname + '/app/assets/javascripts',
    entry: {components: './_components.js'},
    output: {
        filename: '[name].js',
        path: __dirname + '/app/assets/javascripts',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: {
                presets: ['es2015', 'react']
            }
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};