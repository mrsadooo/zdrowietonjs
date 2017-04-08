var
  path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Healthy Path',
    template: './webpack/template.html',
    inject: false
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new ExtractTextPlugin("smog.css"),
    new WebpackUglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'cached_uglify/'),
      minimize: true,
      sourceMap: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = plugins;