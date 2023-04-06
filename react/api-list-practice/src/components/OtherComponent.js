import React from 'react'
import Sunzi from './Sunzi'
import MyErrorBoundary from './MyErrorBoundary'
export default class OtherComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'liqiang'
        }
        this.doClick = this.doClick.bind(this);
    }
    doClick() {
        this.setState({
            name: 'qiangli...'
        })
    }
    render() {
        return <>
            <p onClick={this.doClick}>OtherComponent</p>
            <MyErrorBoundary>
                <Sunzi name={this.state.name}></Sunzi>
            </MyErrorBoundary>

        </>
    }
}