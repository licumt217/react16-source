"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response = {
    success(data) {
        return {
            isSuccess: 0,
            data
        };
    },
    businessException(message) {
        return {
            isSuccess: 1,
            message
        };
    },
    systemException(message) {
        return {
            isSuccess: 2,
            message
        };
    },
    isException(e) {
        return e.isSuccess && (e.isSuccess === 1 || e.isSuccess === 2);
    },
    wrapException(e) {
        return this.isException(e) ? e : Response.businessException(e);
    }
};
exports.default = Response;
