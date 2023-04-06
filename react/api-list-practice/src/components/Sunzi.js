import MyContext from '../my-context'
import React from 'react'
import RefInput from './RefInput'
import logProps from './high/logProps'

class Sunzi extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: 'li'
        }
        this.genError = this.genError.bind(this)
        this.ref = React.createRef();
    }
    genError() {
        this.ref.current.focus();
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        // console.log(JSON.parse("fljsfls")) 触发错误边界
        return <>

            <RefInput ref={this.ref}></RefInput>
            <input type='button' value="error" onClick={this.genError}></input>
            <MyContext.Consumer>
                {
                    value => {
                        return <p>age is :{value}</p>
                    }
                }
            </MyContext.Consumer>
        </>
    }
}
Sunzi.contextType = MyContext;

export default logProps(Sunzi);