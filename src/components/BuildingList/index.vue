<template>
  <div>
    <!-- 房屋列表 -->
    <div
      class="dummy-list"
      v-for="(ele, index) in List"
      :key="index"
      @click="HousingBtn(ele.houseCode)"
    >
      <!-- 房屋图片 -->
      <div class="dummy-list-img">
        <img :src="URL + ele.houseImg" alt="" />
      </div>
      <!-- 房屋信息 -->
      <div class="dummy-list-data">
        <p class="title">{{ ele.title }}</p>
        <p class="massage">{{ ele.desc }}</p>
        <p class="label">{{ ele.tags[0] }}</p>
        <p class="price">{{ ele.price }} 元/月</p>
      </div>
    </div>
  </div>
</template>

<script>
import { URL } from '@/utils/http'
export default {
  data() {
    return {
      URL
    }
  },
  props: {
    List: {
      type: Array,
      required: true
    }
  },
  methods: {
    HousingBtn(id) {
      this.$router.push('/housing/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.dummy-list {
  display: flex;
  height: 120px;
  //   background-color: pink;
  border-bottom: 1px solid #e5e5e5;
  .dummy-list-img {
    width: 150px;
    height: 100px;
    // margin-right: 10px;
    margin: auto 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .dummy-list-data {
    margin: auto 0;
    padding-left: 10px;
    p {
      padding: 0;
      margin: 0;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
    }
    .title {
      padding-bottom: 5px;
      font-size: 16px;
      color: #333;
      font-weight: 700;
    }
    .massage {
      padding-bottom: 5px;

      font-size: 14px;
      color: #666;
    }
    .label {
      margin-bottom: 5px;
      font-size: 14px;
      color: #3ec2cf;
      background-color: #e1f5f8;
      width: 50px;
      height: 20px;
      border-radius: 5px;
      text-align: center;
      line-height: 20px;
    }
    .price {
      font-size: 16px;
      font-weight: 700;
      color: #fa735f;
    }
  }
}
</style>
