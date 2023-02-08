

(function (global,factory) {
    
    //插件兼容CommonJs/CMD/AMD和原生js规范。
    //CommonJs--该模块规范主要包含三个部分：模块定义、模块引用、模块标识。nodeJs实现。
        //定义。module:在每个模块中，module对象代表该模块自身。exports:moudle对象的一个属性，对外提供接口。
        //引用。var math=require("math")的方式引用。
        //标识。指的是传递给require方法的参数
        //服务器端，浏览器端不适用。
    
    //CMD:Common Module Definition。主要规范了基本的书写格式和交互规则。玉伯 seajs实现。
        //代码书写格式：define(name?,depend?,constructor)
        //name是个字符串，表示模块标识。
        //depend是一个数组，标识模块的依赖文件列表。
        //当constructor是对象或字符串的时候，模块的接口就是该对象或字符串。
        //当constructor是函数的时候，表示的是模块的构造方法，执行该构造方法可以得到模块对外的接口。
        //define.cmd 。一个空对象，可判断当前页面是否有CMD模块加载器
        //constructor在执行的时候默认会传入三个参数：require,exports,module。例如：define(function(require,exports,module){})
        //require。是一个方法，根据模块标识，获取其它模块提供的接口。
        //module.exports。此属性用于定义模块对外接口。例如：module.exports={a:1}
        //exports。也可用于定义对外的接口，因为exports是module.exports的一个引用。
    
    //AMD ：Asynchronous Module Definition。requireJs实现
        //定义模块。define(name,['require','exports','beta'],function(require,exports,beta){})。第三个参数是回调函数，可以直接使用依赖的模块，按照依赖顺序作为参数提供给回调函数。
        //调用模块。采用require()语句加载模块，但不同于commonJs，要求两个参数 require(['moduleA','moduleB'],function(moduleA,moduleB){})
        //第一个参数是一个数组，里面的成员是要加载的模块；第二个参数是回调，前边模块加载成功后执行。由于模块加载是异步的，浏览器不会假死，故比较适合浏览器端。
    

    //CommonJS 有三个全局变量 module、exports 和 require。但是由于 AMD 也有 require 这个全局变量，故不使用这个变量来进行检测。
    //如果想要对外提供接口的话，可以将接口绑定到 exports （即 module.exports） 上
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
        (global = global || self, global.Vue = factory());

}(this, function () {
    'use strict';//严格模式，不能使用未声明的变量等。

    //声明一个不能再被修改的空对象。返回的值是传入的值，而不是副本。此对象如果有个属性是对象，则整个子属性对象可以修改。冻结只冻结了一层。
    var emptyObject = Object.freeze({})

    //判断给定值是否null和undefined
    function isUndef(v) {
        return v === null || v === undefined;
    }

    //判断给定值是否定义的。（即不是null或undefined）
    function isDef(v) {
        return v !== null && v !== undefined;
    }

    //判断给定值是否全等布尔值：true
    function isTrue(v) {
        return v === true;
    }

    function isFalse(v) {
        return v === false;
    }

    //判断给定值是否原始类型值
    function isPrimitive(value) {
        return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'symbol';
    }

    //判断给定值是否非null的对象类型
    function isObject(obj) {
        return obj!==null && typeof obj==='object'
    }

    //拷贝原始的toString方法，方便后续使用。此方法返回结果类似[object Object]，[object Number]等
    var _toString = Object.prototype.toString;

    //Get the raw type string of a value, e.g., [object Object]
    function toRawType(value) {
        return _toString.call(value).slice(8,-1);
    }

    //Strict object type check. Only returns true for plain JavaScript objects.
    function isPlainObject(obj) {
        return _toString.call(obj) === '[object Object]';
    }

    function isRegExp(obj) {
        return _toString.call(obj) === '[object RegExp]';
    }

    function isValidArrayIndex(val) {
        var n = parseFloat(String(val));
        return n >= 0 && Math.floor(n) === n && isFinite(n);
        
    }

    function isPromise(v) {
        return isDef(v) && typeof v.then === 'function' && typeof v.catch === 'function';
    }

    /**
     * 将给定值转为最终页面要渲染的值
     * null 的话转为空字符串
     * 数组或纯对象（没重写toString方法），用JSON.stringify转换后返回
     * 其它，直接String(val)后返回
     * @param {*} val 
     * @returns 
     */
    function toString(val) {
        return val === null
            ? ''
            : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
                ? JSON.stringify(val,null,2)
                :String(val)
    }

    //为了持久化，将输入的值转为数字。如果转化失败，返回输入值；否则返回转换后的值
    function toNumber(val) {
        var n = parseFloat(val);
        return isNaN(n) ? val : n;
    }

    //Make a map and return a function for checking if a key is in that map.
    function makeMap(str, expectsLowerCase) {
        var map = Object.create(null);
        var list = str.split(',');
        for (let i = 0; i < list.length; i++){
            map[list[i]] = true;
        }
        return expectsLowerCase
            ?function(v){return map[v.toLowerCase()]}
            :function(v){return map[v]}
    }

    //Check if a tag is a built-in tag. (是否内建标签)
    var isBuiltInTag = makeMap('slot,component', true);

    //Check if an attribute is a reserved attribute.(保留属性)
    var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
    
    //Remove an item from an array。返回删除的元素组成的数组
    function remove(arr,item) {
        if (arr.length) {
            var index = arr.indexOf(item);
            if (index > -1) {
                return arr.splice(index,1)
            }
        }
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    //判断对象obj是否具有自有属性key
    function hasOwn(obj,key) {
        return hasOwnProperty.call(obj, key);
    }

    //Create a cached version of a pure function.创建一个纯函数的缓存版本。
    function cached(fn) {
        var cache = Object.create(null);
        return (function cachedFn(str) {
            var hit = cache[str];
            return hit||(cache[str]=fn(str))
        })
    }

    // \w:单词字符，包括：a-z,A-Z,0-9,_。
    // \W:非单词字符。如！%等
    var camelizeRE = /-(\w)/g;
    //将中划线'-'分割的变量名转为驼峰格式
    var camelize = cached(function (str) {
        //replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。
        //该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式(括号内的内容)匹配的字符串，可以有 0 个或多个这样的参数。
        //接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。
        return str.replace(camelizeRE, function (_, c) {
            return c?c.toUpperCase():''
        })
    })

    //变量首字母大写
    var capitalize = cached(function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    })

    // \b:匹配单词边界。
    // \B:匹配非单词边界。
    var hyphenateRE = /\B([A-Z])/g;
    //用连字符连接，将驼峰式的变量名转为中划线-连接的变量名
    var hyphenate = cached(function (str) {
        //replacement 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。但是 replacement 中的 $ 字符具有特定的含义。它说明从模式匹配得到的字符串将用于替换。
        //$1、$2、...、$99，与 regexp 中的第 1 到第 99 个子表达式相匹配的文本
        return str.replace(hyphenateRE, '-$1').toLowerCase();
    })

    //自己实现的bind函数
    function polyfillBind(fn, ctx) {
        function boundFn(a) {
            var l = arguments.length;
            return l
                ? l > 1
                    ?fn.apply(ctx,arguments)
                    :fn.call(ctx,a)
                :fn.call(ctx)
        }

        //记录原始函数的形参数量（原生的bind会绑定原始函数的形参数量）
        //而这里boundFn.length会返回1，即其自身的形参数量。故而_length保留原始形参数量，以备后续可能用到。
        boundFn._length = fn.length;
        return boundFn;
    }

    function nativeBind(fn,ctx) {
        return fn.bind(ctx);
    }

    //兼容系统bind和自己实现的bind函数
    var bind = Function.prototype.bind ? nativeBind : polyfillBind;

    //将类数组转为真正的数组。start默认0，代表从第几个开始到剩下的所有进行转换。
    function toArray(list,start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while(i--){
            ret[i]=list[i+start]
        }
        return ret;
    }

    // Mix properties into target object。
    //for in 循环返回所有可枚举属性，包含自身的和继承的。
    function extend(to,_from) {
        for (let key in _from) {
            to[key]=_from[key]
        }
        return to;
    }

    //Merge an Array of Objects into a single Object.
    function toObject(arr) {
        var res = {}
        for (let i = 0; i < arr.length; i++){
            if (arr[i]) {
                extend(res,arr[i])
            }
        }
        return res;
    }

    //为一些函数提供默认值，避免传入undefined之类的数据导致代码出错
    function noop(a, b, c) {}
    
    //Always return false.
    var no = function (a, b, c) { return false; }
    
    //Return the same value.
    var identity = function (_) { return _; }
    
    //Generate a string containing static keys from compiler modules.
    function genStaticKeys(modules) {
        return modules.reduce(function (keys, m) {
            return keys.concat(m.staticKeys || []);
        }, []).join(',');
    }

    /**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     * Object.keys()，返回对象自身的可枚举属性，for in 则还包含继承的可枚举属性。
     */
    function looseEqual(a,b) {
        if (a === b) { return true; }
        var isObjectA = isObject(a);
        var isObjectB = isObject(b);
        if (isObjectA && isObjectB) {
            try {
                var isArrayA = Array.isArray(a);
                var isArrayB = Array.isArray(b);
                if (isArrayA && isArrayB) {
                    return a.length === b.length && a.every(function (e,i) {
                        return looseEqual(e,b[i])
                    })
                } else if (a instanceof Date && b instanceof Date) {
                    return a.getTime() === b.getTime();
                } else if (!isArrayA && !isArrayB) {
                    var keysA = Object.keys(a);
                    var keysB = Object.keys(b);
                    return keysA.length === keysB.length && keysA.every(function (key) {
                        return looseEqual(a[key],b[key])
                    })
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        } else if (!isObjectA && !isObjectB) {
            return String(a)===String(b)
        } else {
            return false;
        }
    }

    /**
     * Return the first index at which a loosely equal value can be
     * found in the array (if value is a plain object, the array must
     * contain an object of the same shape), or -1 if it is not present.
     */
    function looseIndexOf(arr,val) {
        for (let i = 0; i < arr.length; i++){
            if (looseEqual(arr[i], val)) { return i };
        }
        return -1;
    }

    //Ensure a function is called only once.
    function once(fn) {
        var called = false;
        return function () {
            if (!called) {
                called = true;
                fn.apply(this,arguments)
            }
        }
    }

    var SSR_ATTR = "data-server-rendered";

    var ASSET_TYPES = [
        'component',
        'directive',
        'filter'
    ];

    var LIFECYCLE_HOOKS = [
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'beforeDestroy',
        'destroyed',
        'activated',
        'deactivated',
        'errorCaptured',
        'serverPrefetch',
    ];

    var config = {
        optionMergeStrategies: Object.create(null),
        
        //Whether to suppress(禁止) warnings.
        silent: false,

        //Show production mode tip message on boot。true时候启动时打印相关信息，帮助排错等。生产环境设置为false，增强性能。
        productionTip: 'development' !== 'production',

        //Whether to enable devtools //TODO 具体看下devtools怎么运行
        devtools: 'development' !== 'production',
        
        //Whether to record perf。//TODO 具体看下window.performance相关
        performance: false,
        
        //Error handler for watcher errors
        errorHandler: null,
        
        //Warn handler for watcher warns
        warnHandler: null,
        
        //Ignore certain custom elements
        ignoredElements: [],
        
        //Custom user key aliases for v-on。 //TODO 具体看下此处的使用
        keyCodes:Object.create(null),
        
        /**
         * Check if a tag is reserved so that it cannot be registered as a
         * component. This is platform-dependent and may be overwritten.
         */
        isReservedTag: no,
        
        /**
         * Check if an attribute is reserved so that it cannot be used as a component
         * prop. This is platform-dependent and may be overwritten.
         */
        isReservedAttr: no,
        
        /**
         * Check if a tag is an unknown element.
         * Platform-dependent.
         */
        isUnknownElement: no,

        //Get the namespace of an element. //TODO 具体看下使用方法
        getTagNamespace: noop,
        
        //Parse the real tag name for the specific platform.
        parsePlatformTagName: identity,
        
        /**
         * Check if an attribute must be bound using property, e.g. value
         * Platform-dependent. //TODO 看下具体什么意思
         */
        mustUseProp: no,
        
        /**
         * Perform updates asynchronously. Intended to be used by Vue Test Utils
         * This will significantly（明显的） reduce performance（降低性能） if set to false.
         */
        async:true,
        
        /**
         * Exposed(暴露) for legacy（遗留、后遗症） reasons
         */
        _lifecycleHooks:LIFECYCLE_HOOKS,
        
    }

    /**
     * unicode letters used for parsing html tags, component names and property paths.
     * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
     * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
     */
    var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

    /**
     * Check if a string starts with $ or _
     * 是否以_和$开头
     */
    function isReserved(str) {
        var c = (str + '').charCodeAt(0);
        return c === 0x24 || c === 0x5F;
    }

    //Define a property.
    function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
            value: val,
            enumerable: !!enumerable,
            writable: true,
            configurable:true
        })
    }

    /**
     * Parse simple path.
     * ^。1、限定开头。比如 /^A/会匹配"An e"中的A，但是不会匹配"ab A"中的A
     *    2、（否）取反， 当这个字符出现在一个字符集合模式的第一个字符时。/[^a-z\s]/会匹配"my 3 sisters"中的"3"  这里的”^”的意思是字符类的否定，此正则意思是匹配不是（a到z和空白字符）的字符
     * \\d ，\在引号中时需要转义，故而\d要写为\\d。直接在//中间写的时候不要特别转义。
     * 解析path并返回回调函数，传入vm执行回调函数，读取对应的data数据，以便完成依赖收集
     * bail(离开)
     */
    var bailRE=new RegExp(("[^"+unicodeRegExp.source+".$_\\d]"))

    function parsePath(path) {
        if (bailRE.test(path)){
            return;
        }
        var segments = path.split('.');
        //TODO 没看懂，具体逻辑代码时看下具体用处。
        return function (obj) {
            for (let i = 0; i < segments.length; i++){
                if (!obj) { return; }
                obj=obj[segments[i]]
            }
            return obj;
        }
    }

    var hasProto = '__proto__' in {};

    // Browser environment sniffing(识别)
    var inBrowser = typeof window !== 'undefined';
    var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
    var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && /msie|trident/.test(UA);
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    var isEdge = UA && UA.indexOf('edge/') > 0;
    var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
    var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
    var isPhantomJS = UA && /phantomjs/.test(UA);//phantom 幻影、幽灵。
    var isFF = UA && UA.match(/firefox\/(\d+)/);

    // Firefox has a "watch" function on Object.prototype...
    var nativeWatch = ({}).watch;

    //是否支持passive(流畅的)，chrome浏览器支持，优化页面滚动缩放等操作
    var supportsPassive = false;
    if (inBrowser) {
        try {
            var opts = {};
            Object.defineProperty(opts, 'passive', ({
                get: function get() {
                    /* istanbul ignore next */
                    supportsPassive = true;
                }
            })); // https://github.com/facebook/flow/issues/285
            //此处添加这个事件，是为了执行下opts的.passive的get方法，给supportsPassive赋上值。
            window.addEventListener('test-passive', null, opts);
        } catch (e) {}
    }

    // this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer;
    //是否服务端渲染
    var isServerRendering = function () {
        if (_isServer === undefined) {
            /* istanbul ignore if */
            if (!inBrowser && !inWeex && typeof global !== 'undefined') {
                // detect presence（存在） of vue-server-renderer and avoid
                // Webpack shimming（用垫片填） the process
                _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
            } else {
                _isServer = false;
            }
        }
        return _isServer
    };

    // detect devtools
    var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

    /* istanbul ignore next */
    function isNative (Ctor) {
        return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    }

    var hasSymbol =
        typeof Symbol !== 'undefined' && isNative(Symbol) &&
        typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
    
      var _Set;
    /* istanbul ignore if */ // $flow-disable-line
    if (typeof Set !== 'undefined' && isNative(Set)) {
        // use native Set when available.
        _Set = Set;
    } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = /*@__PURE__*/(function () {
            function Set () {
                this.set = Object.create(null);
            }
            Set.prototype.has = function has (key) {
                return this.set[key] === true
            };
            Set.prototype.add = function add (key) {
                this.set[key] = true;
            };
            Set.prototype.clear = function clear () {
                this.set = Object.create(null);
            };

            return Set;
        }());
    }

    var warn = noop;
    var tip = noop;
    var generateComponentTrace = (noop); // work around flow check
    var formatComponentName = (noop);
    {
        var hasConsole = typeof console !== 'undefined';
        //这个正则就是把连接符转换成的驼峰写法, 并且第一个字符大写  ^|[-_]　的意思是 字符串的开头, 或者 -_ 后面的一个字符
        // str = 'ms-border'  经过 classify(str) =>  MsBorder
        //这里 ?: 是希望在它的这个括号不用捕获了, 也就是 (?:^|[-_])这个整体, 正则不会把它当成是一个子项, 所以 $1就是(\w)
        //?: 非常常见, 是为了提高正则的性能
        var classifyRE = /(?:^|[-_])(\w)/g;
        var classify = function (str) { return str
            .replace(classifyRE, function (c) { return c.toUpperCase(); })
            .replace(/[-_]/g, ''); };

        //输出警告的函数
        warn = function (msg, vm) {
            var trace = vm ? generateComponentTrace(vm) : '';

            if (config.warnHandler) {
                //TODO 关注下warnHandler的赋值情况，明确调用的逻辑
                config.warnHandler.call(null, msg, vm, trace);
            } else if (hasConsole && (!config.silent)) {
                console.error(("[Vue warn]: " + msg + trace));
            }
        };

        tip = function (msg, vm) {
            if (hasConsole && (!config.silent)) {
                console.warn("[Vue tip]: " + msg + (
                    vm ? generateComponentTrace(vm) : ''
                ));
            }
        };

        //格式化组件名称。比如abc.vue格式化为 <Abc>
        formatComponentName = function (vm, includeFile) {
            if (vm.$root === vm) {
                return '<Root>'
            }
            var options = typeof vm === 'function' && vm.cid != null
                ? vm.options
                : vm._isVue
                    ? vm.$options || vm.constructor.options
                    : vm;
            var name = options.name || options._componentTag;
            var file = options.__file;
            if (!name && file) {
                //比如abc.vue，结果是[abc.vue,abc]，index===1的元素（即abc）是子匹配项
                var match = file.match(/([^/\\]+)\.vue$/);
                name = match && match[1];
            }

            return (
                (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
                (file && includeFile !== false ? (" at " + file) : '')
            )
        };

        //字符串重复n次串起来。
        var repeat = function (str, n) {
            var res = '';
            while (n) {
                //假设str='a'。取余数。比如初始n=5,首次：res='a';
                if (n % 2 === 1) { res += str; }
                if (n > 1) { str += str; }
                //有符号右移x位相当于除以 2**x，5>>1等于2，余数舍去了。
                n >>= 1;
            }
            return res
        };

        generateComponentTrace = function (vm) {
            if (vm._isVue && vm.$parent) {
                var tree = [];
                //Recursive 递归的，循环的。
                var currentRecursiveSequence = 0;
                while (vm) {
                    if (tree.length > 0) {
                        var last = tree[tree.length - 1];
                        if (last.constructor === vm.constructor) {
                            currentRecursiveSequence++;
                            vm = vm.$parent;
                            continue
                        } else if (currentRecursiveSequence > 0) {
                            tree[tree.length - 1] = [last, currentRecursiveSequence];
                            currentRecursiveSequence = 0;
                        }
                    }
                    tree.push(vm);
                    vm = vm.$parent;
                }
                return '\n\nfound in\n\n' + tree
                    .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
                        ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
                        : formatComponentName(vm))); })
                    .join('\n')
            } else {
                return ("\n\n(found in " + (formatComponentName(vm)) + ")")
            }
        };

    }

    var uid = 0;

    /**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */
    var Dep = function Dep() {
        this.id = uid++;
        this.subs = [];
    }
    Dep.prototype.addSub = function addSub(sub) {
        this.subs.push(sub);
    }
    Dep.prototype.removeSub = function removeSub(sub) {
        remove(this.subs, sub);
    }

    //TODO 看下target是什么，什么时候用此方法
    Dep.prototype.depend = function depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    Dep.prototype.notify = function notify () {

        // stabilize（稳定、稳固） the subscriber list first。复制一份。
        var subs = this.subs.slice();
        if (!config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order 。同步模式没排序，此处排序。
            subs.sort(function (a, b) { return a.id - b.id; });
        }
        //所有订阅者依次执行update方法
        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    };

    Dep.target = null;
    var targetStack = [];
    function pushTarget(target) {
        targetStack.push(target);
        Dep.target = target;
    }

    function popTarget() {
        targetStack.pop();
        Dep.target = targetStack[targetStack.length - 1];
    }

    //VNode构造函数
    var VNode = function VNode(
        tag,
        data,
        children,
        text,
        ele,
        context,
        componentOptions,
        asyncFactory
    ) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.ele = ele;
        this.context = context;
        this.componentOptions = componentOptions;
        this.asyncFactory = asyncFactory;

        this.ns = undefined;
        this.fnContext = undefined;
        this.fnOptions = undefined;
        this.fnScopeId = undefined;
        this.key = data && data.key;
        this.componentInstance = undefined;
        this.parent = undefined;
        this.raw = false;
        this.isStatic = false;
        this.isRootInsert = true;
        this.isComment = false;
        this.isCloned = false;
        this.isOnce = false;
        this.asyncMeta = undefined;
        this.isAsyncPlaceholder = false;
    }

    var prototypeAccessors = { child: { configurable: true } };

    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    prototypeAccessors.child.get = function () {
        return this.componentInstance
    };
    Object.defineProperties(VNode.prototype, prototypeAccessors);
    
       //创建空的vNode，设置isComment=true。注释节点。
    var createEmptyVNode = function (text) {
        //void 0 是undefined，之所以不直接用undefined，因为低版本浏览器中可以被重写。
        if ( text === void 0 ) text = '';

        var node = new VNode();
        node.text = text;
        node.isComment = true;
        return node
    };

    //创建 文本VNode
    function createTextVNode (val) {
        return new VNode(undefined, undefined, undefined, String(val))
    }

     // optimized shallow（浅的） clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode (vnode) {
        var cloned = new VNode(
            vnode.tag,
            vnode.data,
            // #7975
            // clone children array to avoid mutating（转换） original in case of cloning
            // a child.
            vnode.children && vnode.children.slice(),
            vnode.text,
            vnode.elm,
            vnode.context,
            vnode.componentOptions,
            vnode.asyncFactory
        );
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;
        cloned.isComment = vnode.isComment;
        cloned.fnContext = vnode.fnContext;
        cloned.fnOptions = vnode.fnOptions;
        cloned.fnScopeId = vnode.fnScopeId;
        cloned.asyncMeta = vnode.asyncMeta;
        cloned.isCloned = true;
        return cloned
    }

    /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto);

    var methodsToPatch = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ];

    /**
     * Intercept mutating methods and emit events
     */
    methodsToPatch.forEach(function (method) {
        // cache original method
        var original = arrayProto[method];
        def(arrayMethods, method, function mutator() {
            //参数拷贝到args
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            var result = original.apply(this, args);
            //TODO ob相关的再好好看下
            var ob = this.__ob__;
            var inserted;
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break
                case 'splice':
                    inserted = args.slice(2);
                    break
            }
            if (inserted) { ob.observeArray(inserted); }
            // notify change
            ob.dep.notify();
            return result
        });
    });

    //Object.getOwnPropertyNames()方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组。
    var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

     /**
     * In some cases we may want to disable observation inside a component's
     * update computation.
     */
    var shouldObserve = true;

    function toggleObserving (value) {
        shouldObserve = value;
    }

    /**
     * Observer构造函数。
     * 1、赋值value=value；dep=new Dep(); __ob__挂到value上
     * 2、只接收对象参数。因为非对象的话observe方法就直接返回了
     * Observer class that is attached to each observed
     * object. Once attached, the observer converts the target
     * object's property keys into getter/setters that
     * collect dependencies and dispatch updates.
     */
    var Observer = function Observer(value) {
        this.value = value;
        this.dep = new Dep();//方便数组的push等方法进行依赖收集和更新。在get方法进行depend和dependArray
        this.vmCount = 0;
        def(value, '__ob__', this);
        if (Array.isArray(value)) {
            if (hasProto) {
                //改良后的数组方法绑定到原型
                protoAugment(value, arrayMethods);
            } else {
                copyAugment(value, arrayMethods, arrayKeys);
            }
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    /**
     * 遍历对象属性并转换对应的set和get方法
     * Walk through all properties and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */
    Observer.prototype.walk = function walk (obj) {
        var keys = Object.keys(obj);
        for (var i = 0; i < keys.length; i++) {
            defineReactive$$1(obj, keys[i]);
        }
    };

    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function observeArray (items) {
        for (var i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    };

    // helpers

    /**
     * Augment(扩充、补充) a target Object or Array by intercepting
     * the prototype chain using __proto__
     * 绑定原型
     */
    function protoAugment (target, src) {
        /* eslint-disable no-proto */
        target.__proto__ = src;
        /* eslint-enable no-proto */
    }

    /**
     * Augment a target Object or Array by defining
     * hidden properties.
     * 将改良后的数组方法copy到目标数组对象上。只拷贝7个方法
     */
    /* istanbul ignore next */
    function copyAugment (target, src, keys) {
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            def(target, key, src[key]);
        }
    }

    /**
     * 给给定对象新建Observer并返回。
     * 给对象new Observer，并设置value.__ob__=ob。方便数组进行依赖收集和更新
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     * //TODO asRootData 仔细看下此处的使用
     */
    function observe (value, asRootData) {
        if (!isObject(value) || value instanceof VNode) {
            return
        }
        var ob;
        if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
            ob = value.__ob__;
        } else if (
            shouldObserve &&
            !isServerRendering() &&
            (Array.isArray(value) || isPlainObject(value)) &&
            Object.isExtensible(value) && //此方法检查我们是否可以向对象添加新属性
            !value._isVue
        ) {
            ob = new Observer(value);
        }
        if (asRootData && ob) {
            ob.vmCount++;
        }
        return ob
    }

    /**
     * Define a reactive property on an Object.
     * 给对象的属性定义成响应式的。
     * 如果value也是对象，则继续调用observe进行逐层定义响应式
     */
    function defineReactive$$1 (
        obj,
        key,
        val,
        customSetter,
        shallow
    ) {
        var dep = new Dep();
        var property = Object.getOwnPropertyDescriptor(obj, key);
        //不可配置的话直接返回
        if (property && property.configurable === false) {
            return
        }

        // cater for pre-defined getter/setters
        var getter = property && property.get;
        var setter = property && property.set;
        //原始属性描述符没有getter方法，则直接先获取key对应的val
        if ((!getter || setter) && arguments.length === 2) {
            val = obj[key];
        }

        var childOb = !shallow && observe(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter () {
                var value = getter ? getter.call(obj) : val;
                if (Dep.target) {
                    dep.depend();
                    if (childOb) {
                        childOb.dep.depend();//将Dep.target添加进child的依赖，以便在val是数组时，执行push等方法时能根据__ob__中的dep拿到对应的watcher进行更新用
                        if (Array.isArray(value)) {//遍历数组，给所有的子数组进行依赖收集
                            dependArray(value);
                        }
                    }
                }
                return value
            },
            set: function reactiveSetter (newVal) {
                var value = getter ? getter.call(obj) : val;
                /* eslint-disable no-self-compare */
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return
                }
                /* eslint-enable no-self-compare */
                if (customSetter) {
                    customSetter();
                }
                // #7981: for accessor properties without setter
                if (getter && !setter) { return }
                if (setter) {
                    setter.call(obj, newVal);
                } else {
                    val = newVal;
                }
                childOb = !shallow && observe(newVal);//对新的值重新进行observe
                dep.notify();
            }
        });
    }

    /**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     * 动态添加新属性的方法
     */
    function set (target, key, val) {
        if (isUndef(target) || isPrimitive(target)
        ) {
            warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
        }
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key);
            target.splice(key, 1, val);
            return val
        }
        if (key in target && !(key in Object.prototype)) {
            target[key] = val;
            return val
        }
        var ob = (target).__ob__;
        if (target._isVue || (ob && ob.vmCount)) {
            warn(
                'Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.'
            );
            return val
        }
        if (!ob) {
            target[key] = val;
            return val
        }
        defineReactive$$1(ob.value, key, val);
        ob.dep.notify();
        return val
    }

    /**
     * Delete a property and trigger change if necessary.
     * 动态删除新属性的方法
     */
    function del (target, key) {
        if (isUndef(target) || isPrimitive(target)
        ) {
            warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
        }
        if (Array.isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1);
            return
        }
        var ob = (target).__ob__;
        if (target._isVue || (ob && ob.vmCount)) {
            warn(
                'Avoid deleting properties on a Vue instance or its root $data ' +
                '- just set it to null.'
            );
            return
        }
        if (!hasOwn(target, key)) {
            return
        }
        delete target[key];
        if (!ob) {
            return
        }
        ob.dep.notify();
    }

    /**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     * 遍历数组，收集依赖。给数组中的item有__ob__（数组或对象）的收集依赖。
     * 作用还是为了数组或数组中的子数组在push等时能够拿到对应依赖进行更新
     */
    function dependArray (value) {
        for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
            if (Array.isArray(e)) {
                dependArray(e);
            }
        }
    }

    /*  */

    /**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */
    var strats = config.optionMergeStrategies;

    /**
     * Options with restrictions（约束，限制）
     */
    {
        //el和propsData的合并策略用默认的（替换，不合并）
        strats.el = strats.propsData = function (parent, child, vm, key) {
            if (!vm) {
                warn(
                    "option \"" + key + "\" can only be used during instance " +
                    'creation with the `new` keyword.'
                );
            }
            return defaultStrat(parent, child)
        };
    }

    /**
     * Helper that recursively merges two data objects together.
     * 递归合并两个对象。（不合并from中的非对象值到to中，to中没有的直接赋值，有的，如果是非对象，则不复制）
     * {name:'li',m:{}} {name:'z',age:18,m:{h:1}}
     */
    function mergeData (to, from) {
        if (!from) { return to }
        var key, toVal, fromVal;

        //Reflect.ownKeys返回所有的属性不管是不是可枚举,Object.keys返回可枚举的属.都只有自身的属性
        var keys = hasSymbol
            ? Reflect.ownKeys(from)
            : Object.keys(from);

        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            // in case the object is already observed...
            if (key === '__ob__') { continue }
            toVal = to[key];
            fromVal = from[key];
            if (!hasOwn(to, key)) {
                set(to, key, fromVal);
            } else if (
                toVal !== fromVal &&
                isPlainObject(toVal) &&
                isPlainObject(fromVal)
            ) {
                mergeData(toVal, fromVal);
            }
        }
        return to
    }

    /**
     * options中的Data合并策略。分为有vm和没有vm
     */
    function mergeDataOrFn (
        parentVal,
        childVal,
        vm
    ) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal
            }
            if (!parentVal) {
                return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn () {
                return mergeData(
                    typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                    typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
                )
            }
        } else {
            return function mergedInstanceDataFn () {
                // instance merge
                var instanceData = typeof childVal === 'function'
                    ? childVal.call(vm, vm)
                    : childVal;
                var defaultData = typeof parentVal === 'function'
                    ? parentVal.call(vm, vm)
                    : parentVal;
                if (instanceData) {
                    return mergeData(instanceData, defaultData)
                } else {
                    return defaultData
                }
            }
        }
    }


    //data的合并策略。1、没有vm，childVal不是函数时，直接返回parent；否则返回mergeDataOrFn。2、有vm,返回mergeDataOrFn(parentVal, childVal, vm)
    strats.data = function (
        parentVal,
        childVal,
        vm
    ) {
        if (!vm) {
            if (childVal && typeof childVal !== 'function') {
                warn(
                    'The "data" option should be a function ' +
                    'that returns a per-instance value in component ' +
                    'definitions.',
                    vm
                );

                return parentVal
            }
            //options中的Data合并策略。分为有vm和没有vm
            return mergeDataOrFn(parentVal, childVal)
        }

        return mergeDataOrFn(parentVal, childVal, vm)
    };

    /**
     * Hooks and props are merged as arrays.
     * 生命周期钩子函数的合并策略。当成数组合并（concat）
     */
    function mergeHook (
        parentVal,
        childVal
    ) {
        var res = childVal
            ? (parentVal
                ? parentVal.concat(childVal)
                : (Array.isArray(childVal)? childVal : [childVal])
              )
            : parentVal;
        return res
            ? dedupeHooks(res)
            : res
    }

    //重复数据消除
    function dedupeHooks (hooks) {
        var res = [];
        for (var i = 0; i < hooks.length; i++) {
            if (res.indexOf(hooks[i]) === -1) {
                res.push(hooks[i]);
            }
        }
        return res
    }

    //绑定生命周期钩子的合并策略
    LIFECYCLE_HOOKS.forEach(function (hook) {
        strats[hook] = mergeHook;
    });

    /**
     * Assets
     * components/filter/directive合并策略(child合并到parent)
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */
    function mergeAssets (
        parentVal,
        childVal,
        vm,
        key
    ) {
        var res = Object.create(parentVal || null);
        if (childVal) {
            //断言childVal类型必须是对象
            assertObjectType(key, childVal, vm);
            return extend(res, childVal)
        } else {
            return res
        }
    }

    //components/filter/directive合并策略
    ASSET_TYPES.forEach(function (type) {
        strats[type + 's'] = mergeAssets;
    });

    /**
     * Watchers. 合并策略。不覆盖，所以当成数组合并
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */
    strats.watch = function (
        parentVal,
        childVal,
        vm,
        key
    ) {
        // work around Firefox's Object.prototype.watch...
        if (parentVal === nativeWatch) { parentVal = undefined; }
        if (childVal === nativeWatch) { childVal = undefined; }
        /* istanbul ignore if */
        if (!childVal) { return Object.create(parentVal || null) }
        {
            assertObjectType(key, childVal, vm);
        }
        if (!parentVal) { return childVal }
        var ret = {};
        extend(ret, parentVal);
        for (var key$1 in childVal) {
            var parent = ret[key$1];
            var child = childVal[key$1];
            if (parent && !Array.isArray(parent)) {
                parent = [parent];
            }
            ret[key$1] = parent
                ? parent.concat(child)
                : Array.isArray(child) ? child : [child];
        }
        return ret
    };

    /**
     * props/methods/inject/computed策略，覆盖策略
     * Other object hashes.
     */
    strats.props =
        strats.methods =
            strats.inject =
                strats.computed = function (
                    parentVal,
                    childVal,
                    vm,
                    key
                ) {
                    if (childVal && "development" !== 'production') {
                        assertObjectType(key, childVal, vm);
                    }
                    if (!parentVal) { return childVal }
                    var ret = Object.create(null);
                    extend(ret, parentVal);
                    if (childVal) { extend(ret, childVal); }
                    return ret
                };
    //provide合并策略
    strats.provide = mergeDataOrFn;

    /**
     * Default strategy.
     * options默认合并策略，有child返回child,否则返回parent
     */
    var defaultStrat = function (parentVal, childVal) {
        return childVal === undefined
            ? parentVal
            : childVal
    };

    /**
     * Validate component names
     */
    function checkComponents (options) {
        for (var key in options.components) {
            validateComponentName(key);
        }
    }

    //验证组件名称name的合法性
    function validateComponentName (name) {
        if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
            warn(
                'Invalid component name: "' + name + '". Component names ' +
                'should conform（符合、遵守） to valid custom element name in html5 specification.'
            );
        }
        if (isBuiltInTag(name) || config.isReservedTag(name)) {
            warn(
                'Do not use built-in or reserved HTML elements as component ' +
                'id: ' + name
            );
        }
    }

    /**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     * props格式化，key变为驼峰
     */
    function normalizeProps (options, vm) {
        var props = options.props;
        if (!props) { return }
        const res={}
        var i, val, name;
        if (Array.isArray(props)) {
            i = props.length;
            while (i--) {
                val = props[i];
                if (typeof val === 'string') {
                    name = camelize(val);
                    res[name] = { type: null };
                } else {
                    warn('props must be strings when using array syntax.');
                }
            }
        } else if (isPlainObject(props)) {
            for (var key in props) {
                val = props[key];
                name = camelize(key);
                res[name] = isPlainObject(val)
                    ? val
                    : { type: val };
            }
        } else {
            warn(
                "Invalid value for option \"props\": expected an Array or an Object, " +
                "but got " + (toRawType(props)) + ".",
                vm
            );
        }
        options.props = res;
    }

    /**
     * Normalize all injections into Object-based format
     */
    function normalizeInject (options, vm) {
        var inject = options.inject;
        if (!inject) { return }
        var normalized = options.inject = {};
        if (Array.isArray(inject)) {
            for (var i = 0; i < inject.length; i++) {
                normalized[inject[i]] = { from: inject[i] };
            }
        } else if (isPlainObject(inject)) {
            for (var key in inject) {
                var val = inject[key];
                normalized[key] = isPlainObject(val)
                    ? extend({ from: key }, val)
                    : { from: val };
            }
        } else {
            warn(
                "Invalid value for option \"inject\": expected an Array or an Object, " +
                "but got " + (toRawType(inject)) + ".",
                vm
            );
        }
    }

    /**
     * Normalize raw function directives into object format.
     */
    function normalizeDirectives (options) {
        var dirs = options.directives;
        if (dirs) {
            for (var key in dirs) {
                var def$$1 = dirs[key];
                if (typeof def$$1 === 'function') {
                    dirs[key] = { bind: def$$1, update: def$$1 };
                }
            }
        }
    }

    //断言value类型必须是对象
    function assertObjectType (name, value, vm) {
        if (!isPlainObject(value)) {
            warn(
                "Invalid value for option \"" + name + "\": expected an Object, " +
                "but got " + (toRawType(value)) + ".",
                vm
            );
        }
    }

    /**
     * Merge two option objects into a new one.
     * Core utility(实用、用于) used in both instantiation（实例化） and inheritance.
     * 合并属性
     */
    function mergeOptions (
        parent,
        child,
        vm
    ) {
        {
            checkComponents(child);
        }

        if (typeof child === 'function') {
            child = child.options;
        }

        normalizeProps(child, vm);
        normalizeInject(child, vm);
        normalizeDirectives(child);

        // Apply extends and mixins on the child options,
        // but only if it is a raw options object that isn't
        // the result of another mergeOptions call.
        // Only merged options has the _base property.
        if (!child._base) {
            //TODO 
            if (child.extends) {
                parent = mergeOptions(parent, child.extends, vm);
            }
            //TODO 
            if (child.mixins) {
                for (var i = 0, l = child.mixins.length; i < l; i++) {
                    parent = mergeOptions(parent, child.mixins[i], vm);
                }
            }
        }

        var options = {};
        var key;
        for (key in parent) {
            mergeField(key);
        }
        for (key in child) {
            if (!hasOwn(parent, key)) {
                mergeField(key);
            }
        }
        function mergeField (key) {
            //对不同属性用对应的合并策略进行合并
            var strat = strats[key] || defaultStrat;//options默认合并策略，有child返回child,否则返回parent
            options[key] = strat(parent[key], child[key], vm, key);
        }
        return options
    }

    /**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     * 根据类型和id解析options中对应的资源，比如filter
     */
    function resolveAsset (
        options,
        type,
        id,
        warnMissing
    ) {
        /* istanbul ignore if */
        if (typeof id !== 'string') {
            return
        }
        var assets = options[type];
        // check local registration variations first
        if (hasOwn(assets, id)) { return assets[id] }
        var camelizedId = camelize(id);
        if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
        var PascalCaseId = capitalize(camelizedId);
        if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
        // fallback to prototype chain
        //原型链上查找
        var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
        if (warnMissing && !res) {
            warn(
                'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
                options
            );
        }
        return res
    }

    /*  */



    //TODO 好好看，没懂
    function validateProp (
        key,
        propOptions,
        propsData,
        vm
    ) {
        var prop = propOptions[key];
        var absent = !hasOwn(propsData, key);//absent 缺席。
        var value = propsData[key];
        // boolean casting
        var booleanIndex = getTypeIndex(Boolean, prop.type);
        if (booleanIndex > -1) {
            if (absent && !hasOwn(prop, 'default')) {
                value = false;
            } else if (value === '' || value === hyphenate(key)) {
                // only cast empty string / same name to boolean if
                // boolean has higher priority
                var stringIndex = getTypeIndex(String, prop.type);
                if (stringIndex < 0 || booleanIndex < stringIndex) {
                    value = true;
                }
            }
        }
        // check default value
        if (value === undefined) {
            value = getPropDefaultValue(vm, prop, key);
            // since the default value is a fresh copy,
            // make sure to observe it.
            var prevShouldObserve = shouldObserve;
            toggleObserving(true);
            observe(value);
            toggleObserving(prevShouldObserve);
        }
        {
            assertProp(prop, key, value, vm, absent);
        }
        return value
    }

    /**
     * Get the default value of a prop.
     * //TODO 结合业务场景看，没懂
     */
    function getPropDefaultValue (vm, prop, key) {
        // no default, return undefined
        if (!hasOwn(prop, 'default')) {
            return undefined
        }
        var def = prop.default;
        // warn against non-factory defaults for Object & Array
        if (isObject(def)) {
            warn(
                'Invalid default value for prop "' + key + '": ' +
                'Props with type Object/Array must use a factory function ' +
                'to return the default value.',
                vm
            );
        }
        // the raw prop value was also undefined from previous render,
        // return previous default value to avoid unnecessary watcher trigger
        if (vm && vm.$options.propsData &&
            vm.$options.propsData[key] === undefined &&
            vm._props[key] !== undefined
        ) {
            return vm._props[key]
        }
        // call factory function for non-Function types
        // a value is Function if its prototype is function even across different execution context
        return typeof def === 'function' && getType(prop.type) !== 'Function'
            ? def.call(vm)
            : def
    }

    /**
     * Assert whether a prop is valid.
     */
    function assertProp (
        prop,
        name,
        value,
        vm,
        absent
    ) {
        if (prop.required && absent) {
            warn(
                'Missing required prop: "' + name + '"',
                vm
            );
            return
        }
        if (value == null && !prop.required) {
            return
        }
        var type = prop.type;
        var valid = !type || type === true;
        var expectedTypes = [];
        if (type) {
            if (!Array.isArray(type)) {
                type = [type];
            }
            for (var i = 0; i < type.length && !valid; i++) {
                var assertedType = assertType(value, type[i], vm);
                expectedTypes.push(assertedType.expectedType || '');
                valid = assertedType.valid;
            }
        }

        var haveExpectedTypes = expectedTypes.some(function (t) { return t; });
        if (!valid && haveExpectedTypes) {
            warn(
                getInvalidTypeMessage(name, value, expectedTypes),
                vm
            );
            return
        }
        var validator = prop.validator;
        if (validator) {
            if (!validator(value)) {
                warn(
                    'Invalid prop: custom validator check failed for prop "' + name + '".',
                    vm
                );
            }
        }
    }

    var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;

    //TODO 结合业务看
    function assertType (value, type, vm) {
        var valid;
        var expectedType = getType(type);
        if (simpleCheckRE.test(expectedType)) {
            var t = typeof value;
            valid = t === expectedType.toLowerCase();
            // for primitive wrapper objects
            if (!valid && t === 'object') {
                valid = value instanceof type;
            }
        } else if (expectedType === 'Object') {
            valid = isPlainObject(value);
        } else if (expectedType === 'Array') {
            valid = Array.isArray(value);
        } else {
            try {
                valid = value instanceof type;
            } catch (e) {
                warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
                valid = false;
            }
        }
        return {
            valid: valid,
            expectedType: expectedType
        }
    }

    //\s 空白字符；\S 非空白字符
    var functionTypeCheckRE = /^\s*function (\w+)/;

    /**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     * 获取函数名字
     */
    function getType (fn) {
        var match = fn && fn.toString().match(functionTypeCheckRE);
        return match ? match[1] : ''
    }

    //是否具有相同的函数名字
    function isSameType (a, b) {
        return getType(a) === getType(b)
    }

    //获取相同函数名字所在的index
    function getTypeIndex (type, expectedTypes) {
        if (!Array.isArray(expectedTypes)) {
            return isSameType(expectedTypes, type) ? 0 : -1
        }
        for (var i = 0, len = expectedTypes.length; i < len; i++) {
            if (isSameType(expectedTypes[i], type)) {
                return i
            }
        }
        return -1
    }

    //TODO 结合业务看
    function getInvalidTypeMessage (name, value, expectedTypes) {
        var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
            " Expected " + (expectedTypes.map(capitalize).join(', '));
        var expectedType = expectedTypes[0];
        var receivedType = toRawType(value);
        // check if we need to specify expected value
        if (
            expectedTypes.length === 1 &&
            isExplicable(expectedType) &&
            isExplicable(typeof value) &&
            !isBoolean(expectedType, receivedType)
        ) {
            message += " with value " + (styleValue(value, expectedType));
        }
        message += ", got " + receivedType + " ";
        // check if we need to specify received value
        if (isExplicable(receivedType)) {
            message += "with value " + (styleValue(value, receivedType)) + ".";
        }
        return message
    }


















    console.log(looseEqual(1,'1'))

    // console.log(hyphenate('myNameIsLiqiang'))
    






}))