let sym = Symbol("xxx")
let obj = {
    prop1: '1',
    prop2: '2',
    prop3: '3',
    [sym]: 11
}

// Object.defineProperty:
// 定义对象属性时，默认不可写、不可配置、不可枚举。

// for in 可以遍历对象自身及继承的所有可枚举属性(不包括Symbol类型)
// Object.keys() 获取对象自身所有可枚举属性（不包括Symbol类型）组成的数组
// Object.getOwnPropertyNames 获取对象自身所有类型为非Symbol的属性名称（包括不可枚举）组成的数组
// Object.getOwnPropertySymbols 获取对象自身所有类型为Symbol的属性名称（包括不可枚举）组成的数组
// Reflect.ownKeys  获取一个对象的自身的所有（包括不可枚举的和Symbol类型）的属性名称组成的数组
// Object.values 获取对象自身所有可枚举属性（不包括Symbol类型）的值组成的数组
// Object.entries 获取对象自身所有可枚举属性（不包括Symbol类型）的键值对数组
// hasOwnProperty 检测一个对象自身属性中是否含有指定的可枚举属性，返回boolean

// 引用自MDN: JavaScript 并没有保护 hasOwnProperty 属性名，因此某个对象是有可能存在使用这个属性名的属性，
// 所以直接使用原型链上的 hasOwnProperty 方法

// propertyIsEnumerable 检测一个属性在指定的对象中是否可枚举，返回boolean


Object.defineProperty(obj, 'prop4', {
    value: 'prop4',
    // enumerable: true
})

obj.__proto__ = {
}

Object.defineProperty(obj.__proto__, 'ppppppProp1', {
    value: '1',
    enumerable: true
})

for (let key of Reflect.ownKeys(obj)) {
    // console.log(key, obj.propertyIsEnumerable(key))
}

console.log(sym, obj.propertyIsEnumerable("ppppppProp1"))


