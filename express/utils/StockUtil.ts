
import axios from '../http/axiosService';
import Util from './Util';
import DateUtil from './DateUtil';
import {
    getDayUrlOfLatestAll,
    getMonthHistoryUrl,
    getPlateUrlOfHistoryFn,
    getPlateUrlOfLatestByName,
    getDayUrlOfHistoryByCodeFn
} from './StockUrls';

import StockParser from './StockParser';

import IDetailDaily from '../entities/interfaces/IDetailDaily';
import IDetailMonth from '../entities/interfaces/IDetailMonth';
import IPlate from '../entities/interfaces/IPlate';
import DetailDaily from '../entities/DetailDaily';
import DetailMonth from '../entities/DetailMonth';
import Plate from '../entities/Plate';

//板块数据获取的开始时间
const plateBeginDate = '20230307';
const THE_START_DATE = '20230307';
const THE_END_DATE = '20501231';

//根据板块名称从Map中获取对应的数据获取URL
const getPlateUrlOfHistoryByName = getPlateUrlOfHistoryFn(plateBeginDate);
const getDayUrlOfHistoryByCode = getDayUrlOfHistoryByCodeFn(THE_START_DATE, THE_END_DATE);


export default {
    /**
     * 根据给定大盘列表数据，判断最新的那天是否适合操作
     * @param entities
     */
    canOpOfPlate(entities: IPlate[]) {
        const [currentStock] = entities;
        const { close_price, last_close_price, open_price } = currentStock;
        const ma5 = this.getMa(entities, 5);
        const ma10 = this.getMa(entities, 10);
        const ma20 = this.getMa(entities, 20);
        const ma30 = this.getMa(entities, 30);

        const lowest = this.getLowestClosepriceInDays(entities, 5);

        if (close_price > ma30) {
            return true;
        } else {
        }
        return false;
    },

    /**
     * 获取给定股票列表在days日内的最低收盘价
     * @param entities
     * @param days
     */
    getLowestClosepriceInDays(entities: IPlate[] | IDetailDaily[] | IDetailMonth[], days: number) {
        let low = 9999999;
        for (let i = 0; i < days; i++) {
            low = Math.min(low, Number(entities[i].close_price));
        }
        return low;
    },

    /**
     * 是否超跌。20个交易日跌幅超过30个点
     * @param stockList 
     * @param days 20
     * @param percent -30
     * @returns 
     */
    isSuperDown(stockList: IDetailDaily[], days: number = 20, percent: number = -30) {
        const len = stockList.length;
        const max = Math.min(days, len);
        let zfAll = 0;
        for (let i = 0; i < max; i++) {
            const stock = stockList[i];
            zfAll += Number(stock.zf);
        }
        return zfAll < percent;
    },

    /**
     * 判断给定一只股票的列表数据是否触发选中策略
     * 核心策略
     * @param stockList
     * @returns
     */
    isHitStragety(
        stockList: IDetailDaily[] | IPlate[],
        strategy: string,
        downRatio: number = 0.7
    ) {
        if (strategy === 'month') {
            const [todayStock] = stockList;

            const close_price_array: number[] = [];
            stockList.forEach((item) => {
                close_price_array.push(item.close_price);
            });

            const max_close_price = Math.max(...close_price_array);

            const { close_price, name, code } =
                todayStock;

            return (
                name.toLowerCase().indexOf('st') === -1 &&
                name.toLowerCase().indexOf('退') === -1 &&
                ((max_close_price - close_price) / max_close_price) > downRatio
            );
        } else if (strategy === 'all') {
            const [
                todayStock,
                todayStock2,
                todayStock3,
                todayStock4,
                todayStock5,
                todayStock6,
                todayStock7,
            ] = stockList;

            const { close_price, open_price, low, high, zf, cj_money, name, code } =
                todayStock;

            const close_price2 = stockList[1].close_price;
            const close_price3 = stockList[2].close_price;
            const close_price4 = stockList[3].close_price;
            const close_price5 = stockList[4].close_price;
            const close_price6 = stockList[5].close_price;
            const close_price7 = stockList[6].close_price;
            const close_price8 = stockList[7].close_price;

            const open_price2 = stockList[1].open_price;
            const open_price3 = stockList[2].open_price;
            const open_price4 = stockList[3].open_price;
            const open_price5 = stockList[4].open_price;
            const open_price6 = stockList[5].open_price;
            const open_price7 = stockList[6].open_price;
            const open_price8 = stockList[7].open_price;

            const cj_money2 = stockList[1].cj_money;
            const cj_money3 = stockList[2].cj_money;
            const cj_money4 = stockList[3].cj_money;
            const cj_money5 = stockList[4].cj_money;
            const cj_money6 = stockList[5].cj_money;
            const cj_money7 = stockList[6].cj_money;
            const cj_money8 = stockList[7].cj_money;

            const low2 = stockList[1].low;
            const low3 = stockList[2].low;
            const low4 = stockList[3].low;
            const low5 = stockList[4].low;
            const low6 = stockList[5].low;
            const low7 = stockList[6].low;
            const low8 = stockList[7].low;

            const high2 = stockList[1].high;
            const high3 = stockList[2].high;
            const high4 = stockList[3].high;
            const high5 = stockList[4].high;
            const high6 = stockList[5].high;
            const high7 = stockList[6].high;
            const high8 = stockList[7].high;

            const zf2 = stockList[1].zf;
            const zf3 = stockList[2].zf;
            const zf4 = stockList[3].zf;
            const zf5 = stockList[4].zf;
            const zf6 = stockList[5].zf;
            const zf7 = stockList[6].zf;
            const zf8 = stockList[7].zf;

            const ma4 = this.getMa(stockList, 4);
            const ma42 = this.getMa(stockList, 4, 1);
            const ma43 = this.getMa(stockList, 4, 2);
            const ma44 = this.getMa(stockList, 4, 3);
            const ma45 = this.getMa(stockList, 4, 4);
            const ma46 = this.getMa(stockList, 4, 5);
            const ma47 = this.getMa(stockList, 4, 6);
            const ma48 = this.getMa(stockList, 4, 7);
            const ma49 = this.getMa(stockList, 4, 8);

            const ma7 = this.getMa(stockList, 7);
            const ma72 = this.getMa(stockList, 7, 1);
            const ma73 = this.getMa(stockList, 7, 2);
            const ma74 = this.getMa(stockList, 7, 3);
            const ma75 = this.getMa(stockList, 7, 4);
            const ma76 = this.getMa(stockList, 7, 5);
            const ma77 = this.getMa(stockList, 7, 6);
            const ma78 = this.getMa(stockList, 7, 7);
            const ma79 = this.getMa(stockList, 7, 8);

            const small = 3.2;
            const big = 3.5;

            const minMoney = 20000000; //千万

            const rratio = isNaN((high - close_price) / (open_price - low))
                ? 0
                : (high - close_price) / (open_price - low);

            const maxIn5 = this.getMaxClosePriceInDays(stockList, 5);

            const shitiLength = close_price - open_price;
            const shitiLength2 = close_price2 - open_price2;

            const shitiLengthPercent =
                ((close_price - open_price) / open_price) * 100;
            const shitiLengthPercent2 =
                ((close_price2 - open_price2) / open_price2) * 100;
            const shitiLengthPercent3 =
                ((close_price3 - open_price3) / open_price3) * 100;

            const shangyingLength = high - Math.max(open_price, close_price);

            const xiayingLength = Math.min(open_price, close_price) - low;

            let returnArray: any = [];

            const [firstIndex, mediumIndex, lastIndex] = returnArray;

            const firstLow = 0,
                lastLow = 0,
                theMax = 0;

            return (
                //done 昨日大红柱，今日长上影的红柱子。
                (ma4 > ma7 &&
                    close_price > open_price &&
                    close_price2 > open_price2 &&
                    shitiLengthPercent2 > 3 &&
                    shitiLengthPercent > 0.3 &&
                    shitiLengthPercent < 5 &&
                    shitiLengthPercent < shitiLengthPercent2 * 1.2 &&
                    cj_money > 30000000 &&
                    close_price > close_price2 &&
                    low < close_price2 &&
                    !(high2 - close_price2 > (close_price2 - open_price2) * 0.6) &&
                    high - close_price > close_price - open_price &&
                    high - close_price < (close_price - open_price) * 2.5 &&
                    high - close_price > (open_price - low) * 2) || //DONE 昨日上穿2条均线，今日缩量。
                (close_price2 > open_price2 &&
                    open_price2 < ma42 &&
                    open_price2 < ma72 &&
                    close_price2 > ma42 &&
                    close_price2 > ma72 &&
                    cj_money < cj_money2 * 1.25 &&
                    open_price > ma7 &&
                    close_price > ma4 &&
                    ma4 > ma7 &&
                    cj_money > 30000000 &&
                    zf < 5 &&
                    zf2 > 2.5 &&
                    close_price2 ===
                    Math.max(close_price2, close_price3, close_price4, close_price5) &&
                    close_price > open_price2 + (close_price2 - open_price2) / 1.5 &&
                    shitiLengthPercent2 > 2.8 &&
                    high - Math.max(open_price, close_price) >
                    Math.min(open_price, close_price) - low) || //DONE 两红柱子连着并起，今高于昨。
                (ma4 > ma7 * 1.01 &&
                    ma42 > ma72 * 1.005 &&
                    close_price > open_price &&
                    close_price2 > open_price &&
                    close_price > ma7 &&
                    close_price2 > ma72 &&
                    low < close_price2 * 1.01 &&
                    zf < 6 &&
                    zf2 < 6 &&
                    cj_money > 30000000 &&
                    shitiLengthPercent2 > 0.3 &&
                    shitiLengthPercent > shitiLengthPercent2 * 0.8 &&
                    !(
                        high - close_price < (open_price - low) * 0.8 &&
                        high2 - close_price2 < (open_price2 - low2) * 0.8
                    ) &&
                    !(zf3 > 6 || zf4 > 6) &&
                    close_price ===
                    Math.max(close_price, close_price2, close_price3, close_price4) &&
                    high === Math.max(high, high2, high3, high4) &&
                    zf > 1) || //DONE 小短柱，两头冒尖尖，压着均线
                (close_price > open_price &&
                    high - close_price > shitiLengthPercent / 3 &&
                    high - close_price > open_price - low &&
                    cj_money > 30000000 &&
                    shitiLengthPercent > 1 &&
                    shitiLengthPercent < 4.5 &&
                    open_price > ma7 &&
                    open_price < ma4 * 1.02 &&
                    close_price > ma4 &&
                    close_price > ma7 &&
                    low < ma4) || //DONE 两头尖尖压线
                (close_price > open_price &&
                    high - close_price > shitiLength * 0.6 &&
                    high - close_price < shitiLength * 2.5 &&
                    high - close_price > open_price - low &&
                    low < ma4 &&
                    (Math.abs(ma42 - ma72) / ma72) * 100 < 1 &&
                    (Math.abs(ma43 - ma73) / ma73) * 100 < 1 &&
                    cj_money > 30000000 &&
                    zf < 5 &&
                    shitiLengthPercent > 1 &&
                    shitiLengthPercent < 4 &&
                    ((open_price - low) / open_price) * 100 > 0.5 &&
                    open_price - low < shitiLength &&
                    ma4 < close_price &&
                    ma4 > ma7 &&
                    open_price > ma7)
            );
        }
    },

    /**
     * 获取待筛选的所有股票map，code是key，对应的排序后的股票列表是value
     * @param stocks
     * @returns
     */
    getPickMap(
        stocks: IDetailDaily[] | IDetailMonth[],
    ): Map<string, IDetailDaily[] | IDetailMonth[]> {
        const map = new Map();
        let newArray: any = [];
        stocks.forEach((item) => {
            if (!newArray.length) {
                newArray.push(item);
            } else {
                if (newArray[0].code === item.code) {
                    newArray.push(item);
                } else {
                    map.set(newArray[0].code, newArray.slice());
                    newArray = [];
                    newArray.push(item);
                }
            }
        });
        return map;
    },

    /**
     * 获取股票的均线值
     * @param stocks 一只股票的列表
     * @param num 几日均线
     * @param offsetDays 向前偏移天数
     * @returns
     */
    getMa(stocks: IDetailDaily[] | IDetailMonth[] | IPlate[], num: number, offsetDays = 0): number {
        if (offsetDays) {
            let all = 0;
            for (let i = offsetDays; i < num + offsetDays; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        } else {
            let all = 0;
            for (let i = 0; i < num; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        }
    },

    /**
     * 返回给定一定时间内的股票列表中，最近days 日内的最高的收盘价
     * @param stocks
     * @param days
     * @returns
     */
    getMaxClosePriceInDays(stocks: IDetailDaily[] | IDetailMonth[] | IPlate[], days: number, offset = 0) {
        let max = 0;
        for (let i = offset; i < days + offset; i++) {
            max = Math.max(stocks[i].close_price, max);
        }
        return max;
    },

    /**
     * 判断给定股票名称是否ST或退市的
     * @param stockName
     * @returns
     */
    isStOrTuishi(stockName: string) {
        return stockName.includes('ST') || stockName.includes('退');
    },

    is300(code: string) {
        return (
            code.startsWith('300') || code.startsWith('688') || code.startsWith('301')
        );
    },

    /**
     * 从东方财富网站分页拉取当天最新的股票日线数据
     * @param pageSize 分页大小
     * @returns 
     */
    fetchLatestDayData(pageSize: number = 50) {
        return new Promise((resolve) => {
            const page = 1;
            const resultArray: any[] = [];

            const innerFetch = (
                page: number,
                pageSize: number,
                resultArray: any[],
            ) => {
                const url = getDayUrlOfLatestAll(page, pageSize);
                Util.log(`开始获取stock数据..., page:${page}, pageSize:${pageSize}`);
                axios.get(url).then(({ data }) => {

                    const stockArray = StockParser.parseDatas(data);

                    if (!stockArray) {
                        const entities = StockParser.transStockArray2DetailDailyEntities(stockArray)

                        resolve(entities);
                    } else {
                        resultArray = [...resultArray, ...stockArray];

                        //还未到最后一页，继续拉取
                        if (stockArray.length === pageSize) {
                            innerFetch(page + 1, pageSize, resultArray);
                        } else {
                            const entities = StockParser.transStockArray2DetailDailyEntities(stockArray)
                            resolve(entities);
                        }
                    }
                })
            };
            innerFetch(page, pageSize, resultArray);
        });
    },
    /**
    * 拉取单只股票的历史日线数据
    * @returns
    */
    fetchSingleHistoryDayData(code: string): Promise<IDetailDaily[]> {
        return new Promise((resolve) => {
            const url = getDayUrlOfHistoryByCode(code);
            axios.get(url).then(({ data }) => {
                const parsedData = StockParser.parseData(data);

                //如果stock code不对等情况，返回值会是null
                if (!parsedData) {
                    return resolve([]);
                }
                const { name, stockArray } = parsedData;

                const returnArray = StockParser.parseStockArray2DailyEntities(stockArray, code, name);
                resolve(returnArray);
            })
        });
    },

    /**
     * 获取给定股票的月线历史数据
     * @returns
     */
    fetchMonthHistoryDataByCode(code: string) {
        return new Promise((resolve) => {
            const url = getMonthHistoryUrl(code);
            Util.log(`获取月线数据..., code:${code}`);
            axios.get(url).then((data: any) => {
                const stockArray = StockParser.parseDatas(data, "month");
                const entities =
                    StockParser.transStockArray2DetailMonthEntities(stockArray);
                resolve(entities);
            })
        });
    },

    /**
     * 根据名字获取大盘历史数据
     * @param name cyb,shangzheng,shenzheng、hs300、sz50,kcb
     * @returns
     */
    fetchPlateHistoryDayDataByName(name: string): Promise<IPlate[]> {
        return new Promise((resolve) => {
            const url = getPlateUrlOfHistoryByName(name);
            Util.log(`获取大盘数据name:${name}`);

            axios.get(url).then(({ data }) => {
                const parsedData = StockParser.parseData(data);
                //如果stock code不对等情况，返回值会是null
                if (!parsedData) {
                    return resolve([]);
                }
                const { stockArray } = parsedData;

                const returnArray = StockParser.parseStockArray2PlateEntities(stockArray, name);
                resolve(returnArray);
            })
        });
    },
    /**
     * 根据名字获取大盘当天实时数据
     * @param plateName cyb,shangzheng,shenzheng、hs300、sz50,kcb
     * @returns
     */
    fetchPlateLatestDayDataByName(plateName: string): Promise<IPlate> {
        return new Promise((resolve) => {
            const url = getPlateUrlOfLatestByName(plateName);
            Util.log(`获取当天大盘数据name:${plateName}`);
            axios.get(url).then(({ data }) => {
                const parsedData = StockParser.parseData(data);
                //如果stock code不对等情况，返回值会是null
                if (!parsedData) {
                    return resolve({} as any);
                }
                const { stockArray } = parsedData;

                const returnEntity = StockParser.parseStockArray2PlateEntities(stockArray, plateName);
                resolve(returnEntity[0]);
            })
        });
    },


    /**
     * 给定股票是否红柱子，即收盘价高于开盘价
     * @param stock
     * @returns
     */
    isRed(stock: IDetailDaily | IDetailMonth | IPlate) {
        return stock.close_price >= stock.open_price;
    },

    /**
     * 给定股票是否是绿色柱子，即收盘价小于开盘价
     * @param data
     * @returns
     */
    isGreen(data: DetailDaily | DetailMonth | Plate) {
        return data.close_price < data.open_price;
    },

};
