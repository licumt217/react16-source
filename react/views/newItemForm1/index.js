
const e = React.createElement;
const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const useSearchParams = ReactRouterDOM.useSearchParams;
import List from "../list/index.js";


export default function NewItemForm1() {
    const [search, setSearch] = useSearchParams();
    const age = search.get("age")
    const name = search.get("name")
    return `newItemForm1`
}
