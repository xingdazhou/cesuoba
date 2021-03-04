<template>
  <div class="imgs-container">
    <div class="duanzi">
      <ul>
        <li v-for="(item, index) in duanzi" :key="item.id" class="oitem">
          <div class="title" v-if="item.title">{{ item.title }}</div>
          <div class="img">
            <!-- <img :src="item.url" alt="美女" /> -->
            <img :src="item.img" @click="handleImgsClick(index)" />
          </div>
        </li>
      </ul>
    </div>
    <div id="bottom">
      <div class="back" @click="back">上一页</div>
      <div class="go" @click="go">下一页</div>
    </div>

    <!-- <img :src="img" v-for="(img, index) in imgs" :key="img" @click="handleImgsClick(index)" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      Loading:'',
      initialIndex: 0,
      duanzi: [],
      index: 1,
      imgs: [
        // 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mpd5uj21hc0tyws2.jpg',
        // 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0ncnnej21hc0zetxo.jpg',
        // 'https://wx1.sinaimg.cn/mw1024/686d7361ly1fpha0mqvu5j21hc0zkgzz.jpg'
      ]
    };
  },
  methods: {
    showToastType(text) {
      const toast = this.$createToast({
        txt: text,
        type: "error"
      });
      toast.show();
    },
    //获取数据的loading
    showToastMask (){
      const toast = this.$createToast({
        txt: "Loading...",
        mask: true,
        time:10000
      });
      return toast
    },
    handleImgsClick(index) {
      this.initialIndex = index;
      const params = {
        $props: {
          imgs: this.imgs,
          initialIndex: "initialIndex", // 响应式数据的key名
          loop: false
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex
            this.initialIndex = i;
          }
        }
      };
      this.$createImagePreview({ ...params }).show();
    },
    search() {
      this.$axios
        .get("/aly?maxResult=10&page=" + this.index, {
          headers: {
            Authorization: `APPCODE db4c81eaf53f464fb0175871977f1560`
          }
        })
        .then(res => {
          console.log("duanzi", res.data.showapi_res_body.contentlist);
          this.duanzi = res.data.showapi_res_body.contentlist;
          this.insertImg();
        });
    },
    back() {
      if (this.index > 1) {
        this.index--;
        this.search();
      } else {
        this.showToastType("客官，不能在点了");
      }
    },
    go() {
      this.index++;
      this.search();
    },
    insertImg() {
      this.imgs.length = 0;
      var duanziImg = this.duanzi;
      for (var item of duanziImg) {
        this.imgs.push(item.img);
      }
      console.log(this.imgs);
    }
  },
  mounted() {
    this.$axios.interceptors.request.use(config => {
      this.Loading = this.showToastMask();
      this.Loading.show()
      return config;
    })
    this.$axios.interceptors.response.use(res => {
      this.Loading.hide()
      return res;
    })
    this.search();
  }
};
</script>

<style scoped>
ul {
  padding: 1vh 0 0 0;
  margin: 0;
}
ul li {
  width: 100%;
}
ul li .title {
  margin: 3vh 2vh 3vh 2vh;
  font-weight: bold;
}
ul li .img {
  margin-bottom: 10px;
}
ul li .img img {
  width: 100%;
}
#bottom {
  position: fixed;
  bottom: 50px;
  height: 7vh;
  width: 100vw;
  box-sizing: border-box;
  background: #000;
  opacity: 0.3;
}
#bottom div {
  display: inline-block;
  height: 100%;
  text-align: center;
  width: 49vw;
  line-height: 7vh;
  font-weight: bold;
  font-size: 2rem;
}


</style>
