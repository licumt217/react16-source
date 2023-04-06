"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("../utils/Util"));
const StockUtil_1 = __importDefault(require("../utils/StockUtil"));
const BaseDAO_1 = __importDefault(require("./BaseDAO"));
const Orders_1 = __importDefault(require("../constants/Orders"));
class DetailDailyDAO extends BaseDAO_1.default {
    table_name = 'stock_detail_daily';
    /**
     * 根据日期删除所有的。谨慎操作！！！
     * @param date
     */
    async deleteByDate(date) {
        console.log("sql:" + super
            .delete()
            .where(`date = :date`)
            .setParameters({
            date,
        }).sql);
        await super
            .delete()
            .where(`date = :date`)
            .setParameters({
            date,
        })
            .execute();
    }
    /**
     * 根据code删除所有的。谨慎操作！！！
     * @param code
     */
    async deleteByCode(code) {
        await this
            .delete()
            .where(`code = :code`)
            .setParameters({
            code,
        })
            .execute();
    }
    /**
     * 根据日期区间和code批量删除
     * @param startDate
     * @param endDate
     * @param code
     */
    async deleteBatchByDatePeriodAndCode(startDate, endDate, code) {
        await super
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
    /**
     * 批量新增
     * 批量时用insert比save快了几百倍！！！
     * @param entities
     */
    async batchAdd(entities) {
        await super.batchInsert(entities);
    }
    /**
     * 获取所有的股票代码列表 code array
     * TODO 暂时屏蔽掉创业板
     * @returns
     */
    async getAllCodeArray() {
        const entities = await super
            .select('code')
            .distinct()
            .execute();
        Util_1.default.log(`获取所有的股票代码列表完毕，长度：${entities.length}`);
        return entities.map((entity) => entity.code);
    }
    /**
     * 获取给定日期的在库股票数量
     * @returns
     */
    async getCountsByDate(date) {
        const count = await super
            .select("count(1) ")
            .where({
            date
        }).execute();
        Util_1.default.log(`获取给定日期:${date}在库股票数量:${count}`);
        return count;
    }
    /**
     * 获取给定日期的红盘数量
     * @param date
     * @returns
     */
    async getRedCountsOfGivenDate(date) {
        const count = await this.select(" count(1) ")
            .where(' date =:date and zf>=0')
            .setParameters({
            date,
        })
            .execute();
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
            .addOrderBy('code', Orders_1.default.DESC)
            .andOrderBy('date', Orders_1.default.ASC)
            .setParameters({
            startDate,
            endDate,
        })
            .execute();
        return entities;
    }
    /**
     * 查看给定股票在给定日期区间的明细列表
     * @param startDate
     * @param endDate
     * @param code
     * @returns
     */
    async getListByCodeAndDatePeriod(startDate, endDate, code) {
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
            .addOrderBy('date', Orders_1.default.ASC)
            .setParameters({
            startDate,
            endDate,
            code,
        })
            .execute();
        return entities;
    }
    /**
     * 根据股票编码返回对应的所有明细列表
     * @param code
     * @returns
     */
    async getListByCode(code) {
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
            .where('code=:code')
            .addOrderBy('date', Orders_1.default.ASC)
            .setParameters({
            code,
        })
            .execute();
        return entities;
    }
    /**
     * 根据股票编码返回对应的所有明细列表
     * @param code
     * @returns
     */
    async getListByCodeLtGivenDate(code, date, days = 660) {
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
            .where('code=:code')
            .andWhere(' date <= :date and  code=:code')
            .addOrderBy('date', Orders_1.default.DESC)
            .setParameters({
            code,
            date,
        })
            .limit(days)
            .execute();
        return entities;
    }
    /**
     * 获取给定股票在给定日期以后的未来明细
     * @param date
     * @param code
     * @returns
     */
    async getListByCodeAndAfterDate(date, code, days = 23) {
        const entities = await super.select(" * ")
            .where(' date >= :date and code=:code')
            .addOrderBy('date', Orders_1.default.ASC)
            .setParameters({
            date,
            code,
        })
            .limit(days)
            .execute();
        return entities;
    }
    async getListByCodeAndBeforeDate(date, code, days = 66) {
        let entities = await super.select(" * ")
            .where(' date <= :date and code=:code')
            .addOrderBy('date', Orders_1.default.DESC)
            .setParameters({
            date,
            code,
        })
            .limit(days)
            .execute();
        entities = entities.reverse();
        return entities;
    }
    async getHslTop500(date) {
        console.log("sql:" + super
            .select(['code'])
            .where(' date = :date ')
            .addOrderBy('hsl', Orders_1.default.DESC)
            .setParameters({
            date,
        })
            .limit(500).sql);
        const entities = await super
            .select(['code'])
            .where(' date = :date ')
            .addOrderBy('hsl', Orders_1.default.DESC)
            .setParameters({
            date,
        })
            .limit(500)
            .execute();
        const pickDataCyb = [];
        const pickDataZb = [];
        entities.forEach((item) => {
            const code = item.code;
            if (StockUtil_1.default.is300(code)) {
                pickDataCyb.push(code);
            }
            else {
                pickDataZb.push(code);
            }
        });
        return {
            pickDataCyb,
            pickDataZb,
        };
    }
}
exports.default = DetailDailyDAO;
