import StockUtil from "../utils/StockUtil"
import Util from "../utils/Util";
import DateUtil from "../utils/DateUtil";
import Strategy from "../constants/Strategy";
import Pick from "../entities/Pick";
import PickDAO from "../dao/pickDAO";
import DetailDaily from "../entities/DetailDaily";
import PlateService from "./plateService";
import DetailDailyService from "./detailDailyService";
import DetailMonthService from "./detailMonthService";

const plateService = new PlateService();
const detailDailyService = new DetailDailyService();
const detailMonthService = new DetailMonthService();
const pickDAO = new PickDAO();
class PickService {

    /**
     * 根据日期删除pick表中的数据
     * @param date
     */
    async deleteByDate(date: string): Promise<void> {
        Util.log(`根据日期：${date}删除pick表中的数据`);
        await pickDAO.deleteByDate(date);
    }

    /**
     * 批量新增
     * @param entities
     */
    async batchAdd(entities: Pick[]): Promise<void> {
        await pickDAO.batchAdd(entities);
    }
    /**
     * 批量更新
     * @param entities
     */
    async batchUpdate(entities: Pick[]): Promise<void> {
        await pickDAO.batchUpdate(entities);
    }

    /**
     * 实体列表转Map，key为code，value为entity
     * @param entities
     * @returns
     */
    entities2Map(entities: Pick[]): Map<string, Pick> {
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
    entities2CodeArray(entities: Pick[]): string[] {
        const array: any = [];
        entities.forEach((entity) => {
            array.push(entity.code);
        });
        return array;
    }

    /**
     * 筛选给定日期符合策略的股票并存库
     * 最核心的筛选策略接口
     * @param date 筛选日期
     * @param days 给定日期前多少个自然日 1095代表3年
     * @param downRatio 股票在给定日期和之前days天内的最高点到给定日期时下跌的比例。0.7代表高点跌下来70%
     * @returns
     */
    async pickMonth(date: string, days: number, downRatio: number): Promise<void> {
        //获取所有股票代码
        const allCodeArray = await detailDailyService.getAllCodeArray();
        const minCounts = 36;

        //删除给定日期的股票
        await this.deleteByDate(date);

        //排除不需要筛选的后剩余的
        const shouldPickCodeArray = allCodeArray

        //计算当前给定日期前days个自然日的日期
        let startDate_date = new Date(date);
        startDate_date.setDate(startDate_date.getDate() - days);
        const startDate = DateUtil.getDateStrYMD(startDate_date)

        //获取待筛选的所有股票列表
        const toPickStocks =
            await detailMonthService.getListByCodeArrayBeforeGivenDate(
                startDate,
                date,
                shouldPickCodeArray,
            );

        //待筛选的股票map
        const pickMap: any = StockUtil.getPickMap(toPickStocks);

        const entities = [];
        for (const [code, stockList] of pickMap) {
            if (stockList.length >= minCounts) {
                const { cj_money, code, name } = stockList[0];
                for (const strategyKey in Strategy) {
                    const strategyValue = Strategy[strategyKey];

                    if (
                        StockUtil.isHitStragety(
                            pickMap.get(code),
                            strategyValue,
                            downRatio
                        )
                    ) {
                        const pick = new Pick();
                        pick.strategy = strategyValue;
                        pick.code = code;
                        pick.date = date;
                        entities.push(pick);
                    }
                }
            }
        }
        await this.batchAdd(entities);

    }


    /**
     * 筛选给定日期符合策略的股票并存库
     * 最核心的筛选策略接口
     * @param date 筛选日期
     * @returns
     */
    async pickBackup(date: string): Promise<void> {
        //首先判断所选日期库中是否有数据，没有的话返回空
        const count = await detailDailyService.getCountsByDate(date);
        if (count === 0) {
            return;
        }
        //获取所有股票代码
        const allCodeArray = await detailDailyService.getAllCodeArray();
        //删除给定日期的股票
        await this.deleteByDate(date);


        //计算出，date向前第days个交易日的date
        const days = 35;

        const startDate = await plateService.getDateOfTradeDaysBeforeGivenDate(
            date,
            days,
        );


        //获取待筛选的所有股票列表
        const toPickStocks =
            await detailDailyService.getStockListBetweenDatePeriod(
                allCodeArray,
                startDate,
                date,
            );

        const plateStocks =
            await plateService.getStockListBetweenDatePeriod(
                startDate,
                date,
            );


        //待筛选的股票map
        const pickMap: any = StockUtil.getPickMap(toPickStocks);

        const entities = [];

        for (const [code, stockList] of pickMap) {
            if (stockList.length >= days - 5) {
                const { cj_money, code, name } = stockList[0];
                //非st且成交量大于3000万才筛选
                if (StockUtil.isStOrTuishi(name)) {
                } else {
                    for (const strategyKey in Strategy) {
                        const strategyValue = Strategy[strategyKey];

                        if (
                            StockUtil.isHitStragety(
                                pickMap.get(code),
                                strategyValue, 0.7
                            )
                        ) {
                            const pick = new Pick();
                            pick.strategy = strategyValue;
                            pick.code = code;
                            pick.date = date;
                            entities.push(pick);
                        }
                    }
                }
            }
        }
        await this.batchAdd(entities);

    }



    /**
     * 根据日期返回对应列表
     * @param date
     * @returns
     */
    async getListByDateAndStrategy(
        date: string,
        strategy: string,
    ): Promise<Pick[] | DetailDaily[]> {
        return await this.getListByDateAndStrategy(date, strategy)
    }
}

export default PickService;