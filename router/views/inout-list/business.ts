import { ExitLocalTypes, ExitLocalTypeMap } from "../../components/Constants"



export const StaticColumns = [
    {
        title: '出入口名称',
        dataIndex: 'exitNo',
        key: 'exitNo',
    },
    {
        title: '车道编码',
        dataIndex: 'exitCode',
        key: 'exitCode',
    },
    {
        title: '车道类型',
        dataIndex: 'exitLocalType',
        key: 'exitLocalType',
        render: (value: string) => {
            return ExitLocalTypeMap[value]
        },
    },
    {
        title: '值班人员',
        dataIndex: 'scheduleGmUserName',
        key: 'scheduleGmUserName',
    },
    {
        title: '值班开始时间',
        dataIndex: 'scheduleStartDt',
        key: 'scheduleStartDt',
    },

]

