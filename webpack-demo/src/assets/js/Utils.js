export default {
    log(obj) {
        console.log(JSON.stringify(obj, null, 4))
    },
    console(obj) {
        this.log(obj)
    }
}