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