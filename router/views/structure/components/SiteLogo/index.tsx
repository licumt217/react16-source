import React from 'react'
import styles from './index.module.scss'
import Logo from '../../../../assets/images/common/logo.png'
import { Row, Col } from 'antd'


function SiteLogo({ title, secTitle }: { title: string, secTitle: string }) {
    return (
        <div className={styles['site-logo']}>
            <Row style={{ marginLeft: '-45px' }}>
                <Col>
                    <img
                        src={Logo}
                        alt='logo'
                    />
                </Col>
                <Col >
                    <div className={styles['title-wrapper']} >
                        <div>
                            <div className={styles.title} >{title}</div>
                            <div className={styles['sec-title']}>{secTitle}</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SiteLogo
