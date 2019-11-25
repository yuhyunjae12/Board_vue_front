import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const token = localStorage.getItem('X-AUTH-TOKEN');

const rejectAuthUser =(to, from, next) =>{
  if(store.state.isLogin === true){
    alert('이미 로그인 하였습니다.')
    next("/")
  }else{
    next()
  }
}

/* const onlyAuthUser =(to, from, next) =>{
  if(store.state.isLogin === false){
    console.log(store.state.isLogin);
    alert('로그인이 필요합니다.')
    next("/login")
  }else{
    console.log(store.state.isLogin);
    next()
  }
} */

// 페이지 리로드시 store.state.isLogin 데이터가 바인딩 되기 전에 실행 됨..
// 로컬 스토리지에 저장된 토큰여부로 수정 하였으나 .. 
// 수정 필요..
const onlyAuthUser =(to, from, next) =>{
  if(token == null){
    alert('로그인이 필요합니다.')
    next("/login")
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: rejectAuthUser,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: rejectAuthUser,
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    beforeEnter: onlyAuthUser,
    component: () => import('../views/Mypage.vue')
  },
  {
    path: '/board',
    name: 'board',
    beforeEnter: onlyAuthUser,
    component: () => import('../views/Board.vue')
  },
  {
    path: '/boardDetail/:postId',
    name: 'boardDetail',
    beforeEnter: onlyAuthUser,
    props: true,
    component: () => import('../views/BoardDetail.vue')
  },
  {
    path: '/boardModify/:postId',
    name: 'boardModify',
    beforeEnter: onlyAuthUser,
    props: true,
    component: () => import('../views/BoardModify.vue')
  },
  {
    path: '/boardInsert',
    name: 'boardInsert',
    beforeEnter: onlyAuthUser,
    component: () => import('../views/BoardInsert.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
