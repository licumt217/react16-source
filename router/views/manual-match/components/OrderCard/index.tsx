import React from 'react'
import { Card, Row, Col, Button, Image } from 'antd'
import NoImg from './no_img.png'
import { manualPatch } from '../../../../api/local'
import { Util } from '../../../../assets/js/Util'
export default function OrderCard({ PhotoUrl, PlateNum, strComeDateIn, CarLogId, callback }
    : { PhotoUrl: string, PlateNum: string, strComeDateIn: string, CarLogId: string, callback: any }) {


    const match = () => {
        Util.confirm("确定匹配当前订单？", () => {
            manualPatch({
                CarLogId
            }).then(() => {
                Util.success("匹配成功！");
                callback();
            })
        })
    }


    return (
        <Card >
            <div>
                {/* <img src={PhotoUrl || NoImg} className='w100p' /> */}
                <Image className='w100p' height={166} preview={!!PhotoUrl} src={PhotoUrl || NoImg} />
            </div>
            <Row className='mt1' align='middle'>
                <Col span={16} style={{ fontSize: '12px' }}>
                    {
                        PlateNum && <div>{PlateNum}</div>
                    }
                    <div>{strComeDateIn}</div>
                </Col>
                <Col span={8}>
                    <Button size='small' type='primary' ghost onClick={match}>订单匹配</Button>
                </Col>
            </Row>
        </Card>
    )
}
