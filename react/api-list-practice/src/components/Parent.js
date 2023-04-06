import React from 'react';
import Child from './Child';
export default class Parent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'liq'
        }
    }
    handle = () => {
        this.setState({
            name: this.state.name + 1
        })
    }
    render() {
        return <>
            <p onClick={this.handle}>parent</p>
            <Child name={this.state.name} />
        </>
    }
}