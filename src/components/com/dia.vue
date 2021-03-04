<template>
  <cube-button @click="showAlert">Dialog - alert</cube-button>
</template>

<script>
export default {
  name: "dia",
  methods: {
    showAlert() {
      this.$createDialog({
        type: "alert",
        title: "我是标题",
        content: "我是内容",
        icon: "cubeic-alert"
      }).show();
    }
  }
};
</script>

<style>
</style>