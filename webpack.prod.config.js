var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var postCssImport = require('postcss-import');
var preCss = require('precss');

module.exports = {
  entry: {
    bundle: [
      './src/index.jsx'
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader"),
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/release',
    filename: '[name].js'
  },
  postcss: function (webpack) {
    return [
      postCssImport({
        path: ['./src']
      }),
      preCss
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new ExtractTextPlugin("[name].css"),
    new htmlWebpackPlugin({
      title: 'Redux D3 Demo',
      filename: 'index.html',
      template: 'src/index.html'
    })
  ]
};
