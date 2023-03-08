const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const baseWebpackConfig = require('./webpack.base.config')
const StylesOutputDirectory = "static/css/";

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    // devtool: 'source-map',//浏览器会加载source-map，调试时会暴露源码
    // devtool: 'hidden-source-map',//会生成map文件，但浏览器不会加载source-map。可以将map文件与错误上报工具结合使用
    // devtool: 'nosources-source-map',//没有sourcesContent，调试只能看到模块信息和行信息，不能看到源码。
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
            }

        ]
    },
    plugins: [
        // 推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。
        // 这可以通过使用 mini - css - extract - plugin 来实现，因为它可以创建单独的 CSS 文件。
        // 对于 development 模式（包括 webpack - dev - server），
        // 你可以使用 style - loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快。
        // 需要在.css 的loader配置中添加对应的 MiniCssExtractPlugin loader
        new MiniCssExtractPlugin({
            filename: `${StylesOutputDirectory}[name].[contenthash].css`,
            chunkFilename: `${StylesOutputDirectory}chunk[id].css`,
        }),
        // DefinePlugin 允许在 编译时 将你代码中的变量替换为其他值或表达式。
        // 这在需要根据开发模式与生产模式进行不同的操作时，非常有用
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
});

module.exports = webpackConfig;
