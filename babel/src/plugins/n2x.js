
module.exports = function () {
    return {
        visitor: {
            Identifier(path) {
                if (path.isIdentifier({ name: 'n' })) {
                    path.node.name = 'x';
                }
            }
        }
    }
}