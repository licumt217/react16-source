var script = document.createElement("script");
script.type = "module"

script.src = "http://localhost:3000/test.js";
// script.textContent = `";console.log(m.default) `;
console.log(1)
script.onload = function (event) {
    window.abc = event.target.src;

}
script.onerror = function () {
    console.log('err')
}
console.log(2)
document.body.appendChild(script)