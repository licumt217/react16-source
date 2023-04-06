import Util from "../utils/Util";
import IPlate from "../entities/interfaces/IPlate";
import PlateNames from "../constants/PlateNames";
import BaseDAO from "./BaseDAO";
import Response from "../utils/Response";
import Orders from "../constants/Orders";

class PlateDAO extends BaseDAO {
    table_name = 'stock_plate';

    /**
     * 批量插入大盘数据
     * @param plates 
     * @returns 
     */
    async batchAdd(plates: IPlate[]) {
        try {
            const result = await this.batchInsert(plates);
            return Response.success(result);
        } catch (e: any) {
            const message = `批量插入大盘数据异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }

    /**
     * 返回给定日期开始，向前第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysBeforeGivenDate(
        date: string,
        days: number,
    ) {
        try {
            const name = Util.s(PlateNames.CYB);
            date = Util.s(date) as string;
            const entities = await this.select(["date", "id"])
                .where(`name=${name}`)
                .andWhere(`date<=${date} `)
                .addOrderBy("date", Orders.DESC)
                .limit(days)
                .execute();

            const beforeDate = entities[entities.length - 1].date;
            Util.log(`${date}的前第${days}个交易日的日期是:${beforeDate}`);
            return beforeDate;
        } catch (e: any) {
            const message = `返回给定日期开始，向前第${days} 交易日的日期异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }

    /**
     * 返回给定日期向后第days 交易日的日期。
     * @param {} date
     * @param {*} days
     * @returns
     */
    async getDateOfTradeDaysAfterGivenDate(
        date: string,
        days: number,
    ) {

        try {
            const entities = await this
                .select(['date', 'id'])
                .where(`name=${Util.s(PlateNames.CYB)} && date>${Util.s(date)}`)
                .addOrderBy("date", Orders.DESC)
                .limit(days)
                .execute();
            const beforeDate = entities[entities.length - 1].date;
            Util.log(`${date}的后第${days}个交易日的日期是:${beforeDate}`);
            return beforeDate;
        } catch (e: any) {
            const message = `返回给定日期向后第${days} 交易日的日期异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }

    /**
     * 根据板块名称批量删除给定区间内的数据
     * @param startDate 
     * @param endDate 
     * @param plateName 
     * @returns 
     */
    async deleteByDatePeriodAndPlateName(
        startDate: string,
        endDate: string,
        plateName: string
    ) {
        try {
            const result = await this.delete()
                .where(`name = ${Util.s(plateName)}`)
                .andWhere(`date between ${Util.s(startDate)} and ${Util.s(endDate)}`)
                .execute();

            return result;
        } catch (e: any) {
            const message = `根据板块名称批量删除给定区间内的数据异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }



    /**
     * 根据实体新增板块记录
     * @param entity 
     */
    async add(entity: IPlate) {
        try {
            const result = await this.insert(entity)
            return result;
        } catch (e: any) {
            const message = `根据实体新增板块记录异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }

    /**
     * 根据板块名称删除给定日期的数据
     * @param date 
     * @param plateName 
     * @returns 
     */
    async deleteBatchByDateAndPlateName(
        date: string,
        plateName: string,
    ) {
        try {
            return this.delete()
                .where(`date= ${Util.s(date)} and name=${Util.s(plateName)}`)
                .execute();
        } catch (e: any) {
            const message = `根据板块名称删除给定日期的数据异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }

    /**
     * 获取在给定时间区间的所有板块数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(
        startDate: string,
        endDate: string,
    ) {
        Util.log(`开始获取大盘在给定时间区间的所有数据，耗时较长，耐心等待......`);

        try {
            const result = await this.select(["cj_money", "name", "close_price", "zf", "high", "low", "open_price"])
                .where(`date between ${Util.s(startDate)} and ${Util.s(endDate)}`)
                .addOrderBy("date", Orders.DESC)
                .execute();
            Util.log(`获取大盘在给定时间区间的所有数据完毕！长度为:${result.length}`);
            return result;
        } catch (e: any) {
            const message = `获取在给定时间区间的所有板块数据异常`;
            Util.log(`${message}：`, e);
            throw (Response.businessException(message))
        }
    }
}

export default PlateDAO;