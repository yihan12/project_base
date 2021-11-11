/**
 * 对api进行统一的处理
 */
import instance from './instance'

const apiPackage = function(options){
  return new Promise((resolve,reject)=>{
    instance(options).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}

export default apiPackage