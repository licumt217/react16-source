
const fs = require("fs")

// @babel/parser：用于将源码生成AST
const parser = require("@babel/parser");

// @babel/traverse：对AST节点进行递归遍历
const traverse = require("@babel/traverse").default;

// @babel/core / @babel/preset-env：将获得的ES6的AST转化成ES
const { transformFromAst } = require("@babel/core");
// require("@babel/preset-env")

module.exports = {

    // 解析我们的代码生成AST抽象语法树
    getAST: (path) => {
        const source = fs.readFileSync(path, "utf-8");

        return parser.parse(source, {
            sourceType: "module"//表示我们要解析的是ES模块
        })
    },

    // 对AST节点进行递归遍历。获取此AST对应文件所引用的所有依赖。
    getDependencies: (ast) => {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                dependencies.push(node.source.value)
            }
        })

        return dependencies;
    },

    // 将获得的ES6的AST转化成ES5对应的代码。
    transform: (ast) => {
        const { code } = transformFromAst(ast, null, {
            presets: ["@babel/preset-env"]
        })
        return code;
    }
}