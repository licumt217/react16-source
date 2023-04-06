import PlateNames from "../constants/PlateNames";
import DateUtil from "./DateUtil";

/**
 * 拉取全量股票当日最新日线数据url
 * @param page 
 * @param pageSize 
 * @returns 
 */
export function getDayUrlOfLatestAll(page: number, pageSize: number): string {
    return `http://30.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112407258310101806222_1611142757039&pn=${page}&pz=${pageSize}&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:0+t:6,m:0+t:13,m:0+t:80,m:1+t:2,m:1+t:23&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152`;
}

/**
 * 高阶函数 返回一个根据code获取对应股票在给定区间内历史数据的函数
 * @param startDate 
 * @param endDate 默认值：20500101
 * @returns 
 */
export function getDayUrlOfHistoryByCodeFn(startDate: string, endDate: string = "20500101") {
    return function (code: string) {
        const secid = getSecid(code);
        let url = `http://82.push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery112409117292353763788_1643277919383`;
        url += `&secid=${secid}.${code}`;
        url += `&ut=fa5fd1943c7b386f172d6893dbfba10b`;
        url += `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6%2Cf8`;
        url += `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61`;
        url += `&klt=101`;
        url += `&fqt=1`; //0，不复权，1前复权，2后复权
        url += `&beg=${startDate}`;
        url += `&end=${endDate}`;
        url += `&smplmt=2300`;
        url += `&lmt=1000000`;
        url += `&_=1643277919417`;
        return url;
    }
}

/**
 * 拉取给定股票code的周线线历史数据url
 * @param code 
 * @returns 
 */
export function getWeekHistoryUrl(code: string): string {
    const lmt = 120;
    const secid = getSecid(code);
    return (
        `http://3.push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery351015441810346728446_1668152697971&` +
        `secid=${secid}.${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
        `&klt=102&fqt=1&beg=20190101&end=20500101&smplmt=460&lmt=1000000&_=1668152698007`
    );
}
/**
 * 拉取给定股票code的月线历史数据url
 * @param code 
 * @returns 
 */
export function getMonthHistoryUrl(code: string): string {
    const lmt = 460;
    const secid = getSecid(code);
    const fqt = 1; //复权相关
    return (
        `http://29.push2his.eastmoney.com/api/qt/stock/kline/get?cb=jQuery112405439813560193669_1654140311512` +
        `&secid=${secid}.${code}&ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6` +
        `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=103&fqt=${fqt}` +
        `&end=20500101&lmt=${lmt}&_=1654140311638`
    );
}

function isShenZhengStock(code: string) {
    return (
        code.startsWith('300') ||
        code.startsWith('301') ||
        code.startsWith('002') ||
        code.startsWith('003') ||
        code.startsWith('000')
    );
}

function getSecid(code: string) {
    if (isShenZhengStock(code)) {
        return 0;
    } else {
        return 1;
    }
}

/**
 * 高阶函数，返回根据板块名称查询对应数据获取URL的函数
 * @param plateBeginDate 板块数据获取的开始时间
 * @returns 
 */
export function getPlateUrlOfHistoryFn(plateBeginDate: string) {

    const UrlOfPlateMap = new Map()
        .set(
            'cyb',
            `http://46.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?secid=0.399006` +
            `&ut=fa5fd1943c7b386f172d6893dbfba10b` +
            `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6` +
            `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
            `&klt=101` +
            `&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery351028176368542636254_1643355686303` +
            `&lmt=1500` +
            `&_=1643355686402` +
            `&beg=${plateBeginDate}`,
        )
        .set(
            'shangzheng',
            `http://96.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?secid=1.000001&ut=fa5fd1943c7b386f172d6893dbfba10b` +
            `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6` +
            `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
            `&klt=101&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery35105224901820147407_1643356019559&` +
            `lmt=2000` +
            `&_=1643356019585` +
            `&beg=${plateBeginDate}`,
        )
        .set(
            'shenzheng',
            `http://91.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
            `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery35105175074030340494_1643356101422&secid=0.399001&` +
            `lmt=2000` +
            `&_=1643356101433` +
            `&beg=${plateBeginDate}`,
        )
        .set(
            'hs300',
            `http://79.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
            `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery351034269543504378763_1643356166717&secid=1.000300` +
            `&lmt=2000` +
            `&_=1643356166728` +
            `&beg=${plateBeginDate}`,
        )
        .set(
            'sz50',
            `http://37.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
            `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery351008886571921464692_1643356217114&secid=1.000016&` +
            `lmt=2000` +
            `&_=1643356217132` +
            `&beg=${plateBeginDate}`,
        )
        .set(
            'kcb',
            `http://38.push2his.eastmoney.com/api/qt/stock/kline/get` +
            `?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
            `&klt=101&fqt=1` +
            `&end=20500101` +
            `&cb=jQuery351041503168590230133_1643356266441&secid=1.000688` +
            `&lmt=2000` +
            `&_=1643356266455` +
            `&beg=${plateBeginDate}`,
        );

    /**
     * 根据板块名称从Map中获取对应的数据获取URL
     */
    return function getPlateUrlOfHistoryByName(plateName: string) {
        return UrlOfPlateMap.get(plateName);
    }
}


/**
 * 根据板块名称返回获取板块最新数据的URL；只获取当天最新的一条数据
 * @param plateName 
 * @returns 
 */
export function getPlateUrlOfLatestByName(plateName: string) {

    let url = '';
    const beginDate = DateUtil.getDateStrYYYYMMDD();
    switch (plateName) {
        case PlateNames.CYB:
            url =
                `http://46.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?secid=0.399006` +
                `&ut=fa5fd1943c7b386f172d6893dbfba10b` +
                `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6` +
                `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
                `&klt=101` +
                `&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery351028176368542636254_1643355686303` +
                `&lmt=1500` +
                `&_=1643355686402` +
                `&beg=${beginDate}`;
            break;
        case PlateNames.SHANG_ZHENG:
            url =
                `http://96.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?secid=1.000001&ut=fa5fd1943c7b386f172d6893dbfba10b` +
                `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6` +
                `&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
                `&klt=101&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery35105224901820147407_1643356019559&` +
                `lmt=2000` +
                `&_=1643356019585` +
                `&beg=${beginDate}`;
            break;
        case PlateNames.SHEN_ZHENG:
            url =
                `http://91.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
                `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery35105175074030340494_1643356101422&secid=0.399001&` +
                `lmt=2000` +
                `&_=1643356101433` +
                `&beg=${beginDate}`;
            break;
        case PlateNames.HS300:
            url =
                `http://79.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
                `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery351034269543504378763_1643356166717&secid=1.000300` +
                `&lmt=2000` +
                `&_=1643356166728` +
                `&beg=${beginDate}`;
            break;
        case PlateNames.SZ50:
            url =
                `http://37.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?ut=fa5fd1943c7b386f172d6893dbfba10b` +
                `&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61&klt=101&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery351008886571921464692_1643356217114&secid=1.000016&` +
                `lmt=2000` +
                `&_=1643356217132` +
                `&beg=${beginDate}`;
            break;
        case PlateNames.KCB:
            url =
                `http://38.push2his.eastmoney.com/api/qt/stock/kline/get` +
                `?ut=fa5fd1943c7b386f172d6893dbfba10b&fields1=f1%2Cf2%2Cf3%2Cf4%2Cf5%2Cf6&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61` +
                `&klt=101&fqt=1` +
                `&end=20500101` +
                `&cb=jQuery351041503168590230133_1643356266441&secid=1.000688` +
                `&lmt=2000` +
                `&_=1643356266455` +
                `&beg=${beginDate}`;
            break;
    }
    return url;
}