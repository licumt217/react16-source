// ================= 浅拷贝方法 ==================

// 1、Object.assign
let obj = {
    name: 'li',
    child: {
        name: 'cml'
    }
}

let array = [{
    name: 'li'
}]

let new_obj = Object.assign({}, obj);

console.log(obj.child === new_obj.child)

// 2、对象解构
let new_obj_2 = { ...obj };
console.log(obj.child === new_obj_2.child)

// 3、数组 concat()
let new_array = array.concat();
console.log(new_array[0] === array[0])

// 4、数组 slice()
let new_array_2 = array.slice();
console.log(new_array_2[0] === array[0])