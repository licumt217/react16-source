const babel = require("@babel/core")
module.exports = function () {
    return {
        visitor: {
            Identifier(path) {//变量名和函数名
                if (!(
                    path.parentPath.isMemberExpression() &&
                    path.parentPath.get("object").isIdentifier({ name: 'console' }) &&
                    path.parentPath.get("property").isIdentifier({ name: 'log' })
                )) {
                    path.node.name = path.node.name.split("").reverse().join('');
                }
            },
            StringLiteral(path) {//字符串
                const result = path.node.value
                    .split("")
                    .map(c => babel.types.stringLiteral(c))
                    .reduce((prev, curr) => {
                        return babel.types.binaryExpression('+', prev, curr);
                    });
                path.replaceWith(result);
                path.skip();
            }
        }
    }
}