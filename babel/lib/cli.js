"use strict";

var babel = require("@babel/core");
var code = "\n    let name='liqiang';\n    console.log(name)\n";
var output = babel.transformSync(code, {});
console.log(output);