import Home from "../views/home/index.js";
import A from "../views/a/index.js";
import B from "../views/b/index.js";
import C from "../views/c/index.js";
import List from "../views/list/index.js";

const routers = [
    { path: '/*', component: Home },
    { path: '/a', component: A },
    { path: '/b', component: B },
    { path: '/c', component: C },
    { path: '/list', component: List },
]

export default routers;