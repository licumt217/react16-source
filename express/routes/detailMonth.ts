import Response from '../utils/Response'
import DetailMonthService from "../services/detailMonthService"

const express = require('express');

const detailMonthRouter = express.Router();
const service = new DetailMonthService();


/**
 * 每日拉取最新明细数据存库
 */
detailMonthRouter.get(`/fetch`, async function (req: any, res: any, next: any) {
    // const r = await service.fetch();
    res.json(Response.success())
});

/**
 * 获取给定code数组的在给定日期以前的N个交易日的k线列表数据
 */
detailMonthRouter.get(`/getKLineDatas`, async function (req: any, res: any, next: any) {

    const date: string = req.query.date;
    const volume: string = req.query.volume;
    const codeArray: string[] = JSON.parse(req.query.codeArray);
    const r = await service.getKLineDatas(date, codeArray, 3200, volume);
    res.json(Response.success(r))
});

/**
 * 获取单只股票的明细数据
 */
detailMonthRouter.get(`/getSingleKLineData`, async function (req: any, res: any, next: any) {

    const date: string = req.query.date;
    const code: string = req.query.code;
    if (!date || !code) {
        throw Response.businessException("date或code参数不能为空，请检查！")
    }
    const r = await service.getSingleKLineData(date, code);
    res.json(Response.success(r))
});

/**
 */
detailMonthRouter.get(`/getSingleFutureKLineDataArrayForMonth`, async function (req: any, res: any, next: any) {

    const date: string = req.query.date;
    const months: number = Number(req.query.months);
    const codeArray: string[] = JSON.parse(req.query.codeArray);

    const r = await service.getSingleFutureKLineDataArrayForMonth(date, codeArray, months);
    res.json(Response.success(r))
});

export default detailMonthRouter;
