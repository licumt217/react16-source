import React, { useState } from 'react'

import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Form } from 'antd'

function NoAuth() {

    const [form] = Form.useForm();

    const [visible, setVisible] = useState<boolean>(false)

    const show = () => {
        form.resetFields();
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    return (
        <>

            <span style={{ color: 'red', cursor: 'pointer' }} onClick={show}>
                【无权限通过】<QuestionCircleOutlined style={{ fontSize: '16px', verticalAlign: 'middle' }} />
            </span>


            <Modal visible={visible} onCancel={hide} width={400} footer={null}>

                <h3 className='alignCenter'>无权限通过原因如下</h3>

                <section className='mt1 mb2'>
                    <div>
                        <p>1、该车辆无权限从该出口通过；</p>

                        <p>2、该车辆为违章车辆，禁止通过；</p>

                        <p>3、该车辆为黑名单车辆，禁止通过。</p>
                    </div>

                </section>

                <Button type='primary' block size='large' onClick={hide}>确定</Button>

            </Modal>
        </>
    )
}

export default NoAuth
