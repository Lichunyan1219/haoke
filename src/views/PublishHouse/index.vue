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
        <div @click="$router.push('/search')">
          <span>{{ HouseName ? HouseName : '请选择小区' }}</span
          ><van-icon name="arrow" />
        </div>
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
            <van-field v-model="price" placeholder="请输入租金/月" />
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
            <van-field v-model="floorNum" placeholder="请输入建筑面积" />
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
        <div @click="show1 = !show1">
          {{ ChooseRoom.label ? ChooseRoom.label : '请选择'
          }}<van-icon name="arrow" />
        </div>
      </van-cell>
      <van-popup v-model="show1" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="房型"
          show-toolbar
          :columns="roomType"
          value-key="label"
          @confirm="onConfirm1"
          @cancel="onCancel"
      /></van-popup>
    </div>
    <!-- 所在楼层 -->
    <div>
      <div>
        <van-cell title="所在楼层">
          <div @click="show = !show">
            <span>{{ SelectFloor.label ? SelectFloor.label : '请选择' }}</span
            ><van-icon name="arrow" />
          </div>
        </van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <van-picker
            title="标题"
            show-toolbar
            :columns="floor"
            value-key="label"
            @confirm="onConfirm"
            @cancel="onCancel"
        /></van-popup>
      </div>
    </div>
    <!-- 朝向 -->
    <div class="houseType">
      <van-cell>
        <div class="houseRent2" slot="title">
          <span>朝</span>
          <span>向</span>
        </div>
        <div @click="show2 = !show2">
          {{ ChooseTowards.label ? ChooseTowards.label : '请选择'
          }}<van-icon name="arrow" />
        </div>
      </van-cell>
      <van-popup v-model="show2" position="bottom" :style="{ height: '40%' }">
        <van-picker
          title="房型"
          show-toolbar
          :columns="oriented"
          value-key="label"
          @confirm="onConfirm2"
          @cancel="onCancel"
      /></van-popup>
    </div>
    <!-- 房屋标题 -->
    <div class="HouseTitle">
      <van-cell title="房屋标题" />
      <van-field
        placeholder="请输入标题(例如：整租 小区名 两室 5000元)"
        v-model="HouseTitle"
      />
    </div>
    <!-- 房屋图像-->
    <div class="HouseTitle">
      <van-cell title="房屋图像" />
      <van-uploader icon="plus" v-model="fileList" type="file" />
    </div>
    <!-- 房屋配置 -->
    <div class="houseIcon">
      <van-cell title="房屋配置" />
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          v-for="(ele, index) in supporting"
          @click="SelectConfiguration(ele.label, index)"
          :key="index"
          ><span ref="vanCell1" :class="houseIcon[index]"></span
          ><span ref="vanCell">{{ ele.label }}</span></van-grid-item
        >
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
            v-model="HouseDescription"
          />
        </template>
      </van-cell>
    </div>
    <!-- 底部按钮 -->
    <div class="house-btn">
      <van-button class="no-button" @click="noRental">清空</van-button>
      <van-button class="yes-button" @click="ImageUpload(fileList[0])"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
import { PublishingHouse, Rental, ImageUpload } from '@/API/house'
export default {
  data() {
    return {
      HouseName: this.$store.state.SearchList.communityName,
      roomType: [], // 户型请求数据
      floor: [], // 所在楼层请求数据
      oriented: [], // 朝向请求数据
      supporting: [], // 房屋配置请求数据
      houseIcon: {
        0: 'iconfont icon-b7',
        1: 'iconfont icon-b5',
        2: 'iconfont icon-b2',
        3: 'iconfont icon-b3',
        4: 'iconfont icon-b8',
        5: 'iconfont icon-b11',
        6: 'iconfont icon-b6',
        7: 'iconfont icon-b9',
        8: 'iconfont icon-b1',
        9: 'iconfont icon-b4'
      },
      HousingAllocation: [], // 发布房源配置选中数据
      fileList: [], // 图片选中数据
      floorNum: '', // 建筑面积数据
      price: '', // 租金数据
      show: false, // 楼层弹出框
      show1: false, // 房型弹出框
      show2: false, // 朝向弹出框
      SelectFloor: {}, // 楼层选中数据
      ChooseRoom: {}, // 房型选中数据
      ChooseTowards: {}, // 朝向选中数据
      HouseTitle: '', // 房屋标题
      HouseDescription: '' // 房屋描述
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
    },
    // 获取发布房源数据
    async PublishingHouse() {
      const res = await PublishingHouse()
      console.log(res.data.body)
      this.roomType = res.data.body.roomType
      this.floor = res.data.body.floor
      this.oriented = res.data.body.oriented
      this.supporting = res.data.body.supporting
    },
    // 选中房屋配置变色，取消选中删除
    SelectConfiguration(value, index) {
      if (
        this.$refs.vanCell[index].style.color !== '' &&
        this.$refs.vanCell1[index].style.color !== ''
      ) {
        this.$refs.vanCell[index].style.color = ''
        this.$refs.vanCell1[index].style.color = ''
        this.HousingAllocation.splice(this.HousingAllocation.indexOf(value), 1)
      } else {
        this.$refs.vanCell[index].style.color = '#12d269'
        this.$refs.vanCell1[index].style.color = '#12d269'
        if (this.HousingAllocation.indexOf(value) === -1) {
          this.HousingAllocation.push(value)
        }
      }
    },
    onCancel() {
      this.show = false
      this.show1 = false
    },
    onConfirm(value) {
      this.SelectFloor = value
      this.show = !this.show
    },
    onConfirm1(value) {
      this.ChooseRoom = value
      this.show1 = !this.show1
    },
    onConfirm2(value) {
      this.ChooseTowards = value
      this.show2 = !this.show2
    },
    // 发布房源按钮
    async Rental(img) {
      try {
        await Rental({
          title: this.HouseTitle,
          description: this.HouseDescription,
          supporting: this.HousingAllocation.join('|'),
          price: this.price,
          size: this.floorNum,
          roomType: this.ChooseRoom.value,
          floor: this.SelectFloor.value,
          oriented: this.ChooseTowards.value,
          houseImg: img
        })
        this.$dialog
          .confirm({
            title: '发布成功',
            cancelButtonText: '继续发布',
            confirmButtonText: '去查看',
            confirmButtonColor: '#61affe'
          })
          .then(() => {
            this.$router.push('/looking')
          })
          .catch(() => {
            this.HouseTitle = ''
            this.HouseDescription = ''
            this.HousingAllocation = []
            this.price = ''
            this.floorNum = ''
            this.ChooseRoom = {}
            this.SelectFloor = {}
            this.ChooseTowards = {}
            this.fileList = []
            this.$refs.vanCell.forEach((ele) => {
              ele.style.color = ''
            })
            this.$refs.vanCell1.forEach((ele) => {
              ele.style.color = ''
            })
          })
      } catch (err) {
        this.$toast('发布失败请稍后再试')
      }
    },
    noRental() {
      this.HouseTitle = ''
      this.HouseDescription = ''
      this.HousingAllocation = []
      this.price = ''
      this.floorNum = ''
      this.ChooseRoom = {}
      this.SelectFloor = {}
      this.ChooseTowards = {}
      this.fileList = []
      this.$refs.vanCell.forEach((ele) => {
        ele.style.color = ''
      })
      this.$refs.vanCell1.forEach((ele) => {
        ele.style.color = ''
      })
    },
    async ImageUpload(file) {
      // 获取文件地址
      try {
        const fromdata = new FormData()
        fromdata.append('file', file.file)
        const { data } = await ImageUpload(fromdata)
        this.Rental(data.body[0])
      } catch (err) {
        this.$toast('房屋图片不能为空')
      }
    }
  },
  created() {
    this.PublishingHouse()
  }
}
</script>

<style lang="less" scoped>
.newsHouse {
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
.houseIcon {
  span {
    font-size: 16px;
  }
  .iconfont {
    font-size: 20px;
  }
}
.ClickOnColor {
  span {
    color: #21b97a;
  }
  .iconfont {
    color: #21b97a;
  }
}
</style>
