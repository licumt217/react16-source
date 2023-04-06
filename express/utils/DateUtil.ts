const moment = require('moment');
const holidayArray = [
    '2022-01-31',
    '2022-02-01',
    '2022-02-02',
    '2022-02-03',
    '2022-02-04',
    '2022-04-04',
    '2022-04-05',
    '2022-05-02',
    '2022-05-03',
    '2022-05-04',
    '2022-06-03',
    '2022-09-12',
    '2022-10-03',
    '2022-10-04',
    '2022-10-05',
    '2022-10-06',
    '2022-10-07',
];
const DateUtil = {
    /**
     * 给定日期（不传的话默认当前日期）的yyyy-mm-dd的字符串格式
     * @returns
     */
    getDateStrYMD(date?: Date): string {
        date = date || new Date();
        return moment(date).format('YYYY-MM-DD');
    },
    /**
     * 给定日期（不传的话默认当前日期）的yyyymmdd的字符串格式
     * @returns
     */
    getDateStrYYYYMMDD(date?: Date): string {
        date = date || new Date();
        return moment(date).format('YYYYMMDD');
    },
    /**
     * 给定日期（不传的话默认当前日期）的yyyy-mm-dd hh:mm:ss的字符串格式
     * @param date
     * @returns
     */
    getDateStrYMDHMS(date?: Date): string {
        date = date || new Date();
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * 操作时间字符串 YYYY-MM-DD HH:mm:ss
     * @returns
     */
    getOpDt(): string {
        return this.getDateStrYMDHMS();
    },

    /**
     * 是否周末
     * @param date
     */
    isWeekEnd(date: Date = new Date()): boolean {
        const weekDay = date.getDay();
        if (![1, 2, 3, 4, 5].includes(weekDay)) {
            return true;
        }
        return false;
    },

    /**
     * 查询给定日期是所在年份的第几周
     * @param {*} dt
     * @returns
     */
    getWeekOfYear(dt: any) {
        const d1: any = new Date(dt);
        const d2: any = new Date(dt);
        d2.setMonth(0);
        d2.setDate(1);
        const rq = d1 - d2;
        const days = Math.ceil(rq / (24 * 60 * 60 * 1000));
        const num = Math.ceil(days / 7);
        return num;
    },
    /**
   * 查询给定日期是所在年份的第几月
   * @param {*} dt
   * @returns
   */
    getMonthOfYear(dt: any) {
        const d1: any = new Date(dt);
        return d1.getMonth();
    },

    /**
     * 按照给定日期向前或向后移动给定天数
     * @param date
     * @param days
     * @returns
     */
    moveDays(date: Date, days: number): string {
        date = date || new Date();
        const theDate = date.getDate();
        date.setDate(theDate + days);
        return moment(date).format('YYYY-MM-DD');
    },
};

export default DateUtil;
