import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const rejectAuthUser =(to, from, next) =>{
  if(store.state.isLogin === true){
    alert('이미 로그인 하였습니다.')
    next("/")
  }else{
    next()
  }
}

const onlyAuthUser =(to, from, next) =>{
  if(store.state.isLogin === false){
    console.log(store.state.isLogin);
    alert('로그인이 필요합니다.')
    next("/login")
  }else{
    console.log(store.state.isLogin);
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: rejectAuthUser,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: rejectAuthUser,
    component: () => import(/* webpackChunkName: "login" */ '../views/Signup.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "mypage" */ '../views/Mypage.vue')
  },
  {
    path: '/board',
    name: 'board',
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ '../views/Board.vue')
  },
  {
    path: '/boardDetail/:postId',
    name: 'boardDetail',
    beforeEnter: onlyAuthUser,
    props: true,
    component: () => import(/* webpackChunkName: "board" */ '../views/BoardDetail.vue')
  },
  {
    path: '/boardModify/:postId',
    name: 'boardModify',
    beforeEnter: onlyAuthUser,
    props: true,
    component: () => import(/* webpackChunkName: "board" */ '../views/BoardModify.vue')
  },
  {
    path: '/boardInsert',
    name: 'boardInsert',
    beforeEnter: onlyAuthUser,
    component: () => import(/* webpackChunkName: "board" */ '../views/BoardInsert.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
