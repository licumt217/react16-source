import React from 'react'

import { Button } from 'antd'

import { useNavigate } from 'react-router-dom'


function Return() {

    const navigator = useNavigate();

    const back = () => {
        navigator(-1)
    }

    return (
        <Button size='large' onClick={() => { back() }} style={{ width: '96px' }}>返回</Button>
    )
}

export default Return
