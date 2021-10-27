// 单一状态树，用一个对象包含所有应用层级的状态；
// 主要存放初始化数据；
// mapState辅助函数
const state = {
  loading: true
}

// 可以认为是store的计算属性
// mapGetters辅助函数
const getters = {

}

// 同步数据，改变vuex store的状态
// store.commit()
// 使用常量替代Mutation事件类型
// mutation必须是同步函数
// mapMutations辅助函数

const mutations = {
  setLoading:(state, commit) => {
    state.loading = commit
  }
}

// 提交的是mutation，而不是直接变更状态
// mutation是同步，actions可以包含任何异步操作
// store.dispatch()
// mapActions辅助函数
const actions = {

}

// vuex允许我们将store分割成模块，每个模块都有自己的state，getters，mutations，actions
export default {
  state,
  getters,
  mutations,
  actions
}