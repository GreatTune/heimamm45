import Vue from 'vue'
import VueRouter from "vue-router" //路由

Vue.use(VueRouter)

// 组件
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'

// 嵌套路由组件
import chart from "../views/index/chart/chart.vue"
import user from "../views/index/user/user.vue" 
import question from "../views/index/question/question.vue" 
import enterprise from "../views/index/enterprise/enterprise.vue" 
import subject from "../views/index/subject/subject.vue" 


const router = new VueRouter({ // 实例化
  routes: [
    {
      path: "/login", 
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "chart",
          component: chart 
        },
        {
          path: "user",
          component: user
        },
        {
          path: "question",
          component: question
        },
        {
          path: "enterprise",
          component: enterprise
        },
        {
          path: "subject",
          component: subject
        },
      ]
    }
  ]
})

export default router