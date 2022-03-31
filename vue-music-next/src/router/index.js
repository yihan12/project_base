import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '../views/recommend.vue'
import Singer from '../views/singer.vue'
import Search from '../views/search.vue'
import Toplist from '../views/top-list.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: Toplist
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // 异步加载

  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
