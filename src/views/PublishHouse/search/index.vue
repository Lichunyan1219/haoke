<template>
  <div class="chaSearch">
    <form action="/" class="form">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        background="#f5f5f5"
        class="search"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <van-cell
      :title="ele.communityName"
      v-for="(ele, index) in SearchList"
      :key="index"
      @click="onClick(ele)"
    />
  </div>
</template>

<script>
import { QueryVillage } from '@/API/house'
export default {
  data() {
    return {
      keywords: '',
      id: this.$store.state.city.value,
      SearchList: []
    }
  },
  methods: {
    async onSearch(val) {
      //   this.$toast(val)
      const res = await QueryVillage(val, this.id)
      this.SearchList = res.data.body
      console.log(this.SearchList)
    },
    backToPrePage() {
      this.$router.go(-1)
    },
    visibleSearchSuggestion() {
      console.log(11)
    },
    onClick(ele) {
      this.$store.commit('setSearchList', ele)
      this.$router.push('/publishhouse')
    }
  }
}
</script>

<style lang="less" scoped>
body {
  background-color: #fff;
}
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    white-space: nowrap;
    font-size: 14px;
    margin-right: 8px;
  }
}
:deep(.van-cell-group) {
  background-color: #f6f5f6;
}
:deep(.van-cell__value) {
  background-color: #fff;
}
.van-cell {
  background-color: unset;
}
</style>
