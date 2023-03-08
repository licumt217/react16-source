

/**
 * 同步loader 
 * 将空格分割的纯文本转为json文件，并导出
 * @param {*} source 
 * @returns 
 */
module.exports = function (source) {
    console.log(`自定义loader:xyz-loader`);

    //获取参数
    const options = this.getOptions();

    source = source.trim();
    let array = source.split(' ');
    let obj = {
        [array[0]]: array[1],
        [array[2]]: array[3],
    };

    if (options.add) {
        obj = { ...obj, ...options.add }
    }
    //导出为模块，方便使用处 直接 import 

    const result = `module.exports=${JSON.stringify(obj)}`;

    //同步loader以下两种方式都可以，要么直接返回字符串，要么 this.callback()
    // return result;
    this.callback(null, result);
}