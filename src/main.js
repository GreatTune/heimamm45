import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

// element插件引入
import ElementUI from 'element-ui';
// element插件样式引入
import 'element-ui/lib/theme-chalk/index.css';

// 初始化css代码
import "./style/base.css"
// element注册
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
