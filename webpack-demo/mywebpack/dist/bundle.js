
            (function(modules){
                function require(fileName){
                    const fn=modules[fileName];
                    const module={exports:{}};
                    fn(require,module,module.exports);
                    return module.exports;
                }
                require('/Users/licumt217/docs/projects/frontend/me/react-16-source/webpack-demo/mywebpack/src/index.js');
            })({'/Users/licumt217/docs/projects/frontend/me/react-16-source/webpack-demo/mywebpack/src/index.js' : function(require,module,exports) {"use strict";

var _greeting = require("./greeting.js");
document.write((0, _greeting.greeting)(" liqiang!"));}, './greeting.js' : function(require,module,exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return "你好" + name;
}}, })
        