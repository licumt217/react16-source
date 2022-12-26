'use strict';

const e = React.createElement;
const useState = React.useState;
const useTransition = React.useTransition;
const Fragment = React.Fragment;



const root = ReactDOM.createRoot(document.getElementById("app"))

const arr = []
const arr2 = []




function ABC() {

    const [age, setAge] = useState(18);
    const [name, setName] = useState("liqiang");
    const [showList, setShowList] = useState(["list1", "list2", "list3"]);
    const [isPending, startTransition] = useTransition();

    let list = [];
    for (let i = 0; i < 10000; i++) {
        list.push(e("div", { style: { color: 'red' }, key: i }, 555))
    }

    const handleClick = () => {
        startTransition(() => {
            setShowList(list)
        })
    }



    return e('div', { onClick: handleClick, style: { color: 'red' } }, isPending && "xxxxxx...", ...showList)
}

let arr3 = [];
for (let i = 0; i < 100000; i++) {
    arr3.push(e("div", { style: { color: 'red' }, key: i }, 555 + ":" + i))
}

root.render(666);
// root.render(e("div", { style: { color: 'red' } }, e("div", { style: { color: 'red' }, key: 1 }, 555)));
// root.render(e(ABC));








