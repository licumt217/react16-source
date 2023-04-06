"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDAO_1 = __importDefault(require("./BaseDAO"));
class PickDAO extends BaseDAO_1.default {
    table_name = 'stock_pick';
    /**
     * 根据日期删除pick表中的数据
     * @param date
     */
    async deleteByDate(date) {
        await super
            .delete()
            .where(`date = :date `)
            .setParameters({
            date,
        })
            .execute();
    }
    /**
     * 批量新增
     * @param entities
     */
    async batchAdd(entities) {
        await super.batchInsert(entities);
    }
    /**
     * 批量更新
     * @param entities
     */
    async batchUpdate(entities) {
        await super.batchSave(entities);
    }
    /**
     * 根据日期返回对应列表
     * @param date
     * @returns
     */
    async getListByDateAndStrategy(date, strategy) {
        const entities = await super
            .select(["code", "date"])
            .where(`date = :date and strategy=:strategy`)
            .distinct()
            .setParameters({
            date,
            strategy,
        })
            .execute();
        return entities;
    }
}
exports.default = PickDAO;
