const Outlet = ReactRouterDOM.Outlet;
const Link = ReactRouterDOM.Link;
const e = React.createElement;
export default class List extends React.Component {
    render() {



        return e('div', null, [
            e('h1', { key: 1, style: { color: 'red' } }, 'i am list'),
            e('div', { key: 3 }, [

            ]),
            e(Outlet, { key: 2 })
        ])
    }
}
