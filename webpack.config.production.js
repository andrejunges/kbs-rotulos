var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        './lib/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            '__DEVTOOLS__': false
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?optional=runtime', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules/ },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(svg|ico)$/, loader: 'file-loader?name=[name].[ext]&context=./', exclude: /node_modules/ }
        ]
    },
    cssnext: {
        browsers: 'last 2 versions'
    }
}