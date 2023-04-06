"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("../utils/Util"));
const PlateNames_1 = __importDefault(require("../constants/PlateNames"));
const BaseDAO_1 = __importDefault(require("./BaseDAO"));
const Response_1 = __importDefault(require("../utils/Response"));
const Orders_1 = __importDefault(require("../constants/Orders"));
class PlateDAO extends BaseDAO_1.default {
    table_name = 'stock_plate';
    /**
     * 批量插入大盘数据
     * @param plates
     * @returns
     */
    async batchAdd(plates) {
        try {
            const result = await this.batchInsert(plates);
            return Response_1.default.success(result);
        }
        catch (e) {
            const message = `批量插入大盘数据异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 返回给定日期开始，向前第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysBeforeGivenDate(date, days) {
        try {
            const name = Util_1.default.s(PlateNames_1.default.CYB);
            date = Util_1.default.s(date);
            const entities = await this.select(["date", "id"])
                .where(`name=${name}`)
                .andWhere(`date<=${date} `)
                .addOrderBy("date", Orders_1.default.DESC)
                .limit(days)
                .execute();
            const beforeDate = entities[entities.length - 1].date;
            Util_1.default.log(`${date}的前第${days}个交易日的日期是:${beforeDate}`);
            return beforeDate;
        }
        catch (e) {
            const message = `返回给定日期开始，向前第${days} 交易日的日期异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 返回给定日期向后第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysAfterGivenDate(date, days) {
        try {
            const entities = await this
                .select(['date', 'id'])
                .where(`name=${Util_1.default.s(PlateNames_1.default.CYB)} && date>${Util_1.default.s(date)}`)
                .addOrderBy("date", Orders_1.default.DESC)
                .limit(days)
                .execute();
            const beforeDate = entities[entities.length - 1].date;
            Util_1.default.log(`${date}的后第${days}个交易日的日期是:${beforeDate}`);
            return beforeDate;
        }
        catch (e) {
            const message = `返回给定日期向后第${days} 交易日的日期异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 根据板块名称批量删除给定区间内的数据
     * @param startDate
     * @param endDate
     * @param plateName
     * @returns
     */
    async deleteByDatePeriodAndPlateName(startDate, endDate, plateName) {
        try {
            const result = await this.delete()
                .where(`name = ${Util_1.default.s(plateName)}`)
                .andWhere(`date between ${Util_1.default.s(startDate)} and ${Util_1.default.s(endDate)}`)
                .execute();
            return result;
        }
        catch (e) {
            const message = `根据板块名称批量删除给定区间内的数据异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 根据实体新增板块记录
     * @param entity
     */
    async add(entity) {
        try {
            const result = await this.insert(entity);
            return result;
        }
        catch (e) {
            const message = `根据实体新增板块记录异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 根据板块名称删除给定日期的数据
     * @param date
     * @param plateName
     * @returns
     */
    async deleteBatchByDateAndPlateName(date, plateName) {
        try {
            return this.delete()
                .where(`date= ${Util_1.default.s(date)} and name=${Util_1.default.s(plateName)}`)
                .execute();
        }
        catch (e) {
            const message = `根据板块名称删除给定日期的数据异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
    /**
     * 获取在给定时间区间的所有板块数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(startDate, endDate) {
        Util_1.default.log(`开始获取大盘在给定时间区间的所有数据，耗时较长，耐心等待......`);
        try {
            const result = await this.select(["cj_money", "name", "close_price", "zf", "high", "low", "open_price"])
                .where(`date between ${Util_1.default.s(startDate)} and ${Util_1.default.s(endDate)}`)
                .addOrderBy("date", Orders_1.default.DESC)
                .execute();
            Util_1.default.log(`获取大盘在给定时间区间的所有数据完毕！长度为:${result.length}`);
            return result;
        }
        catch (e) {
            const message = `获取在给定时间区间的所有板块数据异常`;
            Util_1.default.log(`${message}：`, e);
            throw (Response_1.default.businessException(message));
        }
    }
}
exports.default = PlateDAO;
