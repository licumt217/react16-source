const Outlet = ReactRouterDOM.Outlet;
const Link = ReactRouterDOM.Link;
const e = React.createElement;
export default class List2 extends React.Component {
    render() {




        return e('div', null, [
            e('h1', { key: 1, style: { color: 'red' } }, 'i am list2'),
            e(Outlet, { key: 2 })
        ])
    }
}
