<template>
    <div class="about">
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"  infinite-scroll-distance="10">
          <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        </ul>
        <!-- <router-link to="/">{{t('home.text_1')}}</router-link> -->
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { ref } from "vue"
export default {
  name:'about',
  setup(){
    const busy = true
    const count = ref([1,2,3,4,5,6,7,8,9,10,11,12])
    const load = () => {
      console.log(count);
    }


    const {t,locale} = useI18n()
    const name = locale.value
    return {
      t,
      name,
      load,
      count,
      busy
    }
  }
}
</script>

<style lang="less" scoped>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
    & + .list-item {
      margin-top: 10px;
    }
  }
}
</style>