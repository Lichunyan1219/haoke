import request from '@/utils/request.js'

// 登录Api
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

//获取用户信息

export const users = () => {
  return request({
    url: '/user',
    method: 'GET',
  })
}
