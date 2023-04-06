"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Util = {
    uuid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    },
    log(message, ...args) {
        console.log(`log: ${message}`, ...args);
    },
    s(str) {
        return typeof str === "string" ? JSON.stringify(str) : str;
    },
    isString(str) {
        return typeof str === 'string';
    }
};
exports.default = Util;
