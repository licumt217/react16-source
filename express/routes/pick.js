"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../utils/Response"));
const pickService_1 = __importDefault(require("../services/pickService"));
const DateUtil_1 = __importDefault(require("../utils/DateUtil"));
const Util_1 = __importDefault(require("../utils/Util"));
const express = require('express');
const plateRouter = express.Router();
const service = new pickService_1.default();
/**
 * 从东方财富拉取所有大盘板块历史数据
 */
plateRouter.get(`/pick`, async function (req, res, next) {
    let date = "";
    let days = 0;
    let downRatio = 0;
    date = date || DateUtil_1.default.getDateStrYMD();
    days = days || 1095;
    downRatio = downRatio || 0.7;
    try {
        await service.pickBackup(date);
        res.json(Response_1.default.success());
    }
    catch (e) {
        res.json(Response_1.default.wrapException(e));
    }
});
/**
 * 根据对应策略筛选一段时间的数据，批量筛选
 */
plateRouter.get(`/rangePick`, async function (req, res, next) {
    let startDate = "";
    let endDate = "";
    if (!startDate) {
        throw Response_1.default.businessException("开始日期startDate参数不能为空！");
    }
    endDate = endDate || DateUtil_1.default.getDateStrYMD();
    const date = new Date(startDate);
    while (date < new Date(endDate)) {
        Util_1.default.log(`批量筛选进行中，date:${date}`);
        const strDate = DateUtil_1.default.getDateStrYMD(date);
        await service.pickMonth(strDate, 1095, 0.7);
        date.setDate(date.getDate() + 1);
    }
    Util_1.default.log(`批量筛选完毕！`);
});
/**
 * 根据对应策略筛选一段时间的数据，批量筛选
 */
plateRouter.get(`/getListByDateAndStrategy`, async function (req, res, next) {
    let date = "";
    let strategy = "";
    date = date || DateUtil_1.default.getDateStrYMD();
    return await service.getListByDateAndStrategy(date, strategy);
});
exports.default = plateRouter;
