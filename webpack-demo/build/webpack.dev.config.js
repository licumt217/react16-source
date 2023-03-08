const webpack = require("webpack")
const { merge } = require("webpack-merge")
const baseWebpackConfig = require('./webpack.base.config')


const devMode = process.env.NODE_ENV === "production";


const webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    output: {
        publicPath: './static'
    },
    // devtool: 'eval',//webpack + loader处理后的代码。有列信息
    devtool: 'eval-source-map',//源码。有列信息
    // devtool: 'eval-cheap-source-map',//loader处理后的代码
    // devtool: 'eval-cheap-module-source-map',//源码
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    // css 文件中的 @import 语法，在 postcss-loader 处理时并不会执行
                    // loader 不会逆向进行处理
                    // 使用 importLoaders 属性将文件再交给 postcss-loader 处理
                    // importLoaders 的意思是，如果在这个 css 文件中有 @import 进来的文件，那这些文件将交给前 n 个 loader 进行处理。
                    // 此处我们需要将新文件交给前一个 loader ，也就是 postcss - loader 来处理，所以它的值为 1
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'less-loader',

                ]
            },

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});

module.exports = webpackConfig;
