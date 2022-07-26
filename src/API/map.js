import request from '@/utils/request.js'
export const getMapList = (id) => {
  return request({
    url: `/area/map`,
    params: {
      id
    }
  })
}
