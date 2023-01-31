import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Row, Col, Card, message } from 'antd'
import styles from './index.module.scss'
import { setIsLogin, setGmUserId, setUsername, setToken } from '../../store/slice/common'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import RememberPass from './components/RememberPass'
import ForgetPassword from './components/ForgetPassword'
import { getImgCode, login } from '../../api/cloud'
import { Util } from '../../assets/js/Util'


function Login() {

    const isLogin = useSelector((state: any) => {
        return state.common.isLogin;
    })

    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const navigator = useNavigate();

    const [pictureData, setPictureData] = useState('')
    const [imgCodeKey, setImgCodeKey] = useState('')

    useEffect(() => {
        if (isLogin) {
            navigator('/inoutList')
        } else {
            getCode();
            restoreUsernameAndPassword()
        }

    }, [])


    const getCode = () => {
        getImgCode().then((res: any) => {
            setPictureData(res.pictureData)
            setImgCodeKey(res.imgCodeKey)
        });
    }

    const restoreUsernameAndPassword = () => {
        if (Util.isRememberPass()) {
            const { loginName, password } = Util.getUsernameAndPasswordFormPersist();

            form.setFieldsValue({
                loginName
                , password
            })
        }

    }

    const handleStoreUsernameAndPassword = (form: any) => {
        const { loginName, password } = form;
        if (Util.isRememberPass()) {
            Util.persistUsernameAndPassword(loginName, password)
        }
    }

    const handleLogin = (form: any) => {

        const params = { ...form, imgCodeKey }

        login(params).then((res: any) => {

            message.success('登录成功！')
            handleStoreUsernameAndPassword(form)
            const { gmUserId, username, token } = res;

            dispatch(setIsLogin(true))
            dispatch(setGmUserId(gmUserId))
            dispatch(setUsername(username))
            dispatch(setToken(token))

            navigator('/inoutList')

        }).catch(() => {
            getCode()
        });

    }

    return (

        <Row align="middle" className={styles.login_wraper}>
            <Col span={12} offset={6} lg={{ span: 6, offset: 9 }}>
                <Card title="收费员登录" headStyle={{ textAlign: 'center' }}>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={handleLogin}
                    >
                        <Form.Item
                            label="手机号"
                            name="loginName"
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
                            <Input maxLength={11} size='large' />
                        </Form.Item>

                        <Form.Item
                            label="登录密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入登录密码！',
                                },
                            ]}
                        >
                            <Input.Password maxLength={30} size="large" />
                        </Form.Item>

                        <Form.Item label="图形验证码" name='imgCode' rules={[
                            {
                                required: true,
                                message: '请输入图形验证码！',
                            },
                        ]}>
                            <Row gutter={8}>
                                <Col span={15}>
                                    <Form.Item
                                        name="imgCode"
                                        noStyle
                                    >
                                        <Input size='large' maxLength={6} />
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    {
                                        pictureData && <img src={pictureData} className='w100p h100p' onClick={getCode} />
                                    }
                                </Col>
                            </Row>
                        </Form.Item>

                        <Row justify='space-between'>
                            <Col>
                                <RememberPass />
                            </Col>
                            <Col>
                                <ForgetPassword />
                            </Col>
                        </Row>

                        <Form.Item className='mtdot5'>
                            <Button type="primary" htmlType="submit" block size='large'>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </Col>
        </Row>
    )
}

export default Login;
