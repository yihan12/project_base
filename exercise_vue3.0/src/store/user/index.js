import storage from '@/utils/storage'
// 单一状态树，用一个对象包含所有应用层级的状态；
// 主要存放初始化数据；
// mapState辅助函数
// mapStates
const state = {
  loading: false
}

// 可以认为是store的计算属性
// mapGetters辅助函数
// mapGetters
const getters = {
  loading: state => state.loading
}

// 同步数据，改变vuex store的状态
// store.commit()
// 使用常量替代Mutation事件类型
// mutation必须是同步函数
// mapMutations辅助函数
// vue视图文件中可用this.$store.commit
const mutations = {
  updateLoading:(state, commit) => {
    state.loading = commit
  }
}

// 提交的是mutation，而不是直接变更状态
// mutation是同步，actions可以包含任何异步操作
// store.dispatch()
// mapActions辅助函数
// vue视图文件中可用this.$store.dispatch
const actions = {
  /**
   * 用户登录失效，登出=>
   */
   fedLogout(){
     return new Promise(resolve=>{
      // 清除本地缓存
      storage.clear()
      resolve()
     })
   }
}

// vuex允许我们将store分割成模块，每个模块都有自己的state，getters，mutations，actions
export default {
  state,
  getters,
  mutations,
  actions
}