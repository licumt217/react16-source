'use strict';

const e = React.createElement;
const useState = React.useState;
const useTransition = React.useTransition;
const Fragment = React.Fragment;

const dom = document.getElementById("app")
const dom2 = document.getElementById("app2")

const root = ReactDOM.createRoot(dom)

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
        this.state = {
            age: 20
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let mmm = { ...prevState, ...nextProps };
        return mmm;
    }
    componentWillUnmount() {
    }
    handleClick = () => {
        this.setState({
            age: 10
        })
    }
    render() {
        // throw new Error("error!!!")
        // return e(MyContext.Consumer, null, function (contextValue) {
        //     return e('span', { style: { color: 'red' } }, contextValue)
        // });
        return e("span", {}, this.state.age);
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

const ForwardButton = React.forwardRef((props, ref) => {
    return e('input', { ref: ref, placeholder: '我是input，会自动聚焦！' })
})

function MyButton(props) {
    return e("button", null, props.age)
}
MyButton.defaultProps = {
    age: 18
}

class Modal extends React.Component {
    constructor (props) {
        super(props);
        this.el = document.createElement("div")
    }

    componentDidMount() {
        dom2.appendChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(e(MyButton), this.el)
    }
}


function MyFunctionComponent(props) {
    return props.age;
}

const MemoFunction = React.memo(MyFunctionComponent)

class MyClassTest extends React.PureComponent {
    constructor (props) {
        super(props)
        this.state = {
            age: 5,
            contextValue: 5,
            text: '点击我'
        }
        this.ref = React.createRef();
    }
    componentDidMount() {
        // this.forceUpdate();
        console.log("componentDidMount")
        var dom = ReactDOM.findDOMNode(this)
        // this.ref.current.focus();
    }
    componentDidUpdate() {
        console.log("componentDidUpdate")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    handleClick = () => {
        // let obj = this.state;
        // obj.age = 20;
        // this.state.age = 12;
        // this.forceUpdate();
        this.setState({
            age: 15,
            text: '点击我2'
        })
        // console.log(1)
    }

    render() {
        // return e(ForwardButton, { ref: this.ref });
        // return e(MyErrorBoundary, null, e(ChildClass));
        // return e(ChildClass, { age: this.state.age }, 111);
        // return React.createElement("span", null, true && true);
        // return e(
        //     'div',
        //     { onClick: this.handleClick },
        //     this.state.age
        // );
        return e("div", {}, e('button', { onClick: this.handleClick }, this.state.text), e(ChildClass, { age: this.state.age }))
    }
}



// let input = document.createElement("input");
// input.oninput = function (e) {
//     console.log(e.target.value)
//     e.target.value = 555;
//     return 555;
// }
// input.value = 555;
// document.body.appendChild(input)
// root.render(666);
// root.render(e('span', { style: { color: 'red' } }, 'xxx'));
// root.render(e('span', null, "xx"));
// root.render(e(React.Fragment, null, ""));
// root.render(e("div", { style: { color: 'red' } }, e("div", { style: { color: 'red' }, key: 1 }, 555)));
// root.render(e(ABC));
// root.render(e(Test));
// root.render([1, 2, 3]);
root.render(e(MyClassTest));






// root.render(e("input", { value: '111' }));

// ReactDOM.render(e('span', null, 'span'), dom2)
// setTimeout(() => {
//     ReactDOM.unmountComponentAtNode(dom2);
// }, 5000)








