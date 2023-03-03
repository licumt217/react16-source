import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input } from 'antd';
import { updatePwd, logout } from '../../../api/cloud'
import { Util } from '../../../assets/js/Util';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
const PasswordMsg = `密码必须包含大写字母、小写字母、数字，且不少于8位`

export default forwardRef(function ModifyPassword(props, ref) {

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [form] = Form.useForm();

    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        show: () => {
            show()
        }
    }))


    const show = () => {
        setVisible(true)
    }

    const hide = () => {
        setVisible(false)
    }

    const handleUpdateForgetPwd = () => {
        form.validateFields().then(res => {
            const { newPwdConfirm, newPwd, oldPwd } = res;
            if (newPwd === oldPwd) {
                Util.warn('新旧密码不能相同！')
                return;
            }
            if (newPwdConfirm !== newPwd) {
                Util.warn('新密码和确认密码不一致！')
                return;
            }

            updatePwd({
                oldPwd,
                newPwd
            }).then(() => {
                Util.success('修改成功！请重新登录！')
                hide()
                logout().then(() => {
                    Util.logoutInFE(dispatch, navigator)
                })
            })

        })
    }



    return (
        <>
            <Modal
                title="修改密码"
                okText="确定"
                cancelText="取消"
                visible={visible}
                onOk={handleUpdateForgetPwd}
                onCancel={hide}
            >
                <Form form={form} layout="vertical" >
                    <Form.Item
                        label="旧密码"
                        name="oldPwd"
                        rules={[
                            {
                                required: true,
                                message: '请输入旧密码！',
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
