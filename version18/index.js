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
        // startTransition(() => {
        // setShowList(list)
        // })
        setAge(20)
    }



    // return e('div', { onClick: handleClick, style: { color: 'red' } }, isPending && "xxxxxx...", ...showList)
    return e('div', { onClick: handleClick, style: { color: 'red' } }, age)
}

function Test() {
    return e('span', { style: { color: 'red' } }, 'xxxA')
}

let arr3 = [];
for (let i = 0; i < 100000; i++) {
    // arr3.push(e("div", { style: { color: 'red' }, key: i }, 555 + ":" + i))
}

let arr1 = [1, 2, 3].map(item => {
    return e("span", null, item);
});

class MyClassTest extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            myText: [1, 2].map(item => {
                return e("span", { key: item }, item);
            }),
            age: 18
        }
    }
    handleClick() {
        this.setState({
            age: this.state.age + 1,
            name: 1
        })


        this.setState({
            age: this.state.age + 1,
            name: 2
        })


        // this.setState((age) => {
        //     return age + 1;
        // })

    }
    render() {
        return e(
            'button',
            { onClick: () => this.handleClick() },
            this.state.age
        );
    }
}

// root.render(666);
// root.render(e('span', { style: { color: 'red' } }, 'xxx'));
// root.render(e('span', null, "xx"));
// root.render(e(React.Fragment, null, ""));
// root.render(e("div", { style: { color: 'red' } }, e("div", { style: { color: 'red' }, key: 1 }, 555)));
// root.render(e(ABC));
// root.render(e(Test));
// root.render([1, 2, 3]);
root.render(e(MyClassTest));








