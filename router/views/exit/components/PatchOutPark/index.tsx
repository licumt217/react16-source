import React, { useState } from 'react'

import { Button, Modal, Form, Input, DatePicker, message } from 'antd'

import DateUtil from '../../../../assets/js/DateUtil';

import CarColorSelectFormItem from '../../../components/CarColorSelectFormItem';
import { patchOut } from '../../../../api/local'

function PatchOutPark({ callback }: { callback: any }) {

    const [form] = Form.useForm();

    const [visible, setVisible] = useState<boolean>(false)


    //补录出场
    const patchOutPark = () => {
        form.validateFields().then((res) => {

            res.PassDate = DateUtil.transMoment2String(res.PassDate)

            patchOut(res).then(() => {
                message.success("补录成功！")
                hide();
                callback()
            })

        });
    }



    const show = () => {
        form.resetFields();
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <>
            <Button size='large' type='primary' onClick={show}> 补录出场</Button>

            <Modal title="补录出场" visible={visible} onOk={patchOutPark} onCancel={hide} width={400}>

                <Form layout='vertical' form={form}>

                    <Form.Item label="车牌号" name="PlateNum" rules={[{ required: true }]}>
                        <Input maxLength={8} placeholder="请输入车牌号" />
                    </Form.Item>

                    <CarColorSelectFormItem />

                    <Form.Item label="出场时间" name="PassDate" rules={[{ required: true, message: '请选择出场时间' }]}>
                        <DatePicker showTime style={{ width: '100%' }} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default PatchOutPark
