import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOUTIAO_USERNAME = 'TOUTIAO_USERNAME'
const TOUTIAO_CITY_NAME = 'TOUTIAO_PASSWORD'

export default new Vuex.Store({
  state: {
    user: getItem(TOUTIAO_USERNAME),
    city: getItem(TOUTIAO_CITY_NAME) // 点击当前房屋数据
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      //防止数据刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOUTIAO_USERNAME, JSON.stringify(state.user))
      setItem(TOUTIAO_USERNAME, state.user)
    },
    // 主页当前城市数据
    setCity(state, data) {
      state.city = data
      setItem(TOUTIAO_CITY_NAME, state.city)
    }
  },
  actions: {},
  modules: {}
})
