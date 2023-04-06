
interface IPick {
    id: string;
    code: string;
    date: string;
    opDate: string;
    revenue: number;
    canOp: boolean;
    strategy: string;
    [index: string]: string | boolean | number
}

export default IPick;