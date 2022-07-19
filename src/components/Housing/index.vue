<template>
  <div class="container">
    <!-- 标题部分 -->
    <van-nav-bar left-arrow @click-left="onClickLeft" :title="Info.community">
    </van-nav-bar>
    <!-- 图片位置 -->
    <van-image cover width="100%" height="200" lazy-load src="" />

    <!-- 房屋标题 -->
    <div class="fwbt">
      <van-cell-group>
        <van-cell :title="Info.title">
          <template #label>
            <span>{{ Info.tags[0] }}</span>
          </template></van-cell
        >
      </van-cell-group>
    </div>

    <!-- 房屋详情 -->
    <div class="fwxq">
      <van-grid :column-num="3" :border="false">
        <van-grid-item>
          <template #text>
            <span>{{ Info.price }} /月</span>
            <p>租金</p>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #text>
            <span>{{ Info.roomType }} </span>
            <p>房型</p>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #text>
            <span>{{ Info.size }} 平米</span>
            <p>面积</p>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 房屋信息 -->
    <div class="fwxx">
      <van-grid :column-num="2" :border="false" :center="false">
        <van-grid-item>
          <template #text>
            <div>
              <span>装修: </span><span>{{ Info.description }}</span>
            </div>
            <div>
              <span>楼层: </span><span>{{ Info.floor }}</span>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #text>
            <div>
              <span>朝向:</span><span>{{ Info.oriented }}</span>
            </div>
            <div><span>类型:</span><span>普通住宅</span></div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 地图 -->
    <van-cell-group>
      <van-cell>
        <template #title>
          <span>小区: {{ Info.community }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <ditu :coord="Info.coord" :title="Info.title"></ditu>
    <!-- 房屋配置  ---  未完成 -->
    <div class="fwpz">
      <ul>
        <li v-for="(ele, index) in lengths1" :key="index">
          <i class="iconfont icon-b2"></i>
          <span>{{ Info.supporting[ele] }}</span>
        </li>
      </ul>
    </div>
    <!-- 房源状况 -->
    <div class="fwzk">
      <van-cell-group>
        <van-cell title="房源状况" />
      </van-cell-group>
    </div>
    <!-- 房主信息 -->
    <van-cell title="王女士" icon="location-o" />
    <!-- 描述信息 -->
    <div class="miaoshu">
      1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
      2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
      3.人车分流，环境优美。
      4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
    </div>
    <!-- 底部操作 -->
    <div class="navbuttom">
      <van-grid :column-num="3">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
  </div>
</template>

<script>
// import BuildingList from '@/components/BuildingList'
import ditu from '@/components/ditu.vue'
import { house } from '@/API/house'
export default {
  data() {
    return {
      hash: '',
      imgStr: '',
      Info: {},
      lengths1: ''
      // lengths: this.Info.supporting.length
    }
  },
  created() {
    this.hash = this.$route.params.id
    this.houseData()
    // console.log(house)
  },
  methods: {
    async houseData() {
      try {
        const res = await house(this.hash)
        this.imgStr = res.config.baseURL // 图片路径
        this.Info = res.data.body // 房屋信息
        this.lengths1 = this.Info.supporting.length
        console.log(res)
      } catch (err) {}
    },
    onClickLeft() {
      this.$router.back()
    }
  },
  components: { 
    ditu
    // BuildingList
  }
}
</script>

<style lang="less" scoped>
// 图片修改
.container {
  margin-bottom: 100px;
}
.houses-img {
  img {
    width: 100%;
    height: 100%;
  }
}
.van-grid {
  border-bottom: 1px solid #e5e5e5;
}
// 去除p标签默认样式
p {
  margin-top: 0;
  margin-bottom: 0;
}
// 房屋详情
.fwxq {
  .van-grid-item__content {
    span {
      color: red;
      font-size: 16px;
    }
    p {
      color: #737070;
      font-size: 14px;
      font-weight: 100;
      margin-top: 5px;
    }
  }
}
// 标题样式
.fwbt {
  .van-cell__title {
    span {
      font-size: 15px;
      color: #333;
    }
    .van-cell__label {
      span {
        background-color: #e1f5f8;
        color: #39c3d0;
        padding: 3px;
        border-radius: 2px;
        font-size: 12px;
      }
    }
  }
}
// 房屋信息
.fwxx {
  span {
    color: #737070;
    font-size: 14px;
  }
}
// 房屋配置
.fwpz {
  width: 100%;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      width: 25%px;
      height: 71px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
// 房源状况
.fwzk {
  font-size: 18px;
  font-weight: 700;
}
// 描述
.miaoshu {
  font-size: 14px;
  color: #737070;
  line-height: 1.5;
  background-color: #fff;
}
// 底部操作
.navbuttom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
