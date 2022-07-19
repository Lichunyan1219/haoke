<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item to="/looking" icon="search">标签</van-tabbar-item>
      <van-tabbar-item to="/consult" icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item to="/my" icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
