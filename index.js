'use strict';

const e = React.createElement;

const Fragment = React.Fragment;

class LikeButton extends React.Component {
    constructor (props) {
        super(props);
        this.state = { liked: false };
    }

    render() {


        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
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
// const ele = e('span', { style: { color: 'red' }, age: 18, name: 'liqiang' }, "i'm a span ", "i'm a span ");
// const ele = e(hone)
// const ele = e(hone)

function callbackOfReactDomRender() {
    console.log('done')
}
ReactDOM.render(myTest, domContainer, callbackOfReactDomRender);
// ReactDOM.render(e(LikeButton), domContainer);