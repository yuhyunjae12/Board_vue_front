import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// 로그인 토큰이 있다면 유저 정보를 가져온다.
// 이부분도 수정이 필요..
const token = localStorage.getItem('X-AUTH-TOKEN');

new Vue({
  store,
  router,
  vuetify,
  beforeCreate(){
    if(token !== null){
      this.$store.dispatch("getMemberInfo")
    }
  },
  render: h => h(App)
}).$mount('#app')
