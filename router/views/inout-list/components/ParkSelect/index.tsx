import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Select } from 'antd'
import styles from './index.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setParkId, setParkName } from '../../../../store/slice/business'
import { selectAuthPark } from '../../../../api/cloud'

const { Option } = Select


export default function ParkSelect({ onParkChange }: { onParkChange: any }) {

    const dispatch = useDispatch();

    const parkId = useSelector((state: any) => {
        return state.business.parkId;
    })

    const [parkList, setParkList] = useState<Array<any>>([]);

    useEffect(() => {
        getParkList();
        if (parkId) {
            onParkChange(parkId)
        }
    }, [])

    const getParkList = () => {
        selectAuthPark().then((data: any) => {
            setParkList(data.parkList)
        })

    }

    const handleParkChange = (parkId: string, option: any) => {

        const { key: parkName } = option;

        dispatch(setParkId(parkId))
        dispatch(setParkName(parkName))

        onParkChange(parkId)
    }

    return (
        <Form name="control-hooks"
            className={styles['park-select']}
            initialValues={{
                parkId: parkId || undefined
            }}
        >
            <Row>
                <Col span={8} lg={{ span: 4 }}>
                    <Form.Item name="parkId" label="车场选择" >
                        <Select
                            placeholder="请选择停车场"
                            onChange={handleParkChange}
                        >
                            {
                                parkList.map(item => (
                                    <Option value={item.pmParkId} key={item.parkName}>{item.parkName}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    )
}
