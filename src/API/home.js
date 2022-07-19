import request from '@/utils/request.js'

// 轮播图数据接口
export const carousel = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}

// 租房小组数据接口

export const getGroupData = (area) => {
  return request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area
    }
  })
}
