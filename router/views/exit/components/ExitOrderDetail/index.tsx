import React from 'react'
import DisplayInfoVertical from '../../../../components/DisplayInfoVertical'
import { Status } from '../../business'
import NoAuth from '../NoAuth'
import { ExitOrder } from '../../../../model'

export default function ExitOrderDetail({ order, status }: { order: ExitOrder | null, status: Status }) {
    return (
        <>
            <div>
                <DisplayInfoVertical label='车牌号' isBig={true} value={order?.PlateNum} />
                {
                    status === Status.NO_AUTH && <NoAuth />
                }

            </div>
            <div>
                <DisplayInfoVertical label='停放时长' value={order?.strTotolStayTime} />
            </div>
            <div>
                <DisplayInfoVertical label='进场时间' value={order?.strComeDateIn} />
            </div>
            <div>
                <DisplayInfoVertical label='出场时间' value={order?.strComeDateOut} />
            </div>
            <div>
                <DisplayInfoVertical label='车辆类型' value={order?.CardTypeName} />
            </div>
            <div>
                <DisplayInfoVertical label='停车费用' isBig={true} style={{color:'#ff0000'}} value={order?.Fee ? `${order.Fee} 元` : undefined} />
            </div>
            <div>
                <DisplayInfoVertical label='已支付' isBig={true} style={{color:'#02A7F0'}} value={order?.FeePaid ? `${order.FeePaid} 元` : undefined} />
            </div>
            <div>
                <DisplayInfoVertical label='优惠减免' isBig={true} style={order?.FeeFree && {color:'#02A7F0'}} value={order?.FeeFree ? `${order.FeeFree} 元` : undefined} />
            </div>
        </>
    )
}
