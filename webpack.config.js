const path = require('path') // package for generating full system path
const HTMLWebpackPlugin = require('html-webpack-plugin')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

module.exports = {
    entry: './public/main.js', // specifies a path to the main.js file as the entrypoint
    output: {
        path: path.resolve(__dirname, 'dist'), // '__dirname' is where the current javascript file resides and 'dist' is where it will be published to
        filename: 'index.js'  // name of the file produced by webpack
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '.')
        })
    ],
    experiments: {
        asyncWebAssembly: true
    }
}