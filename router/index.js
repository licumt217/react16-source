'use strict';
import routers from './router/index.js'
import App from "./views/app/index.js";
import Home from "./views/home/index.js";
import Detail from "./views/detail/index.js";
import NewItemForm from "./views/newItemForm/index.js";
import NewItemForm1 from "./views/newItemForm1/index.js";
import A from "./views/a/index.js";
import B from "./views/b/index.js";
import C from "./views/c/index.js";
import List from "./views/list/index.js";
import List1 from "./views/list1/index.js";
import List2 from "./views/list2/index.js";
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const HashRouter = ReactRouterDOM.HashRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const NavLink = ReactRouterDOM.NavLink;

const generatePath = ReactRouter.generatePath;

const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById("app"))



function Main() {

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

    return e(BrowserRouter, {
        // basename: '/'
    }, [
        e(Link, { key: 55, to: "/list/list1/list2/xxx" }, "go to a"),
        e('br', { key: 1 }),
        e(NavLink, getLinkParamObj('../../new1'), "go to new1"),
        e('p', { key: 2, style: { marginBottom: '2em' } })],
        e(Routes, null,
            e(Route, { path: '/', element: e(App) }, [
                e(Route, { key: 1, index: true, element: e(Home) }),
                e(Route, { key: 2, path: 'list', element: e(List) }, [
                    e(Route, { key: 1, path: "list1", element: e(List1) }, [
                        e(Route, { key: 1, path: "list2", element: e(List2) }, [
                            e(Route, { key: 1, path: ":itemId", element: e(Detail) }),
                            e(Route, { key: 2, path: "new", element: e(NewItemForm) }),
                        ]),
                    ]),
                    e(Route, { key: 2, path: "new1", element: e(NewItemForm1) }),
                ]),
                // e(Route, { key: 3, path: 'list3', element: e(List3) }, [
                //     e(Route, { key: 2, path: "new", element: e(NewItemForm1) }),
                // ])
            ])))


}



root.render(e(Main));








