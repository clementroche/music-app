import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Library from '@/components/Library'
import Player from '@/components/Player'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Library',
      component: Library
    },
    {
      path: '/album/:id',
      name: 'Player',
      component: Player
    }
  ]
})
