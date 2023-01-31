import React from 'react'

import { Button } from 'antd'


function Refresh({ callback }: { callback: any }) {

    return (
        <>
            <Button size='large' type='primary' style={{ width: '96px' }} onClick={() => { callback() }}>刷新</Button>
        </>
    )
}

export default Refresh
