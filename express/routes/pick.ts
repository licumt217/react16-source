import Response from '../utils/Response'
import PickService from "../services/pickService"
import DateUtil from '../utils/DateUtil';
import Util from '../utils/Util';
const express = require('express');
const plateRouter = express.Router();
const service = new PickService();

/**
 * 从东方财富拉取所有大盘板块历史数据
 */
plateRouter.get(`/pick`, async function (req: any, res: any, next: any) {

    let date: string = req.query.date;
    let days: number = Number(req.query.days);
    let downRatio: number = Number(req.query.downRatio);

    date = date || DateUtil.getDateStrYMD();
    days = days || 1095;
    downRatio = downRatio || 0.7;

    try {
        await service.pickBackup(date);
        res.json(Response.success())
    } catch (e: any) {
        res.json(Response.wrapException(e))
    }
});


/**
 * 根据对应策略筛选一段时间的数据，批量筛选
 */
plateRouter.get(`/rangePick`, async function (req: any, res: any, next: any) {
    const startDate: string = req.query.startDate;
    let endDate: string = req.query.endDate;

    if (!startDate) {
        throw Response.businessException("开始日期startDate参数不能为空！")
    }
    endDate = endDate || DateUtil.getDateStrYMD();

    const date = new Date(startDate);
    while (date < new Date(endDate)) {
        Util.log(`批量筛选进行中，date:${date}`);
        const strDate = DateUtil.getDateStrYMD(date);
        await service.pickMonth(strDate, 1095, 0.7);
        date.setDate(date.getDate() + 1);
    }
    Util.log(`批量筛选完毕！`);
});


/**
 * 根据对应策略筛选一段时间的数据，批量筛选
 */
plateRouter.get(`/getListByDateAndStrategy`, async function (req: any, res: any, next: any) {
    let date: string = req.query.date;
    const strategy: string = req.query.strategy;

    date = date || DateUtil.getDateStrYMD();

    return await service.getListByDateAndStrategy(date, strategy);
});

export default plateRouter;
