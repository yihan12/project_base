<template>
    <div class="home">
        <div class="name" @click='artificial'>123</div>
        {{loading? 111 : 222}}
        <router-link :to="`/${name}/about`">about</router-link>
        <van-button type="primary">{{t('home.text_1')}}</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
export default {
  name:'home',
  setup(){
    // 使用vue-i18n
    const {t,locale} = useI18n()
    const name = locale.value
    console.log(t,t('home.text_1'),locale.value,9999);
    const store = useStore()
    console.log(store,'store:----');
    const loading = computed(() => {
      return store.state.user.loading
    })

    onMounted(() => {
      document.title = t('home.text_1')
    })

    const artificial = () => {
      store.commit('updateLoading', true) //实时更新slotFlag
    }


    return {
      t,
      name,
      loading,
      artificial
    }
  }
}
</script>

<style lang="less" scoped>
.home{
  background: @back_bg;
  color: @color_red;
}

</style>