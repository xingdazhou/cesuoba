import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 创建store实例
const store = new Vuex.Store({
    // 设置属性
    state: {
      user: '',
      myPoint:[]
    },
  
    // 设置属性状态
    mutations: {
      //保存登录状态
      setUser(state, username) {
        state.user =  username;
      },
      setMyPoint(state,arr){
          state.myPoint = arr;
      }
    },
  
    // 应用mutations
    actions: {
      //获取登录状态
      setUser({commit}, username) {
        commit("setUser", username)
      },
      setMyPoint({commit},arr){
          commit('setMyPoint',arr);
      }
    }
  })
  export default  store;