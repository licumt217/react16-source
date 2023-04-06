import React from 'react'
const RefInput = React.forwardRef((props, ref) => {
    return <input ref={ref}></input>
})

export default RefInput;