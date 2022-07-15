import request from '@/utils/request.js'

// 轮播图数据接口
export const carousel = () => {
  return request({
    url: '/home/swiper',
    method: 'GET'
  })
}
// 轮播图图片请求接口
export const carouselImg = (imgSrc) => {
  return request({
    url: imgSrc,
    method: 'GET'
  })
}
// console.log(imgSrc);