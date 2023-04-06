"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// axios 配置
axios_1.default.defaults.timeout = 20000;
axios_1.default.defaults.baseURL = '';
// axios.defaults.withCredentials = false
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/text';
//上线前去掉
// let baseURL = util.constants.domainWithProtocol;
// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         config.url = baseURL + config.url
//         config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });
// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         let data = response.data;
//         if (data.isSuccess === '0' || data.isSuccess) {
//             return data;
//         } else {
//             return Promise.reject(data);
//         }
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//             }
//         } else {
//             return Promise.reject(error)
//         }
//         return Promise.reject(error.response.data)
//     }
// );
exports.default = axios_1.default;
