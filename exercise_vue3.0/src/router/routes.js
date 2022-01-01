import i18n from "@/lang"

const routes = [
  {
    path:'/',
    name:'Home',
    component:() => import( /* webpackChunkName: "home" */ '@/views/home/index.vue'),
    meta: { title: () => i18n.t('home.text_1'), keepAlive: false, auth: false }
  },
  {
    path: '/notfount',
    name: 'Notfount',
    component: () => import(/* webpackChunkName: "404" */ '@/views/home/notfount.vue'),
    meta: { title: '404', keepAlive: false, auth: false }
  },
  {
    // path: "*", // 这样用，vue3已经不支持，得下面的方式
    path: "/:pathMath(.*)", // 此处需特别注意置于最底部
    redirect: "/notfount",
    component: () => import(/* webpackChunkName: "404" */ '@/views/home/notfount.vue'),
    meta: { title: '404', keepAlive: false, auth: false }
  }
]

export default routes