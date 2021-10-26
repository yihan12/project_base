import { createWebHashHistory, createRouter } from 'vue-router'
import routes from './routes'
// createWebHistory
const history = createWebHashHistory()


const router = createRouter({
  history, // 路由模式
  routes
})

export default router