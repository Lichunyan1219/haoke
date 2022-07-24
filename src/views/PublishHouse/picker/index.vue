<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="list"
      value-key="label"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onConfirm(value, index) {
      this.$toast(`当前值：${value.label}, 当前索引：${index}`)
      console.log(value)
    },
    onCancel() {
      this.$emit('onCancel')
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
