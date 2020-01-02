import Vue from 'vue'
import VueRouter from "vue-router" //路由

Vue.use(VueRouter)

// 组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'

const router = new VueRouter({ // 实例化
  routes: [
    {
      path: "/login", 
      component: login
    },
    {
      path: "/index",
      component: index
    }
  ]
})

export default router