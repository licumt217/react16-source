
const e = React.createElement;
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
import List from "../list/index.js";


export default class A extends React.Component {
    render() {
        return e("div", null, e("nav", null, e(Link, {
            to: "/home"
        }, "go to home!")));
    }
}
