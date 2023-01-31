export enum Status {
    NO_AUTH,//出口车辆被挡无权限
    HAS_ORDER,//精确匹配到订单
    HAS_ORDER_BLUR,//模糊匹配到订单
    NO_ORDER,//未匹配到订单
    NO_CAR,//出口无待结算订单此时CarOutFee为null
}
