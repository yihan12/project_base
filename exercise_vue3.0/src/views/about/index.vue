<template>
    <div class="about">
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"  infinite-scroll-distance="10">
          <li v-for="i in data" :key="i" class="infinite-list-item">{{ i.name }}</li>
        </ul>
        <!-- <router-link to="/">{{t('home.text_1')}}</router-link> -->
    </div>
</template>

<script>
import { ref } from "vue"
import { useI18n } from 'vue-i18n'
export default {
  name:'about',
  setup(){
    let busy = true
    const easyData = ref(0)
    console.log(easyData,'easyData----');
    const data =[]
    const load = () => {
      busy = true;
      let count = 0
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }


    const {t,locale} = useI18n()
    const name = locale.value
    return {
      t,
      name,
      load,
      busy,
      data
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