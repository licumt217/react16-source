'use strict';
import routers from './router/index.js'
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;
const NavLink = ReactRouterDOM.NavLink;

const generatePath = ReactRouter.generatePath;

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

    function getLinkParamObj(to) {
        return {
            to: to,
            key: Math.random(),
            style: ({ isActive }) => {
                if (isActive) {
                    return {
                        color: 'red'
                    }
                } else {
                    return {
                        color: 'gray'
                    }
                }
            }
        }
    }

    return e(HashRouter, { basename: '/' }, e('div', null, [
        e(NavLink, getLinkParamObj('/a?name=liqiang&age=18'), "go to a"),
        e('br', { key: 1 }),
        e(NavLink, getLinkParamObj('/b'), "go to b"),
        e('p', { key: 2, style: { marginBottom: '2em' } })]),
        e(Routes, null, routersArray))


}



root.render(e(App));








