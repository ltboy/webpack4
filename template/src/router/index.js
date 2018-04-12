import Router from 'vue-router'
import Vue from 'vue'
import Home from '../views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
