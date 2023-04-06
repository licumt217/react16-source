const babel = require("@babel/core")
const xPlugin = require("./plugins/n2x")
const code = 'const n=1;';

const output = babel.transformSync(code, {
    plugins: [
        xPlugin
    ]
});

console.log(output.code);