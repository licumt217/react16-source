import storage from 'good-storage'

const prefix = 'CURRENT_TAB_'
export const setParkCurrentTab = (key, value) => {
  storage.session.set(`${prefix}${key}`, value)
}

export const getParkCurrentTab = (key) => {
  return storage.session.get(`${prefix}${key}`)
}

export const removeParkCurrentTab = (key) => {
  storage.session.remove(`${prefix}${key}`)
}

// 存储发票信息
const invoicePrefix = 'CHECK_INVOICE_INFO_'
export const setCheckInvoiceInfo = (key, value) => {
  storage.session.set(`${invoicePrefix}${key}`, value)
}

export const getCheckInvoiceInfo = (key) => {
  return storage.session.get(`${invoicePrefix}${key}`, {})
}

export const removeCheckInvoiceInfo = (key) => {
  storage.session.remove(`${invoicePrefix}${key}`)
}

// 存储车场搜索信息
const parkSearchHistoryKey = 'PARK_SEARCH_HISTORY'
export const setParkSearchResult = (value) => {
  storage.session.set(parkSearchHistoryKey, value)
}

export const getParkSearchResult = () => {
  return storage.session.get(parkSearchHistoryKey, [])
}

export const removeParkSearchResult = () => {
  storage.session.remove(parkSearchHistoryKey)
}

// 存储车场ID
const parkIdKey = 'TJD_PARK_ID'
export const setParkId = (id) => {
  storage.session.set(parkIdKey, id)
}

export const getParkId = () => {
  return storage.session.get(parkIdKey, '')
}

export const removeParkId = () => {
  storage.session.remove(parkIdKey)
}

const creatorNameKey = 'CREATOR_NAME'
export const setCreatorName = (name) => {
  storage.session.set(creatorNameKey, name)
}

export const getCreatorName = () => {
  return storage.session.get(creatorNameKey, '')
}

export const removeCreatorName = () => {
  storage.session.remove(creatorNameKey)
}

// 存储路由入口
const routeName = 'ROUTE_FROM_NAME'
export const setRouteFromName = (name) => {
  storage.session.set(routeName, name)
}

export const getRouteFromName = () => {
  return storage.session.get(routeName, '')
}

// 存储详情
export const setDetailToSession = (key, data) => {
  storage.session.set(key, data)
}

export const getDetailFromSession = (key) => {
  return storage.session.get(key, {})
}
