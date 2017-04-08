var ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassLoader;

if (process.env.NODE_ENV === 'production') {
    sassLoader = ExtractTextPlugin.extract(["css-loader", "postcss-loader", "sass-loader"]);
} else {
    sassLoader = "style-loader!css-loader!postcss-loader!sass-loader";
}

module.exports = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        cacheDirectory: './cache/babel',
        query: {
            presets: ['es2015', 'react'],
            plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties', 'transform-regenerator', 'transform-function-bind', 'transform-object-rest-spread']
        }
    },
    {
        test: /\.scss$/,
        loader: sassLoader
    },
    {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
    },
    {
        test: /\.svg/, loader: 'svg-url-loader'
    },
    {
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'file?name=images/[name].[ext]'
    },
    {
        test: /\.json$/,
        loader: "json-loader"
    }
];