<template>
  <div class="my-container">
    <div>
      <!-- 已登录背景图 -->
      <div class="my-setting" v-if="user">
        <img :src="url + dataName.avatar" />
      </div>
      <!-- 未登录背景图 -->
      <div class="no-my-setting" v-if="!user">
        <img src="http://liufusong.top:8080/img/profile/bg.png" />
      </div>
      <!-- 个人资料 -->
      <div class="my-data">
        <!-- 头像 -->
        <div class="my-data-img">
          <img
            v-if="user"
            src="http://liufusong.top:8080/img/profile/avatar.png"
          />
          <img
            v-if="!user"
            src="http://liufusong.top:8080/img/profile/avatar.png"
          />
        </div>
        <!-- 名字 -->
        <div class="my-data-name" v-if="user">{{ dataName.nickname }}</div>
        <div class="no-my-data-name" v-if="!user">游客</div>

        <!-- 登录/退出 -->
        <div>
          <van-button v-if="!user" @click="mylogin" class="no-my-data-quit"
            >去登陆</van-button
          >
        </div>
        <div>
          <van-button v-if="user" class="my-data-quit" @click="quitBtn"
            >退出</van-button
          >
        </div>

        <!-- 编辑 -->
        <div class="my-data-bar" v-if="user">
          <p>编辑个人资料</p>
          <van-icon name="play" />
        </div>
      </div>
    </div>
    <!-- 我的导航栏 -->
    <div class="my-data-nav">
      <van-grid :column-num="3" :border="false" :clickable="true">
        <van-grid-item text="我的收藏">
          <i slot="icon" class="iconfont icon-shoucang"></i>
        </van-grid-item>
        <van-grid-item text="我的出租">
          <i slot="icon" class="iconfont icon-zhuye"></i>
        </van-grid-item>
        <van-grid-item text="看房记录">
          <i slot="icon" class="iconfont icon-jilu"></i>
        </van-grid-item>
        <van-grid-item text="成为房主">
          <i slot="icon" class="iconfont icon-fangwuchuzu"></i>
        </van-grid-item>
        <van-grid-item text="个人资料">
          <i slot="icon" class="iconfont icon-31wode"></i>
        </van-grid-item>
        <van-grid-item text="联系我们">
          <i slot="icon" class="iconfont icon-kefu"></i>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 广告区域 -->
    <div class="my-data-poster">
      <img src="http://liufusong.top:8080/img/profile/join.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { users } from '@/API/user'
export default {
  data() {
    return {
      dataName: [], // 用户信息
      url: 'http://liufusong.top:8080'
    }
  },
  computed: { ...mapState(['user']) },
  methods: {
    //点击登录跳转
    mylogin() {
      this.$router.push('/login')
    },
    //退出登录
    quitBtn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确认退出'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)

          console.log(11)
        })
        .catch(() => {
          // on cancel
        })
    },
    //获取用户信息
    async users() {
      try {
        const res = await users()
        this.dataName = res.data.body
        console.log(this.dataName)
      } catch (err) {}
    }
  },
  created() {
    this.users()
  }
}
</script>

<style lang="less" scoped>
.my-container {
  padding-bottom: 60px;

  .my-setting {
    height: 350px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .no-my-setting {
    height: 200px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .my-data {
    background-color: #fff;
    position: absolute;
    width: 320px;
    top: 180px;
    left: 28px;
    text-align: center;
    box-shadow: 0px 0px 5px 5px #e8e7e3;

    .my-data-img {
      position: absolute;
      top: -40px;
      left: 120px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 5px solid #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .my-data-name {
      font-size: 13px;
      color: #333333;
      padding-top: 55px;
      margin-bottom: 5px;
    }
    .my-data-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 40px;
      font-size: 12px;
      color: #999999;
    }
    .my-data-quit {
      width: 50px;
      height: 20px;
      font-size: 12px;
      color: #fff;
      background-color: #21b97a;
      white-space: nowrap;
      border-radius: 10px;
    }
    .no-my-data-quit {
      width: 80px;
      height: 30px;
      font-size: 12px;
      color: #fff;
      border-radius: 5px;
      background-color: #21b97a;
      white-space: nowrap;
      margin-bottom: 20px;
    }
    .no-my-data-name {
      padding-top: 65px;
      margin-bottom: 10px;
      font-size: 13px;
      color: #333333;
    }
  }
  .my-data-nav {
    margin-top: 25px;
    .iconfont {
      font-size: 20px;
    }
    :deep(.van-grid-item__text) {
      margin-top: 5px;
    }
  }
  .my-data-poster {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.van-grid {
  margin-top: 100px;
}
</style>
