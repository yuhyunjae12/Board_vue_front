import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo :null,
    isLogin : false,
    isLoginError : false
  },
  getters:{
    getUserInfo(state){
      return state.userInfo;
    }
  },
  mutations: {
    loginSuccess(state, payload){
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    loginError(state){
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state){
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
      axios.defaults.headers.common['Authorization'] = undefined
      localStorage.removeItem('X-AUTH-TOKEN')
    }
  },
  actions: {
    login({commit, dispatch}, signObj){
      axios.post("/v1/signin", signObj)
            .then(res =>{
              let token = res.data.data
              localStorage.setItem('X-AUTH-TOKEN',token)
              axios.defaults.headers.common['X-AUTH-TOKEN'] = localStorage.getItem('X-AUTH-TOKEN');
              dispatch('getMemberInfo')
            })
            .catch(() =>{
              commit("loginError")
            })
    },
    logout({commit}){
      commit("logout")
      router.push({name:"home"})
    },
    getMemberInfo({commit}){
      axios.get("/v1/user")
          .then(response =>{
            console.log(response);
            let userInfo ={
              name: response.data.data.name,
              id: response.data.data.uid,
              role: response.data.data.roles[0] == 'ROLE_USER'? 'User' : 'admin',
              msrl: response.data.data.msrl
            }
              commit('loginSuccess', userInfo)
              router.push({name:"board"})
          })
          .catch(() =>{
            commit("loginError")
          })
    }
  },
  modules: {
  }
})
