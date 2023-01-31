import { Status } from './business'

export default {
    [Status.NO_AUTH]: {//无权限
        PlateNum: '京A12345',
        PlateNumColor: '蓝',
        strTotolStayTime: '2天23小时59分59秒',
        strComeDateIn: '2020/12/30 23:59:59',
        strComeDateOut: '2020/12/30 23:59:59',
        CardTypeName: '临停0',
        Fee: null,
        FeePaid: null,
        FeeFree: null,
    },
    [Status.HAS_ORDER]: {//精确匹配到订单
        PlateNum: '京A12345',
        PlateNumColor: '蓝',
        strTotolStayTime: '2天23小时59分59秒',
        strComeDateIn: '2020/12/30 23:59:59',
        strComeDateOut: '2020/12/30 23:59:59',
        CardTypeName: '临停1',
        Fee: 23.99,
        FeePaid: 11.11,
        FeeFree: 3.49,
    },
    [Status.HAS_ORDER_BLUR]: {//模糊匹配到订单
        PlateNum: '京A12345',
        PlateNumColor: '蓝',
        strTotolStayTime: '2天23小时59分59秒',
        strComeDateIn: '2020/12/30 23:59:59',
        strComeDateOut: '2020/12/30 23:59:59',
        CardTypeName: '临停2',
        Fee: 23.99,
        FeePaid: 11.11,
        FeeFree: 3.49,
    },
    [Status.NO_ORDER]: {//未匹配到订单
        PlateNum: '京A12345',
        PlateNumColor: '蓝',
        strTotolStayTime: null,
        strComeDateIn: null,
        strComeDateOut: null,
        CardTypeName: '',
        Fee: '',
        FeePaid: '',
        FeeFree: '',
    },
    [Status.NO_CAR]: {} //出口无待结算订单此时CarOutFee为null
}