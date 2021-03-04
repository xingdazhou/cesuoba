<template>
  <div>
    <cube-tab-bar v-model="selectedLabel" show-slider @click="click">
      <cube-tab v-for="item in tabs" :icon="item.icon" :label="item.label" :key="item.label"></cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <ul style="padding:0;margin:0">
          <li v-for="(cesuo, index) in item.markCesuo" :key="cesuo.lat" @click='goMarkDetal(cesuo.title,cesuo.lng,cesuo.lat)'>
            <img :src=cesuo.img alt="">
            <p class='title'>{{cesuo.title}}</p>
            <p>{{cesuo.address}}</p>
          </li>
        </ul>
        <ul style="padding:0;margin:0">
          <li v-for="(cesuo, index) in item.insertCesuo" :key="cesuo.lat">
            <img :src=cesuo.img alt="">
            <p class='title'>{{cesuo.title}}</p>
            <p>{{cesuo.address}}</p>       
          </li>
          <cube-button  v-if="flag == '添加'" @click="goAdd">添加</cube-button>
        </ul>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag : "",
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
          insertCesuo: []
        }
      ],

    };
  },
  methods: {
    // 点击每个li列表，进到详情页
    goMarkDetal(title,lng,lat){
      // console.log(title,lng,lat);
      this.$router.push({
        name:"goMarkDetal",
        query:{
          title,
          lng,
          lat
        }
      })
    },
    goAdd(){
      this.$router.push('/add')
    },
    // 点击导航，查询出不同的数据
    click(label) {
      console.log(label);
      this.flag = "";
      if (label == "标记") {
        this.getMark();
      }else{
        this.getAdd();
        setTimeout(() => {  
           this.flag = "添加"
          
        }, 400);
      }
    },
    getMark() {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/getMark", {
          params: { username: this.$store.state.user }
        })
        .then(res => {
          console.log("res", res);

          if (res.data.length > 0) {
              this.tabs[0].markCesuo = res.data;
              // console.log( this.tabs[0].markCesuo)
          }else{
            alert("您还没有标记过任何厕所哦")
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
              this.tabs[1].insertCesuo = res.data;
              // console.log( this.tabs[0].markCesuo)
          }else{
            alert("您还没有添加过任何厕所哦")
          }
        });
    }
  },
  mounted(){
    this.getMark();
  }
};
</script>
<style  scoped>
img{
  padding:3px;
  width:20%;
  height:80%;
  float:left;
}
.title{
  color:#333;
  font-size:14px;
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
</style>