import Response from '../utils/Response'
import DetailDailyService from "../services/detailDailyService"

const express = require('express');
const detailDailyRouter = express.Router();
const service = new DetailDailyService();


detailDailyRouter.get(`/fetch`, async function (req: any, res: any, next: any) {
    try {
        await service.fetch();
        res.json(Response.success())
    } catch (e) {
        res.json(Response.wrapException(e))
    }
});

detailDailyRouter.get(`/getKLineDatas`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const codeArray: string[] = JSON.parse(req.query.codeArray);
    const r = await service.getKLineDatas(date, codeArray, 200);
    res.json(Response.success(r))
});

detailDailyRouter.get(`/getSingleKLineData`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const code: string = req.query.code;
    if (!date || !code) {
        res.json(Response.businessException("date或code参数不能为空，请检查！"))
    } else {
        const r = await service.getSingleKLineData(date, code, 360);
        res.json(Response.success(r))
    }
});

detailDailyRouter.get(`/getSingleFutureKLineData`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const code: string = req.query.code;
    const r = await service.getSingleFutureKLineData(date, code);
    res.json(Response.success(r))
});

//TODO 
detailDailyRouter.get(`/getSingleFutureKLineDataArray`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const codeArray: string[] = JSON.parse(req.query.codeArray);
    const r = await service.getSingleFutureKLineDataArray(date, codeArray);
    res.json(Response.success(r))
});

detailDailyRouter.get(`/getSingleBeforeKLineData`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const code: string = req.query.code;
    const r = await service.getSingleBeforeKLineData(date, code);
    res.json(Response.success(r))
});

detailDailyRouter.get(`/getHslTop500`, async function (req: any, res: any, next: any) {
    const date: string = req.query.date;
    const r = await service.getHslTop500(date);
    res.json(Response.success(r))
});



detailDailyRouter.get(`/fetchHistoryData`, async function (req: any, res: any, next: any) {
    const r = await service.fetchHistoryData();
    res.json(Response.success(r))
});



export default detailDailyRouter;
