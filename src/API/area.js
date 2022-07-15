import request from '@/utils/request.js'
//热门城市
export const hotCity = () => {
  return request({
    url: '/area/hot',
    method: 'GET'
  })
}
//热门城市
export const CityAll = () => {
  return request({
    url: '/area/city',
    method: 'GET'
  })
}
