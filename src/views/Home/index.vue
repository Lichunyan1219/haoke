<template>
  <div>
    <!--头部 -->
    <div class="nav-title">
      <!-- 搜索 -->
      <van-search placeholder="请输入搜索关键词">
        <template slot="label">
          <div @click="SelectTheCity">
            <span>{{ city ? city.label : '上海' }} </span>
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
    <van-grid class="home-nav" :border="false">
      <van-grid-item @click="FindBtn">
        <i slot="icon" class="iconfont icon-home"></i>
        <span slot="text">整租</span>
      </van-grid-item>
      <van-grid-item @click="FindBtn">
        <i slot="icon" class="iconfont icon-wodewo"></i>
        <span slot="text">合租</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-ditu"></i>
        <span slot="text">地图找房</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont icon-fangwuchuzu"></i>
        <span slot="text">去出租</span>
      </van-grid-item>
    </van-grid>
    <!-- 租房小组 -->
    <div class="home-group">
      <van-cell-group>
        <van-cell title="租房小组" value="更多" />
      </van-cell-group>
    </div>
    <van-grid :column-num="2" :gutter="10" class="houseAll">
      <van-grid-item v-for="item in houseAll" :key="item.id">
        <template #default>
          <div class="houseAll">
            <div class="houseImg">
              <img :src="imgUrl + item.imgSrc" alt="" />
            </div>
            <div class="houseData">
              <span>{{ item.title }}</span
              ><br />
              <span>{{ item.desc }}</span>
            </div>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { carousel, getGroupData } from '@/API/home'
export default {
  data() {
    return {
      carouselList: [], // 轮播图数据
      imgUrl: '',
      houseAll: []
    }
  },
  created() {
    this.homeCarousel()
    this.getGroupData()
    // console.log(this.city.value)
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
    // 选择城市
    SelectTheCity() {
      this.$router.push('/city')
    },
    // 获取租房小组数据
    async getGroupData() {
      try {
        const res = await getGroupData(this.city.value)
        this.imgUrl = res.config.baseURL
        this.houseAll = res.data.body
        console.log(this.houseAll)
      } catch (error) {}
    },
    // 跳转到搜索页面
    FindBtn() {
      this.$router.push('/looking')
    }
  },
  computed: { ...mapState(['city']) }
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
// 中心导航
.home-nav {
  span {
    font-size: 14px;
    margin-top: 20px;
  }
  .iconfont {
    font-size: 40px;
    color: #55c898;
    background-color: #f2fbf7;
    padding: 10px;
    border-radius: 50%;
  }
}
// 租房小组
.home-group {
  .van-cell-group {
    background-color: unset;
    .van-cell {
      background-color: unset;
    }
  }
}
.houseAll {
  display: flex;
  justify-content: center;
  align-items: center;
  .houseImg {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .houseData {
    flex: 1;
    font-size: 14px;
    text-align: center;
    font-weight: 700;
  }
}
.houseAll {
  :deep(.van-grid-item) {
    height: 80px;
  }
}
</style>
