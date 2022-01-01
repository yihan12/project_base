const userRoutes = [{
  path: '/user',
  name: 'User',
  redirect: "/user/index",
  component: () => import( /* webpackChunkName: "user" */ '@/views/home/index.vue'),
  meta: {
    title: '用户',
    keepAlive: false,
    auth: false
  },
  children: [{
    path: '/user/index',
    name: 'User',
    component: () => import( /* webpackChunkName: "user" */ '@/views/home/index.vue'),
    meta: {
      title: '用户',
      keepAlive: false,
      auth: false
    },
  }]
}]

export default userRoutes