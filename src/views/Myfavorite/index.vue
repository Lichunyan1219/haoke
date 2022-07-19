<!-- 我的收藏 -->
<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="onClickLeft" />
    <BuildingList :List="favoriteList"></BuildingList>
  </div>
</template>

<script>
import BuildingList from '@/components/BuildingList'

import { favorite } from '@/API/user'
export default {
  data() {
    return {
      favoriteList: []
    }
  },
  methods: {
    async myFavorite() {
      try {
        const res = await favorite()
        this.favoriteList = res.data.body
        // console.log(this.favoriteList)
      } catch (err) {}
    },
    onClickLeft() {
      this.$router.back()
    }
  },
  created() {
    this.myFavorite()
    //
  },
  components: {
    BuildingList
  }
}
</script>

<style></style>
