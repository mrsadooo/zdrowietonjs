module.exports = {
  entry: ['./src/index.js'],
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: 'smog.js',
    publicPath: '/'
  },
  module: {
    loaders: require('./webpack/loaders')
  },
  plugins: require('./webpack/plugins'),
  postcss: [
    require('autoprefixer')
  ]
};