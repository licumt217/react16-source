import React, { useState } from 'react'
import { Button, Modal, Row, Col, Card } from 'antd'

import DisplayInfoVertical from '../../../../components/DisplayInfoVertical';
import { getOwnerInfo } from '../../../../api/local'
import { Util } from '../../../../assets/js/Util';

function OwnerInfo({ PlateNum }: { PlateNum: string }) {

    const [visible, setVisible] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>({})

    const getInfo = () => {
        getOwnerInfo({
            PlateNum
        }).then((res: any) => {
            setUserInfo(res.result)
        })
    }


    const show = () => {
        if (!PlateNum) {
            Util.warn(`车牌号为空！`);
            return;
        }
        getInfo();
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <>
            <Button size='large' type='primary' onClick={show}> 车主信息</Button>

            <Modal title="车主信息" visible={visible} onCancel={hide} width={500} footer={[
                <Button key="back" onClick={hide}> 关闭</Button>
            ]}>

                <Row>
                    <Col span={12}>
                        <DisplayInfoVertical label='客户姓名' value={userInfo.CustomerName} noValueSymbol="--" />

                    </Col>
                    <Col span={12}>
                        <DisplayInfoVertical label='手机号' value={userInfo.CustomerTel} noValueSymbol="--" />

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DisplayInfoVertical label='备注' value={userInfo.remark} noValueSymbol="--" />

                    </Col>
                </Row>

                <p style={{ color: 'gray' }}>
                    客户所有车辆
                </p>

                {
                    (userInfo.CusPlates && userInfo.CusPlates.length > 0) ? userInfo.CusPlates.map((item: any, index: number) => {
                        return (
                            <Card key={index} className="mt1">
                                <Row>
                                    <Col span={7}>
                                        <DisplayInfoVertical label='车牌号' value={item.PlateNum} noValueSymbol="--" />
                                    </Col>
                                    <Col span={7}>
                                        <DisplayInfoVertical label='在场状态' value={item.IsInPark ? '在场' : '未进场'} noValueSymbol="--" />
                                    </Col>
                                    <Col span={10}>
                                        <DisplayInfoVertical label='进场时间' value={item.StrDateIn} noValueSymbol="--" />
                                    </Col>
                                </Row>
                            </Card>
                        )
                    }) : '--'
                }

            </Modal>
        </>
    )
}

export default OwnerInfo
