
const e = React.createElement;
const NavLink = ReactRouterDOM.NavLink;
const Route = ReactRouterDOM.Route;
const Outlet = ReactRouterDOM.Outlet;
import List from "../list/index.js";


export default class App extends React.Component {
    render() {
        return e('div', null, [
            e('h1', { key: 1, style: { color: 'red' } }, 'i am app'),
            e(Outlet, { key: 2 })
        ])
    }
}
