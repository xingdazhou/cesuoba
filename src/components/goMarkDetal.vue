<template>
  <div>
    <navgater :title="title">
      <span class="change" @click="change">全景 / 2D</span>
    </navgater>
    <div id="panorama" style="margin-top:12vh width:100%;height:80vh" v-show="flag"></div>
    <div id="allmap" style="margin-top:12vh width:100%;height:80vh" v-show="!flag"></div>

    <cube-button :primary="true" style="position:fixed;bottom:45px;opacity:0.8" @click="go">奔跑吧，兄弟</cube-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      lng: "",
      lat: "",
      myPoint: {},
      goPoint:{},
      flag: false,
    };
  },
  methods: {
    change() {
      console.log(this.flag);
      this.flag = !this.flag;
    },
    go() {
      console.log(this.goPoint.lng, this.goPoint.lat,this.myPoint.lng,this.myPoint.lat,this.title)
      this.$router.push({
        name: "detal",
        query: {
          myPoint: this.myPoint,
          goPoint: this.goPoint,
          title: this.title,
          tag:false
        }
      });
    }
  },
  mounted() {
    this.lng = this.$route.query.lng;
    this.lat = this.$route.query.lat;
    this.title = this.$route.query.title;
    this.myPoint = this.$store.state.myPoint;
    this.goPoint = new BMap.Point(Number(this.lng), Number(this.lat))
    this.myPoint = new BMap.Point(Number(this.myPoint[0]), Number(this.myPoint[1]))

    // 先画出厕所位置的全景图
    var map = new BMap.Map("panorama");
    map.centerAndZoom(new BMap.Point(Number(this.lng), Number(this.lat)), 12);
    map.addTileLayer(new BMap.PanoramaCoverageLayer());

    var panorama = new BMap.Panorama("panorama");
    panorama.setPov({ heading: -40, pitch: 6 });
    panorama.setPosition(new BMap.Point(Number(this.lng), Number(this.lat)));

    // 画出厕所的普通图
    var map1 = new BMap.Map("allmap");
    map1.centerAndZoom(new BMap.Point(116.331398, 39.897445), 18);
    map1.enableScrollWheelZoom(true);
    map.clearOverlays();
    var new_point = new BMap.Point(Number(this.lng), Number(this.lat));
    var marker = new BMap.Marker(new_point);
    map1.addOverlay(marker);
    map1.panTo(new_point);
    this.map1 = map1;
  }
};
</script>

<style scoped>
.change {
  box-sizing: border-box;
  display: inline-block;
  background: #f40;
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