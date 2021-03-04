import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mark from '@/components/Mark'
import Duanzi from '@/components/Duanzi'
import Myself from '@/components/Myself'
import Detal from '@/components/Detal'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import goMarkDetal from '@/components/goMarkDetal'
import add from '@/components/add'
import test from '@/components/test'
import test1 from '@/components/test1'
import test2 from '@/components/test2'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/mark',
      name: 'mark',
      meta: {
        isLogin: true
      },
      component: Mark
    },
    {
      path: '/myself',
      name: 'myself',
      component: Myself
    },
    {
      path: '/duanzi',
      name: 'duanzi',
      component: Duanzi
    },
    {
      path:'/detal',
      name:'detal',
      component:Detal
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/regist',
      name:'regist',
      component:Regist
    },
    {
      path:'/goMarkDetal',
      name:'goMarkDetal',
      component:goMarkDetal
    },
    {
      path:'/add',
      name:'add',
      component:add
    },
    {
      path:'/test',
      name:'test',
      component:test
    },
    {
      path:'/test1',
      name:'test1',
      component:test1
    },
    {
      path:'/test2',
      name:'test2',
      component:test2
    }
  ]
})
