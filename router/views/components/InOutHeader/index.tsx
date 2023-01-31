import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'antd'
import DisplayInfoVertical from '../../../components/DisplayInfoVertical'
import { useSelector } from 'react-redux'
import { viewParkExitSchedule } from '../../../api/cloud'
import { ExitLocalTypeMap } from '../../../components/Constants'

function InOutHeader() {

    const exitId = useSelector((state: any) => {
        return state.business.exitId;
    })


    const [detail, setDetail] = useState<any>({})

    useEffect(() => {
        getDetail()

    }, [])

    const getDetail = () => {

        viewParkExitSchedule({ pmParkExitId: exitId }).then((res: any) => {
            setDetail(res.exitSchedule)
        })




    }

    return (
        <>
            <Card>
                <Row >
                    <Col span={5}>
                        <DisplayInfoVertical label='车场名称' value={detail.parkName} />
                    </Col>
                    <Col span={5}>
                        <DisplayInfoVertical label='出入口名称' value={detail.exitNo} />
                    </Col>
                    <Col span={5}>
                        <DisplayInfoVertical label='车道编码' value={detail.exitCode} />
                    </Col>
                    <Col span={4}>
                        <DisplayInfoVertical label='车道类型' value={ExitLocalTypeMap[detail.exitLocalType]} />
                    </Col>
                    <Col span={5}>
                        <DisplayInfoVertical label='值班开始时间' value={detail.scheduleStartDt} />
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default InOutHeader
