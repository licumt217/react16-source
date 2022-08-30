'use strict';

const e = React.createElement;

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



const domContainer = document.querySelector('#app');
const ele = e('span', { style: { color: 'red' }, age: 18, name: 'liqiang' }, "i'm a span ", "i'm a span ");

function callbackOfReactDomRender() {
    console.log('done')
}
ReactDOM.render(ele, domContainer, callbackOfReactDomRender);
// ReactDOM.render(e(LikeButton), domContainer);