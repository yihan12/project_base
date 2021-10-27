import { createStore } from 'vuex'

import modules from './modules'

import * as types from "./mutation_types"


// 在开发环境中开启logger
const debug = process.env.NODE_ENV !== 'production'

console.log('types: ----', [types.TABS_ROUTES]);

export default createStore({
  modules,
  strict: debug
})

// // 注册模块 `myModule`
// store.registerModule('myModule', {
//   ...modules
// })
// // 注册嵌套模块 `nested/myModule`
// store.registerModule(['nested', 'myModule'], {
//     // ...
//   })