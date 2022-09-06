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


class LikeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick = () => {
        console.log('------')
        console.log(this.state.count)
        this.setState({ count: this.state.count + 1 })
        this.setState({ count: this.state.count + 2 })

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



        return e('div',
            { style: { color: 'red' } },
            e('button', { onClick: this.handleClick, style: { color: 'green' } }, 'Like'), e('span', {}, this.state.count), this.state.count
        )
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