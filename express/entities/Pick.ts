
export default class Pick {
    public id: string = "";
    public code: string = "";
    public date: string = "";
    public opDate: string = "";
    public revenue: number = 0;
    public canOp: boolean = true;
    public strategy: string = "";
    [index: string]: string | boolean | number;
}
