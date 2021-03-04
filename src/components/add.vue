<template>
  <div>
    <navgater title="添加厕所"></navgater>
    <ul>
      <li style="margin-top:12vh">
        <span>名称：</span>
        <span>{{title}}</span>
      </li>
      <li>
        <span>当前经度：</span>
        <span>{{lng}}</span>
      </li>
      <li>
        <span>当前纬度：</span>
        <span>{{lat}}</span>
      </li>
      <li>
        <span>当前位置：</span>
        <span>{{address}}</span>
      </li>
      <li>
        <span>街道信息：</span>
        <span>{{business}}</span>
      </li>
    </ul>
    <cube-button @click="addToAdd" class="cbt">添加厕所</cube-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "公共厕所",
      lng: "",
      lat: "",
      address: "",
      business: "",
      judge: "",
      judge1: ""
    };
  },
  methods: {
    showToastType(text) {
      const toast = this.$createToast({
        txt: text,
        type: "correct"
      });
      toast.show();
      setTimeout(() => {
        this.$router.push("/mark");
      }, 1000);
    },
    addToAdd() {
      // console.log(this.$store.state.user)
      // console.log(this.Add())
      if (!this.judge && !this.judge1) {
        this.Add();
        this.showToastType("已添加位置");
        // alert("已添加位置");
      } else {
        // alert('请勿重复添加')
        this.showToastType("请勿重复添加");
      }
    },
    Add() {
      // axios.post('/', {})
      this.$axios
        .post("/api/insertAdd", {
          username: this.$store.state.user,
          title: this.title,
          lng: this.lng,
          lat: this.lat,
          address: this.address
        })
        .then(res => {
          console.log("res", res);
          this.judge = res.data;
        });
    }
  },
  mounted() {
    var that = this; //保存vue实例
    // 定位
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
          that.lng = r.point.lng;
          that.lat = r.point.lat;
          // 保存自己的经纬度,在这里把store里面的定位信息替换了
          let pointA = [r.point.lng, r.point.lat];
          that.$store.dispatch("setMyPoint", pointA);
          let point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
          let gc = new BMap.Geocoder();
          gc.getLocation(point, function(rs) {
            let addComp = rs.addressComponents;
            console.log(addComp);
            that.address = rs.address;
            console.log(rs.business); //街道信息
            console.log(addComp.street); //街道信息
            that.business = rs.business;
            console.log(rs);
          });
        } else {
          console.log("failed" + this.getStatus());
        }
      },
      { enableHighAccuracy: true }
    );
  }
};
</script>

<style scoped>
ul {
  padding: 0;
  padding-bottom:100px;
}
ul li {
  padding: 2rem 1rem;
  list-style: none;
  box-shadow: 0 0 2px 2px #ccc;
}
ul li span:last-child {
  color: #f40;
}
.cbt{
  position:fixed;
  bottom:50px;
}
</style>