
const e = React.createElement;
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
import List from "../list/index.js";


export default class Home extends React.Component {
    render() {
        return e("div", null, e("nav", null, e(Link, {
            to: "/a"
        }, "go to a")));
    }
}
