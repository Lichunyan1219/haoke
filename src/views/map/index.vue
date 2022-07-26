<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.go(-1)" />
    <div class="map" id="container"></div>
  </div>
</template>

<script>
// import { BMAPGL } from '@/utils/map'
import { getMapList } from '@/API/map'
let Vue = this
export default {
  data() {
    return {
      ak: 'sEloHHFl91d2ecHVinRBspUhc6SG0KcM'
    }
  },
  created() {
    Vue = this
    this.map(this.$store.state.city.value, this.size)
    // this.map(this.$store.state.currentCity.value, this.size)
    // console.log(this)
  },
  data() {
    return {
      mapList: [],
      size: 10
    }
  },
  methods: {
    // 获取房源数据
    async map(id, size) {
      try {
        const res = await getMapList(id)
        console.log(res)
        this.mapList = res.data.body
        this.getMap(size)
      } catch (error) {
        // console.log(error)
        // console.log(window)
      }
    },

    // 地图
    getMap(size) {
      // BMPGL(this.ak).then((BMapGL) => {
      // console.log(!this.mapList[0].coord)
      if (!this.mapList[0].coord) return
      // 引入地图构造函数
      // console.log(window)
      // const { BMapGL } = window
      // console.log(BMapGL)
      const map = new window.BMapGL.Map('container') // 创建map(地图) 实例
      const point = new window.BMapGL.Point(
        this.mapList[0].coord.longitude,
        this.mapList[0].coord.latitude
      )
      map.centerAndZoom(point, size) // 初始化地图 设置中心点和地图级别
      map.enableScrollWheelZoom(true) // 开启地图滚轮缩放
      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.OverviewMapControl())
      map.addControl(new BMap.MapTypeControl())
      // const content = this.mapList[0].label
      // const label = new BMapGL.Label(content, { // 创建文本标注
      //   position: point, // 设置标注的地理位置
      //   offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
      // })
      // map.addOverlay(label) // 将标注添加到地图中
      this.mapList.forEach((item) => {
        const point = new BMapGL.Point(
          item.coord.longitude,
          item.coord.latitude
        )
        const content = `<span>${item.label}</span><br/><span>${item.count}套</span>`
        const label = new BMapGL.Label(content, {
          // 创建文本标注
          position: point, // 设置标注的地理位置
          offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
        })
        label.addEventListener('click', function () {
          Vue.size += 3
          Vue.map(item.value, Vue.size)
        })

        map.addOverlay(label) // 将标注添加到地图中
        map.addControl(new BMap.NavigationControl())
        label.setStyle({
          // 设置label的样式
          color: '#fff',
          borderColor: '#fff',
          backgroundColor: '#23bb78',
          padding: '14px 0 0',
          fontSize: '12px',
          textAlign: 'center',
          boxSizing: ' border-box',
          lineHeight: '18px',
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          fontFamily: '微软雅黑'
        })
      })
      // })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
#container {
  height: 100vh;
}
/deep/.van-nav-bar__content {
  background-color: #21b97a;
}
</style>
