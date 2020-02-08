// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import LiveList from './pages/LiveList'
import GameList from './pages/GameList'
import Home from './pages/Home'
import Login from './pages/Login'
import Reg from './pages/reg'
import userStore from '../store/user'
import VueCookies from 'vue-cookies'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(VueResource)

const routes = [{
  path: '/home',
  component: Home,
},
{
  path: '/livelist',
  component: LiveList
},
{
  path: '/gamelist',
  component: GameList
},
{
  path: '/login',
  component: Login
},
{
  path: '/reg',
  component: Reg
},
{
  path:'/',
  redirect: '/livelist'
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  userStore,
  render: h => h(App)
}).$mount('#app-box')
