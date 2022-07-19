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
