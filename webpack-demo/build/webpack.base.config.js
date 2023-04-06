const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const projectRoot = path.resolve(__dirname, '../');
const Favicon = path.resolve(`${projectRoot}/src/assets/images/favicon.ico`)
const JsOutputDirectory = "static/js/";
const AssetsOutputDirectory = "static/images/";
const FileListPlugin = require('../plugins/filelist-plugin')
module.exports = {

    entry: {
        index: {
            import: path.join(projectRoot, 'src/index'),
        },
    },
    output: {
        filename: `${JsOutputDirectory}[name].[contenthash].bundle.js`,
        chunkFilename: `${JsOutputDirectory}chunk-[id].bundle.js`,
        //资产文件输出目录，图片/字体等
        assetModuleFilename: `${AssetsOutputDirectory}[contenthash][ext][query]`,
        path: path.resolve(projectRoot, './dist'),
        clean: true
    },
    resolveLoader: {
        // webpack会从这些目录依次寻找loader。将自己的自定义目录放到数组中。
        modules: ['node_modules', 'loaders']
    },
    module: {
        rules: [
            {
                test: /\.xyz$/,
                use: [
                    {
                        loader: 'xyz-loader',
                        options: {
                            add: {
                                author: '447818666'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.async$/,
                use: [
                    {
                        loader: 'async-loader',
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                // asset/resource：会生成单独的文件并导出URL，在dist文件会有对应的资源
                // asset/inline：会导出资源的Data URL，在dist文件不会有对应的资源。URL不是一个图片的URL，而是一个Data URL base64的格式。
                // asset/ source：会导出资源的源代码
                // asset：通用资源类型，会在导出一个Data URL和生成一个单独的文件并导出URL之间自动进行选择，
                // 即在asset/ inline和asset / resource之间选择。默认webpack会判断加载资源的大小，当资源文件大于8k时，就会创建一个资源，
                // 即使用asset/ resource。这个临界值也是可以自定义的，通过parser.dataUrlCondition.maxSize
                type: 'asset',
                parser: {
                    // 如果一个模块源码大小小于 maxSize，那么模块会被作为一个 Base64 编码的字符串注入到包中，
                    // 否则模块文件会被生成到输出的目标目录中。
                    dataUrlCondition: {
                        maxSize: 2 * 1024
                    }
                }
            },
            {
                test: /\.(woff|eot|otf|ttf)$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        alias: {
            "@components": path.resolve(projectRoot, 'src/components'),
            "Utils": path.resolve(projectRoot, 'src/assets/js/Utils.js')
        },
        // 请注意，以上这样使用 resolve.extensions 会 覆盖默认数组，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。
        // 然而你可以使用 '...' 访问默认拓展名。能够使用户在引入模块时不带扩展。
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '...'],
        // 解析目录时要使用的文件名。默认值 ['index']，这样我们导入模块时，路径写到目录就行了，默认寻找目录下的文件名是index的文件。
        mainFiles: ['index'],
    },
    optimization: {
        //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
        minimize: false,
        //允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)
        minimizer: [new TerserPlugin({
            extractComments: false //默认true，会抽取注释到生成的独立的文件中 .LICENSE.txt
        })],
        //将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk
        //值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
        runtimeChunk: 'single',
        //默认配置
        // 默认配置的大概意思是：

        // 默认只对按需引入的模块进行代码分割；
        // 来自 node_modules 的模块，或被引用两次及以上的模块，才会做代码分割；
        // 被分割的模块必须大于30kb（代码压缩前）；
        // 按需加载时，并行的请求数必须小于或等于5；
        // 初始页加载时，并行的请求数必须小于或等于3；
        // optimization: {
        //     splitChunks: {
        //         chunks: 'async',
        //         minSize: 30000,
        //         maxSize: 0,
        //         minChunks: 1,
        //         maxAsyncRequests: 5,
        //         maxInitialRequests: 3,
        //         automaticNameDelimiter: '~',
        //         name: true,
        //         cacheGroups: {
        //             vendors: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 priority: -10
        //             },
        //             default: {
        //                 minChunks: 2,
        //                 priority: -20,
        //                 reuseExistingChunk: true
        //             }
        //         }
        //     }
        // }
        splitChunks: {
            // 缓存组，做代码分割时，webpack会把一个模块在所有地方的引入情况做统计，
            // 最后形成一个引用图，这样才可以做到代码分割的优化（引用次数，是否被引用过，避免重复打包），
            // 这个组中，自动继承且可以覆盖 splitChunks.* 的配置，
            // 它还有自己的配置（test, priority，reuseExistingChunk，filename，enforce）
            // 通过 cacheGroups，我们可以定义自定义 chunk 组，通过 test 条件对模块进行过滤，符合条件的模块分配到相同的组。
            // cacheGroups 有两个默认的组，一个是 vendors，匹配来自 node_modules 目录的模块；一个 default，
            // 包含了由两个以上的 chunk 所共享的模块。vendors的优先级高于default。
            cacheGroups: {//一些框架模块和工具模块，比如lodash、react、vue-router、vue等不经常变的包。
                //创建一个 custom vendor chunk，其中包含与 RegExp 匹配的某些 node_modules 包。
                //这将导致将 匹配的模块 分成一个单独的 chunk
                lodash: {
                    test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                    name: 'lodash',
                    // 一个模块可以属于多个缓存组，该属性指定了缓存组的优先级，默认为0，允许使用复数来指定优先级，
                    // 例如：- 10的优先级比- 20的高
                    priority: -10,
                    //二次利用已经存在的chunk，如果这个缓存组中的chunk已经在入口模块（main module）中存在了，
                    // 就不会引入，这就是cacheGroups缓存组存在的意义之一
                    reuseExistingChunk: true,
                    // 设置为true表示忽略 splitChunks.minSize、splitChunks.minChunks、
                    // splitChunks.maxAsyncRequests和splitChunks.maxInitialRequests的配置，
                    // 为当前缓存组生成chunks。
                    enforce: false,//
                },
                //使用mini-css-extract-plugin插件打包css文件时，通常需要配置cacheGroups.{cacheGroup}.enforce属性。
                styles: {
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                jquery: {
                    test: /[\\/]node_modules[\\/](jquery)[\\/]/,
                    name: 'jquery',
                    priority: -20
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            },
            //可选值： initial | async | all
            // initial 表示入口文件中非动态引入的模块
            // async 表示异步引入的模块 [默认]。只对动态引入的chunks做代码分割
            // all 表示所有模块
            // 如果设置为all，会把静态和动态的模块代码都打包到一个chunk，这里之所以分开，
            // 是因为两个包都大于30kb，刚好命中minSize的规则。如果两个包的体积都小于30kb，那么他们将被打包成一个文件
            chunks: "all",
            // minSize设置为600kb，但是lodash库的大小没有超过600kb，所以没有做代码分割
            minSize: 30 * 1024,//30 kb
            // 单个模块大小超过maxSize（且大于minSize）时，将进行代码分割，
            // 优先级 minSize > maxSize > (maxInitialRequests / maxAsyncRequests)，
            // 0表示不尝试对超大体积的模块进行分割，如果设定一个值（默认值30000），那么当单个模块超出这个值时
            // ，就会尝试对这个模块分割，且忽略maxInitialRequests/ maxAsyncRequests这个两个参数的限制
            maxSize: 2000 * 1024,
            minChunks: 2,//引用次数超过这个值时，才进行代码分割（动态引入除外）
            // 表示经过splitChunks代码分割后，并行加载的异步chunk数不超过这个值。
            maxAsyncRequests: 5,
            // 入口文件最多并行发出的异步请求数，3表示页面刚刚进来时，最多只请求3个js文件，所以入口页面的代码分割不会超过3个（即使单个文件可能很大）
            maxInitialRequests: 3,


        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'title',
            filename: "index.html",
            template: path.join(projectRoot, 'src/index.html'),
            inject: "body",// [body/head]，默认值head，script标签插入到head还是body中
            favicon: Favicon,
            minify: {
                removeAttributeQuotes: true,//移除属性的引号
                removeComments: true,//移除注释
                collapseWhitespace: true,//一行显示

            },
            // none | auto| function，默认auto； 允许指定的chunk在插入到html文档前进行排序。
            // 值可以指定具体排序规则；auto基于chunk的id进行排序； none就是不排序
            chunksSortMode: 'auto'
        }),
        new VueLoaderPlugin(),//使用vue-loader时必须使用这个插件
        //Automatically load modules instead of having to import or require them everywhere.
        //在使用时不用显示的导入了。主要用在多个页面都会用到的模块。
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new FileListPlugin({
            filename: 'myFileList.md'
        })
    ]
}