<template>
  <div>
    <!-- 顶部tabbar -->
    <div class='top'>
      <div>厕所吧</div>
    </div>

      <router-view style="margin-top:7vh"/>
    <!-- 底部tabbar -->
    <div style="position:fixed;bottom:0;width:100%;z-index:999;font-family:'微软雅黑';font-size:16px;" class='bottom'>
      <cube-tab-bar v-model="selectedLabelDefault" @click="changeHandler">
        <cube-tab v-for="item in tabs" :icon="item.icon" :label="item.label" :value="item.path" :key="item.path">
        </cube-tab>
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selectedLabelDefault: "home",
      tabs: [ 
        {
          label: "首页",
          icon: "cubeic-home",
          path:'home'
        },
        {
          label: "标记",
          icon: "cubeic-like",
          path:'mark'
        },{
          label: "段子",
          icon: "cubeic-smile",
          path:'duanzi'
        },
        {
          label: "我的",
          icon: "cubeic-person",
          path:'myself'
        }
      ]
    };
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(path) {
      // if you clicked different tab, this methods can be emitted
      console.log('路由' + path);
      this.$router.push({name:path})
    }
  },
  
};
</script>

<style scoped>
.bottom{
  box-shadow: 0 0 1px 1px #ccc;
  background: #fff;
}
.cube-tab_active{
  color:#12b7f5;
}
.top{
  font-size: 16px;
  position:fixed;
  z-index:999;
  top:0;
  width:100%;
  height:7vh;
  display: flex;
  justify-content: center;
  align-items: center; 
  background:#008c8c;
  color:#fff;
}
</style>
