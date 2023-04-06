"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../utils/Response"));
const detailDailyService_1 = __importDefault(require("../services/detailDailyService"));
const express = require('express');
const detailDailyRouter = express.Router();
const service = new detailDailyService_1.default();
detailDailyRouter.get(`/fetch`, async function (req, res, next) {
    try {
        await service.fetch();
        res.json(Response_1.default.success());
    }
    catch (e) {
        res.json(Response_1.default.wrapException(e));
    }
});
detailDailyRouter.get(`/getKLineDatas`, async function (req, res, next) {
    const date = req.query.date;
    const codeArray = JSON.parse(req.query.codeArray);
    const r = await service.getKLineDatas(date, codeArray, 200);
    res.json(Response_1.default.success(r));
});
detailDailyRouter.get(`/getSingleKLineData`, async function (req, res, next) {
    const date = req.query.date;
    const code = req.query.code;
    if (!date || !code) {
        res.json(Response_1.default.businessException("date或code参数不能为空，请检查！"));
    }
    else {
        const r = await service.getSingleKLineData(date, code, 360);
        res.json(Response_1.default.success(r));
    }
});
detailDailyRouter.get(`/getSingleFutureKLineData`, async function (req, res, next) {
    const date = req.query.date;
    const code = req.query.code;
    const r = await service.getSingleFutureKLineData(date, code);
    res.json(Response_1.default.success(r));
});
//TODO 
detailDailyRouter.get(`/getSingleFutureKLineDataArray`, async function (req, res, next) {
    const date = req.query.date;
    const codeArray = JSON.parse(req.query.codeArray);
    console.log(codeArray);
    const r = await service.getSingleFutureKLineDataArray(date, codeArray);
    res.json(Response_1.default.success(r));
});
detailDailyRouter.get(`/getSingleBeforeKLineData`, async function (req, res, next) {
    const date = req.query.date;
    const code = req.query.code;
    const r = await service.getSingleBeforeKLineData(date, code);
    res.json(Response_1.default.success(r));
});
detailDailyRouter.get(`/getHslTop500`, async function (req, res, next) {
    const date = req.query.date;
    const r = await service.getHslTop500(date);
    res.json(Response_1.default.success(r));
});
detailDailyRouter.get(`/fetchHistoryData`, async function (req, res, next) {
    const r = await service.fetchHistoryData();
    res.json(Response_1.default.success(r));
});
exports.default = detailDailyRouter;
