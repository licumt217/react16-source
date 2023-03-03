'use strict';


const e = React.createElement;
const useState = React.useState;
const useReducer = React.useReducer;
const useTransition = React.useTransition;
const useDeferredValue = React.useDeferredValue;
const useEffect = React.useEffect;
const useId = React.useId;
const useRef = React.useRef;
const useImperativeHandle = React.useImperativeHandle
const useContext = React.useContext;
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
        return e(MyContext.Consumer, null, function (contextValue) {
            return e('span', { style: { color: 'red' } }, contextValue)
        });
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

    const theContext = useContext(MyContext)
    const [count, setCount] = useReducer(function (state, action) {
        if (action.type === 'add') {
            return 5;
        } else {
            return 10;
        }
    }, 0);
    // const id = useId()

    useEffect(() => {
        console.log("useEffect")
        return function () {
            console.log("destroy!");
        }
    }, [count])

    // useLayoutEffect(() => {
    //     console.log("useLayoutEffect")
    //     setCount(1)
    // }, [])


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
            theContext.setColor('yellow')
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
            // setCount(count + 1)
            setCount({ type: 'add' })
        }
    }, e('span', {}, `you clicked ${count} counts,color:${theContext.color}`))


}

function Hook2() {
    const [color, setColor] = useState('red')

    return e(MyContext.Provider, {
        value: {
            color,
            setColor
        }
    }, e(HookFunction))
}

const FancyInput = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => {
        debugger
        return {
            focus: () => {
                // 这里可以加自己的逻辑哦
                inputRef.current.focus();
            }
        }
    });

    return e('input', { ref: inputRef, type: 'text' })

});

const App = props => {
    const fancyInputRef = useRef();

    return (
        e('div', null, e(FancyInput, { ref: fancyInputRef }), e('button', { onClick: () => { fancyInputRef.current.focus() } }, '点击'))
    )
}

function MyD() {
    const [pending, start] = useTransition();
    const [name, setName] = useState("liqiang");
    // const deferredName = useDeferredValue(name);

    return e('div', null, e('span', {}, pending && '.................................'), e('span', { color: 'red' }, name), e('button', {
        onClick: () => {
            start(() => {
                debugger
                setName("qiangli")
            })
        }
    }, '点击'))
}



// root.render(e(Hook2));
root.render(e(MyD));








