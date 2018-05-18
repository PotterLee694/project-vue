import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        name: 'index',
        component: Index
    }
  ]
})
