const Response = {
    success(data?: any) {
        return {
            isSuccess: 0,
            data
        }
    },
    businessException(message: string) {
        return {
            isSuccess: 1,
            message
        }
    },
    systemException(message: string) {
        return {
            isSuccess: 2,
            message
        }
    },
    isException(e: any) {
        return e.isSuccess && (e.isSuccess === 1 || e.isSuccess === 2)
    },
    wrapException(e: any) {
        return this.isException(e) ? e : Response.businessException(e)
    }
}

export default Response;