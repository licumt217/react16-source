
const e = React.createElement;
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const useParams = ReactRouterDOM.useParams;
const useSearchParams = ReactRouterDOM.useSearchParams;
import List from "../list/index.js";


export default function Detail() {
    const style = {
        display: 'block',
        marginBottom: '1em'
    }
    const [search, setSearch] = useSearchParams();
    const { itemId } = useParams();
    const age = search.get("age")
    const name = search.get("name")
    return e("div", null, '明细信息', [
        e(Link, { key: 1, to: 'new1', style }, '新建条目'),
        e(Link, { key: 2, to: '../../../new1', style }, '新建条目直接new'),
        e(Link, { key: 3, to: 'detail2', style }, '查看detail2明细'),
        e(Link, { key: 4, to: 'detail3', style }, '查看detail3明细'),
    ])
}
