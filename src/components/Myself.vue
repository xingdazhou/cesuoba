<template>
  <div>
    <div class="header">
      <!-- 上方背景图片区域 -->
      <div class="background"></div>
      <!-- 中间区域 -->
      <div class="center"></div>
      <cube-upload
        action="//jsonplaceholder.typicode.com/photos/"
        :simultaneous-uploads="1"
        @files-added="filesAdded"
        class='fileload'
      />
    </div>

    <!-- 下方区域 -->
    <div class="bottom" v-if="!username">
      <div class="inner">
        <p style="font-size:16px;font-family:'微软雅黑'">
          立即
          <router-link to="/login" tag="span" style="font-size:16px;color:red"
            >登录</router-link
          >，体验更多功能
        </p>
      </div>
    </div>

    <!-- 注销按钮 -->
    <div class="bottom1" v-if="username">
      <p class="welcome" style="font-size:16px;font-family:'微软雅黑'">
        <span style="color:#f40">{{ username }}</span
        >欢迎使用厕所吧
      </p>
      <cube-button @click="remove" style="padding-top:10px">注销</cube-button>
    </div>
    <!-- <div class="bottom2">
      <cube-button @click="addToDesk" :primary="true" style="padding-top:10px">添加应用到桌面</cube-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username")
    };
  },
  methods: {
    addToDesk() {
      var title = document.title;
      var url = document.URL.split("#")[0];
    },
    remove() {
      localStorage.removeItem("username");
      this.$store.dispatch("setUser", "");
      console.log("注销成功");
      this.username = false;
    },
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 3 * 1024 * 1024; // 3M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore &&
        this.$createToast({
          type: "warn",
          time: 1000,
          txt: "You selected >1M files"
        }).show();
    },
    upLoad() {
      console.log("开始上传");
    }
  }
};
</script>

<style scoped>
/* .contain {
  width: 100%;
  height: 100vh;
  background: url("../../static/img/backImg/1.jpg");
} */
.header {
  position: relative;
  width: 100%;
  height: 30vh;
  box-sizing: border-box;
  /* border: 2px solid #ccc; */
  margin-bottom: 70px;
}
.background {
  width: 100%;
  height: 100%;
  background: url("../../static/img/backImg/6.jpg");
  background-size: 100% 100%;
}
.fileload {
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* opacity: 0; */
}
.center {
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #ccc;
  background: url("../../static/img/backImg/tou.png");
  background-size: contain;
  background-color: #fff;
  /* opacity: 0.9; */
}
.bottom {
  width: 60%;
  height: 10vh;
  margin: 0 auto;
  box-sizing: border-box;
  line-height: 10vh;
  color: #424242;
}
/* .bottom1 {
  position: absolute;
  bottom: 0;
} */
.welcome {
  text-align: center;
}
</style>
