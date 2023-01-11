'use strict';


const e = React.createElement;
const useState = React.useState;
const useReducer = React.useReducer;
const useTransition = React.useTransition;
const useEffect = React.useEffect;
const useLayoutEffect = React.useLayoutEffect;
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
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // debugger
    //     let mmm = { ...prevState, ...nextProps };
    //     return prevState;
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     debugger
    //     let nP = this.props;
    //     let nS = this.state;
    //     return false;
    // }
    componentWillUnmount() {
    }
    handleClick = () => {
        console.log(this.state.age)
        ReactDOM.flushSync(
            () => {
                this.setState({
                    age: this.state.age + 1
                })


            }
        );

        console.log(this.state.age)

        ReactDOM.flushSync(
            () => {
                this.setState({
                    age: this.state.age + 1
                })
            }
        );

        console.log(this.state.age)
        // this.setState({
        //     age: this.state.age + 1
        // })

    }
    render() {
        // throw new Error("error!!!")
        // return e(MyContext.Consumer, null, function (contextValue) {
        //     return e('span', { style: { color: 'red' } }, contextValue)
        // });
        // return e("span", { onClick: this.handleClick }, this.state.age);
        return e("div", {
        }, '<b style="color:red;">222</b>First <script>console.log(1)</script> Second');
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
        // return;
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

function HookFunction() {
    const [count, setCount] = useState(0);

    // useEffect(() => {
    //     console.log("useEffect")
    //     setCount(1)
    // }, [])

    useLayoutEffect(() => {
        console.log("useLayoutEffect")
        setCount(1)
    }, [])


    // const [count, dispatch] = useReducer((state, action) => {
    //     if (action.type === 'add') {
    //         return state + 1;
    //     } else if (action.type === 'jian') {
    //         return state - 1;
    //     } else {
    //         return state;
    //     }
    // }, 0);


    return e('div', {
        onClick: () => {
            // setCount((state) => {
            //     return state + 1;
            // })
            // setCount((state) => {
            //     return state + 1;
            // })
            // setCount((state) => {
            //     return state + 3;
            // })
            // setCount(count + 1)
            // setCount(count + 2)
            // setCount(count + 3)
            // setCount(count + 999)
            setCount(count + 1)
        }
    }, e('span', {}, `you clicked ${count} counts`))
}


root.render(e(HookFunction));








