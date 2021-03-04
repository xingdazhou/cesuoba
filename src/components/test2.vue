<template>
  <div>
    <cube-upload
      action="http://localhost:3000"
      :simultaneous-uploads="1"
      @files-added="filesAdded"
    />
  </div>
</template>

<script>
export default {
  methods: {
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >1M files'
      }).show()
    }
  }
}
</script>

<style>
</style>