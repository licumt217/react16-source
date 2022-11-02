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
    // const [isPending, startTransition] = useTransition()


    const handleClick = () => {
        setAge(22)
    }



    return e('div', { onClick: handleClick, style: { color: 'red' } }, ...showList, e('p', {}, age), e('p', {}, name))
}



root.render(e("div", { style: { color: 'red' } }, 555));
// root.render(e(ABC));








