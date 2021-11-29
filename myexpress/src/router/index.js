import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:  resolve => require(['@/components/index.vue'], resolve)
    },
    {
        path: '/add',
        name: 'add',
        component:  resolve => require(['@/components/add.vue'], resolve)
      },
  ]
})
