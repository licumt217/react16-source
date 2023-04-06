const Util = {
    uuid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    },
    log(message: string, ...args: any[]) {
        console.log(`log: ${message}`, ...args)
    },
    s(str: string | number | boolean) {
        return typeof str === "string" ? JSON.stringify(str) : str;
    },
    isString(str: any): boolean {
        return typeof str === 'string';
    }
}

export default Util;