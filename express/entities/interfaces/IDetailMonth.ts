
interface IDetailMonth {
    id: string;
    code: string;
    name: string;
    cj_money: number;
    zf: number;
    high: number;
    low: number;
    open_price: number;
    close_price: number;
    date: string;
    opDate: string;
    [index: string]: string | boolean | number
}

export default IDetailMonth;