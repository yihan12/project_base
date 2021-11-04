// 需要用最新的i18n
import {createI18n} from "vue-i18n"
import zh_cn from './zh-cn'
import zh_en from './zh-en'

// 语言库
export const messages = {
  'zh-cn':zh_cn,
  'zh-en':zh_en
}

// 设置默认语言
const langDefault = 'zh-cn'

export const langAlias ={
  'zh-cn':{
    name:'中文简体',
    value:'zh-cn',
    alias:'zh-Hans'
  },
  'zh-en':{
    name:'英文',
    value:'zh-en',
    alias:'zh-En'
  }
}

const i18n = createI18n({
  legacy:false,
  locale:langDefault,
  messages
})

export default i18n