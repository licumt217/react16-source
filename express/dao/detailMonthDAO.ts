import Util from "../utils/Util";
import StockUtil from "../utils/StockUtil";
import BaseDAO from "./BaseDAO";
import Orders from "../constants/Orders";
import DetailMonth from "../entities/DetailMonth";

class DetailMonthDAO extends BaseDAO {
    table_name = 'stock_detail_month';
    /**
    * 根据日期删除所有的。谨慎操作！！！
    * @param date
    */
    async deleteByDate(date: string): Promise<void> {
        await super.delete()
            .where(`date = :date`)
            .setParameters({
                date,
            })
            .execute();
    }

    /**
     * 根据code删除所有的。谨慎操作
     * @param code 
     */
    async deleteByCode(code: string): Promise<void> {
        await this
            .delete()
            .where(`code = :code`)
            .setParameters({
                code,
            })
            .execute();
    }

    /**
     * 根据code和date删除单条数据
     * @param date
     */
    async deleteByCodeAndDate(code: string, date: string): Promise<void> {
        await this.delete()
            .where(`code = :code and date=:date`)
            .setParameters({
                code,
                date,
            })
            .execute();
    }

    /**
     * 根据日期区间和code批量删除
     * @param startDate 
     * @param endDate 
     * @param code 
     */
    async deleteBatchByDatePeriodAndCode(
        startDate: string,
        endDate: string,
        code: string,
    ): Promise<void> {
        await this
            .delete()
            .where(` code = :code`)
            .andWhere('(date between :startDate and :endDate)')
            .setParameters({
                code,
                startDate,
                endDate,
            })
            .execute();
    }

    async batchAdd(entities: DetailMonth[]) {
        await super.batchInsert(entities);
    }

    async add(entity: DetailMonth) {
        await super.insert(entity);
    }



    /**
     * 获取给定codes股票在给定时间区间的所有数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(
        codeArray: string[],
        startDate: string,
        endDate: string,
    ): Promise<DetailMonth[]> {
        Util.log(
            `开始获取给定codes股票在给定时间区间的所有数据，耗时较长，耐心等待......`,
        );
        const entities = await super
            .select([
                'code',
                'cj_money',
                'name',
                'close_price',
                'open_price',
                'high',
                'low',
                'zf',
            ])
            .where(' date between :startDate and :endDate ')
            .andWhereIn("code", codeArray)
            .addOrderBy('code', Orders.DESC)
            .andOrderBy('date', Orders.DESC)
            .setParameters({
                startDate,
                endDate,
            })
            .execute();

        Util.log(
            `获取给定codes股票在给定时间区间的所有数据完毕！长度为:${entities.length}`,
        );

        return entities;
    }

    /**
     * 返回给定股票编码数组在给定时间区间的明细列表
     * @param startDate
     * @param endDate
     * @param codeArray
     * @returns
     */
    async getListByCodeArrayAndDatePeriod(
        startDate: string,
        endDate: string,
        codeArray: string[],
    ): Promise<DetailMonth[]> {
        const entities = await super
            .select([
                'code',
                'cj_money',
                'name',
                'open_price',
                'close_price',
                'low',
                'high',
                'zf',
                'date',
            ])
            .where(' date between :startDate and :endDate ')
            .andWhereIn("code", codeArray)
            .addOrderBy('code', Orders.DESC)
            .andOrderBy('date', Orders.ASC)
            .setParameters({
                startDate,
                endDate,
            })
            .execute();

        return entities
    }

    /**
     * 返回给定股票编码数组在给定时间区间的明细列表
     * @param startDate
     * @param endDate
     * @param codeArray
     * @returns
     */
    async getListByCodeArrayBeforeGivenDate(
        startDate: string,
        endDate: string,
        codeArray: string[],
    ): Promise<DetailMonth[]> {
        const entities = await super
            .select([
                'code',
                'cj_money',
                'name',
                'open_price',
                'close_price',
                'low',
                'high',
                'zf',
                'date',
            ])
            .where(' date between :startDate and :endDate ')
            .andWhereIn("code", codeArray)
            .addOrderBy('code', Orders.DESC)
            .andOrderBy('date', Orders.DESC)
            .setParameters({
                startDate,
                endDate,
            })
            .execute();

        return entities
    }

    /**
     * 查看给定股票在给定日期区间的明细列表
     * @param startDate
     * @param endDate
     * @param code
     * @returns
     */
    async getListByCodeAndDatePeriod(
        startDate: string,
        endDate: string,
        code: string,
    ): Promise<DetailMonth[]> {
        const entities = await super
            .select([
                'code',
                'cj_money',
                'name',
                'open_price',
                'close_price',
                'low',
                'high',
                'zf',
                'date',
            ])
            .where(' date between :startDate and :endDate and code=:code')
            .addOrderBy('date', Orders.ASC)
            .setParameters({
                startDate,
                endDate,
                code,
            })
            .execute();
        return entities
    }






    /**
     * 获取给定股票在给定日期以后的未来明细
     * @param date
     * @param code
     * @param months 从给定日期到 months 个月后的月线数据
     * @returns
     */
    async getListByCodeAndAfterDate(
        date: string,
        code: string,
        months: number,
    ): Promise<DetailMonth[]> {

        const entities = await super
            .select("*")
            .where(' date >= :date and code=:code')
            .addOrderBy('date', Orders.ASC)
            .setParameters({
                date,
                code,
            })
            .limit(Number(months) + 1)
            .execute();
        return entities;
    }

}

export default DetailMonthDAO;