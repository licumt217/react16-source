import React, { useState } from 'react'

import { Button, Modal, Form, message, Input } from 'antd'

import { specialLetgo } from '../../../../api/local'

const { TextArea } = Input;

function SpecialLetgo({ callback }: { callback: any }) {

    const [form] = Form.useForm();

    const [visible, setVisible] = useState<boolean>(false)


    const getReason = () => {
        return form.getFieldValue("SpecialOutReason")
    }

    const onOk = () => {
        form.validateFields().then(() => {

            const SpecialOutReason = getReason()

            specialLetgo({
                SpecialOutReason
            }).then(() => {
                message.success("放行成功！")
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
            <Button size='large' type='primary' onClick={show}> 特殊放行</Button>

            <Modal title="特殊放行" visible={visible} onOk={onOk} onCancel={hide} width={400}>

                <Form layout='vertical' form={form}>

                    <Form.Item label="放行原因" name="SpecialOutReason" rules={[{ required: true, message: '请输入放行原因' },{max:100,message:'最多可输入100个字符'}]}>
                        <TextArea showCount placeholder='请输入放行原因'  rows={3} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}

export default SpecialLetgo
