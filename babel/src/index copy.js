const parse = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = 'const n=1;';

const ast = parse(code);

traverse(ast, {
    enter(path) {
        if (path.isIdentifier({ name: 'n' })) {
            path.node.name = 'x';
        }
    }
});

const output = generate(ast, code);

console.log(output.code);