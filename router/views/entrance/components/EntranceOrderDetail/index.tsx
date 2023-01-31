import React from 'react'
import { EntranceOrder } from '../../../../model'
import DisplayInfoVertical from '../../../../components/DisplayInfoVertical'
export default function EntranceOrderDetail({ order }: { order: EntranceOrder | null }) {
    return (
        <>
            <div>
                <DisplayInfoVertical isBig={true} label='车牌号' value={order?.PlateNum} />
            </div>
            <div>
                <DisplayInfoVertical label='进场时间' value={order?.DateIn} />
            </div>
            <div>
                <DisplayInfoVertical label='车辆类型' value={order?.CardTypeName} />
            </div>
            <div>
                <DisplayInfoVertical label='卡号' value={order?.CardNum} />
            </div>
            <div>
                <DisplayInfoVertical label='客户名称' value={order?.CustomerNickName} />
            </div>
            <div>
                <DisplayInfoVertical label='用户组' value={order?.CustomerGroupName} />
            </div>
        </>
    )
}
