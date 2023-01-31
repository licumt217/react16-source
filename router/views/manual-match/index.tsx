import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Row, Col, Card, Button, Form, Input, Empty, } from 'antd'
import { Util } from '../../assets/js/Util'
import InOutHeader from '../components/InOutHeader'
import Return from '../components/Return'
import CusPagination from '../components/CusPagination'
import OrderCard from './components/OrderCard'
import { getCarsInPark } from '../../api/local'

interface Order {
    PlateNum: string,
    PlateNumColor: string,
    CarLogId: string,
    strComeDateIn: string,
    PhotoUrl: string,
}

function ManualMatch() {

    const [form] = Form.useForm();
    const navigator = useNavigate();

    const [total, setTotal] = useState(0)
    const [PageNumber, setPageNumber] = useState(1)
    const [PageSize, setPageSize] = useState(6)
    const [orderList, setOrderList] = useState<Array<Order>>([])

    const getPlateNum = () => {
        return form.getFieldValue("PlateNum") || ""
    }

    const getOrderList = (pageNumber: number, pageSize: number) => {
        getCarsInPark({
            PlateNum: getPlateNum(),
            PageNumber: pageNumber,
            PageSize: pageSize
        }).then((res: any) => {
            setOrderList(res.result.data)
            setTotal(res.result.pager.TotalRows)

        })
    }

    const handleSearch = (isBlankCar?: boolean) => {
        if (isBlankCar) {
            form.resetFields();
        } else {
            if (!getPlateNum()) {
                Util.warn("至少输入一位车牌号！")
                return;
            }
        }
        getOrderList(PageNumber, PageSize)
    }

    const back = () => {
        navigator(-1)
    }


    const handlePageChange = (page: number, pageSize: number) => {
        setPageNumber(page)
        setPageSize(pageSize)
        getOrderList(page, pageSize)
    }


    return (
        <>
            <InOutHeader />

            < Card >
                <Form
                    form={form}
                    style={{ padding: '10px', marginBottom: '15px', width: '100%' }}
                    layout='inline'
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    size='large'
                >
                    <Form.Item label="车牌号" name="PlateNum">
                        <Input maxLength={8} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" onClick={() => { handleSearch() }}>
                            查找匹配
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" onClick={() => { handleSearch(true) }}>
                            查找无牌车
                        </Button>
                    </Form.Item>
                </Form>


                <Row gutter={16} align={orderList.length === 0?'middle':'top'} style={{ minHeight: '300px' }}>
                    {
                        orderList.length === 0 && <>
                            <Col span={24} >
                                <Empty/>
                            </Col>
                        </>
                    }

                    {
                        orderList.map((order, index) => {
                            return (
                                <Col span={8} lg={{ span: 4 }} key={index} className='mb1'>
                                    <OrderCard
                                        PhotoUrl={order.PhotoUrl}
                                        PlateNum={order.PlateNum}
                                        strComeDateIn={order.strComeDateIn}
                                        CarLogId={order.CarLogId}
                                        callback={back} />
                                </Col>
                            )
                        })
                    }

                </Row>

                <CusPagination total={total} defaultCurrent={PageNumber} defaultPageSize={PageSize} onChange={handlePageChange} />

                <div className='mt2' >
                    <Return />
                </div>
            </Card>
        </>
    )
}

export default ManualMatch
