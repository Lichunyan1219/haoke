import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import store from './store' // 引入store
import Vant from 'vant' // 引入vant
import 'vant/lib/index.css' // 引入vant的css
import 'amfe-flexible' // 引入amfe-flexible
import '@/styles/index.less' // 引入全局样式
import '@/assets/iconfont/iconfont.css' // 引入字体图标
Vue.use(Vant) // 使用vant
import { Lazyload } from 'vant'

Vue.use(Lazyload)

Vue.config.productionTip = false
import BaiduMap from 'vue-baidu-map'
import VueBMap from 'vue-bmap-gl'
import 'vue-bmap-gl/dist/style.css'
Vue.use(VueBMap)
VueBMap.initBMapApiLoader({
  ak: 'sEloHHFl91d2ecHVinRBspUhc6SG0KcM',
  v: '1.0'
})
Vue.use(BaiduMap, {
  ak: 'sEloHHFl91d2ecHVinRBspUhc6SG0KcM'
})
import 'amfe-flexible'
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
