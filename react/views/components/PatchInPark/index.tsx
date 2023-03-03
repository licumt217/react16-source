import React, { useState, useEffect } from 'react'

import { Button, Modal, Form, Input, Select, DatePicker, message } from 'antd'
import { useSelector } from 'react-redux'
import DateUtil from '../../../assets/js/DateUtil';

import { patchInEntrance, patchInExit } from '../../../api/local'
import { getInParkExit } from '../../../api/cloud'

import CarColorSelectFormItem from '../CarColorSelectFormItem';



const { Option } = Select;

function PatchInPark({ callback, type }: { callback: any, type: string }) {

    const pmParkId = useSelector((state: any) => {
        return state.business.parkId;
    })

    const [form] = Form.useForm();

    const [visible, setVisible] = useState<boolean>(false)
    const [entranceList, setEntranceList] = useState<Array<any>>([])

    useEffect(() => {

        getInParkExit({ pmParkId }).then((res: any) => {
            setEntranceList(res.exitList)
        })

    }, [])

    const isExit = () => {
        return type === 'exit'
    }

    const onOk = () => {
        form.validateFields().then((res) => {
            res.DateIn = DateUtil.transMoment2String(res.DateIn)

            let method: any = patchInEntrance;
            if (isExit()) {
                method = patchInExit;
            }

            method(res).then(() => {
                message.success("补录成功！")
                hide();
            })
        });
    }

    const show = () => {
        form.resetFields();
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
        callback()
    }

    return (
        <>
            <Button size='large' type='primary' onClick={show}> 补录进场</Button>

            <Modal title="补录进场" visible={visible} onOk={onOk} onCancel={hide} width={400}>

                <Form layout='vertical' form={form}>

                    {
                        isExit() && (
                            <Form.Item name="entranceId" label="车场进口" rules={[{ required: true, message: '请选择车场进口' }]}>
                                <Select
                                    placeholder="请选择车场进口"
                                >
                                    {
                                        entranceList.map(item => (
                                            <Option value={item.pmParkExitId} key={item.pmParkExitId}>{item.exitNo}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        )
                    }

                    <Form.Item label="车牌号" name="PlateNum" rules={[{ required: true }]}>
                        <Input maxLength={8} placeholder="请输入车牌号" />
                    </Form.Item>

                    <CarColorSelectFormItem />

                    <Form.Item label="进场时间" name="DateIn" rules={[{ required: true, message: '请选择进场时间' }]}>
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default PatchInPark
