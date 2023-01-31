'use strict';
import routers from './router/index.js'
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById("app"))


function App() {

    const routersArray = [];

    routers.forEach((item, key) => {
        routersArray.push(e(Route, {
            path: item.path,
            key,
            element: e(item.component)
        }))
    })


    return e(BrowserRouter, { basename: '/' }, e(Routes, null, routersArray))


}



root.render(e(App));








