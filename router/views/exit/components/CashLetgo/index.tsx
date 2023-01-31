import React from 'react'

import { Button } from 'antd'

import { Util } from '../../../../assets/js/Util';

import { cashPay } from '../../../../api/local'

function CashLetgo({ callback }: { callback: any }) {

    const onOk = () => {

        Util.confirm(`确认现金放行吗？`, () => {
            cashPay().then(() => {
                Util.success('操作成功！')
            }).finally(() => {
                callback();
            })
        })
    }

    return (
        <>
            <Button size='large' type='primary' onClick={onOk}> 现金放行</Button>
        </>
    )
}

export default CashLetgo
