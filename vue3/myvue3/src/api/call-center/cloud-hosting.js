import request from '@/utils/request'

export function getCloudHostingList({ pageNo, pageSize, authCloudHosting, authPhoneCall, pmParkId, parkName }) {
  return request({
    url: '/api/parkinglot/getListByPageInfo',
    method: 'post',
    data: {
      pageNo, pageSize, authCloudHosting, authPhoneCall, pmParkId, parkName
    }
  })
}


export function updateCallCenterTel({ parkId, callCenterTel }) {
   return request({
     url: '/api/parkinglot/UpdateCallCenterTel',
     method: 'post',
     data: {
       parkId, callCenterTel
     }
   })
}

export function updateParkOnlineAuth({ parkId, authType, authValue }) {
  return request({
    url: '/api/parkinglot/updateOnlinePmAuth',
    method: 'post',
    data: {
      parkId, authType, authValue
    }
  })
}

export function getVerifyCode({ parkId, userId, userName, description }) {
  return request({
    url: '/api/parkinglot/getVerificationCode',
    method: 'post',
    data: {
      parkId, userId, userName, description
    }
  })
}
