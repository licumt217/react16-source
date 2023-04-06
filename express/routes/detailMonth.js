"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../utils/Response"));
const detailMonthService_1 = __importDefault(require("../services/detailMonthService"));
const express = require('express');
const detailMonthRouter = express.Router();
const service = new detailMonthService_1.default();
/**
 * 每日拉取最新明细数据存库
 */
detailMonthRouter.get(`/fetch`, async function (req, res, next) {
    // const r = await service.fetch();
    res.json(Response_1.default.success());
});
/**
 * 获取给定code数组的在给定日期以前的N个交易日的k线列表数据
 */
detailMonthRouter.get(`/getKLineDatas`, async function (req, res, next) {
    let date = "";
    let volume = "";
    let codeArray = [];
    const r = await service.getKLineDatas(date, codeArray, 3200, volume);
    res.json(Response_1.default.success(r));
});
/**
 * 获取单只股票的明细数据
 */
detailMonthRouter.get(`/getSingleKLineData`, async function (req, res, next) {
    let date = "";
    let code = "";
    if (!date || !code) {
        throw Response_1.default.businessException("date或code参数不能为空，请检查！");
    }
    const r = await service.getSingleKLineData(date, code);
    res.json(Response_1.default.success(r));
});
/**
 */
detailMonthRouter.get(`/getSingleFutureKLineDataArrayForMonth`, async function (req, res, next) {
    let date = "";
    let months = 0;
    let codeArray = [];
    const r = await service.getSingleFutureKLineDataArrayForMonth(date, codeArray, months);
    res.json(Response_1.default.success(r));
});
exports.default = detailMonthRouter;
