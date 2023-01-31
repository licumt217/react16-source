import React from 'react'
import { Row, Col, Pagination } from 'antd'

export default function CusPagination({ total, onChange, defaultCurrent, defaultPageSize }
    : { total: number, onChange: any, defaultCurrent: number, defaultPageSize: number }) {
    return (
        <>
            {
                total > 0 && (
                    <Row>
                        <Col span={24} className='alignRight'>
                            <Pagination
                                total={total}
                                showTotal={(total, range) => `共 ${total} 条记录`}
                                showSizeChanger
                                showQuickJumper
                                onChange={onChange}
                                defaultPageSize={defaultPageSize}
                                defaultCurrent={defaultCurrent}
                            />
                        </Col>
                    </Row>
                )
            }
        </>
    )
}
