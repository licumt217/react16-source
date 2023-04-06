import StockUtil from "../utils/StockUtil"
import Util from "../utils/Util";
import IPlate from "../entities/interfaces/IPlate";
import PlateDAO from "../dao/plateDAO";
import PlateNames from "../constants/PlateNames";
import Response from "../utils/Response";

const plateDAO = new PlateDAO();
class PlateService {

    /**
     * 根据板块名称从东方财富拉取对应数据然后存库。全量操作，需谨慎！！！
     * @param plateName 
     */
    async fetchHistoryDataByPlateName(plateName: string): Promise<void> {
        const historyArray = await StockUtil.fetchPlateHistoryDayDataByName(plateName);

        if (historyArray.length > 0) {
            const startDate = historyArray[0].date;
            const endDate = historyArray[historyArray.length - 1].date;
            await this.deleteByDatePeriodAndPlateName(
                startDate,
                endDate,
                plateName,
            );
            await this.batchAdd(historyArray);
            Util.log(`大盘${plateName}历史数据拉取完毕`);
        }
    }

    /**
     * 根据板块名称批量删除给定区间内的数据
     * @param startDate 
     * @param endDate 
     * @param plateName 
     */
    async deleteByDatePeriodAndPlateName(
        startDate: string,
        endDate: string,
        plateName: string,
    ) {
        await plateDAO.deleteByDatePeriodAndPlateName(startDate, endDate, plateName);
    }

    /**
     * 单条新增
     * @param entity
     */
    async add(entity: IPlate): Promise<void> {
        await plateDAO.insert(entity);
    }

    /**
     * 批量新增
     * @param entities
     */
    async batchAdd(entities: IPlate[]) {
        await plateDAO.batchAdd(entities);
    }

    /**
     * 从东方财富拉取所有大盘板块历史数据
     */
    async fetchAllHistoryData(): Promise<void> {
        for (const key in PlateNames) {
            const plateName = PlateNames[key];
            await this.fetchHistoryDataByPlateName(plateName);
        }
    }
    /**
     * 从东方财富拉取当天所以欧大盘数据然后存库。
     */
    async fetchAllPlates(): Promise<void> {
        for (const key in PlateNames) {
            const plateName = PlateNames[key];
            await this.fetchByPlateName(plateName);
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
    ): Promise<string> {
        return await plateDAO.getDateOfTradeDaysBeforeGivenDate(date, days);
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
    ): Promise<string> {

        return await plateDAO.getDateOfTradeDaysAfterGivenDate(date, days);
    }

    /**
     * 从东方财富拉取最新大盘数据然后存库。
     * @param plateName
     */
    async fetchByPlateName(plateName: string): Promise<void> {
        const entity = await StockUtil.fetchPlateLatestDayDataByName(plateName);
        if (entity) {
            const date = entity.date;

            await this.deleteBatchByDateAndPlateName(date, plateName);
            await this.add(entity);
            Util.log(`大盘${plateName}当天数据拉取完毕`);
        }
    }

    /**
     * 根据板块名称删除给定日期的数据
     * @param date 
     * @param plateName 
     */
    async deleteBatchByDateAndPlateName(
        date: string,
        plateName: string,
    ): Promise<void> {
        await plateDAO.deleteBatchByDateAndPlateName(date, plateName)
    }

    /**
     * 获取给定时间区间的所有大盘数据
     * @returns {Promise<{isSuccess, errorMsg}>}
     */
    async getStockListBetweenDatePeriod(
        startDate: string,
        endDate: string,
    ): Promise<IPlate[]> {
        return await plateDAO.getStockListBetweenDatePeriod(startDate, endDate);
    }

    /**
     * 根据大盘均线判断大盘环境是否适合操作
     * @param stockList 
     * @returns 
     */
    canOpByPlate(stockList: IPlate[]) {
        const [todayStock, todayStock2] =
            stockList;
        const { close_price } = todayStock;
        let close_price2 = todayStock2.close_price;
        const ma4 = this.getMa(stockList, 4);
        const ma7 = this.getMa(stockList, 7);
        const ma72 = this.getMa(stockList, 7, 1);
        return !(ma4 < ma7 && (close_price < ma7 || close_price2 < ma72))
    }

    /**
     * 获取MA，股票数据为倒序排列
     * @param stocks 一只股票的列表
     * @param num 几日均线
     * @param offsetDays 向前偏移天数
     * @returns
     */
    private getMa(stocks: IPlate[], num: number, offsetDays = 0): number {
        if (offsetDays) {
            let all = 0;
            for (let i = offsetDays; i < num + offsetDays; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        } else {
            let all = 0;
            for (let i = 0; i < num; i++) {
                all += stocks[i].close_price;
            }
            return Number((all / num).toFixed(2));
        }
    }
}

export default PlateService;