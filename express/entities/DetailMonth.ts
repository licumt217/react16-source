

export default class DetailMonth {
    public id: string = "";
    public code: string = "";
    public name: string = "";
    public cj_money: number = 0;
    public zf: number = 0;
    public open_price: number = 0;
    public close_price: number = 0;
    public high: number = 0;
    public low: number = 0;
    public date: string = "";
    public opDate: string = "";
    [index: string]: string | boolean | number;
}
