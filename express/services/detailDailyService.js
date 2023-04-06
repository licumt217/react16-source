"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockUtil_1 = __importDefault(require("../utils/StockUtil"));
const Util_1 = __importDefault(require("../utils/Util"));
const lodash_1 = __importDefault(require("lodash"));
const detailDailyDAO_1 = __importDefault(require("../dao/detailDailyDAO"));
const plateService_1 = __importDefault(require("./plateService"));
const detailMonthService_1 = __importDefault(require("./detailMonthService"));
const Response_1 = __importDefault(require("../utils/Response"));
const DateUtil_1 = __importDefault(require("../utils/DateUtil"));
const plateService = new plateService_1.default();
const detailMonthService = new detailMonthService_1.default();
const detailDailyDAO = new detailDailyDAO_1.default();
class DetailDailyService {
    /**
     * 根据日期删除所有的。谨慎操作！！！
     * @param date
     */
    async deleteByDate(date) {
        await detailDailyDAO.deleteByDate(date);
    }
    /**
     * 根据code删除所有的。谨慎操作！！！
     * @param code
     */
    async deleteByCode(code) {
        await detailDailyDAO.deleteByCode(code);
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
     * 将实体列表的code转为数组
     * @param entities
     * @returns
     */
    entities2CodeArray(entities) {
        const array = [];
        entities.forEach((entity) => {
            array.push(entity.code);
        });
        return array;
    }
    /**
     * 根据日期区间和code批量删除
     * @param startDate
     * @param endDate
     * @param code
     */
    async deleteBatchByDatePeriodAndCode(startDate, endDate, code) {
        await detailDailyDAO.deleteBatchByDatePeriodAndCode(startDate, endDate, code);
    }
    /**
     * 批量新增
     * 批量时用insert比save快了几百倍！！！
     * @param entities
     */
    async batchAdd(entities) {
        await detailDailyDAO.batchAdd(entities);
    }
    //   @Cron('0 1 17 * * *')
    cronFetch() {
        if (process.env.fetch) {
            process.env.fetch = '';
            this.fetch();
        }
        else {
            process.env.fetch = '1';
        }
    }
    /**
     * 每日从东方财富拉取最新数据，并持久入库
     */
    async fetch() {
        if (DateUtil_1.default.isWeekEnd()) {
            throw Response_1.default.businessException("周末不能拉取最新数据！");
        }
        const nowDate = DateUtil_1.default.getDateStrYMD();
        const entities = await StockUtil_1.default.fetchLatestDayData();
        await this.deleteByDate(nowDate);
        await this.batchAdd(entities);
        //拉取大盘数据并存库
        await plateService.fetchAllPlates();
    }
    async fetchMonth() {
        const allCodes = await this.getAllCodeArray();
        for (let i = 0; i < allCodes.length; i++) {
            const code = allCodes[i];
            const entities = await StockUtil_1.default.fetchMonthHistoryDataByCode(code);
            if (entities) {
                await detailMonthService.deleteByCode(code);
                await detailMonthService.batchAddOneMonthDatas(entities);
            }
            Util_1.default.log(`第${i}只票的月线数据。。。`);
        }
    }
    /**
     * 获取所有的股票代码列表 code array
     * TODO 暂时屏蔽掉创业板
     * @returns
     */
    async getAllCodeArray() {
        const entities = await detailDailyDAO.getAllCodeArray();
        Util_1.default.log(`获取所有的股票代码列表完毕，长度：${entities.length}`);
        return entities;
    }
    /**
     * 获取给定日期的在库股票数量
     * @returns
     */
    async getCountsByDate(date) {
        const count = await detailDailyDAO.getCountsByDate(date);
        Util_1.default.log(`获取给定日期:${date}在库股票数量:${count}`);
        return count;
    }
    /**
     * 获取所有单子股票的历史数据然后存库。全量操作，需谨慎！！！
     */
    async fetchHistoryData() {
        const allCodes = await this.getAllCodeArray();
        for (let j = 0; j < allCodes.length; j++) {
            const code = allCodes[j];
            const historyArray = await StockUtil_1.default.fetchSingleHistoryDayData(code);
            if (historyArray.length > 0) {
                const startDate = historyArray[0].date;
                const endDate = historyArray[historyArray.length - 1].date;
                await this.deleteBatchByDatePeriodAndCode(startDate, endDate, code);
                await this.batchAdd(historyArray);
                Util_1.default.log(`第${j + 1}只股票:${code}数据筛选完毕`);
            }
        }
    }
    /**
     * 获取给定codes股票在给定时间区间的所有数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(codeArray, startDate, endDate) {
        Util_1.default.log(`开始获取给定codes股票在给定时间区间的所有数据，耗时较长，耐心等待......`);
        return await detailDailyDAO.getListByCodeArrayAndDatePeriod(startDate, endDate, codeArray);
    }
    /**
     * 获取给定日期的红盘数量
     * @param date
     * @returns
     */
    async getRedCountsOfGivenDate(date) {
        Util_1.default.log(`获取给定日期${date}的红盘数量`);
        const count = await detailDailyDAO.getRedCountsOfGivenDate(date);
        Util_1.default.log(`获取给定日期${date}的红盘数量为:${count}`);
        return count;
    }
    /**
     * 返回给定股票编码数组在给定时间区间的明细列表
     * @param startDate
     * @param endDate
     * @param codeArray
     * @returns
     */
    async getListByCodeArrayAndDatePeriod(startDate, endDate, codeArray) {
        const entities = await detailDailyDAO.getListByCodeArrayAndDatePeriod(startDate, endDate, codeArray);
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
        const entities = await detailDailyDAO.getListByCodeAndDatePeriod(startDate, endDate, code);
        return this.transEntitiesDate2LocaleDate(entities);
    }
    /**
     * 根据股票编码返回对应的所有明细列表
     * @param code
     * @returns
     */
    async getListByCode(code) {
        const entities = await detailDailyDAO.getListByCode(code);
        return this.transEntitiesDate2LocaleDate(entities);
    }
    /**
     * 根据股票编码返回对应的所有明细列表
     * @param code
     * @returns
     */
    async getListByCodeLtGivenDate(code, date, days = 660) {
        const entities = await detailDailyDAO.getListByCodeLtGivenDate(code, date, days);
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
     * 获取给定股票在给定日期以后的未来明细
     * @param date
     * @param code
     * @returns
     */
    async getListByCodeAndAfterDate(date, code, days = 23) {
        const entities = await detailDailyDAO.getListByCodeAndAfterDate(date, code, days);
        return entities;
    }
    async getListByCodeAndBeforeDate(date, code, days = 66) {
        let entities = await detailDailyDAO.getListByCodeAndBeforeDate(date, code, days);
        return entities;
    }
    /**
     * 获取给定code在给定日期以后的所有明细数据，查看预测盈利情况如何时用的
     * @param date
     * @param code
     * @returns
     */
    async getSingleFutureKLineData(date, code) {
        const entities = await this.getListByCodeAndAfterDate(date, code);
        return entities;
    }
    async getSingleFutureKLineDataArray(date, codeArray) {
        const returnArray = [];
        if (!codeArray) {
            return [];
        }
        for (let i = 0; i < codeArray.length; i++) {
            const code = codeArray[i];
            const entities = await this.getListByCodeAndAfterDate(date, code);
            if (entities && entities.length > 1) {
                let zf = 0;
                for (let i = 1; i < entities.length; i++) {
                    const entity = entities[i];
                    zf += entity.zf;
                }
                returnArray.push(zf.toFixed(2));
            }
        }
        return returnArray;
    }
    async getSingleBeforeKLineData(date, code) {
        const entities = await this.getListByCodeAndBeforeDate(date, code);
        return entities;
    }
    async getHslTop500(date) {
        return await detailDailyDAO.getHslTop500(date);
    }
    /**
     * 获取给定code在给定日期以前的n条明细数据
     * @param endDate
     * @param code
     * @param days
     * @returns
     */
    async getSingleKLineData(endDate, code, days = 360) {
        const startDate = await plateService.getDateOfTradeDaysBeforeGivenDate(endDate, days);
        const entities = await this.getListByCodeAndDatePeriod(startDate, endDate, code);
        return entities;
    }
    /**
     * 获取给定code数组的在给定日期以前的N个交易日的k线列表数据
     * @param endDate
     * @param codeArray
     * @param days 向前多少个交易日的数据
     * @returns
     */
    async getKLineDatas(endDate, codeArray, days = 200) {
        const startDate = await plateService.getDateOfTradeDaysBeforeGivenDate(endDate, days);
        const splitCodeArray = lodash_1.default.chunk(codeArray, 13);
        let returnArray = [];
        for (let i = 0; i < splitCodeArray.length; i++) {
            const tempCodeArray = splitCodeArray[i];
            const entities = await this.getListByCodeArrayAndDatePeriod(startDate, endDate, tempCodeArray);
            returnArray = returnArray.concat(entities);
        }
        return this.transEntities2EntityListByCode(returnArray);
    }
    /**
     * 将按照先code然后date排好序的实体列表转为二维数组，每个子数组是一个股票的按日期排序好的列表
     * @param entities
     */
    transEntities2EntityListByCode(entities) {
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
                        returnArray.push(tempArray);
                        tempArray = [];
                    }
                }
                else {
                    returnArray.push(tempArray);
                    tempArray = [];
                    tempArray.push(entity);
                }
            }
        }
        return returnArray;
    }
}
exports.default = DetailDailyService;
