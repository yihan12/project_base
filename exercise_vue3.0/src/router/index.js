import { createWebHashHistory, createRouter } from 'vue-router'
import routes from './routes'
// createWebHistory
const history = createWebHashHistory()

import LangUtils from "@/lang/utils"


const router = createRouter({
  history, // 路由模式
  routes
})




router.beforeEach((to,from,next)=>{
  console.log(LangUtils,'LangUtils-------',to);
  LangUtils.toggle(to.params.lang)
  console.log(to,from,next());
})

router.afterEach(() => {

})

export default router