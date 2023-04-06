/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

const baseURL = import.meta.env.VITE_VUE_APP_BASE_API

// 日期格式化
export function parseTime(time: any, pattern: any) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/')
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj: any = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: any, key: string) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 格式化字符串时间
export function parseStrTime(str: any) {
    const reg = /(\d{2})(\d{2})(\d{2})/
    return str.replace(reg, '$1:$2:$3')
}

// 格式化字符串日期时间
export function parseStrDateTime(str: any, separate = '.') {
    if (!str) return
    let reg = null
    if (str.length === 8) {
        reg = /(\d{4})(\d{2})(\d{2})/
        return str.replace(reg, `$1${separate}$2${separate}$3`)
    } else if (str.length === 14) {
        reg = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
        return str.replace(reg, `$1${separate}$2${separate}$3 $4:$5:$6`)
    }
    return parseTime(Date.now(), undefined)
}

// 表单重置
export function resetForm(this: any, refName: any) {
    if (this.$refs[refName]) {
        this.$refs[refName].resetFields()
    }
}

// 添加日期范围
export function addDateRange(this: any, params: any, dateRange: any) {
    const search = params
    search.beginTime = ''
    search.endTime = ''
    if (null != dateRange && '' != dateRange) {
        search.beginTime = this.dateRange[0]
        search.endTime = this.dateRange[1]
    }
    return search
}

// 回显数据字典
export function selectDictLabel(datas: any, value: any) {
    const actions: any = []
    Object.keys(datas).map((key) => {
        if (datas[key].dictValue == ('' + value)) {
            actions.push(datas[key].dictLabel)
            return false
        }
    })
    return actions.join('')
}

// 通用下载方法
export function download(fileName: any) {
    window.location.href = baseURL + '/ipop-authcenter/common/download?fileName=' + encodeURI(fileName) + '&delete=' + true
}

// 通过下载地址下载
export function downloadExcelByUrl(url: any) {
    const downloadElement = document.createElement('a')
    downloadElement.href = url
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
}

// 字符串格式化(%s)
export function sprintf(str: any) {
    // eslint-disable-next-line prefer-rest-params
    const args: any = arguments;
    let flag = true, i = 1
    str = str.replace(/%s/g, function () {
        const arg = args[i++]
        if (typeof arg === 'undefined') {
            flag = false
            return ''
        }
        return arg
    })
    return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: any) {
    if (!str || str == 'undefined' || str == 'null') {
        return '-1'
    }
    return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data: any, id: any, parentId: any, children: any, rootId: any) {
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId = rootId || 0
    //对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    //循环所有项
    const treeData = cloneData.filter((father: any) => {
        const branchArr = cloneData.filter((child: any) => {
            //返回每一项的子级数组
            return father[id] === child[parentId]
        })
        branchArr.length > 0 ? father.children = branchArr : ''
        //返回第一层
        return parseInt(father[parentId]) === rootId
    })
    return treeData.length > 0 ? treeData : data
}

/**
 * 是否不存在
 * @param v
 * @returns {boolean}
 */
export const isUndef = (v: any) => {
    return v === undefined || v === null
}

/**
 * 是否存在
 * @param v
 * @returns {boolean}
 */
export const isDef = (v: any) => {
    return v !== undefined && v !== null
}

/**
 * 是否为对象
 * @param obj
 * @returns {boolean}
 */
export const isObject = (obj: any) => {
    return obj !== null && typeof obj === 'object'
}

/**
 * 是否为空对象
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0
}

export const zeroFill = (number: any) => {
    return number < 10 ? `0${number}` : number
}

export function dispatch(this: any, componentName: any, eventName: any, params: any) {
    let parent = this.$parent || this.$root
    let name = parent.$options.name

    while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
            name = parent.$options.name
        }
    }
    if (parent) {
        // eslint-disable-next-line prefer-spread
        parent.$emit.apply(parent, [eventName].concat(params))
    }
}

export function blobToBase64(blob: any) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e: any) => {
            resolve(e.target.result)
        }
        // readAsDataURL
        fileReader.readAsDataURL(blob)
        fileReader.onerror = () => {
            reject(new Error('blobToBase64 error'))
        }
    })
}

export function fillBlankContent(content: any) {
    if (content === null || content === undefined || content === '') {
        return '--'
    }
    return content
}
