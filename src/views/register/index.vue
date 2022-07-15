<template>
  <div>
    <van-nav-bar left-arrow title="注册账号" @click-left="onClickLeft" />
    <!-- 账号输入框 -->
    <van-form @submit="onSubmit">
      <van-field
        class="nav-field"
        v-model="username"
        name="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
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
      <van-field
        class="nav-field"
        v-model="affpassword"
        type="password"
        name="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

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
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      affpassword: ''
    }
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.nav-field {
  padding-top: 30px;
}
.find-btn {
  margin-top: 30px;
  font-size: 16px;
}
</style>
