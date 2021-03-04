<template>
  <div>
    <!-- 中间地图 -->
    <div id="container" style="width:100%;height:50%"></div>
    <ul>
      <li
        v-for="item in result"
        :key="item.adddrss"
        @click="fn(item.goPoint, item.title, item.address)"
      >
        <img class="image" src="../../static/img/cesuo1.svg" alt />
        <!-- 标题 -->
        <div>
          <span>{{ item.title }}</span>
          <span v-if="item.flag" class="sp">{{ item.flag }}</span>
        </div>

        <!-- 距离 -->
        距离：
        <p style="display:inline-block;color:#f40">{{ item.distance }} 米</p>
        <p class="address_text">{{ item.address }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      address: "",
      result: [],
      myPoint: {}
    };
  },
  methods: {
    // 点击列表项路由跳转
    fn(goPoint, title, address) {
      this.$router.push({
        name: "detal",
        query: {
          myPoint: this.myPoint,
          goPoint: goPoint,
          title: title,
          address: address,
          tag: true
        }
      });
    },
    // 定位后调用
    showAlert() {
      this.$createDialog({
        type: "alert",
        title: "已定位到您的位置",
        content: this.address,
        icon: "cubeic-alert"
      }).show();
    }
  },

  mounted() {
    // 创建好地图
    let map = new BMap.Map("container"); //创建地图实例
    map.enableScrollWheelZoom(); //开启鼠标滚轮缩放

    var navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // LARGE类型
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      // 启用显示定位
      enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    map.addControl(geolocationControl);

    map.setMaxZoom(18);
    map.setMinZoom(12);

    // var mapStyle={style : "dark" }
    //     map.setMapStyle(mapStyle);

    var that = this; //保存vue实例
    // 定位
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          // var myIcon = new BMap.Icon(
          //   "../../static/img/小人.png",
          //   new BMap.Size(35, 35)
          // );
          // var marker2 = new BMap.Marker(r.point, { icon: myIcon }); // 创建标注
          // map.addOverlay(marker2); // 将标注添加到地图中

          let mk = new BMap.Marker(r.point);
          map.addOverlay(mk); //标出所在地

          // map.panTo(r.point); //地图中心移动
          // mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
          console.log("您的位置：" + r.point.lng + "," + r.point.lat);
          // 保存登录状态
          let username = localStorage.getItem("username");
          that.$store.dispatch("setUser", username);
          // 保存自己的经纬度
          let pointA = [r.point.lng, r.point.lat];
          that.$store.dispatch("setMyPoint", pointA);
          that.myPoint = new BMap.Point(pointA[0], pointA[1]);
          let point = new BMap.Point(r.point.lng, r.point.lat); //用所定位的经纬度查找所在地省市街道等信息
          let gc = new BMap.Geocoder();
          map.centerAndZoom(point, 15); //初始化地图，设置中心坐标点和地图级别
          map.panTo(r.point); //地图中心移动

          gc.getLocation(point, function(rs) {
            // console.log(that);
            let addComp = rs.addressComponents;
            console.log(addComp);
            // console.log(rs.address); //地址信息
            that.address = rs.address;
            that.showAlert();
            // console.log(rs.business); //街道信息
            // console.log(addComp.street); //街道信息
          });

          // 自动poi搜索厕所;
          // var local = new BMap.LocalSearch(map, {
          //   renderOptions: { map: map, panel: "result" }
          // });
          // local.search("公共厕所");

          let goPoint = {};
          var options = {
            renderOptions: { map: map, panel: "result" },
            onSearchComplete: function(results) {
              // 判断状态是否正确
              if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                console.log(results);
                let key = Object.keys(results)[12]
                console.log(key, results[key]);
                let distance = results[key].map(item => {
                  let lng = item.point.lng;
                  let lat = item.point.lat;
                  let pointB = [lng, lat];
                  goPoint = new BMap.Point(pointB[0], pointB[1]);
                  let dis = map.getDistance(that.myPoint, goPoint).toFixed(2);
                  return { dis, goPoint };
                });
                // console.log(distance);
                // results.Ir.push(distance)
                for (let i = 0; i < results[key].length; i++) {
                  results[key][i].distance = distance[i].dis;
                  results[key][i].goPoint = distance[i].goPoint;
                }
                // 这里先从近到远排序
                // results[key].sort(function(a, b) {
                //   return a.distance - b.distance;
                // });
                that.result = results[key];

                // 在这里如果有登陆状态，并且有添加的数据，则读取出来合并到result里面去
                console.log(that.$store);
                if (that.$store.state.user) {
                  that.$axios
                    .get("/api/getAdd", {
                      params: { username: that.$store.state.user }
                    })
                    .then(res => {
                      console.log("res", res);
                      if (res.data.length > 0) {
                        for (var i of res.data) {
                          var obj = {};
                          const { lng, lat, address, title } = i;
                          let pointB = [lng, lat];
                          var goPoint = new BMap.Point(pointB[0], pointB[1]);
                          var distance = map
                            .getDistance(that.myPoint, goPoint)
                            .toFixed(2);
                          obj.title = title;
                          obj.distance = distance;
                          obj.goPoint = goPoint;
                          obj.address = address;
                          obj.flag = "您添加的厕所";
                          that.result.push(obj);
                        }
                        console.log(that.result);
                        that.result.sort(function(a, b) {
                          return a.distance - b.distance;
                        });
                        console.log(that.result);
                      } else {
                        that.result.sort(function(a, b) {
                          return a.distance - b.distance;
                        });
                        // console.log(that.result);
                      }
                    });
                } else {
                  that.result.sort(function(a, b) {
                    return a.distance - b.distance;
                  });
                  // console.log(that.result);
                }
                // 获取数据库结束
              }
            }
          };
          var local = new BMap.LocalSearch(map, options);
          local.search("厕所");

          // //自动规划路线
          // var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
          // walking.search("黔灵公园", "厕所");
          // 拿到detal组件里面写
        } else {
          console.log("failed" + this.getStatus());
        }
      }
      // { enableHighAccuracy: true }
    );

    // 添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_SATELLITE_MAP]
      })
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  box-sizing: border-box;
}
html body div#result div {
  border: none;
}
ul {
  padding: 0;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 55px;
}
ul li {
  padding: 2px 0 0 0;
  margin: 0;
  list-style: none;
  height: 12vh;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 0 1px 1px #ccc;
  border-bottom: none;
}
.address_text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.image {
  padding: 2px 2px 0 0;
  height: 80%;
  width: 20%;
  float: left;
}
li p {
  padding: 2px;
}
.sp {
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  background: #fc9153;
  margin-left: 1rem;
  color: #fff;
}
</style>
