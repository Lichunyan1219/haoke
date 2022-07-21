<template>
  <div>
    <!--头部 -->
    <van-nav-bar left-arrow @click-left="onClickLeft">
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
    <div class="selectionPanel">
      <van-dropdown-menu>
        <van-dropdown-item title="区域">
          <van-picker :columns="InScreening" ref="area" />
          <div class="house-btn">
            <van-button class="no-button">清空</van-button>
            <van-button class="yes-button" @click="areaBtn">确定</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="方式">
          <van-picker :columns="WayToScreen" />
          <div class="house-btn">
            <van-button class="no-button">清空</van-button>
            <van-button class="yes-button">确定</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="价钱">
          <van-picker :columns="PriceOfScreening" />
          <div class="house-btn">
            <van-button class="no-button">清空</van-button>
            <van-button class="yes-button">确定</van-button>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" @open="show = true">
        </van-dropdown-item>
      </van-dropdown-menu>
      <van-popup
        v-model="show"
        position="right"
        :style="{ height: '100%', width: '80%' }"
      >
        <!-- 详细筛选面板 -->
        <van-cell title="户型" />
        <!-- 户型 -->
        <van-checkbox-group v-model="result" checked-color="#defaef">
          <van-grid :column-num="2" :gutter="20">
            <van-grid-item v-for="(item, index) in HouseType" :key="index">
              <template #default>
                <div class="b">
                  <van-checkbox :name="item.value">
                    <div class="a">{{ item.text }}</div>
                  </van-checkbox>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-cell title="朝向" />
        <!-- 朝向 -->
        <van-checkbox-group v-model="result" checked-color="#defaef">
          <van-grid :column-num="2" :gutter="20">
            <van-grid-item v-for="(item, index) in orientation" :key="index">
              <template #default>
                <div class="b">
                  <van-checkbox :name="item.value">
                    <div class="a">{{ item.text }}</div>
                  </van-checkbox>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-cell title="楼层" />
        <!-- 楼层 -->
        <van-checkbox-group v-model="result" checked-color="#defaef">
          <van-grid :column-num="2" :gutter="20">
            <van-grid-item v-for="(item, index) in floor" :key="index">
              <template #default>
                <div class="b">
                  <van-checkbox :name="item.value">
                    <div class="a">{{ item.text }}</div>
                  </van-checkbox>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
        <van-cell title="房屋亮点" />
        <!-- 房屋亮点 -->
        <van-checkbox-group v-model="result" checked-color="#defaef">
          <van-grid :column-num="2" :gutter="20">
            <van-grid-item v-for="(item, index) in HouseWindow" :key="index">
              <template #default>
                <div class="b">
                  <van-checkbox :name="item.value">
                    <div class="a">{{ item.text }}</div>
                  </van-checkbox>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </van-checkbox-group>
      </van-popup>
      <van-popup
        v-model="show"
        position="right"
        :overlay="false"
        class="offCan"
        :style="{ height: '10%', width: '80%' }"
      >
        <div class="house-btn">
          <van-button class="no-button" @click="cancelBtn">清空</van-button>
          <van-button class="yes-button">确定</van-button>
        </div>
      </van-popup>
    </div>
    <!-- 列表 -->
    <BuildingList :List="HouseList"></BuildingList>
  </div>
</template>

<script>
import BuildingList from '@/components/BuildingList'
import { houseCondition, RegionalHousing } from '@/API/house'
import { mapState } from 'vuex'
export default {
  computed: { ...mapState(['city']) },
  data() {
    return {
      HouseMessage: null, // 区域的请求信息
      subway: null, // 地铁的请求信息
      rentType: null, // 出租类型的请求信息
      price: null, // 价格的请求信息
      HouseList: [], // 房屋列表
      HouseOrientation: [], //朝向选中条件
      result: [], // 详细筛选条件
      show: false, // 筛选面板显示隐藏
      WayToScreen: [], // 方式筛选数据
      area: {}, // 所有筛选数据
      InScreening: [], // 区域筛选数据
      PriceOfScreening: [], // 租金筛选数据
      HouseWindow: [], // 房屋亮点数据
      floor: [], // 楼层数据
      orientation: [], // 朝向数据
      HouseType: [] // 房屋类型数据
    }
  },
  components: {
    BuildingList
  },
  async created() {
    const res = await houseCondition(this.city.value) // 获取房屋筛选条件
    const reg = JSON.stringify(res.data.body) // 转换为字符串截取
    const reg1 = /label/gi //定义正则
    this.area = JSON.parse(reg.replace(reg1, 'text')) // 截取label替换为text
    // console.log(this.area)
    this.InScreening.push(this.area.area) // 区域数据
    this.InScreening.push(this.area.subway) // 地铁数据
    this.WayToScreen = this.area.rentType // // 方式数据
    this.PriceOfScreening = this.area.price // 价钱数据
    this.HouseWindow = this.area.characteristic // 房屋亮点数据
    this.floor = this.area.floor // 楼层数据
    this.orientation = this.area.oriented // 朝向数据
    this.HouseType = this.area.roomType // 房屋类型数据
    this.fn()
    // this.getRegionalHousings()
    const { data } = await RegionalHousing(this.city.value) // 房屋列表数据请求
    this.HouseList = data.body.list // 房屋列表数据
    // console.log(this.HouseList)
  },
  methods: {
    // 三层级联选择器，第二层第一个为空，所以手动添加走到第三层
    fn() {
      this.InScreening[0].children[0].children = [{ text: '' }]
      this.InScreening[1].children[0].children = [{ text: '' }]
    },
    // 具体信息筛选取消按钮
    cancelBtn() {
      this.result = []
      this.show = false
    },

    onClickLeft() {
      this.$router.back()
    },
    onConfirm() {
      this.$refs.item.toggle()
    },
    // 判断用户选择的的地址
    areaBtn() {
      const res = this.$refs.area.getValues()
      if (res[0].name === '区域') {
        res.forEach((item, index) => {
          if (item.value !== 'null' && item.value) {
            this.HouseMessage = item.value
          } else {
            this.HouseMessages = res[index - 1].value
              ? res[index - 1].value
              : res[0].value
          }
        })
      } else {
        res.forEach((item, index) => {
          if (item.value !== 'null' && item.value) {
            this.subway = item.value
          } else {
            this.subways = res[index - 1].value
              ? res[index - 1].value
              : res[0].value
          }
        })
      }
    },
    // 请求数据
    async getHouses() {}
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
:deep(.van-checkbox__icon) {
  height: 30px;
  width: 70px;
  font-size: 12px;
  .van-icon {
    width: 100%;
    height: 100%;
    border-radius: unset;
    border: unset;
  }
}
.selectionPanel {
  .a {
    position: absolute;
    top: 6px;
    left: 0px;
    font-size: 14px;
    white-space: nowrap;
  }
  .b {
    position: relative;
    width: 70px;
  }
  :deep(.van-icon-success:before) {
    content: unset;
  }
  :deep(.van-grid-item__content) {
    padding: 0;
    width: 70px;
    height: 30px;
  }
  :deep(.van-cell::after) {
    border: unset;
  }
  .van-cell {
    margin-bottom: 20px;
    margin-top: 10px;
    span {
      font-size: 16px;
    }
  }
  .van-checkbox-group {
    margin-left: 40px;
    border-bottom: 2px solid #f5f5f5;
    padding-bottom: 30px;
  }
}
.house-btn {
  display: flex;
  font-size: 14px;
  .no-button {
    flex: 1;
    color: #21b97a;
  }
  .yes-button {
    flex: 1.5;
    background-color: #21b97a;
    color: #fff;
  }
}
.offCan {
  margin-top: 300px;
}
</style>
