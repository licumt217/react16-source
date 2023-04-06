"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = __importDefault(require("../utils/Response"));
const plateService_1 = __importDefault(require("../services/plateService"));
const express = require('express');
const plateRouter = express.Router();
const plateService = new plateService_1.default();
/**
 * 从东方财富拉取所有大盘板块历史数据
 */
plateRouter.get(`/fetchAllHistoryData`, async function (req, res, next) {
    try {
        await plateService.fetchAllHistoryData();
        res.json(Response_1.default.success());
    }
    catch (e) {
        res.json(Response_1.default.wrapException(e));
    }
});
exports.default = plateRouter;
