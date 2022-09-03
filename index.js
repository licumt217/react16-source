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
        this.state = { liked: false };
    }

    render() {


        // if (this.state.liked) {
        //     return 'You liked this.';
        // }



        return e('div', { style: { color: 'red' } }, e(
            'button',
            // { onClick: () => alert(1) },
            { onClick: () => this.setState({ liked: !this.state.liked }), style: { color: 'green' } },
            'Like'
        ), this.state.liked ? "like" : "not like")
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