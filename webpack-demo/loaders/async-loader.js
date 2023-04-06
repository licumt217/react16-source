/**
 * 异步 自定义loader
 * @param {*} source 
 */
module.exports = function (source) {
    //通过this.async 来返回一个异步函数，第一个参数是Error，第二个是处理结果
    const callback = this.async();
    setTimeout(() => {
        const result = `module.exports=${JSON.stringify({
            content: source
        })}`;
        callback(null, result)
    }, 500)
}