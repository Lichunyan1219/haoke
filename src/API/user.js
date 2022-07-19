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
    method: 'GET'
  })
}

// 请求收藏数据

export const favorite = () => {
  return request({
    url: '/user/favorites',
    method: 'GET'
  })
}

// 请求出租数据
export const collect = () => {
  return request({
    url: '/user/houses',
    method: 'GET'
  })
}
