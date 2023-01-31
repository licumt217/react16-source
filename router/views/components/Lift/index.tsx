import React from 'react'

import { Button } from 'antd'

import { Util } from '../../../assets/js/Util'

function Lift({ callback }: { callback: any }) {


    const lift = () => {
        Util.confirm(`确认抬杆吗？`, () => {
            callback();
        })
    }


    return (
        <Button size='large' type='primary' style={{ width: '96px' }} onClick={lift}>抬杆</Button>
    )
}

export default Lift;
