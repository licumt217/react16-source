console.log("index...");



var div = document.createElement("div");
div.innerHTML = "点击我"
div.onclick = function () {
    import('./test.js').then(({ default: c }) => {
        console.log('content:' + c)
    })
}

document.body.appendChild(div);

console.log("index...end")