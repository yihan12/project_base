import { createWebHashHistory, createRouter } from 'vue-router'
// 基础路由
import routes from './routes'

import userRoutes from './modules/user'
// createWebHistory
const history = createWebHashHistory()

import LangUtils from "@/lang/utils"

// 所有路由
let mainRoutes = []

// modules路由
const moduleRoutes = []
moduleRoutes.concat(userRoutes);

mainRoutes = [...moduleRoutes, ...routes]

const router = createRouter({
  history, // 路由模式
  routes: mainRoutes
})




router.beforeEach((to,from,next)=>{
  LangUtils.toggle(to.params.lang)
  console.log(to,from,next());
})

router.afterEach(() => {

})

export default router