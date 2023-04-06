
interface IDetailDaily {
    id: string;
    code: string;
    name: string;
    high: number;
    low: number;
    open_price: number;
    close_price: number;
    last_close_price: number;
    hsl: number;
    zd_money: number;
    cj_nums: number;
    cj_money: number;
    zf: number;
    date: string;
    opDate: string;
    [index: string]: string | boolean | number
}

export default IDetailDaily;