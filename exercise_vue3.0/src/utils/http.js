/**
 * 封装axios
 */

 import axios from "axios"

 // 实例化axios
 const instance = axios.create({
   baseURL: '/api', //'/'
   responseType: 'json', // 数据格式
   withCredentials: true, // 是否允许带cookie这些
   headers: {
     'Content-Type': 'application/json;charset=UTF-8' // 请求头通用格式json格式数据
   }
 })
 
 // 拦截请求头的数据
 instance.interceptors.request.use(
  config => {
    // 防止get请求获取数据304缓存，必须保证状态为200
    if (config.method === 'get') {
      if (config.params) {
        config.params['_'] = +new Date()
      } else {
        config.params = { '_': +new Date() }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
 )
 
 // 拦截响应
 instance.interceptors.response.use(
   // 成功
   response=>{
     return response
   },
   //报错
   error=>{
     return Promise.reject(error)
   }
 )
 
 export default instance