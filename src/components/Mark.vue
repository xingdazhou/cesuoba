<template>
  <div>
    <cube-tab-bar v-model="selectedLabel" show-slider @click="click">
      <cube-tab v-for="item in tabs" :icon="item.icon" :label="item.label" :key="item.label"></cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
        <div class="swipe-wrapper">
          <cube-scroll>
            <cube-swipe>
              <transition-group name="swipe" tag="ul">
                <li
                  class="swipe-item-wrapper"
                  v-for="(data,index) in item.markCesuo"
                  :key="data.item.lat"
                >
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick"
                  >
                    <div
                      @click="goMarkDetal(data.item.title,data.item.lng,data.item.lat)"
                      class="item-inner"
                    >
                      <div class="icon">
                        <img :src="data.item.img" />
                      </div>
                      <div class="text">
                        <h2 class="item-name">{{data.item.title}}</h2>
                        <p class="item-desc">{{data.item.address}}</p>
                      </div>
                    </div>
                  </cube-swipe-item>
                </li>
              </transition-group>
              <!-- <transition-group name="swipe" tag="ul">
                <li
                  class="swipe-item-wrapper"
                  v-for="(data,index) in tabs[1].insertCesuo"
                  :key="data.item.lng"
                >
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="data.btns"
                    :index="index"
                    @btn-click="onBtnClick"
                  >
                    <div
                      @click="goMarkDetal(data.item.title,data.item.lng,data.item.lat)"
                      class="item-inner"
                    >
                      <div class="icon">
                        <img width="60" height="60" :src="data.item.img" />
                      </div>
                      <div class="text">
                        <h2 class="item-name" >{{data.item.title}}</h2>
                        <p class="item-desc" >{{data.item.address}}</p>
                      </div>
                    </div>
                  </cube-swipe-item>
                </li>
                <cube-button v-if="flag == '添加'" @click="goAdd">添加</cube-button>
              </transition-group>-->
            </cube-swipe>
          </cube-scroll>
        </div>
      </cube-tab-panel>
    </cube-tab-panels>
        <cube-button  v-if="flag == '添加'" @click="goAdd" class="mybtnclass">添加</cube-button>
        <!-- <button>我就是我</button> -->

  </div>
</template>
<script>
export default {
  data() {    return {
      flag: "标记",
      selectedLabel: "标记",
      tabs: [
        {
          label: "标记",
          icon: "cubeic-star",
          markCesuo: []
        },
        {
          label: "添加",
          icon: "cubeic-like",
          markCesuo: []
        }
      ]
    };
  },
  methods: {
    // 弹框
     showToastType(text) {
      const toast = this.$createToast({
        txt: text,
        type: 'error'
      })
      toast.show()
    },
    // 点击每个li列表，进到详情页
    goMarkDetal(title, lng, lat) {
      // console.log(title,lng,lat);
      this.$router.push({
        name: "goMarkDetal",
        query: {
          title,
          lng,
          lat
        }
      });
    },
    goAdd() {
      this.$router.push("/add");
    },
    // 点击导航，查询出不同的数据
    click(label) {
      console.log(label);
      if (label == "标记") {
        this.getMark();
        this.flag = "标记";
        console.log(this.flag);
      } else {
        this.getAdd();
        this.flag = "添加";
        console.log(this.flag);
      }
    },
    getMark() {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/getMark", {
          params: { username: this.$store.state.user }
        })
        .then(res => {
          console.log("res", res.data);

          if (res.data.length > 0) {
            var arr = [];
            var res = res.data;
            for (var i of res) {
              var myItem = {
                item: {
                  img: "",
                  title: "",
                  address: "",
                  lat: "",
                  lng: ""
                },
                btns: [
                  {
                    action: "delete",
                    text: "删除",
                    color: "#ff3a32"
                  }
                ]
              };
              var { img, title, lat, lng, address } = i;
              myItem.item = { img, title, lat, lng, address };
              arr.push(myItem);
            }
            this.tabs[0].markCesuo = arr;
            // console.log( this.tabs[0].markCesuo)
          } else {
            // alert("您还没有标记过任何厕所哦");
            this.showToastType("您还没有标记过任何厕所哦")
          }
        });
    },
    getAdd() {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/getAdd", {
          params: { username: this.$store.state.user }
        })
        .then(res => {
          console.log("res", res);

          if (res.data.length > 0) {
            var arr = [];
            var res = res.data;
            for (var i of res) {
              var myItem = {
                item: {
                  img: "",
                  title: "",
                  address: "",
                  lat: "",
                  lng: ""
                },
                btns: [
                  {
                    action: "delete",
                    text: "删除",
                    color: "#ff3a32"
                  }
                ]
              };
              var { img, title, lat, lng, address } = i;
              myItem.item = { img, title, lat, lng, address };
              arr.push(myItem);
            }
            this.tabs[1].markCesuo = arr;
            // console.log( this.tabs[0].markCesuo)
          } else {
            // alert("您还没有添加过任何厕所哦");
            this.showToastType("您还没有添加过任何厕所哦")

          }
        });
    },
    deleteAdd(lng) {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/deleteAdd", {
          params: { lng: lng }
        })
        .then(res => {
          console.log("res", res);
        });
    },
    deleteMark(lng) {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/deleteMark", {
          params: { lng: lng }
        })
        .then(res => {
          console.log("res", res);
        });
    },
    onBtnClick(btn, index) {
      console.log(btn, index);
      if (btn.action === "delete") {
        this.$createActionSheet({
          title: "确认要删除吗",
          active: 0,
          data: [{ content: "删除" }],
          onSelect: () => {
            console.log(this.flag);
            if (this.flag == "标记") {
              // this.tabs[0].markCesuo.splice(index, 1);   这里必须先删除数据库在删除前端数组
              console.log(index,this.tabs[0].markCesuo)
              this.deleteMark(this.tabs[0].markCesuo[index].item.lng);
              this.tabs[0].markCesuo.splice(index, 1);

            } else {
              console.log(this.tabs[1].markCesuo[index].item);
              this.deleteAdd(this.tabs[1].markCesuo[index].item.lng);
              this.tabs[1].markCesuo.splice(index, 1);
            }
          }
        }).show();
      }
    }
  },
  mounted() {
    this.getMark();
  }
};
</script>
<style  scoped>
img {
  padding: 3px;
  width: 20%;
  height: 80%;
  float: left;
}
.title {
  color: #333;
  font-size: 14px;
  padding: 4px 1px;
}
ul {
  padding: 0;
  margin: 0;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 55px;
}
ul li {
  padding: 0;
  margin: 0;
  list-style: none;
  height: 12vh;
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: none;
}
.text {
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
}
.mybtnclass{
  position:fixed;
  bottom:50px;
}
</style>