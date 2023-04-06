"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockUtil_1 = __importDefault(require("../utils/StockUtil"));
const Util_1 = __importDefault(require("../utils/Util"));
const DateUtil_1 = __importDefault(require("../utils/DateUtil"));
const Strategy_1 = __importDefault(require("../constants/Strategy"));
const Pick_1 = __importDefault(require("../entities/Pick"));
const pickDAO_1 = __importDefault(require("../dao/pickDAO"));
const plateService_1 = __importDefault(require("./plateService"));
const detailDailyService_1 = __importDefault(require("./detailDailyService"));
const detailMonthService_1 = __importDefault(require("./detailMonthService"));
const plateService = new plateService_1.default();
const detailDailyService = new detailDailyService_1.default();
const detailMonthService = new detailMonthService_1.default();
const pickDAO = new pickDAO_1.default();
class PickService {
    /**
     * 根据日期删除pick表中的数据
     * @param date
     */
    async deleteByDate(date) {
        Util_1.default.log(`根据日期：${date}删除pick表中的数据`);
        await pickDAO.deleteByDate(date);
    }
    /**
     * 批量新增
     * @param entities
     */
    async batchAdd(entities) {
        await pickDAO.batchAdd(entities);
    }
    /**
     * 批量更新
     * @param entities
     */
    async batchUpdate(entities) {
        await pickDAO.batchUpdate(entities);
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
     * 筛选给定日期符合策略的股票并存库
     * 最核心的筛选策略接口
     * @param date 筛选日期
     * @param days 给定日期前多少个自然日 1095代表3年
     * @param downRatio 股票在给定日期和之前days天内的最高点到给定日期时下跌的比例。0.7代表高点跌下来70%
     * @returns
     */
    async pickMonth(date, days, downRatio) {
        //获取所有股票代码
        const allCodeArray = await detailDailyService.getAllCodeArray();
        const minCounts = 36;
        //删除给定日期的股票
        await this.deleteByDate(date);
        //排除不需要筛选的后剩余的
        const shouldPickCodeArray = allCodeArray;
        //计算当前给定日期前days个自然日的日期
        let startDate_date = new Date(date);
        startDate_date.setDate(startDate_date.getDate() - days);
        const startDate = DateUtil_1.default.getDateStrYMD(startDate_date);
        //获取待筛选的所有股票列表
        const toPickStocks = await detailMonthService.getListByCodeArrayBeforeGivenDate(startDate, date, shouldPickCodeArray);
        //待筛选的股票map
        const pickMap = StockUtil_1.default.getPickMap(toPickStocks);
        const entities = [];
        for (const [code, stockList] of pickMap) {
            if (stockList.length >= minCounts) {
                const { cj_money, code, name } = stockList[0];
                for (const strategyKey in Strategy_1.default) {
                    const strategyValue = Strategy_1.default[strategyKey];
                    if (StockUtil_1.default.isHitStragety(pickMap.get(code), strategyValue, downRatio)) {
                        const pick = new Pick_1.default();
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
    async pickBackup(date) {
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
        const startDate = await plateService.getDateOfTradeDaysBeforeGivenDate(date, days);
        //获取待筛选的所有股票列表
        const toPickStocks = await detailDailyService.getStockListBetweenDatePeriod(allCodeArray, startDate, date);
        const plateStocks = await plateService.getStockListBetweenDatePeriod(startDate, date);
        //待筛选的股票map
        const pickMap = StockUtil_1.default.getPickMap(toPickStocks);
        const entities = [];
        for (const [code, stockList] of pickMap) {
            if (stockList.length >= days - 5) {
                const { cj_money, code, name } = stockList[0];
                //非st且成交量大于3000万才筛选
                if (StockUtil_1.default.isStOrTuishi(name)) {
                }
                else {
                    for (const strategyKey in Strategy_1.default) {
                        const strategyValue = Strategy_1.default[strategyKey];
                        if (StockUtil_1.default.isHitStragety(pickMap.get(code), strategyValue, 0.7)) {
                            const pick = new Pick_1.default();
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
    async getListByDateAndStrategy(date, strategy) {
        return await this.getListByDateAndStrategy(date, strategy);
    }
}
exports.default = PickService;
