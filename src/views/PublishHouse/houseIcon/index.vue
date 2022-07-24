<template>
  <div>
  
      <van-grid-item  v-if="ele.label==='电视'"  ><span class="iconfont icon-b7"></span><span>电视</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='冰箱'"  ><span class="iconfont icon-b5"></span><span>冰箱</span></van-grid-item >
      <van-grid-item  v-if="ele.label==='洗衣机'"><span class="iconfont icon-b2"></span ><span>洗衣机</span></van-grid-item >
      <van-grid-item  v-if="ele.label==='空调'"  ><span class="iconfont icon-b3"></span><span>空调</span></van-grid-item  >
      <van-grid-item  v-if="ele.label==='热水器'"><span  class="iconfont icon-b8"></span ><span>热水器</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='床'"    ><span  class="iconfont icon-b11"></span><span>床</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='暖气'"  ><span class="iconfont icon-b9"></span><span>暖气</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='宽带'"  ><span class="iconfont icon-b1"></span><span>宽带</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='衣柜'"  ><span class="iconfont icon-b9"></span><span>衣柜</span></van-grid-item>
      <van-grid-item  v-if="ele.label==='天然气'"><span class="iconfont icon-b4"></span><span>天然气</span></van-grid-item>

  </div>
</template>

<script>
export default {
  props: {
    ele: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
span {
  font-size: 16px;
}
.iconfont {
  font-size: 20px;
}
</style>
