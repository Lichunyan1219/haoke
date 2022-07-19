<!-- 城市列表 -->
<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="城市列表" color="#21b97a">
      <template slot="left">
        <div class="iconfont icon-youjiantou" @click="back"></div>
      </template>
    </van-nav-bar>
    <!-- 热门城市 -->
    <div>
      <van-index-anchor index="2">热门城市</van-index-anchor>
      <van-cell
        :title="ele.label"
        v-for="(ele, index) in hotCity"
        :key="index"
        @click="SelectTheCity(ele)"
      />
    </div>
    <!-- 城市列表 -->
    <van-index-anchor index="3">全部城市</van-index-anchor>
    <van-index-bar
      class="indexBar"
      :sticky="false"
      highlight-color="#AE853A"
      :index-list="cityList"
    >
      <van-index-anchor
        v-for="(item, index) in cityDts"
        :key="index"
        :index="item"
      >
        <span class="indexWord">{{ item.toUpperCase() }}</span>
        <van-cell
          v-for="(citem, cindex) in list[item]"
          :key="cindex"
          :title="citem.label"
        />
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>

<script>
import { CityAll, hotCity } from '@/API/area.js'
export default {
  data() {
    return {
      city: [], // 城市列表
      list: [], // 全部城市
      cityDts: [], // 全部城市的首字母
      cityList: [], // 全部城市索引
      hotCity: [] // 热门城市
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    async areaCity() {
      try {
        const res = await CityAll() // 获取城市数据
        const { data } = await hotCity() // 获取热门城市数据
        this.city = this.formatCityData(res.data.body) // 处理城市数据
        this.list = this.city.citylist // 处理后的城市数据
        this.cityDts = this.city.cityIndex // 处理后的列表索引数据
        this.getCity() // 处理城市索引
        this.hotCity = data.body // 热门城市数据
        // console.log(data.body)
      } catch (err) {}
    },
    formatCityData(data) {
      // data->原始数据数组
      let citylist = {}
      let cityIndex = []
      data.map((item) => {
        // item->{label:'北京',value:'',pinyin:'beijing',short:'bj'}
        const first = item.short.substr(0, 1) // first->'a' 'b' ...
        // citylist[first] = [item]
        if (first in citylist) {
          // 判断对象中是否存在属性
          citylist[first].push(item)
        } else {
          citylist[first] = [item]
        }
        cityIndex = Object.keys(citylist).sort()
      })
      return {
        cityIndex,
        citylist
      }
    },
    getCity() {
      this.cityDts.forEach((item) => {
        // const cityList = []
        this.cityList.push(item.toUpperCase())
      })
    },
    SelectTheCity(ele) {
      this.$store.commit('setCity', ele)
      this.$router.back()
    }
  },
  created() {
    this.areaCity()
  }
}
</script>

<style lang="less" scoped>
.icon-youjiantou {
  color: #fff;
}
</style>
