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
    <van-sticky>
      <div class="selectionPanel">
        <van-dropdown-menu>
          <!-- 区域 -->
          <van-dropdown-item title="区域" ref="menu">
            <van-picker :columns="InScreening" ref="area" />
            <div class="house-btn">
              <van-button class="no-button">取消</van-button>
              <van-button class="yes-button" @click="areaBtn">确定</van-button>
            </div>
          </van-dropdown-item>
          <!-- 方式 -->
          <van-dropdown-item title="方式" ref="menu1">
            <van-picker :columns="WayToScreen" ref="way" />
            <div class="house-btn">
              <van-button class="no-button">取消</van-button>
              <van-button class="yes-button" @click="wayBtn">确定</van-button>
            </div>
          </van-dropdown-item>

          <van-dropdown-item title="价钱" ref="menu2">
            <van-picker :columns="PriceOfScreening" ref="price" />
            <div class="house-btn">
              <van-button class="no-button">取消</van-button>
              <van-button class="yes-button" @click="priceBtn">确定</van-button>
            </div>
          </van-dropdown-item>

          <van-dropdown-item title="筛选" @open="show = true" ref="menu3">
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
            <van-button class="yes-button" @click="detailsBtn">确定</van-button>
          </div>
        </van-popup>
      </div>
    </van-sticky>
    <!-- 列表 -->

    <div class="houseList">
      <BuildingList :List="HouseList" @loadBtn="loadBtn"></BuildingList>
      <div class="NoHouseList" v-if="NoHouseList">暂无房源</div>
    </div>
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
      HouseType: [], // 房屋类型数据// 地铁线请求接口数据
      more: null, // 详细接口
      stat: 1, // 分页状态
      end: 20, // 分页结束数据
      NoHouseList: false // 无数据显示
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
    this.add()
    this.fn()
    // this.getRegionalHousings()
  },
  methods: {
    // 三层级联选择器，第二层第一个为空，所以手动添加走到第三层
    fn() {
      this.InScreening[0].children[0].children = [{ text: '' }]
      this.InScreening[1].children[0].children = [{ text: '' }]
    },
    // 获取列表筛选数据
    async add() {
      this.$store.commit('setLoad', true)
      const { data } = await RegionalHousing({
        cityid: this.city.value,
        rentType: this.rentType,
        subway: this.subway,
        area: this.HouseMessage,
        price: this.price,
        more: this.more,
        stat: this.stat,
        end: this.end
      }) // 房屋列表数据请求
      this.HouseList = data.body.list // 房屋列表数据
      this.$store.commit('setLoad', false)
      if (data.body.list.length < 5) {
        this.$store.commit('setFinish', true)
      }
      if (data.body.list.length == 0) {
        this.NoHouseList = true
      }
    },
    // 具体信息筛选取消按钮
    cancelBtn() {
      this.result = []
      this.show = false
    },
    // 返回上一页
    onClickLeft() {
      this.$router.back()
    },
    // 判断用户选择的的地址
    // 发送不同的请求，获取不同的数据
    async areaBtn() {
      this.$refs.menu.toggle(false)
      const res = this.$refs.area.getValues()
      if (res[0].text !== '地铁') {
        res.forEach((item, index) => {
          if (item.value !== 'null' && item.value) {
            this.HouseMessage = item.value
          } else {
            this.HouseMessage = res[index - 1].value
              ? res[index - 1].value
              : res[0].value
          }
        })
        this.subway = null
        this.add()
      } else {
        res.forEach((i, index) => {
          if (i.value !== 'null' && !!i.value) {
            return (this.subway = i.value)
            // console.log(this.subways)
          } else {
            this.subway = !!res[index - 1].value
              ? res[index - 1].value
              : res[0].value
          }
        })
        this.HouseMessage = null
        this.add()
      }
    },
    // 出租方式筛选
    wayBtn() {
      this.$refs.menu1.toggle(false)
      const res = this.$refs.way.getValues()
      if (res[0].text === '整租') {
        this.rentType = true
      } else if (res[0].text === '合租') {
        this.rentType = false
      } else {
        this.rentType = null
      }
      console.log(this.rentType)
      this.add()
    },
    // 价格筛选
    priceBtn() {
      this.$refs.menu2.toggle(false)
      const res = this.$refs.price.getValues()
      if (res[0].text === '不限') {
        this.price = null
      } else {
        this.price = res[0].value
      }
      this.add()
    },
    detailsBtn() {
      this.show = false
      if (this.result.length !== 0) {
        this.more = this.result.join(',')
      }
      this.add()
    },
    loadBtn() {
      this.stat++
      this.end += 10
      this.add()
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
.houseList {
  margin-bottom: 50px;
}
</style>
