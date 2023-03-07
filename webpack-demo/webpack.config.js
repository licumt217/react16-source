const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader')



const projectRoot = path.resolve(__dirname, './');



module.exports = {
    mode: "development",
    entry: {
        index: {
            import: path.join(projectRoot, 'src/index'),
        },
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|eot|otf|ttf)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, 'src/components'),
            "Utils": path.resolve(__dirname, 'src/assets/js/Utils.js')
        },
        // 请注意，以上这样使用 resolve.extensions 会 覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。
        // 然而你可以使用 '...' 访问默认拓展名。能够使用户在引入模块时不带扩展。
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '...'],
        // 解析目录时要使用的文件名。默认值 ['index']，这样我们导入模块时，路径写到目录就行了，默认寻找目录下的文件名是index的文件。
        mainFiles: ['index'],
    },
    optimization: {
        //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
        minimize: true,
        //允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
        minimizer: [new TerserPlugin({
            extractComments: false //默认true，会抽取注释到生成的独立的文件中 .LICENSE.txt
        })],
        //将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk
        //值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {//一些框架模块和工具模块，比如lodash、react、vue-router、vue等不经常变的包。
                //创建一个 custom vendor chunk，其中包含与 RegExp 匹配的某些 node_modules 包。
                //这将导致将 匹配的模块 分成一个单独的 chunk
                lodash: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'lodash',
                },
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(projectRoot, 'src/index.html'),
        }),
        new VueLoaderPlugin()
    ],
}