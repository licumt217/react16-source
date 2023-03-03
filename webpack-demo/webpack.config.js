const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: {
        index: {
            import: './src/index.js',
        },
        // another: {
        //     import: './src/another.js',
        // },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    // optimization: {
    //     runtimeChunk: 'single',
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    plugins: [
        new HtmlWebpackPlugin({
            title: '管理输出',
        }),
    ],
}