'use strict';

const e = React.createElement;
const useState = React.useState;
const useTransition = React.useTransition;
const Fragment = React.Fragment;



const root = ReactDOM.createRoot(document.getElementById("app"))

const arr = []
const arr2 = []

const MyContext = React.createContext();


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




class GrandChildClass extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return e("span", null, "childClass:" + this.props.age + ":" + this.props.c);
    }
}

class ChildClass extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        throw new Error("error!!!")
        // return e(MyContext.Consumer, null, function (contextValue) {
        //     return e('span', { style: { color: 'red' } }, contextValue)
        // });
        return e("span", null, "ChildClass");
    }
}

// ChildClass.contextType = MyContext;

class MyErrorBoundary extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(error, errorInfo) {
        console.log("componentDidCatch", error, errorInfo)
    }

    static getDerivedStateFromError(error) {
        console.log("getDerivedStateFromError", error)
        return {
            hasError: true
        }
    }

    render() {
        if (this.state.hasError) {
            return e("h1", null, "something is wrong!");

        }
        return this.props.children;
    }


}

class MyClassTest extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            age: 12,
            contextValue: 10
        }
    }
    componentDidMount() {
        console.log("componentDidMount")
    }
    componentDidUpdate() {
        console.log("componentDidUpdate")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
    handleClick = () => {
        // let obj = this.state;
        // obj.age = 20;
        this.setState({
            contextValue: 12
        })
    }
    render() {
        return e(MyErrorBoundary, null, e(ChildClass));
        // return e(ChildClass, { age: this.state.age }, 111);
        // return React.createElement("span", null, true && true);
        // return e(
        //     'button',
        //     { onClick: this.handleClick },
        //     this.state.age
        // );
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








