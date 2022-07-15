<template>
  <div>
    <van-nav-bar title="城市列表" color="#21b97a">
      <template slot="left">
        <div class="iconfont icon-youjiantou" @click="back"></div>
      </template>
    </van-nav-bar>
    <div>
      <p>当前城市</p>
    </div>
    <div>
      <p>热门城市</p>
    </div>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { CityAll, hotCity } from '@/API/area.js'
export default {
  methods: {
    back() {
      this.$router.back()
    },
    async areaCity() {
      try {
        const res = await CityAll()
        const hot = await hotCity()
        console.log(res)
        console.log(hot)
      } catch (err) {}
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
