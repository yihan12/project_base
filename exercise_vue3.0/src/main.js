import { createApp } from 'vue'
import App from './App.vue'

import 'amfe-flexible'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import { Button } from 'vant';
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

app.use(store)


app.mount('#app')
