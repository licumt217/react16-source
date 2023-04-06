import Response from '../utils/Response'
import PlateService from "../services/plateService"
const express = require('express');
const plateRouter = express.Router();
const plateService = new PlateService();



/**
 * 从东方财富拉取所有大盘板块历史数据
 */
plateRouter.get(`/fetchAllHistoryData`, async function (req: any, res: any, next: any) {
    try {
        await plateService.fetchAllHistoryData();
        res.json(Response.success())
    } catch (e: any) {
        res.json(Response.wrapException(e))
    }
});

export default plateRouter;
