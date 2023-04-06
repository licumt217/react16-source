import React from 'react';

export default class Child extends React.PureComponent {
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.name.startsWith('lxi')) {
    //         return false;
    //     }
    //     return true;
    // }
    render() {
        console.log('child render()')
        return <>
            <p>child</p>
            name:{this.props.name}
        </>
    }
}