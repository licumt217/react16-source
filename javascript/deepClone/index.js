function deepClone(obj, cache = new WeakMap()) {
    if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        return obj;
    }
    //防止循环引用
    if (cache.get(obj)) {
        return cache.get(obj);
    }

    if (obj instanceof Date) {
        return new Date(obj);
    } else if (obj instanceof RegExp) {
        return new RegExp(obj);
    } else if (obj instanceof Error) {
        return new Error(obj.message)
    } else if (obj instanceof Function) {
        const str = obj.toString();
        const startIndex = str.indexOf('{') + 1;
        const endIndex = str.indexOf('}');
        const body = str.substring(startIndex, endIndex);
        return new Function(body);
    }

    let cloneObj = new obj.constructor();
    cache.set(obj, cloneObj);

    for (let key of Reflect.ownKeys(obj)) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepClone(obj[key], cache);
        }
    }

    return cloneObj;

}

const sky = {
    color: 'blue',
}

const person = {
    age: 18,
    sky
}

const sym = Symbol("xxx")

let source = {
    name: 'li',
    date: new Date(),
    tt: /abc/g,
    err: new Error("你大爷"),
    eat(fan) {
        console.log("eat ..:" + fan)
    },
    [sym]: "mySym",
    child: {
        person,
        sky,
        age: 1118
    }
}

for (let key of Reflect.ownKeys(source)) {
    // console.log(key)
}


const tt = deepClone(source);
console.log(tt[sym])