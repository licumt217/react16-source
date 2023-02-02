const Outlet = ReactRouterDOM.Outlet;
const Link = ReactRouterDOM.Link;
const e = React.createElement;
export default class List1 extends React.Component {
    render() {


        return e('div', null, [
            e('h1', { key: 1, style: { color: 'red' } }, 'i am list1'),
            e(Outlet, { key: 2 })
        ])
    }
}
