const babel = require("@babel/core")
const ReversePlugin = require("./plugins/reverse.js")
const code = `
    function greet(name){
        return 'Hello '+name;
    }
    console.log(greet('liqiang'))
`;

const output = babel.transformSync(code, {
    plugins: [
        ReversePlugin
    ]
});

console.log(output.code);