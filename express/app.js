"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detailDaily_1 = __importDefault(require("./routes/detailDaily"));
const plate_1 = __importDefault(require("./routes/plate"));
const pick_1 = __importDefault(require("./routes/pick"));
const detailMonth_1 = __importDefault(require("./routes/detailMonth"));
//主要用于处理HTTP Error。
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
// const mysql = require('./middlewares/mysql')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
// app.use(mysql);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/detailDaily', detailDaily_1.default);
app.use('/plate', plate_1.default);
app.use('/pick', pick_1.default);
app.use('/detailMonth', detailMonth_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
