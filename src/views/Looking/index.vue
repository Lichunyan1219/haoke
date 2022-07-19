<template>
  <div>
    <!--头部 -->
    <van-nav-bar left-arrow>
      <template #right>
        <i class="iconfont icon-ditu"></i>
      </template>
      <template #title>
        <van-search left-icon="search" placeholder="请输入搜索关键词">
          <template #label>
            <div @click="$router.push('/city')">
              <span>{{ city.label }}</span>
              <i class="iconfont icon-xiajiantou"></i>
            </div>
          </template>
        </van-search>
      </template>
    </van-nav-bar>
    <!-- 筛选面板 -->
    <van-dropdown-menu>
      <van-dropdown-item title="区域">
        <van-picker :columns="InScreening" />
      </van-dropdown-item>
      <van-dropdown-item title="方式">
        <van-picker :columns="WayToScreen" />
      </van-dropdown-item>
      <van-dropdown-item title="价钱">
        <van-picker :columns="PriceOfScreening" />
      </van-dropdown-item>
      <van-dropdown-item title="商品" @open="show = true" @close="show = false">
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-popup
      v-model="show"
      :overlay="false"
      position="right"
      :style="{ height: '100%', width: '50%' }"
    />
  </div>
</template>

<script>
// import screening from './screening'
import { houseCondition } from '@/API/house'
import { mapState } from 'vuex'
export default {
  computed: { ...mapState(['city']) },
  data() {
    return {
      show: false, // 筛选面板显示隐藏
      WayToScreen: [], // 方式筛选数据
      area: {}, // 所有筛选数据
      InScreening: [], // 区域筛选数据
      PriceOfScreening: [] // 租金筛选数据
    }
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle()
    }
    // onClickLeft() {
    //   this.$router.back()
    // }
  },
  components: {},
  async created() {
    const res = await houseCondition(this.city.value) // 获取房屋筛选条件
    const reg = JSON.stringify(res.data.body) // 转换为字符串截取
    const reg1 = /label/gi //定义正则
    this.area = JSON.parse(reg.replace(reg1, 'text')) // 截取label替换为text
    console.log(this.area)
    this.InScreening.push(this.area.area) // 区域数据
    this.InScreening.push(this.area.subway) // 地铁数据
    this.WayToScreen = this.area.rentType // // 方式数据
    this.PriceOfScreening = this.area.price // 价钱数据
    this.fn()
  },
  methods: {
    // 三层级联选择器，第二层第一个为空，所以手动添加走到第三层
    fn() {
      this.InScreening[0].children[0].children = [{ text: '' }]
      this.InScreening[1].children[0].children = [{ text: '' }]
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__title) {
  max-width: unset;
}
.van-search {
  background-color: unset;
  :deep(.van-icon) {
    color: #999;
  }
  .iconfont {
    color: #565050;
    font-size: 12px;
  }
}
.van-nav-bar__right {
  .iconfont {
    border-radius: 50%;
    border: 2px solid #fff;
    color: #fff;
    padding: 3px;
  }
}
.van-nav-bar {
  line-height: unset;
}
</style>
