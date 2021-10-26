import { createApp } from 'vue'
import App from './App.vue'

// debug环境开启 VConsole
const vue_vconsole = process.env.VUE_APP_CONSOLE
if(vue_vconsole === 'show'){
    const VConsole = require('vconsole')
    const vConsole = new VConsole()
    console.log(vConsole.version);
}

createApp(App).mount('#app')
