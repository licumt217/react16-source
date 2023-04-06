const xhr = new XMLHttpRequest();
const url = "https://www.baidu.com"
//第三个参数代表同步或异步。
xhr.open("get", url, false);
//如果是post请求，必须写请求头
// xhr.setRequestHeader('');
xhr.onreadystatechange = function () {
    //readyState 0 :请求未初始化
    //readyState 1 :客户端与服务器建立连接
    //readyState 2 :请求已经被接收
    //readyState 3 :请求正在处理中
    //readyState 4 :请求成功
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}
//发送请求。如果不需要参数就写null
xhr.send(null)

