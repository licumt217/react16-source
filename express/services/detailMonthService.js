"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("../utils/Util"));
const lodash_1 = __importDefault(require("lodash"));
const detailMonthDAO_1 = __importDefault(require("../dao/detailMonthDAO"));
const plateService_1 = __importDefault(require("./plateService"));
const DateUtil_1 = __importDefault(require("../utils/DateUtil"));
const plateService = new plateService_1.default();
const detailMonthDAO = new detailMonthDAO_1.default();
class DetailMonthService {
    /**
    * 根据日期删除所有的。谨慎操作！！！
    * @param date
    */
    async deleteByDate(date) {
        await detailMonthDAO.deleteByDate(date);
    }
    /**
     * 根据code删除所有的。谨慎操作
     * @param code
     */
    async deleteByCode(code) {
        await detailMonthDAO.deleteByCode(code);
    }
    /**
     * 根据code和date删除单条数据
     * @param date
     */
    async deleteByCodeAndDate(code, date) {
        await detailMonthDAO.deleteByCodeAndDate(code, date);
    }
    /**
     * 实体列表转Map，key为code，value为entity
     * @param entities
     * @returns
     */
    entities2Map(entities) {
        const map = new Map();
        entities.forEach((entity) => {
            map.set(entity.code, entity);
        });
        return map;
    }
    /**
     * 根据日期区间和code批量删除
     * @param startDate
     * @param endDate
     * @param code
     */
    async deleteBatchByDatePeriodAndCode(startDate, endDate, code) {
        await detailMonthDAO.deleteBatchByDatePeriodAndCode(startDate, endDate, code);
    }
    /**
     * 批量新增历史数据单只股票
     * @param entities
     */
    async batchAddSingleHistory(entities) {
        if (entities.length > 0) {
            const code = entities[0].code;
            await this.deleteByCode(code);
            await detailMonthDAO.batchAdd(entities);
        }
    }
    /**
     * 批量新增所有股票的一周的数据，每日拉取股票明细后同步更新此处对应的周线数据
     * @param entities
     */
    async batchAddOneMonthDatas(entities) {
        if (entities.length > 0) {
            await detailMonthDAO.batchAdd(entities);
        }
    }
    /**
     * 新增一条周线数据
     * @param entity
     */
    async add(entity) {
        const { code, date } = entity;
        await this.deleteByCodeAndDate(code, date);
        await detailMonthDAO.add(entity);
    }
    /**
     * 获取给定codes股票在给定时间区间的所有数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(codeArray, startDate, endDate) {
        Util_1.default.log(`开始获取给定codes股票在给定时间区间的所有数据，耗时较长，耐心等待......`);
        const entities = await detailMonthDAO.getStockListBetweenDatePeriod(codeArray, startDate, endDate);
        Util_1.default.log(`获取给定codes股票在给定时间区间的所有数据完毕！长度为:${entities.length}`);
        return entities;
    }
    /**
     * 返回给定股票编码数组在给定时间区间的明细列表
     * @param startDate
     * @param endDate
     * @param codeArray
     * @returns
     */
    async getListByCodeArrayAndDatePeriod(startDate, endDate, codeArray) {
        const entities = await detailMonthDAO.getListByCodeArrayAndDatePeriod(startDate, endDate, codeArray);
        return this.transEntitiesDate2LocaleDate(entities);
    }
    /**
     * 返回给定股票编码数组在给定时间区间的明细列表
     * @param startDate
     * @param endDate
     * @param codeArray
     * @returns
     */
    async getListByCodeArrayBeforeGivenDate(startDate, endDate, codeArray) {
        const entities = await detailMonthDAO.getListByCodeArrayBeforeGivenDate(startDate, endDate, codeArray);
        return this.transEntitiesDate2LocaleDate(entities);
    }
    /**
     * 查看给定股票在给定日期区间的明细列表
     * @param startDate
     * @param endDate
     * @param code
     * @returns
     */
    async getListByCodeAndDatePeriod(startDate, endDate, code) {
        const entities = await detailMonthDAO.getListByCodeAndDatePeriod(startDate, endDate, code);
        return this.transEntitiesDate2LocaleDate(entities);
    }
    /**
     * getRawMany时返回日期是utc时间，在此转为本地时间
     * @param entities
     * @returns
     */
    transEntitiesDate2LocaleDate(entities) {
        entities.forEach((entity) => {
            entity.date = DateUtil_1.default.getDateStrYMD(new Date(entity.date));
        });
        return entities;
    }
    /**
     * 获取给定code在给定日期以前的n条明细数据
     * @param date
     * @param code
     * @returns
     */
    async getSingleKLineData(endDate, code, days = 360) {
        const startDate = await plateService.getDateOfTradeDaysBeforeGivenDate(endDate, days);
        const entities = await this.getListByCodeAndDatePeriod(startDate, endDate, code);
        return entities;
    }
    /**
     * 获取给定股票在给定日期以后的未来明细
     * @param date
     * @param code
     * @param months 从给定日期到 months 个月后的月线数据
     * @returns
     */
    async getListByCodeAndAfterDate(date, code, months) {
        const entities = await detailMonthDAO.getListByCodeAndAfterDate(date, code, months);
        return entities;
    }
    async getSingleFutureKLineDataArrayForMonth(date, codeArray, months) {
        const returnArray = [];
        if (!codeArray || codeArray.length === 0) {
            return returnArray;
        }
        for (let i = 0; i < codeArray.length; i++) {
            const code = codeArray[i];
            const entities = await this.getListByCodeAndAfterDate(date, code, months);
            if (entities && entities.length > 1) {
                const start = entities[0];
                const end = entities[entities.length - 1];
                const zf = ((end.close_price - start.close_price) / start.close_price) * 100;
                returnArray.push(zf.toFixed(2));
            }
        }
        return returnArray;
    }
    /**
     * 获取给定code数组的在给定日期以前的N个交易日的k线列表数据
     * @param endDate
     * @param codeArray
     * @param days 向前多少个交易日的数据
     * @returns
     */
    async getKLineDatas(endDate, codeArray, days = 800, volume) {
        let startDate_date = new Date(endDate);
        startDate_date.setDate(startDate_date.getDate() - days);
        const startDate = DateUtil_1.default.getDateStrYMD(startDate_date);
        const splitCodeArray = lodash_1.default.chunk(codeArray, 13);
        let returnArray = [];
        for (let i = 0; i < splitCodeArray.length; i++) {
            const tempCodeArray = splitCodeArray[i];
            const entities = await this.getListByCodeArrayAndDatePeriod(startDate, endDate, tempCodeArray);
            returnArray = returnArray.concat(entities);
        }
        return this.transEntities2EntityListByCode(returnArray, volume);
    }
    isGtMa5(entities, volume) {
        let all = 0;
        for (let i = 0; i < 5; i++) {
            all += entities[entities.length - 1 - i].close_price;
        }
        const ma5 = Number(all / 5);
        let all2 = 0;
        for (let i = 0; i < 10; i++) {
            all2 += entities[entities.length - 1 - i].close_price;
        }
        const ma10 = Number(all2 / 10);
        let all3 = 0;
        for (let i = 0; i < 18; i++) {
            all3 += entities[entities.length - 1 - i].close_price;
        }
        const ma20 = Number(all3 / 18);
        const close_price = entities[entities.length - 1].close_price;
        const open_price = entities[entities.length - 1].open_price;
        const cj_money = entities[entities.length - 1].cj_money;
        const cj_money_last = entities[entities.length - 2].cj_money;
        const zf = entities[entities.length - 1].zf;
        const last_zf = entities[entities.length - 2].zf;
        const last2_zf = entities[entities.length - 3].zf;
        const last3_zf = entities[entities.length - 4].zf;
        if (volume) {
            return ((close_price > ma5 || close_price > ma10 || close_price > ma20) &&
                cj_money < cj_money_last * 0.75);
        }
        else {
            return ((close_price > ma5 || close_price > ma10 || close_price > ma20) &&
                zf > -2 &&
                zf < 15 &&
                last_zf < 10 &&
                last2_zf < 10 &&
                last3_zf < 10 &&
                last_zf > -10 &&
                last2_zf > -10 &&
                last3_zf > -10);
        }
    }
    isLongXy(entities) {
        const entity = entities[entities.length - 1];
        const { high, low, close_price, open_price } = entity;
        if (close_price >= open_price) {
            //红
            const shangying = high - close_price;
            const xiaying = open_price - low;
            return xiaying > shangying * 0.8;
        }
        else {
            const shangying = high - open_price;
            const xiaying = close_price - low;
            return xiaying > shangying * 0.8;
        }
    }
    /**
     * 将按照先code然后date排好序的实体列表转为二维数组，每个子数组是一个股票的按日期排序好的列表
     * @param entities
     */
    transEntities2EntityListByCode(entities, volume) {
        const returnArray = [];
        let tempArray = [];
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            if (tempArray.length === 0) {
                tempArray.push(entity);
            }
            else {
                if (tempArray[0].code === entity.code) {
                    tempArray.push(entity);
                    if (i === entities.length - 1) {
                        if (tempArray.length >= 18) {
                            returnArray.push(tempArray);
                        }
                        tempArray = [];
                    }
                }
                else {
                    if (tempArray.length >= 18) {
                        returnArray.push(tempArray);
                    }
                    tempArray = [];
                    tempArray.push(entity);
                }
            }
        }
        return returnArray;
    }
}
exports.default = DetailMonthService;
