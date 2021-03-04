<template>
  <div>
    <navgater :title="title" >
      <span class="add" @click="addMark" v-show="tag">标记</span>
    </navgater>
    <div style="margin-top:12vh">
      <div id="l-map" style="width:100%;height:40vh"></div>
      <div id="r-result"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detal",
  data() {
    return {
      flag:"",
      title: "",
      address: "",
      myPoint: {},
      goPoint: {},
      tag: true
    };
  },
  methods: {
    // 弹出层
    showToastType(text) {
      const toast = this.$createToast({
        txt: text,
        type: 'correct'
      })
      toast.show()
    },
    showBtn(goOrBack) {
       this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-question',
        title: '您未登录',
        content: '登陆后可标记该厕所',
        confirmBtn: {
          text: '马上登陆',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '稍后再说',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {          
          this.$router.push(goOrBack)
        },
        onCancel: () => {
           this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '你会后悔的'
          }).show()
        }
      }).show();
    },



    addMark() {
      // console.log(this.$store.state.user)
      if (this.$store.state.user) {
        this.insertMark();
        // alert("已添加到标记");
        this.showToastType("已添加到标记")
      } else {
        this.showBtn("/login")
      }
    },

    insertMark() {
      // axios.post('/', {})
      this.$axios
        .post("/api/insertMark", {
          username: this.$store.state.user,
          title: this.title,
          lng: this.goPoint.lng,
          lat: this.goPoint.lat,
          address: this.address
        })
        .then(res => {
          console.log("res", res);
        });
    }
  },
  // filters:{
  //     filterTitle(msg){
  //         return msg.slice(-10);
  //     }
  //   },
  mounted() {
    this.myPoint = this.$route.query.myPoint;
    this.goPoint = this.$route.query.goPoint;
    this.title = this.$route.query.title;
    this.address = this.$route.query.address;
    this.tag = this.$route.query.tag;
    // 百度地图API功能
    var map = new BMap.Map("l-map");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    console.log("我的位置" + this.myPoint.lng, this.myPoint.lat);
    console.log("目标位置" + this.goPoint.lng, this.goPoint.lat);
    var start = new BMap.Point(this.myPoint.lng, this.myPoint.lat);
    var end = new BMap.Point(this.goPoint.lng, this.goPoint.lat);
    var walking = new BMap.WalkingRoute(map, {
      renderOptions: { map: map, panel: "r-result", autoViewport: true }
    });
    walking.search(start, end);
  }
};
</script>

<style>

.add {
  box-sizing: border-box;
  display: inline-block;
  background: #669DF6;
  position: absolute;
  right: 0;
  width: 20%;
  height: 100%;
  padding-top: 6px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
}
</style>