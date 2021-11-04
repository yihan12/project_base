<template>
    <div class="about">
        234
        <router-link to="/">{{t('home.text_1')}}</router-link>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
export default {
  name:'about',
  setup(){
    const {t,locale} = useI18n()
    const name = locale.value
    return {
      t,name
    }
  }
}
</script>

<style scoped>

</style>