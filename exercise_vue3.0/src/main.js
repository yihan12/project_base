import { createApp } from 'vue'
import App from './App.vue'

import 'amfe-flexible'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import i18n from "./lang"
import { Button, Loading } from 'vant';
import infiniteScroll from 'vue-infinite-scroll'

// debug环境开启 VConsole
const vue_vconsole = process.env.VUE_APP_CONSOLE
if(vue_vconsole === 'show'){
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  console.log(vConsole.version);
}

const app = createApp(App)
app.use(router)
app.use(Button)
app.use(Loading)

app.use(store)
app.use(i18n)
app.use(infiniteScroll)


app.mount('#app')
