import request from '@/utils/request.js'
//
export const house = (id) => {
  return request({
    url: `/houses/${id}`,
    method: 'GET'
  })
}

// 获取房屋查询条件
export const houseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: { id }
  })
}
// 查询该地区房源数据
export const RegionalHousing = (params) => {
  return request({
    url: '/houses',
    params: {
      ...params
    }
  })
}
// 查询小区

export const QueryVillage = (name, id) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}
// 获取房屋发布条件
export const PublishingHouse = () => {
  return request({
    url: '/houses/params'
  })
}
