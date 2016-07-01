var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var postCssImport = require('postcss-import');
var preCss = require('precss');

module.exports = {
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.jsx'
        ]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader!postcss-loader",
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    postcss: function (webpack) {
        return [
            postCssImport({
                addDependencyTo: webpack,
                path: ['./src']
            }),
            preCss
        ];
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            title: 'Development App',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
};