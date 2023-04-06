"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockUtil_1 = __importDefault(require("../utils/StockUtil"));
const Util_1 = __importDefault(require("../utils/Util"));
const plateDAO_1 = __importDefault(require("../dao/plateDAO"));
const PlateNames_1 = __importDefault(require("../constants/PlateNames"));
const plateDAO = new plateDAO_1.default();
class PlateService {
    /**
     * 根据板块名称从东方财富拉取对应数据然后存库。全量操作，需谨慎！！！
     * @param plateName
     */
    async fetchHistoryDataByPlateName(plateName) {
        const historyArray = await StockUtil_1.default.fetchPlateHistoryDayDataByName(plateName);
        if (historyArray.length > 0) {
            const startDate = historyArray[0].date;
            const endDate = historyArray[historyArray.length - 1].date;
            await this.deleteByDatePeriodAndPlateName(startDate, endDate, plateName);
            await this.batchAdd(historyArray);
            Util_1.default.log(`大盘${plateName}历史数据拉取完毕`);
        }
    }
    /**
     * 根据板块名称批量删除给定区间内的数据
     * @param startDate
     * @param endDate
     * @param plateName
     */
    async deleteByDatePeriodAndPlateName(startDate, endDate, plateName) {
        await plateDAO.deleteByDatePeriodAndPlateName(startDate, endDate, plateName);
    }
    /**
     * 单条新增
     * @param entity
     */
    async add(entity) {
        await plateDAO.insert(entity);
    }
    /**
     * 批量新增
     * @param entities
     */
    async batchAdd(entities) {
        await plateDAO.batchAdd(entities);
    }
    /**
     * 从东方财富拉取所有大盘板块历史数据
     */
    async fetchAllHistoryData() {
        for (const key in PlateNames_1.default) {
            const plateName = PlateNames_1.default[key];
            await this.fetchHistoryDataByPlateName(plateName);
        }
    }
    /**
     * 从东方财富拉取当天所以欧大盘数据然后存库。
     */
    async fetchAllPlates() {
        for (const key in PlateNames_1.default) {
            const plateName = PlateNames_1.default[key];
            await this.fetchByPlateName(plateName);
        }
    }
    /**
     * 返回给定日期开始，向前第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysBeforeGivenDate(date, days) {
        return await plateDAO.getDateOfTradeDaysBeforeGivenDate(date, days);
    }
    /**
     * 返回给定日期向后第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysAfterGivenDate(date, days) {
        return await plateDAO.getDateOfTradeDaysAfterGivenDate(date, days);
    }
    /**
     * 从东方财富拉取最新大盘数据然后存库。
     * @param plateName
     */
    async fetchByPlateName(plateName) {
        const entity = await StockUtil_1.default.fetchPlateLatestDayDataByName(plateName);
        if (entity) {
            const date = entity.date;
            await this.deleteBatchByDateAndPlateName(date, plateName);
            await this.add(entity);
            Util_1.default.log(`大盘${plateName}当天数据拉取完毕`);
        }
    }
    /**
     * 根据板块名称删除给定日期的数据
     * @param date
     * @param plateName
     */
    async deleteBatchByDateAndPlateName(date, plateName) {
        await plateDAO.deleteBatchByDateAndPlateName(date, plateName);
    }
    /**
     * 获取给定时间区间的所有大盘数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(startDate, endDate) {
        return await plateDAO.getStockListBetweenDatePeriod(startDate, endDate);
    }
    /**
     * 根据大盘均线判断大盘环境是否适合操作
     * @param stockList
     * @returns
     */
    canOpByPlate(stockList) {
        const [todayStock, todayStock2] = stockList;
        const { close_price } = todayStock;
        let close_price2 = todayStock2.close_price;
        const ma4 = this.getMa(stockList, 4);
        const ma7 = this.getMa(stockList, 7);
        const ma72 = this.getMa(stockList, 7, 1);
        return !(ma4 < ma7 && (close_price < ma7 || close_price2 < ma72));
    }
    /**
     * 获取MA，股票数据为倒序排列
     * @param stocks 一只股票的列表
     * @param num 几日均线
     * @param offsetDays 向前偏移天数
     * @returns
     */
    getMa(stocks, num, offsetDays = 0) {
        if (offsetDays) {
            let all = 0;
            for (let i = offsetDays; i < num + offsetDays; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        }
        else {
            let all = 0;
            for (let i = 0; i < num; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        }
    }
}
exports.default = PlateService;
