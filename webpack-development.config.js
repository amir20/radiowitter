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
                test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'
            }
        ]
    }
};