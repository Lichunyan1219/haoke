<template>
  <div>
    <!--头部 -->
    <div class="nav-title">
      <!-- 搜索 -->
      <van-search placeholder="请输入搜索关键词">
        <template slot="label">
          <div @click="SelectTheCity">
            <span>上海</span>
            <i class="iconfont icon-xiajiantou"> </i>
          </div>
        </template>
      </van-search>
      <!-- 地图 -->
      <div class="ditu-nav">
        <i class="iconfont icon-ditu1"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="my-swipe">
      <van-swipe-item v-for="(image, index) in carouselList" :key="index">
        <img v-lazy="imgUrl + image.imgSrc" />
      </van-swipe-item>
    </van-swipe>
    <!-- 中心导航 -->
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
  </div>
</template>

<script>
import { carousel } from '@/API/home'
export default {
  data() {
    return {
      carouselList: [], // 轮播图数据
      imgUrl: 'http://liufusong.top:8080'
    }
  },
  created() {
    this.homeCarousel()
  },
  methods: {
    // 获取轮播图数据
    async homeCarousel() {
      try {
        const res = await carousel()
        // console.log(res.data.body)
        this.carouselList = res.data.body
        // console.log(this.carouselList)
      } catch (error) {
        // console.log(error)
      }
    },
    SelectTheCity() {
      this.$router.push('/city')
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__label {
  // width: 50px;
  border-right: 1px solid #e5e5e5;
}
.nav-title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  right: 35px;
  z-index: 999;
  .ditu-nav {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-left: 10px;
    .iconfont {
      font-size: 16px;
    }
  }
  :deep(.van-search__content) {
    padding-left: 0;
  }
  .van-search {
    padding: 0 0;
  }
  /deep/.van-field__left-icon {
    // padding-left: 10px;
    margin-left: 10px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 200px;
  img {
    height: 200px;
    width: 100%;
  }
}
[class*='van-hairline']::after {
  border: unset;
}
</style>
