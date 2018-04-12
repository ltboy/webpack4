import Router from 'vue-router'
import Vue from 'vue'

import _import from './_import'

const Home = _import('home')

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
