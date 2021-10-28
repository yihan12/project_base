import Home from "@/views/home/index.vue"
import About from "@/views/about/index.vue"

const routes = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path:'/about',
    name:'About',
    component:About
  }
]

export default routes