<template>
  <div class="loading-contain flc alc" v-if="loading">
    <van-loading type="spinner" color="#1989fa" vertical>加载中...</van-loading>
  </div>
  <router-view v-else/>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex"
export default {
  name: 'App',
  components: {

  },
  setup(){
    const store = useStore()
    const loading = computed(() => {
      return store.state.user.loading
    })
    return{
      loading
    }
  }
}
</script>

<style lang="less" scoped>

@import './assets/css/public.css';

.loading-contain{
    width: 100%;
    height: 100%;
    background: @back_bg;
}
</style>
