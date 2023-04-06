

export default class Plate {
    public id: string = "";
    public name: string = "";
    public zd_money: number = 0;
    public cj_nums: number = 0;
    public cj_money: number = 0;
    public zf: number = 0;
    public open_price: number = 0;
    public close_price: number = 0;
    public high: number = 0;
    public low: number = 0;
    public last_close_price: number = 0;
    public zhenfu: number = 0;
    public revenue: number = 0;
    public date: string = "";
    public opDate: string = "";
    public canOp: boolean = true;
    [index: string]: string | boolean | number;


}
