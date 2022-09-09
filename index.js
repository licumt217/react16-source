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
    {
        id: "1002",
        name: '车场2',
        color: '1'
    },
    {
        id: "1003",
        name: '车场3',
        color: '1'
    },
    {
        id: "1004",
        name: '车场4',
        color: '1'
    },
    {
        id: "1005",
        name: '车场5',
        color: '1'
    },
]

class LikeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = { parkList: parkList, count: 1 };
    }

    componentDidMount() {
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
            return e("span", { key: item.id, color: item.color }, item.name);
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



// ReactDOM.render(ele, domContainer, callbackOfReactDomRender);
ReactDOM.render(e(LikeButton), domContainer);