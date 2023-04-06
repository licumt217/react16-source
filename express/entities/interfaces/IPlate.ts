
interface IPlate {
    id: string;
    name: string;
    date: string;
    opDate: string;
    close_price: number;
    zd_money: number;
    cj_nums: number;
    cj_money: number;
    zf: number;
    high: number;
    low: number;
    open_price: number;
    last_close_price: number;
    zhenfu: number;
    revenue: number;
    canOp: boolean;
    [index: string]: number | boolean | string;

}

export default IPlate;