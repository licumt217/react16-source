const babel = require("@babel/core");

const code = `
    let name='liqiang';
    console.log(name)
`
const output = babel.transformSync(code, {});

console.log(output)