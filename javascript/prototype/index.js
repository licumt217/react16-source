function Person() {}
let person = new Person();

console.log(person.__proto__ === Person.prototype);
console.log(Person.prototype.__proto__ === Object.prototype);

console.log(Person.__proto__ === Function.prototype)
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__ === null);

const arrow = () => {}
console.log(arrow.prototype);




