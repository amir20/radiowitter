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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};