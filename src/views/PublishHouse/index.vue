<template>
  <div class="newsHouse">
    <!-- 标题 -->
    <van-nav-bar title="发布房源" left-arrow @click-left="onClickLeft" />
    <!-- 房源信息 -->
    <div class="title">
      <van-cell title="房源信息" />
    </div>
    <!-- 小区名称 -->
    <div>
      <van-cell title="小区名称">
        <div><span>请选择小区</span><van-icon name="arrow" /></div>
      </van-cell>
    </div>
    <!-- 租金 -->
    <div class="houseRent">
      <van-cell>
        <div class="houseRent1">
          <div class="houseRent2">
            <span>租</span>
            <span>金</span>
          </div>
          <div>
            <van-field placeholder="请输入租金/月" />
          </div>
          <span class="houseRent3">￥/月</span>
        </div>
      </van-cell>
    </div>
    <!-- 建筑面积 -->
    <div class="houseRent">
      <van-cell>
        <!-- <template #title> -->
        <div class="houseRent1">
          <div class="houseRent2">
            <span>建筑面积</span>
          </div>
          <div>
            <van-field placeholder="请输入建筑面积" />
          </div>
          <span class="houseRent3">㎡</span>
        </div>
        <!-- </template> -->
      </van-cell>
    </div>
    <!-- 户型 -->
    <div class="houseType">
      <van-cell>
        <div class="houseRent2" slot="title">
          <span>房</span>
          <span>型</span>
        </div>
        <div>请选择<van-icon name="arrow" /></div>
      </van-cell>
    </div>
    <!-- 所在楼层 -->
    <div>
      <div>
        <van-cell title="所在楼层">
          <div><span>请选择</span><van-icon name="arrow" /></div>
        </van-cell>
      </div>
    </div>
    <!-- 朝向 -->
    <div class="houseType">
      <van-cell>
        <div class="houseRent2" slot="title">
          <span>朝</span>
          <span>向</span>
        </div>
        <div>请选择<van-icon name="arrow" /></div>
      </van-cell>
    </div>
    <!-- 房屋标题 -->
    <div class="HouseTitle">
      <van-cell title="房屋标题" />
      <van-field placeholder="请输入标题(例如：整租 小区名 两室 5000元)" />
    </div>
    <!-- 房屋图像-->
    <div class="HouseTitle">
      <van-cell title="房屋图像" />
      <van-uploader icon="plus" :after-read="afterRead" v-model="fileList" />
    </div>
    <!-- 房屋配置 -->
    <div>
      <van-cell title="房屋配置" />
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
    <!-- 房屋描述 -->
    <div>
      <van-cell title="房屋描述">
        <template #label>
          <van-field
            rows="1"
            autosize
            :style="{ height: '100px' }"
            type="textarea"
            placeholder="请输入房屋描述信息"
          />
        </template>
      </van-cell>
    </div>
    <!-- 底部按钮 -->
    <div class="house-btn">
      <van-button class="no-button">清空</van-button>
      <van-button class="yes-button" @click="areaBtn">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.newsHouse{
    padding-bottom: 40px;
}
// 头部样式
.title {
  .van-cell {
    color: #21b97a;
  }
}
//租金样式
.houseRent {
  max-height: 45px;
  span {
    margin-right: 0.72rem;
    white-space: nowrap;
  }
  .houseRent1 {
    display: flex;
    height: 24px;
    // justify-content: center;
    align-items: center;
    .van-cell {
      border: unset;
    }
    .houseRent2 {
      display: flex;
    }
    .houseRent3 {
      padding-left: 40px;
      margin-right: unset;
    }
  }
}

.van-cell {
  border-bottom: 1px solid #e5e5e5;
}
// 户型样式
.houseType {
  span {
    margin-right: 0.72rem;
    white-space: nowrap;
  }
}
// 房屋标题
.HouseTitle {
  background-color: #fff;
  .van-cell {
    padding: 0.26667rem 0.42667rem 5px;
  }
  .van-field__body {
    padding-bottom: 0.26667rem;
  }
}
:deep(.van-uploader__input) {
  border: 1px solid #e5e5e5;
  margin-top: 3px;
}
.house-btn {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  font-size: 14px;
  .no-button {
    flex: 1;
    color: #21b97a;
  }
  .yes-button {
    flex: 1;
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
