import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Space, Divider, Image } from 'antd'
import styles from './index.module.scss'
import No_Car_Img from '../../assets/images/common/no_car.png'
import PatchOutPark from './components/PatchOutPark'
import Lift from '../components/Lift'
import LetGoAndCalFee from './components/LetGoAndCalFee'
import SpecialLetgo from './components/SpecialLetgo'
import CashLetgo from './components/CashLetgo'
import ChangeLetgo from './components/ChangeLetgo'
import PatchInPark from '../components/PatchInPark'
import Match from './components/Match'
import Refresh from '../components/Refresh'
import Return from '../components/Return'
import InOutHeader from '../components/InOutHeader'
import ExitOrderDetail from './components/ExitOrderDetail'
import { getOrderExit, hangupExit } from '../../api/local'
import { Util } from '../../assets/js/Util'
import { ExitOrder } from '../../model'
import { Status } from './business'
import EmbedWrapper from '../../components/EmbedWrapper'
function Exit() {
    const [status, setStatus] = useState(Status.NO_CAR)
    const [order, setOrder] = useState<ExitOrder | null>(null)


    useEffect(() => {
        getOrder()
    }, [])


    const getOrder = () => {

        getOrderExit().then((res: any) => {
            let { CarOutFee, CarOutOperType } = res.result;

            setOrder(CarOutFee)
            setStatus(CarOutOperType)
        })

    }

    const lift = () => {
        hangupExit().then(() => {
            Util.success('操作成功')
            getOrder()
        })
    }

    return (
        <>
            <InOutHeader />
            <Card>
                <Row gutter={30}>
                    <Col span={13}>
                        <Image className={order?.PhotoUrl ? '' : styles['noImage']} preview={!!order?.PhotoUrl} src={order?.PhotoUrl || No_Car_Img} />
                    </Col>
                    <Col span={11} className={styles['info-wrapper']}>
                        <ExitOrderDetail order={order} status={status} />
                    </Col>
                </Row>

                <Divider />

                <Row className='mt1' justify='center' >
                    <Space size={24} wrap={true} >


                        <EmbedWrapper>
                            <Return />
                        </EmbedWrapper>

                        <Refresh callback={getOrder} />

                        {
                            status === Status.NO_CAR && <PatchOutPark callback={getOrder} />
                        }

                        {
                            status === Status.NO_AUTH && <LetGoAndCalFee callback={getOrder} />
                        }

                        {
                            status === Status.NO_ORDER && <>
                                <Match />
                                <PatchInPark callback={getOrder} type="exit" />
                            </>
                        }

                        {
                            (status === Status.HAS_ORDER || status === Status.HAS_ORDER_BLUR) && <>

                                <SpecialLetgo callback={getOrder} />
                                <CashLetgo callback={getOrder} />
                                <ChangeLetgo callback={getOrder} />

                                {
                                    status === Status.HAS_ORDER_BLUR && <>
                                        <Match />
                                        <PatchInPark callback={getOrder} type="exit" />
                                    </>
                                }
                            </>
                        }

                        {/* 出口抬杆就只是硬件上的抬杆，放行计费才是把无权限变为有权限 */}
                        <Lift callback={lift} />
                    </Space>
                </Row>
            </Card>
        </>
    )
}

export default Exit
