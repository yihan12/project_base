/******************
 * 对api进行统一的处理
 ******************/


 import http from '@/utils/http'
 import store from '@/store'
 
 import userAgent from '@/utils/ua-parser'
 
 // 是否APP环境
 const isApp = userAgent.isApp()
 
 // 不需弹框登录
 let notNeedLogin = ['/user_api/is_login']
 // 判断是否app内部
 if (!isApp) {
   notNeedLogin.push('/video_api/post_comment')
 }
 // 前端登出 --> 清除缓存数据 -> 重载页面/跳转到登录页
 const fedLogoutHandle = () => {
   store.dispatch('fedLogout').then(() => {
     location.reload()
     // window.location.href = ''
   })
 }
 
 /**
  * 请求前loading效果处理
  * */
 export const beforeRequest = (loading) => {
   // 不显示则终止
   if (!loading) {
     return
   }
   // Loading开始
   if (loading) {
     store.commit('updateLoading', true)
   }
 }
 
 /**
  * 请求后loading效果处理
  * */
 export const afterRequest = (loading) => {
   // 不显示则终止
   if (!loading) {
     return
   }
   // Loading结束
   if (loading) {
     store.commit('updateLoading', false)
   }
 }
 
 /**
  * 接口请求实例
  * 适用 针对返回结果数据字段
  * { code, message, result }
  *
  * 封装API接口请求方法, 针对aixos实例方法调用
  * options = {
  *   url：请求地址
  *   method: 请求使用的方法，如 GET、POST
  *   data:  请求数据，针对post
  *   params: 请求数据，针对get
  *   loading: 请求自定义是否前后自动加载与关闭loading效果, 默认 true
  *   catchs: 异常处理，接口抛出的异常是否自己处理：true 是，false 否
  *           由公共方法统一处理展示在控制台 默认 false
  *   toast: 异常弹框，true 是，false 否
  *          由公共方法统一处理优化显示给用户 默认 true
  * }
  */
 
 const apiAsync = function (options) {
   // 获取自定义配置参数
   const { loading = true, catchs = false, toast = true, ...obj } = options
 
   beforeRequest(loading)
   return new Promise((resolve, reject) => {
    http(obj)
       .then(res => {
         afterRequest(loading)
         const data = res.data
 
         // 接口请求数据格式固定
         const { code, result, message = '网络繁忙，请稍后再试' } = data
 
         // 处理请求完成 - 非成功状态码
         if (code !== ERR_OK) {
           console.error('接口code异常，参数 ===> ', obj)
           console.error('接口code异常，返回 ===> ', data)
 
           //  未登录或者session已失效
           if (code === -9999) {
            const isNotLogin = notNeedLogin.some(val => res.config.url.indexOf(val) > -1)
            if (!isNotLogin) {
              tips.toast({
                type: 'error',
                txt: message,
                callback: () => {
                  fedLogoutHandle()
                }
              })
            }
           } else {
             // 异常信息-弹框
             if (toast) {
               
             }
           }
           // 自补获异常
           if (catchs) {
             reject(data)
           }
         } else {
           // 成功状态码
           resolve(result)
         }
       })
       .catch(err => {
         afterRequest(loading)
         console.error('接口异常，参数 ===> ', obj)
         console.error('接口异常，错误 ===> ', err)
         // 异常信息-弹框
         if (toast) {
           let message = err.message
           // 超时错误
           if (err.code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
             message = '网络繁忙，请稍后再试'
           }
           // 网络异常
           if (message.indexOf('Network Error') !== -1) {
             message = '网络异常，请检查您的网络是否连接正常'
           }
           
         }
 
         if (catchs) {
           reject(err)
         }
       })
   })
 }
 export default apiAsync