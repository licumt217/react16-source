import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Row, Col } from 'antd';
import SMSVerifyCode from '../SMSVerifyCode';
import { checkVerifyCode, updateForgetPwd } from '../../../api/cloud'
import { Util } from '../../../assets/js/Util';

const PasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
const PasswordMsg = `密码必须包含大写字母、小写字母、数字，且不少于8位`

export default forwardRef(function ResetPassword(props, ref) {


    const [phoneForm] = Form.useForm();
    const [passwordForm] = Form.useForm();

    const [phone, setPhone] = useState("");
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => {
            showPhoneModal()
        }
    }))

    const reset = () => {
        phoneForm.resetFields()
        passwordForm.resetFields()
    }

    /**
     * 如果用户未登录，从头开始走一遍流程（获取验证码，校验手机号和验证码，然后更新密码）；
     * 已登录，直接执行修改密码。
     */
    const showPhoneModal = () => {
        setPhoneModalVisible(true)
    }

    const hidePhoneModal = () => {
        setPhoneModalVisible(false)
    }

    const showPasswordModal = () => {
        setPasswordModalVisible(true)
    }

    const hidePasswordModal = () => {
        setPasswordModalVisible(false)
        reset()
    }


    const handleCheckVerifyCode = () => {
        phoneForm.validateFields().then(res => {
            checkVerifyCode(res).then(() => {
                hidePhoneModal()
                showPasswordModal()
            })
        })
    }

    const handlePhoneChange = (e: any) => {
        setPhone(e.target.value)
    }

    const handleUpdateForgetPwd = () => {
        passwordForm.validateFields().then(res => {
            const { newPwdConfirm, newPwd } = res;
            if (newPwdConfirm !== newPwd) {
                Util.warn('新密码和确认密码不一致！')
                return;
            }

            updateForgetPwd({
                phone,
                newPwd
            }).then(() => {
                Util.success('重置成功！请重新登录！')
                hidePasswordModal()
            })

        })
    }

    return (
        <>
            <Modal
                title="登录手机号"
                okText="下一步"
                cancelText="取消"
                visible={phoneModalVisible}
                onOk={handleCheckVerifyCode}
                onCancel={() => {
                    setPhoneModalVisible(false);
                }}
            >
                <Form form={phoneForm} layout="vertical" >
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号！',
                            },
                            {
                                pattern: /^1\d{10}$/,
                                message: '手机号格式不正确'
                            }
                        ]}
                    >
                        <Input
                            maxLength={11}
                            size='large'
                            onChange={handlePhoneChange}
                            placeholder="请输入手机号"
                        />
                    </Form.Item>

                    <Form.Item
                        label="短信验证码"
                        name="verifyCode"
                        rules={[
                            {
                                required: true,
                                message: '请输入短信验证码！',
                            },
                        ]}
                    >
                        <Row gutter={8} align="middle">
                            <Col span={15}>
                                <Form.Item
                                    name="verifyCode"
                                    noStyle
                                >
                                    <Input size='large' maxLength={6} placeholder="请输入短信验证码" />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <SMSVerifyCode phone={phone} />
                            </Col>
                        </Row>
                    </Form.Item>

                </Form>
            </Modal>

            <Modal
                title="重置登录密码"
                okText="确定"
                cancelText="取消"
                visible={passwordModalVisible}
                onOk={handleUpdateForgetPwd}
                onCancel={() => {
                    setPasswordModalVisible(false);
                }}
            >
                <Form form={passwordForm} layout="vertical" >
                    <Form.Item
                        label="新密码"
                        name="newPwd"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码！',
                            },
                            {
                                pattern: PasswordReg,
                                message: PasswordMsg
                            }
                        ]}
                    >
                        <Input
                            maxLength={20}
                            type="password"
                            size='large'
                            placeholder="8位以上包含字母大小写与数字"
                        />
                    </Form.Item>

                    <Form.Item
                        label="确认密码"
                        name="newPwdConfirm"
                        rules={[
                            {
                                required: true,
                                message: '请输入确认密码！',
                            },
                            {
                                pattern: PasswordReg,
                                message: PasswordMsg
                            }
                        ]}
                    >
                        <Input
                            maxLength={20}
                            type="password"
                            size='large'
                            placeholder="8位以上包含字母大小写与数字"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
})
