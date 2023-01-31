import React from 'react'
import { Layout, Row, Col } from 'antd'

import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import SiteLogo from './components/SiteLogo'
import RightTopZone from './components/RightTopZone'
import EmbedWrapper from '../../components/EmbedWrapper'

const { Header, Content } = Layout

function Structure({ children }: { children: any }) {

    const isLogin = useSelector((state: any) => {
        return state.common.isLogin;
    })



    return (
        <Layout className={styles['site-layout']} style={{ minWidth: '768px' }}>
            <EmbedWrapper>
                <Header style={{ background: 'rgb(9,66,101)' }}>
                    <Row>
                        <Col span={12}>
                            <SiteLogo title='停简单' secTitle='停车场收费平台' />
                        </Col>
                        {
                            isLogin && (
                                <Col span={12}>

                                    <RightTopZone />
                                </Col>
                            )
                        }
                    </Row>
                </Header>
            </EmbedWrapper>

            <Content style={{ minWidth: '768px' }} className={styles.content}>
                {children}
            </Content>
        </Layout>
    )
}

export default Structure
