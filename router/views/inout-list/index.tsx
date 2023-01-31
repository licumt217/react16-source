import React, { useState } from 'react'
import { Form, Select, Card, Input, Button, Space, Table, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectParkExitSchedulesByPage, onSchedule, outSchedule } from '../../api/cloud'
import { Util } from '../../assets/js/Util'
import ParkSelect from './components/ParkSelect'
import { setExitId, setExitLocalType, setSchedulesId } from '../../store/slice/business'
import { InOut } from '../../model'
import { StaticColumns } from './business'
import { ExitLocalTypes } from '../../components/Constants'

const { Option } = Select
const InitPage = 1;
const InitLimit = 10;

function InoutList() {

    const navigator = useNavigate();
    const dispatch = useDispatch()
    const [exitForm] = Form.useForm();

    const parkId = useSelector((state: any) => {
        return state.business.parkId;
    })

    const gmUserId = useSelector((state: any) => {
        return state.common.gmUserId;
    })

    const [limit, setLimit] = useState(InitLimit);
    const [page, setPage] = useState(InitPage);
    const [total, setTotal] = useState(0);
    const [datalist, setDatalist] = useState<Array<InOut>>([]);
    const [loading, setLoading] = useState(false);


    const reset = () => {
        exitForm.resetFields();
        resetPager()
    }

    const resetPager = () => {
        setLimit(InitLimit);
        setPage(InitPage);
    }


    const onParkChange = (parkId: string) => {
        reset();
        realQuery(parkId, InitPage, InitLimit)
    }

    const handleQuery = () => {
        if (!parkId) {
            Util.warn("请先选择停车场！")
            return;
        }
        resetPager();
        realQuery(parkId, InitPage, InitLimit)
    }

    const handlePageChange = (page: number, pageSize: number) => {
        setPage(page)
        setLimit(pageSize);
        realQuery(parkId, page, pageSize);

    }

    const realQuery = (pmParkId: string, page: number, limit: number) => {

        const exitLocalType = exitForm.getFieldValue("exitLocalType") || ""
        const start = (page - 1) * limit;
        setLoading(true);
        selectParkExitSchedulesByPage({
            pmParkId,
            exitLocalType,
            start,
            limit
        }).then((res: any) => {
            setDatalist(res.scheduleList)
            setTotal(res.total)
        }).finally(() => {
            setLoading(false);
        })

    }

    const go2Detail = (record: InOut) => {
        let { exitLocalType, pmParkExitId, gmUserScheduleId } = record;

        dispatch(setExitLocalType(exitLocalType))
        dispatch(setExitId(pmParkExitId))
        dispatch(setSchedulesId(gmUserScheduleId))

        if (exitLocalType === ExitLocalTypes.in) {
            navigator('/entrance')
        } else {
            navigator('/exit')
        }

    }

    const handleOnSchedule = (record: InOut) => {
        const { exitNo, pmParkExitId } = record;
        Util.confirm(`确定接管出入口 "${exitNo}" 吗？确认接管后现有值班人员将无法进行操作！`, () => {
            setLoading(true);
            onSchedule({ pmParkExitId }).then(() => {
                Util.success('接管成功！');
                handleQuery();
            }).finally(() => {
                setLoading(false);
            })
        })
    }

    const handleOutSchedule = (record: InOut, isSelf = true) => {
        const { exitNo, gmUserScheduleId } = record;
        let msg = `确定交班出入口 "${exitNo}" 吗？确认交班后将无人对车道进行管理！`;
        if (!isSelf) {
            msg = `确定接管出入口 "${exitNo}" 吗？确认接管后现有值班人员将无法进行操作！`;
        }
        Util.confirm(msg, () => {
            setLoading(true);
            outSchedule({ gmUserScheduleId }).then(() => {
                Util.success('交班成功！');
                handleQuery();
            }).finally(() => {
                setLoading(false);
            })
        })
    }


    const columns: any = [
        ...StaticColumns,
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: InOut) => {
                const { scheduleGmUserId } = record;

                return (
                    <Space size="middle">
                        {
                            !!scheduleGmUserId ? (
                                gmUserId === scheduleGmUserId ? (
                                    <>
                                        <a onClick={() => { go2Detail(record) }}>查看</a>
                                        <a onClick={() => { handleOutSchedule(record) }}>交班</a>
                                    </>
                                ) : (
                                    <>
                                        <a onClick={() => { handleOutSchedule(record, false) }}>接管</a>
                                    </>
                                )

                            ) : (
                                <a onClick={() => { handleOnSchedule(record) }}>接管</a>
                            )
                        }
                    </Space>
                )
            },
        }
    ];

    return (
        <>

            <ParkSelect onParkChange={onParkChange} />

            {
                parkId && (
                    <Card style={{ margin: '0 20px' }}>
                        <Form
                            form={exitForm}
                            style={{ background: 'rgb(239,239,239)', padding: '10px', marginBottom: '15px' }}
                            layout='inline'
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            onFinish={handleQuery}
                        >

                            <Form.Item name="exitLocalType" label="车道类型" >
                                <Select
                                    className='w150'
                                    placeholder="请选择车道类型"
                                    allowClear
                                >
                                    <Option value={ExitLocalTypes.in}>总进口</Option>
                                    <Option value={ExitLocalTypes.out}>总出口</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </Form.Item>
                        </Form>
                        <Spin spinning={loading} size="large" delay={300}>
                            <Table columns={columns} dataSource={datalist} rowKey={row => row.exitCode} pagination={{
                                current: page,
                                pageSize: limit,
                                total: total,
                                onChange: handlePageChange
                            }} />
                        </Spin>
                    </Card>
                )
            }

        </>
    )
}

export default InoutList
