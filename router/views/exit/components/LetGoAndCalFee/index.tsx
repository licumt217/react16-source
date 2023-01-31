import React from 'react'

import { Button } from 'antd'

import { Util } from '../../../../assets/js/Util'
import { letgo } from '../../../../api/local'
function LetGoAndCalFee({ callback }: { callback: any }) {


    const handleClick = () => {
        Util.confirm(`确认放行计费吗？`, () => {
            letgo().then(() => {
                Util.success('操作成功！')
                callback();
            }).catch(() => {
                callback();
            })

        })
    }


    return (
        <Button size='large' type='primary' onClick={handleClick}>放行计费</Button>
    )
}

export default LetGoAndCalFee;
