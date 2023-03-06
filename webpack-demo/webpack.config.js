const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

class APlugin {
    apply(compiler) {
        console.log("self plugin====>:APlugin")
        compiler.hooks.beforeRun.tap("A", compiler => {
            console.log("hook:" + "A")
        });
    }
}

class BPlugin {
    apply(compiler) {
        console.log("self plugin====>:BPlugin")
        compiler.hooks.initialize.tap("B", compiler => {
            console.log("hook:" + "B")
        });
    }
}

class CPlugin {
    apply(compiler) {
        console.log("self plugin====>:CPlugin")
        compiler.hooks.beforeRun.tap("C", compiler => {
            console.log("hook:" + "C")
        });
    }
}


module.exports = {
    mode: "development",
    entry: {
        index: {
            import: './src/index.js',
        },
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new APlugin(),
        new BPlugin(),
        new CPlugin(),
        new HtmlWebpackPlugin({
            title: '管理输出',
        })
    ],
}