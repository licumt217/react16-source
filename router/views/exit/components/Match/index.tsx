import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

function Match() {

    const navigator = useNavigate();

    const go2ManualMatch = () => {
        navigator('/manualMatch')
    }

    return (
        <>
            <Button size='large' type='primary' onClick={go2ManualMatch}> 手动匹配</Button>

        </>
    )
}

export default Match
