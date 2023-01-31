import React, { useState } from 'react'

import { Button, Modal, Form, message, InputNumber } from 'antd'


import { customFeeLetgo } from '../../../../api/local'

function ChangeLetgo({ callback }: { callback: any }) {

    const [form] = Form.useForm();

    const [visible, setVisible] = useState<boolean>(false)


    const onOk = () => {
        form.validateFields().then((res) => {

            const SpecialFee = form.getFieldValue("SpecialFee")

            customFeeLetgo({
                SpecialFee
            }).then(() => {
                message.success("操作成功！")
            }).finally(() => {
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
        callback();
    }

    return (
        <>
            <Button size='large' type='primary' onClick={show}> 改价放行</Button>

            <Modal title="改价放行" visible={visible} onOk={onOk} onCancel={hide} width={400}>

                <Form layout='vertical' form={form}>

                    <Form.Item 
                        label="自定义收费金额（元）" 
                        name="SpecialFee" 
                        rules={[
                            { required: true, message: '请输入自定义收费金额' },
                            {
                                validator: (rule, value, callback) => {
                                    let maxPrice = 999999;
                                    if (Number(value) > maxPrice) {
                                        callback(`数值太大`);
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            },
                        ]}>
                        <InputNumber placeholder='请输入自定义金额' min={0.01} style={{ width: '100%' }} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default ChangeLetgo
