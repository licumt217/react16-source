(self["webpackChunkwebpack_demo"] = self["webpackChunkwebpack_demo"] || []).push(
    [
        ["index"],
        {

            "./src/index.js":
                (function (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

                    eval(`
                    console.log(\"index...\");
                    \n\n\n\n
                    var div = document.createElement(\"div\");
                    \n
                    div.innerHTML = \"点击我\"\n
                    div.onclick = function () {\n    
                        __webpack_require__.e(/*! import() */ \"src_test_js\")
                        .then(__webpack_require__.bind(__webpack_require__, /*! ./test.js */ \"./src/test.js\"))
                        .then(({ default: c }) => {\n        
                            console.log('content:' + c)\n   
                         })\n}\n\n
                        document.body.appendChild(div);\n\n
                        console.log(\"index...end\")\n\n
                        //# sourceURL=webpack://webpack-demo/./src/index.js?`);

                })

        },
        //根据模块id加载对应模块
        function (__webpack_require__) { // webpackRuntimeModules
            var __webpack_exec__ = function (moduleId) {
                return __webpack_require__(__webpack_require__.s = moduleId);
            }
            var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
        }
    ]);