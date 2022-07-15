<template>
  <div class="login-form">
    <!-- 标题导航 -->
    <van-nav-bar left-arrow title="账号登录" @click-left="onClickLeft"
/>
    <!-- 账号输入框 -->
    <van-form @submit="onSubmit">
      <van-field
        class="nav-field"
        v-model="username"
        name="用户名"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <!-- 密码输入框 -->
      <van-field
        class="nav-field"
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button
          class="find-btn"
          color="#21b97a"
          block
          type="info"
          native-type="submit"
          >登 录</van-button
        >
      </div>
      <div class="login-btn" @click.prevent="findBtn()">
        <p>还没有账号,去注册~</p>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/API/user.js'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({ message: '加载中...', forbidClick: true }) // 开启加载中状态

      try {
        const res = await login(this.username, this.password)
        this.$toast.success('登录成功') // 关闭加载中状态，提示成功

        this.$store.commit('setUser', res.data.body) // 存储用户信息
        // console.log(res.data.status)
        if (res.data.status === 400) {
          this.$toast.fail('账号或密码错误') // 关闭加载中状态，提示失败
        } else if (res.data.status === 200) {
          this.$router.push('/my') // 登录成功，跳转到首页
        } else {
          this.$toast.success('登录异常,请稍后再试') // 关闭加载中状态，提示异常
        }
      } catch (err) {
        // console.log(err)
      }
    },
    findBtn() {
      this.$router.push('/register')
    },
    onClickLeft() {
      this.$router.back()

    }

  }
}
</script>

<style lang="less" scoped>
.login-form {
  .nav-field {
    padding-top: 30px;
  }
  .find-btn {
    margin-top: 30px;
    font-size: 16px;
  }
  .login-btn {
    font-size: 14px;
    text-align: center;
    color: #6a6666;
    margin-top: 30px;
  }
}
</style>
