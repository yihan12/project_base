import axios from "axios";

console.log(axios,'axios==');
// 如果有国际化语言切换，接口有相应配置，还得传相应的语言进行切换

// 创建axios实例
const instance = axios.create({
  baseUrl:'/',
  timeout:60000,
  withCredentials:false,//表示跨域请求时是否需要使用凭证
  headers: {
    'Content-Type': 'application/json;charset=UTF-8' // json格式数据
  }
})

// 拦截请求前数据
instance.interceptors.request.use(config=>{
  return config
},error=>{
  Promise.reject(error)
})


// 拦截返回的数据
instance.interceptors.response.use(response=>{
  return response
},error=>{
  return Promise.reject(error)
})

export default instance