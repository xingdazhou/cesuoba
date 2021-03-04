// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import Cube from 'cube-ui'
import navgater from '@/components/com/navgater'
import '../static/css/global.css'
import dia from '@/components/com/dia'
import axios from 'axios'
import store from './store'
import { Dialog } from 'cube-ui'

Vue.use(Dialog)

Vue.use(Cube)
Vue.prototype.$axios = axios;
// 将 axios 添加的 Vue 原型上后就不需要再在每个需要使用它的页面引入了

Vue.component(navgater.name,navgater);
Vue.component(dia.name,dia);

Vue.config.productionTip = false

// vue-router ≥3.0版本回调形式以及改成promise api的形式了，
// 返回的是一个promise，如果没有捕获到错误，控制台始终会出现如图的警告，
// 针对于路由跳转相同的地址大佬说是在main.js文件下加入如下代码：
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 弹框
function showBtn(goOrBack) {

  // 这里拿不到实例，所以就得用didi的文档来配置 https://didi.github.io/cube-ui/#/zh-CN/docs/create-api
  Dialog.$create({
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
     router.push('/login')
   },
   onCancel: () => {
      router.push(goOrBack)
   }
 }).show();
}
// 路由守卫
router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  let username = localStorage.getItem("username");

  //如果登录标志存在，即用户已登录
  if(username){

    //设置vuex登录状态为已登录
    store.dispatch('setUser',username)
    next();

    //如果已登录，还想想进入登录注册界面，则定向回首页
    // if (!to.meta.isLogin) {
    //   next({
    //     path: '/'
    //   })
    // }
  
  //如果登录标志不存在，即未登录
  }else{

    //判断是不是进入了标记页，如果是，则需要登录，不是标记页就放行
    if(to.meta.isLogin){
      showBtn(from.path)
      // if(confirm('您还没有登录，去登录???')){
      //   next({
      //     path: '/login',
      //   })
      // }else{
      //   next({
      //     path:
      //   })
      // }
    }else{
      next()
    }

  }

});
