import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Space, Divider, Image } from 'antd'
import styles from './index.module.scss'
import Refresh from '../components/Refresh'
import Return from '../components/Return'
import Lift from '../components/Lift'
import PatchInPark from '../components/PatchInPark'
import No_Car_Img from '../../assets/images/common/no_car.png'
import InOutHeader from '../components/InOutHeader'
import { getOrderEntrance, hangupEntrance } from '../../api/local'
import { Util } from '../../assets/js/Util'
import EntranceOrderDetail from './components/EntranceOrderDetail'
import { EntranceOrder } from '../../model'
import EmbedWrapper from '../../components/EmbedWrapper'

function Entrance() {

    const [order, setOrder] = useState<EntranceOrder | null>(null)

    useEffect(() => {
        getOrder()
    }, [])

    const getOrder = () => {
        getOrderEntrance().then((res: any) => {
            setOrder(res.result.CarInOrder)
        })
    }

    const lift = () => {
        hangupEntrance().then(() => {
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
                        <EntranceOrderDetail order={order} />
                    </Col>
                </Row>

                <Divider />
                <Row className='mt2' justify='center'>

                    <Col>
                        <Space size='middle'>
                            <EmbedWrapper>
                                <Return />
                            </EmbedWrapper>

                            <Refresh callback={getOrder} />
                            {
                                !order && <PatchInPark callback={getOrder} type="entrance" />
                            }
                            <Lift callback={lift} />
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Entrance
