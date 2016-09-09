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
        ],
    },
}