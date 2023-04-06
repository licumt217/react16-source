import detailDailyRouter from './routes/detailDaily'
import plateRouter from "./routes/plate"
import pickRouter from "./routes/pick"
import detailMonthRouter from "./routes/detailMonth"
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

app.use('/detailDaily', detailDailyRouter);
app.use('/plate', plateRouter);
app.use('/pick', pickRouter);
app.use('/detailMonth', detailMonthRouter);

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
