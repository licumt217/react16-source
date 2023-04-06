import React from 'react'
import OtherComponent from './components/OtherComponent'
import MyContext from './my-context'
import Parent from './components/Parent'
class Clock extends React.Component {
    componentDidMount() {

    }
    render() {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}>
                        <MyContext.Provider value="6" >
                            <OtherComponent />
                        </MyContext.Provider >
                    </div>
                    <div style={{ flex: 1 }}>
                        <Parent />
                    </div>
                    <div style={{ flex: 1 }}>
                        2
                    </div>
                </div>
            </>
        )
    }
}
export default Clock;