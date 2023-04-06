import Util from "../utils/Util";
import DateUtil from "../utils/DateUtil";
import StockUtil from "../utils/StockUtil";
import Strategy from "../constants/Strategy";
import IPick from "../entities/interfaces/IPick";
import Pick from "../entities/Pick";
import PlateNames from "../constants/PlateNames";
import BaseDAO from "./BaseDAO";
import Response from "../utils/Response";
import Orders from "../constants/Orders";

class PickDAO extends BaseDAO {
    table_name = 'stock_pick';
    /**
     * 根据日期删除pick表中的数据
     * @param date 
     */
    async deleteByDate(date: string): Promise<void> {
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
    async batchAdd(entities: IPick[]): Promise<void> {
        await super.batchInsert(entities);
    }
    /**
     * 批量更新
     * @param entities
     */
    async batchUpdate(entities: IPick[]): Promise<void> {
        await super.batchSave(entities)
    }




    /**
     * 根据日期返回对应列表
     * @param date
     * @returns
     */
    async getListByDateAndStrategy(
        date: string,
        strategy: string,
    ): Promise<Pick[]> {
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

export default PickDAO;