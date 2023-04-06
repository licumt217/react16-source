import DetailDaily from '../entities/DetailDaily';
import DetailMonth from '../entities/DetailMonth';
import IDetailDaily from '../entities/interfaces/IDetailDaily';
import IDetailMonth from '../entities/interfaces/IDetailMonth';
import Plate from '../entities/Plate';
import DateUtil from './DateUtil';
import Util from './Util';

const StockParser = {
    /**
     * 提取接口返回的日线列表数据或月线列表数据
     * @param data
     * @returns
     */
    parseDatas(data: string, type: string = "day"): any {


        let stockArray: any = [];
        try {
            const firstQuoteIndex = data.indexOf('{');

            data = data.substring(firstQuoteIndex, data.length - 2);

            const parsedData = JSON.parse(data).data;

            if (parsedData === null) {
                stockArray = null;
            } else {
                if (type === "day") {
                    stockArray = parsedData.diff;
                } else {
                    stockArray = parsedData;
                }

            }
        } catch (e: any) {
            Util.log(`提取接口返回的日线列表数据或月线列表数据异常：${e.message}`);
            stockArray = null;
        }
        return stockArray;
    },

    /**
     * 提取接口返回的单只股票或板块的历史数据
     * @param data
     * @returns
     */
    parseData(data: string): any {
        let returnObj: any = {};
        try {
            const firstQuoteIndex = data.indexOf('{');

            data = data.substring(firstQuoteIndex, data.length - 2);

            const parsedData = JSON.parse(data).data;

            if (parsedData === null) {
                returnObj = null;
            } else {
                returnObj = {
                    name: parsedData.name,
                    stockArray: parsedData.klines,
                };
            }
        } catch (e: any) {
            Util.log(`提取接口返回的单只股票或板块的历史数据异常：${e.message}`);
            returnObj = null;
        }
        return returnObj;
    },
    /**
     * 将接口返回的k线数组转为日线实体列表
     * @param stockArray 
     * @param code 
     * @param name 
     * @returns 
     */
    parseStockArray2DailyEntities(stockArray: any[], code: string, name: string) {
        const returnArray: any = [];
        if (stockArray && stockArray.length > 0) {
            stockArray.forEach((item: string) => {
                const itemArray = item.split(',');
                const [
                    date,
                    open_price,
                    close_price,
                    high,
                    low,
                    cj_nums,
                    cj_money,
                    zhenfu,
                    zf,
                    zd_money,
                    hsl,
                ] = itemArray;
                //动态计算昨日收盘价和总流通市值
                const last_close_price = (
                    Number(close_price) - Number(zd_money)
                ).toFixed(2);

                const entity = new DetailDaily();
                const opDate = DateUtil.getOpDt();
                const id = Util.uuid();

                entity.id = id;
                entity.code = code;
                entity.name = name;
                entity.date = date;
                entity.opDate = opDate;
                entity.open_price = Number(open_price);
                entity.close_price = Number(close_price);
                entity.high = Number(high);
                entity.low = Number(low);
                entity.cj_nums = Number(cj_nums);
                entity.cj_money = Number(cj_money);
                entity.zf = Number(zf);
                entity.zd_money = Number(zd_money);
                entity.hsl = Number(hsl);
                entity.last_close_price = Number(last_close_price);

                returnArray.push(entity);
            });
        }
        return returnArray;

    },

    /**
     * 将接口返回的k线数组转为板块实体列表
     * @param stockArray 
     * @param name 
     * @returns 
     */
    parseStockArray2PlateEntities(stockArray: any[], name: string) {
        const returnArray: any = [];
        if (stockArray && stockArray.length > 0) {

            stockArray.forEach((item: string) => {
                const itemArray = item.split(',');

                const [
                    date,
                    open_price,
                    close_price,
                    high,
                    low,
                    cj_nums,
                    cj_money,
                    zhenfu,
                    zf,
                    zd_money,
                ] = itemArray;
                //动态计算昨日收盘价和总流通市值
                const last_close_price = (
                    Number(close_price) - Number(zd_money)
                ).toFixed(2);

                console.log(date);

                const entity = new Plate();
                const opDate = DateUtil.getOpDt();

                entity.opDate = opDate;
                entity.id = Util.uuid();
                entity.name = name;
                entity.date = date;
                entity.open_price = Number(open_price);
                entity.close_price = Number(close_price);
                entity.high = Number(high);
                entity.low = Number(low);
                entity.cj_nums = Number(cj_nums);
                entity.cj_money = Number(cj_money);
                entity.zhenfu = Number(zhenfu);
                entity.zf = Number(zf);
                entity.zd_money = Number(zd_money);
                entity.last_close_price = Number(last_close_price);

                returnArray.push(entity);
            });
        }
        return returnArray;

    },
    /**
     * 股票不开盘等，返回数据是-的，将此中划线转为0；
     */
    transZhx2Zero(data: any) {
        return data === '-' ? 0 : data;
    },
    /**
     * 将东方财富返回的原始股票对象数组转换为DetailMonth 对象数组
     * @param originalStockObj
     * @returns
     */
    transStockArray2DetailMonthEntities(originalStockArray: any): IDetailMonth[] {
        const code = originalStockArray.code;
        const name = originalStockArray.name;
        const klines = originalStockArray.klines;
        const entities: any = [];

        klines.forEach((klineString: any) => {
            const arr = klineString.split(',');

            const [
                date,
                open_price,
                close_price,
                high,
                low,
                cj_nums,
                cj_money,
                zhenfu,
                zf,
                zd_money,
                hsl,
            ] = arr;

            const entity = new DetailMonth();
            entity.code = code;
            entity.name = name;
            entity.cj_money = this.transZhx2Zero(cj_money);
            entity.zf = this.transZhx2Zero(zf);
            entity.high = this.transZhx2Zero(high);
            entity.low = this.transZhx2Zero(low);
            entity.open_price = this.transZhx2Zero(open_price);
            entity.close_price = this.transZhx2Zero(close_price);
            entity.date = date;

            entities.push(entity);
        });
        return entities;
    },

    /**
     * 将东方财富返回的原始股票对象数组转换为DetailDaily
     * @param originalStockArray 
     * @returns 
     */
    transStockArray2DetailDailyEntities(
        originalStockArray: any[],
    ): IDetailDaily[] {
        const entities: any = [];

        originalStockArray.forEach((originalStockObj) => {
            entities.push(this.transOriginalObj2DetailDailyEntity(originalStockObj));
        });
        return entities;
    },
    /**
     * 将东方财富返回的原始股票对象转换为DetailDaily 对象
     * @param originalStockObj
     * @returns
     */
    transOriginalObj2DetailDailyEntity(originalStockObj: any): IDetailDaily {
        const code = originalStockObj.f12;
        const name = originalStockObj.f14;
        const close_price = originalStockObj.f2;
        const zd_money = originalStockObj.f4;
        const cj_nums = originalStockObj.f5;
        const cj_money = originalStockObj.f6;
        const hsl = originalStockObj.f8;
        const zf = originalStockObj.f3;
        const high = originalStockObj.f15;
        const low = originalStockObj.f16;
        const open_price = originalStockObj.f17;
        const last_close_price = originalStockObj.f18;

        const entity = new DetailDaily();
        const id = Util.uuid();
        const opDate = DateUtil.getOpDt();

        entity.id = id;
        entity.code = code;
        entity.name = name;
        entity.zd_money = this.transZhx2Zero(zd_money);
        entity.cj_nums = this.transZhx2Zero(cj_nums);
        entity.cj_money = this.transZhx2Zero(cj_money);
        entity.hsl = this.transZhx2Zero(hsl);
        entity.zf = this.transZhx2Zero(zf);
        entity.high = this.transZhx2Zero(high);
        entity.low = this.transZhx2Zero(low);
        entity.open_price = this.transZhx2Zero(open_price);
        entity.close_price = this.transZhx2Zero(close_price);
        entity.last_close_price = this.transZhx2Zero(last_close_price);
        entity.date = DateUtil.getDateStrYMD();
        entity.opDate = opDate;

        return entity;
    },
    /**
     * 将东方财富返回的原始股票对象转换为DetailMonth 对象
     * @param originalStockObj
     * @returns
     */
    transOriginalObj2DetailMonthEntity(originalStockObj: any): IDetailMonth {
        // '2022-06-02,4.08,4.68,4.68,4.08,2086449,909760128.00,13.82,7.83,0.34,17.27';

        const array = originalStockObj.split(',');

        const code = originalStockObj.f12;
        const name = originalStockObj.f14;
        const close_price = originalStockObj.f2;
        const zd_money = originalStockObj.f4;
        const cj_nums = originalStockObj.f5;
        const cj_money = originalStockObj.f6;
        const hsl = originalStockObj.f8;
        const zf = originalStockObj.f3;
        const high = originalStockObj.f15;
        const low = originalStockObj.f16;
        const open_price = originalStockObj.f17;
        const last_close_price = originalStockObj.f18;

        const entity = new DetailDaily();
        entity.code = code;
        entity.name = name;
        entity.zd_money = this.transZhx2Zero(zd_money);
        entity.cj_nums = this.transZhx2Zero(cj_nums);
        entity.cj_money = this.transZhx2Zero(cj_money);
        entity.hsl = this.transZhx2Zero(hsl);
        entity.zf = this.transZhx2Zero(zf);
        entity.high = this.transZhx2Zero(high);
        entity.low = this.transZhx2Zero(low);
        entity.open_price = this.transZhx2Zero(open_price);
        entity.close_price = this.transZhx2Zero(close_price);
        entity.last_close_price = this.transZhx2Zero(last_close_price);
        entity.date = DateUtil.getDateStrYMD();

        return entity;
    },
}

export default StockParser;
