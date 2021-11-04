import router from '@/router'
import i18n, { langAlias } from './index'

// 语言类型
const LANG_KEY = 'jf_lang'
/**
 * 语言库工具方法
 *
 */
class LangUtils {
  // 获取所有配置语言库
  getLangAll() {
    return Object.values(langAlias) // 返回数组
  }

  // 设置语言
  setLang(t) {
    // 临时保存，关闭窗口或者标签页就会被清除，也可以用localStorage,没有过期时间只能自己手动清除
    window.sessionStorage.setItem(LANG_KEY, t)
  }

  // 获取语言
  getLang() {
    // 获取默认配置
    const langDefault = i18n.global.locale.value
    // 根据url获取
    const t = window.location.hash
    const all = this.getLangAll()
    const e = (all.find(item => t.indexOf(item.value) >= 0) || {}).value || ''
    // 根据缓存获取
    const cache = window.sessionStorage.getItem(LANG_KEY) || ''
    // 最终值
    const temp = langDefault || e || cache
    // console.log('current_lang', all, '---',temp, langDefault)
    return temp
  }

  // 获取对应语言库别名
  getLangAlias() {
    const lang = this.getLang()
    return langAlias[lang].alias
  }

  // 通过别名设置/切换语言库
  toggleAlias(alias) {
    const all = this.getLangAll()
    const lang = all.find(item => item.alias === alias) || {}
    this.toggle(lang.value)
  }

  // 直接设置/切换语言库
  toggle(t) {
    // 获取当前vue3.0的语言
    const current_lang = i18n.global.locale.value
    const target_lang = t || this.getLang()

    // 如果切换语言和当前的语言不一致
    if (target_lang !== current_lang) {
      this.setLang(target_lang)
      i18n.global.locale.value = target_lang

      // 对路由进行处理
      const oldPath = router.currentRoute.value.path
      const all = this.getLangAll()
      const str = all.map(item => item.value).join('|')
      // eslint-disable-next-line no-useless-escape
      const reg = new RegExp(`\/(${str})(?=\/?)`, 'g')
      const newPath = oldPath.replace(reg, '/' + target_lang)
      console.log('target_lang', target_lang, oldPath, newPath)

      if (oldPath === newPath) return false
      router.replace({ path: newPath })
    }
  }
}

export default new LangUtils()