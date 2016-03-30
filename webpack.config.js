var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',//'',cheap-module-eval-source-map / source-map
    entry: [
        'webpack-hot-middleware/client',
        './lib/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'exports?global.Promise!es6-promise'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            },
            '__DEVTOOLS__': true
        }),
    ],
    module: {
        loaders: [
            { test: /\.(js|json)$/, loader: 'babel?optional=runtime', exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules/ },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192', exclude: /node_modules/ }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.(svg|ico)$/, loader: 'file-loader?name=[name].[ext]&context=./', exclude: /node_modules/ }
        ]
    }
}
