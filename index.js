'use strict';

const e = React.createElement;

const Fragment = React.Fragment;

const root = ReactDOM.createRoot(document.getElementById("app"))
const arr = []
const arr2 = []


class LikeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
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

            ], count: 1, date: new Date()
        };
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
        // this.timer = setInterval(() => {
        //     this.tick();
        // }, 1000)
    }
    componentDidUpdate() {
        // console.log('update')
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


    }
    render() {



        return e('div', { onClick: this.handleClick }, this.state.parkList.map((item, index) => {
            return e("span", { key: item.id, color: item.color }, this.state.date.toLocaleTimeString(), this.state.count);
        }));
    }
}
class DD extends React.Component {
    render() {
        return e('span', null, 'span111,,,')
    }
}
for (let i = 0; i < 30000; i++) {
    arr.push(e(LikeButton))
}
for (let i = 0; i < 40000; i++) {
    arr2.push(e(DD))
}
class ABC extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            todos: arr
        }
    }

    handleC = () => {
        this.setState({
            todos: arr2
        })
    }


    render() {
        return e('div', { onClick: this.handleC }, ...this.state.todos)
    }
}



// ReactDOM.render(e(ABC), document.getElementById("app"));
root.render(e(ABC));








