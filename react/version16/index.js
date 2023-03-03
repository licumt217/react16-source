'use strict';

const e = React.createElement;

const Fragment = React.Fragment;


let child = function () {
    return "child :" + Math.random() + e('span', {}, 'xxxx');
}

let arr = [];
for (let i = 0; i < 50; i++) {
    arr.push(e(child))
}

let parkList = [
    {
        id: "1001",
        name: '车场1',
        color: '1'
    },
    // {
    //     id: "1002",
    //     name: '车场2',
    //     color: '1'
    // },
    // {
    //     id: "1003",
    //     name: '车场3',
    //     color: '1'
    // },
    // {
    //     id: "1004",
    //     name: '车场4',
    //     color: '1'
    // },
    // {
    //     id: "1005",
    //     name: '车场5',
    //     color: '1'
    // },
]

class LikeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = { parkList: parkList, count: 1, date: new Date() };
    }


    shouldComponentUpdate() {
        return false;
    }
    static getDerivedStateFromProps() {
        return {
            count: 5
        }
    }

    componentDidMount() {
        console.log(1)
        this.timer = setInterval(() => {
            this.tick();
        }, 1000)
        console.log(2)
    }
    componentDidUpdate() {
        console.log('update')
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    tick = () => {
        this.setState({
            date: new Date()
        })
    }
    aaa() {

    }

    handleClick = () => {
        // console.log('------')
        // this.setState({ count: 2 })
        // return;
        this.setState({
            parkList: [
                {
                    id: "1001",
                    name: '车场1',
                    color: '1'
                },
                {
                    id: "1003",
                    name: '车场3',
                    color: '1'
                },
                {
                    id: "1002",
                    name: '车场2',
                    color: '1'
                },

                {
                    id: "1004",
                    name: '车场4',
                    color: 'xxxxx'
                },

            ]
        })

        // setTimeout(() => {
        //     this.setState({ count: 5 })
        //     console.log(":" + this.state.count)
        // })

        console.log(this.state.count)
    }
    render() {


        // if (this.state.liked) {
        //     return 'You liked this.';
        // }



        // return e('div', { onClick: this.handleClick }, e('span', {}, 1), this.state.count);
        // return this.state.count

        return e('div', { onClick: this.handleClick }, this.state.parkList.map((item, index) => {
            return e("span", { key: item.id, color: item.color }, this.state.date.toLocaleTimeString(), this.state.count);
        }));
    }
}

function DisplayInfoVertical({ label, value, noValueSymbol = "-" }) {



    const divProps = {
        style: {
            display: 'inline-block',
            width: '300px'
        }
    };

    const pProps = {
        style: {
            marginBottom: '0.1em',
            color: 'gray'
        }
    };

    let child1 = e("p", pProps, label);

    let child2 = e("p", null, value || noValueSymbol);

    return e("div", divProps, child1, child2);
}

const child1 = e(DisplayInfoVertical, {
    label: "姓名",
    value: "liqiang"
});


const child2 = e(DisplayInfoVertical, {
    label: "年龄",
    value: 18
});

const child3 = e(DisplayInfoVertical, {
    label: "籍贯"
});
const myTest = e(Fragment, null, child1, child2, child3);





const domContainer = document.querySelector('#app');
const ele = e('span', { onClick: () => { alert(1) } }, "点击我！！！");
// const ele = e(hone)
// const ele = e(hone)

function callbackOfReactDomRender() {
    console.log('done')
}

const root2 = document.getElementById('app2')

const ThemeContext = React.createContext('red')

function Child(props) {
    return e(ThemeContext.Consumer, {}, (value) => {
        return e("span", {
            style: {
                color: value
            }
        }, 99999);
    })


}

class Modal extends React.Component {
    constructor (props) {
        super(props)
        this.el = document.createElement('div');
    }

    componentDidMount() {
        root2.appendChild(this.el)
    }

    componentWillUnmount() {
        root2.removeChild(this.el)
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

const FancyInput = React.forwardRef((props, ref) => {
    return e('input', { ref: ref, style: { color: 'red', width: '200px', height: '50px', border: '1px solid green' }, placeholder: "请输入。。。" });
})

// class Child extends React.Component {
//     static contextType = ThemeContext;
//     render() {
//         return e("span", {
//             style: {
//                 color: this.context
//             }
//         }, 99999);
//     }

// }

class ABC extends React.Component {
    constructor () {
        super();
        this.state = {
            label: 'li',
            count: 1
        };
        this.handleClick = this.handleClick.bind(this)
        this.inputRef = React.createRef();
    }

    handleClick() {
        this.setState({
            count: 2
        })
    }
    componentDidMount() {
        setTimeout(() => {
            this.inputRef.current.focus()
        }, 7000)
    }
    render() {



        // return e(FancyInput, { ref: this.inputRef })
        return e(Modal, {}, '我是modal')


        // return e(ThemeContext.Provider, { value: 'green' }, e("div", { onClick: this.handleClick }, "my name is ", e(Child, {
        //     label: this.state.label
        // })))
    }

}


// ReactDOM.render(ele, domContainer, callbackOfReactDomRender);
ReactDOM.render(e(ABC), domContainer);






