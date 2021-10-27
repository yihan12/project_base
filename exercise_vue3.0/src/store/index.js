import { createStore } from 'vuex'

import modules from './modules'


// 在开发环境中开启logger
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules,
    strict: debug
})