const path = require("path")
const fs = require("fs");
const { getAST, getDependencies, transform } = require("./parser")

module.exports = class Compiler {

    // 接收通过lib/index.js new Compiler(options).run()传入的参数，对应`mywebpack.config.js`的配置
    constructor (options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }

    //开启编译
    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        this.modules.forEach((_module) => {
            _module.dependencies.forEach((dependency) => {
                this.modules.push(this.buildModule(dependency));
            })
        })

        this.emitFiles();

    }

    /**
     * 构建模块相关
     * @param {*} filename 
     * @param {*} isEntry 是否是入口模块
     */
    buildModule(filename, isEntry) {
        let ast;
        if (isEntry) {
            ast = getAST(filename);
        } else {
            const absolutePath = path.join(process.cwd(), "./src", filename);
            ast = getAST(absolutePath)
        }
        return {
            filename,
            dependencies: getDependencies(ast),
            transformCode: transform(ast)
        }
    }

    //输出文件
    emitFiles() {
        debugger
        const outputPath = path.join(this.output.path, this.output.filename);
        let modules = "";
        this.modules.forEach((_module) => {
            debugger
            modules += `'${_module.filename}' : function(require,module,exports) {${_module.transformCode}}, `;
        });

        const bundle = `
            (function(modules){
                function require(fileName){
                    const fn=modules[fileName];
                    const module={exports:{}};
                    fn(require,module,module.exports);
                    return module.exports;
                }
                require('${this.entry}');
            })({${modules}})
        `;
        fs.writeFileSync(outputPath, bundle, "utf-8");
    }


}