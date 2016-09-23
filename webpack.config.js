const webpack = require('webpack');

module.exports = {
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js'],
    },
    entry: {
        app: "./app/index.tsx"
    },
    output: {
        filename: "bundle/[name].js"
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader?jsx=true', exclude: /(\.test.ts$|node_modules)/ },
            { test: /\.css$/, loaders: ['style', 'css', 'sass'] },
            {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
        ],
    },

    plugins: [
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       }),
    ],
    
    devtool: 'source-map'    
}