function MyNew(Func, ...args) {
    const instance = {};
    Object.setPrototypeOf(instance, Func.prototype);
    const res = Func.apply(instance, args);
    if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
        return res;
    }
    return instance;

}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person = MyNew(Person, "Li", 18);

console.log(person instanceof Person)
console.log(person.__proto__ === Person.prototype)
console.log(person)