import axios from 'axios'
import { ElNotification as Notification, ElMessageBox as MessageBox, ElMessage as Message } from 'element-plus'
import store from '@/store/index'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: import.meta.env.VITE_VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})

const notStringifyApiList = [
    'ipop-authcenter',
    'wms',
    'contract',
    'tag',
    'shop/equity',
    'ipop-authcenter/system/config',
    'pwm-service',
    'api/parkinglot',
    'tcAccountCheck',
    'parkapi/config/exit/edit',
    'parkapi/config/exit/add',
    'parkapi/config/area/add',
    'parkapi/config/area/edit',
    'parkapi/company/add',
    'parkapi/parkAftermarket/add',
    'parkapi/parkAftermarket/edit',
    'tcbstats/',
    'payout/yzt/',
    'tcSettle/yzt',
    'parkbus/message/template/save',
    'iot/api/deviceQrcodeBatch/qurey',
    '/iot/api/deviceQrcode/Add',
    '/iot/api/deviceQrcode/qurey',
    '/iot/api/device/query',
    '/tcOrder/API/NoticeControlAuth',
    '/iot/api/device/updateName',
    '/iot/api/device/updateState',
    '/cpaynote/feedback',
    '/tcaction/clientAdBlock',
    'shop/vip',
]

// request拦截器
service.interceptors.request.use(
    (config: any) => {
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        if (config.headers['Content-Type'] === 'multipart/form-data') {
            return config
        }
        const ret = notStringifyApiList.some(api => config.url.includes(api))
        const isParkConfigApi = config.url === '/parkapi/config/'
        if (ret || isParkConfigApi) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
        } else {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            if (config.method === 'post') {
                config.data = qs.stringify(config.data)
            }
        }
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(res => {
    const { request } = res
    let { code }: { code: any } = res.data
    const { isSuccess } = res.data
    const contentType = res.headers['content-type']
    if (contentType === 'multipart/form-data' || request.responseType === 'blob') {
        const { data, headers } = res
        code = 200
        res.data = {
            data,
            headers
        }
    }
    if (typeof code === 'undefined') {
        if (isSuccess === '0') {
            code = 200
        } else {
            code = 201
        }
    }
    if (code === 401) {
        MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(() => {
            store.dispatch('LogOut').then(() => {
                location.reload() // 为了重新实例化vue-router对象 避免bug
            })
        })
    } else if (code !== 200) {

        Notification.error({
            title: '系统提示',
            message: res.data.msg || res.data.message || res.data.errorMSG
        })
        return Promise.reject('error')
    } else {
        return res.data
    }
},
    error => {
        if (error.message && error.message.indexOf('timeout of') > -1) {
            error.message = '接口请求超时，请稍后再试'
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
