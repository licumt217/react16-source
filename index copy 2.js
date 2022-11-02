'use strict';

const e = React.createElement;
const useState = React.useState;
const useTransition = React.useTransition;
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
            count: 5555
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



        return e('div', { onClick: this.handleClick }, this.state.count);
    }
}
class DD extends React.Component {
    render() {
        return e('span', null, 'span111,,,')
    }
}
for (let i = 0; i < 3; i++) {
    arr.push(e(LikeButton))
}
for (let i = 0; i < 4; i++) {
    arr2.push(e(DD))
}

const list = [];
for (let i = 0; i < 18500; i++) {
    list.push(e('div', {}, e('p', {}, e('span', { style: { color: 'red', border: '2px solid green', height: '20px' } }, Math.random()))))
}

const list2 = [];
for (let i = 0; i < 18500; i++) {
    list2.push(e('div', {}, e('p', {}, e('span', { style: { color: 'red', border: '2px solid green', height: '20px' } }, Math.random()))))
}

function ABC() {

    const [age, setAge] = useState(18);
    const [name, setName] = useState("liqiang");
    const [showList, setShowList] = useState(["list1", "list2", "list3"]);
    // const [isPending, startTransition] = useTransition()


    const handleClick = () => {
        setAge(22)
    }
    const changeInput = (event) => {
        const value = event.target.value;
        setValue(value)

        // let ar = [];
        // for (let i = 0; i < list.length; i++) {
        //     if (String(list[i]).includes(value)) {
        //         ar.push(e('p', { style: { color: 'red', border: '2px solid green', height: '20px' } }, list[i]))
        //     }
        // }
        startTransition(() => {
            setShowList(list === showList ? list2 : list)
        })


    }



    return e('div', { onClick: handleClick }, ...showList, e('p', {}, age), e('p', {}, name))
}



// ReactDOM.render(e(ABC), document.getElementById("app"));
root.render(e(ABC));








