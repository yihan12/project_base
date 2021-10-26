const app = getApp()
import utils from "../libs/utils/util.js"
import Login from "./login"
// import { rejectNull, changeObjNull} from "../utils/util.js"
//----封装防抖弹窗
function debounce(fn, wait) {
  let timerId = null
  let flag = true
  return function () {
    clearTimeout(timerId)
    if (flag) {
      fn.apply(this, arguments)
      flag = false
    }
    timerId = setTimeout(() => {
      flag = true
    }, wait)
  }
}

const authModal = debounce(() => {
  wx.showModal({
    title: "提示",
    content: "页面信息延迟，请重新登录！",
    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: "/pages/Login/Login",
          success: (result) => {},
          fail: () => {},
          complete: () => {},
        })
      } else if (res.cancel) {
        console.log("用户点击取消")
      }
    },
  })
}, 1000)

const authError = debounce((messageInfo) => {
  wx.showToast({ title: messageInfo, icon: "none", duration: 2000 })
}, 1000)

let isGoIng = false
// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []
let requestsList = []
let resList = []
let authToken = ""
const authRefresh = debounce(() => {
  resList.map((val, idnex) => {
    wx.request({
      url: `${app.globalData.root}${val.url}`,
      method: val.options.method,
      // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      data: val.options.data.data,
      header: {
        // 'Content-Type': 'application/json; charset=UTF-8'
        "Content-Type":
          val.url === "/order-web/coldChainOrder/submitOrder"
            ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
            : "application/x-www-form-urlencoded",
        Authorization: authToken, //todo
      },
      success(re) {
        // console.log(request, url, 111)
        switch (re.data.code) {
          case 0:
            resolve(re.data)
            break
          default:
            authError(re.data.message)
            break
        }
      },
      fail(err) {
        // console.log(111)
        console.log(err)
        authError("请求有误!")
        reject(err.data)
      },
      complete() {},
    })
  })
}, 3000)

// const authRefresh2 = debounce(() => {
//   requests.map((val, idnex) => {
//     wx.request({
//       url: `${app.globalData.root}${val.url}`,
//       method: val.options.method,
//       // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
//       data: val.options.data.data,
//       header: {
//         // 'Content-Type': 'application/json; charset=UTF-8'
//         "Content-Type":
//           val.url === "/order-web/coldChainOrder/submitOrder"
//             ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
//             : "application/x-www-form-urlencoded",
//         Authorization: app.globalData.authorization, //todo
//       },
//       success(re) {
//         // console.log(request, url, 111)
//         switch (re.data.code) {
//           case 0:
//             resolve(re.data)
//             break
//           default:
//             authError(re.data.message)
//             break
//         }
//       },
//       fail(err) {
//         // console.log(111)
//         console.log(err)
//         authError("请求有误!")
//         reject(err.data)
//       },
//       complete() {},
//     })
//   })
// }, 3000)

const showLoad = debounce((messageInfo) => {
  wx.showToast({
    title: "加载中",
    icon: "loading",
    duration: 3000,
  })
}, 1000)

const hideLoad = debounce((messageInfo) => {
  wx.hideToast()
}, 1000)

const request = (url, options) => {
  console.log(url, 111)
  if (
    url === "/auth-web/auth/wechatDecrypt" ||
    url === "/auth-web/auth/jscodeLogin"
  ) {
  } else {
    showLoad()
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${app.globalData.root}${url}`,
      method: options.method,
      // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
      data: options.data.data,
      header: {
        // 'Content-Type': 'application/json; charset=UTF-8'
        "Content-Type":
          url === "/order-web/coldChainOrder/submitOrder"
            ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
            : "application/x-www-form-urlencoded",
        Authorization: app.globalData.authorization, //todo
      },
      success(request) {
        // console.log(request, url, 111)
        switch (request.data.code) {
          case 0:
            resolve(request.data)
            break
          case 4001: //为空
            authModal()
            reject(request.data)
            break
          case 4002: //无效
            // if (!isGoIng) {
            //   isGoIng = true
            const {
              hmac,
              openId,
              nickName,
              thirdType,
              comId,
              avatarUrl,
              password,
              telephone,
            } = app.globalData
            const param = {
              hmac: hmac,
              openId: openId,
              comId: comId,
              thirdType: thirdType,
              password: password,
              userName: nickName,
              thirdUserName: nickName,
              imageUrl: avatarUrl,
              telephone: telephone,
            }
            // const params = {}
            // params.url = url
            // params.options = options
            // resList.push(params)
            wx.request({
              url: `${app.globalData.root}${Login.thirdLogin}`,
              method: "POST",
              data: utils.rejectNull(param),
              header: {
                // 'Content-Type': 'application/json; charset=UTF-8'
                "Content-Type": "application/x-www-form-urlencoded",
                // Authorization: app.globalData.authorization, //todo
              },
              success(res1) {
                const access_token =
                  res1 &&
                  res1.data &&
                  res1.data.result &&
                  res1.data.result.access_token
                const token_type =
                  res1 &&
                  res1.data &&
                  res1.data.result &&
                  res1.data.result.token_type
                const refresh_token =
                  res1 &&
                  res1.data &&
                  res1.data.result &&
                  res1.data.result.refresh_token
                let authToken = token_type + " " + access_token
                app.globalData.authorization = token_type + " " + access_token
                app.globalData.token = access_token
                app.globalData.token_type = token_type
                app.globalData.refresh_token = refresh_token

                wx.request({
                  url: `${app.globalData.root}${url}`,
                  method: options.method,
                  // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
                  data: options.data.data,
                  header: {
                    // 'Content-Type': 'application/json; charset=UTF-8'
                    "Content-Type":
                      url === "/order-web/coldChainOrder/submitOrder"
                        ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
                        : "application/x-www-form-urlencoded",
                    Authorization: authToken, //todo
                  },
                  success(re) {
                    // console.log(request, url, 111)
                    switch (re.data.code) {
                      case 0:
                        resolve(re.data)
                        break
                      default:
                        authError(re.data.message)
                        break
                    }
                  },
                  fail(err) {
                    // console.log(111)
                    console.log(err)
                    authError("请求有误!")
                    reject(err.data)
                  },
                  complete() {},
                })
              },
              fail(err) {
                // console.log(111)
                console.log(err)
                authError("请求有误!")

                reject(err.data)
              },
              complete() {},
            })
            // } else {
            //   authRefresh()
            // }
            break
          case 4003:
            const { refresh_token } = app.globalData

            const param1 = {
              refreshToken: refresh_token,
            }
            // const params = {}
            // params.url = url
            // params.options = options
            // requests.push(params)
            // if (!isRefreshing) {
            //   isRefreshing = true

            wx.request({
              url: `${app.globalData.root}${Login.refreshToken}`,
              method: "POST",
              data: utils.rejectNull(param1),
              header: {
                // 'Content-Type': 'application/json; charset=UTF-8'
                "Content-Type": "application/x-www-form-urlencoded",
                // Authorization: app.globalData.authorization, //todo
              },
              success(res) {
                const dataRes = res && res.data && res.data.result
                authToken = dataRes.token_type + " " + dataRes.access_token
                app.globalData.authorization = authToken
                app.globalData.access_token = dataRes.access_token
                app.globalData.token_type = dataRes.token_type

                wx.request({
                  url: `${app.globalData.root}${url}`,
                  method: options.method,
                  // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
                  data: options.data.data,
                  header: {
                    // 'Content-Type': 'application/json; charset=UTF-8'
                    "Content-Type":
                      url === "/order-web/coldChainOrder/submitOrder"
                        ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
                        : "application/x-www-form-urlencoded",
                    Authorization: authToken, //todo
                  },
                  success(re) {
                    // console.log(request, url, 111)
                    switch (re.data.code) {
                      case 0:
                        resolve(re.data)
                        break
                      default:
                        authError(re.data.message)
                        break
                    }
                  },
                  fail(err) {
                    // console.log(111)
                    console.log(err)
                    authError("请求有误!")
                    reject(err.data)
                  },
                  complete() {},
                })
              },
              fail(err) {
                // console.log(111)
                console.log(err)
                authError("请求有误!")

                reject(err.data)
              },
              complete() {},
            })
            // } else {
            //   authRefresh2()
            //   // if (authToken) {
            //   //   return new Promise((resolve, reject) => {
            //   //     requests.map((val, idnex) => {
            //   //       wx.request({
            //   //         url: `${app.globalData.root}${val.url}`,
            //   //         method: val.options.method,
            //   //         // data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            //   //         data: val.options.data.data,
            //   //         header: {
            //   //           // 'Content-Type': 'application/json; charset=UTF-8'
            //   //           "Content-Type":
            //   //             val.url === "/order-web/coldChainOrder/submitOrder"
            //   //               ? "application/json;charset=UTF-8;Accept-Language:zh-CN,zh;q=0.8"
            //   //               : "application/x-www-form-urlencoded",
            //   //           Authorization: authToken, //todo
            //   //         },
            //   //         success(re) {
            //   //           // console.log(request, url, 111)
            //   //           switch (re.data.code) {
            //   //             case 0:
            //   //               resolve(re.data)
            //   //               break
            //   //             default:
            //   //               authError(re.data.message)
            //   //               break
            //   //           }
            //   //         },
            //   //         fail(err) {
            //   //           // console.log(111)
            //   //           console.log(err)
            //   //           authError("请求有误!")
            //   //           reject(err.data)
            //   //         },
            //   //         complete() {},
            //   //       })
            //   //     })
            //   //     // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            //   //   })
            //   // }
            // }

            break
          default:
            authError("请求有误!")
            reject(request.data)
            break
        }
      },
      fail(error) {
        // console.log(111)
        console.log(error)
        authError("请求有误!")

        reject(error.data)
      },
      complete() {
        hideLoad()
      },
    })
  })
}

const get = (url, options = {}) => {
  return request(url, {
    method: "GET",
    data: utils.rejectNull(options),
  })
}

const post = (url, options) => {
  return request(url, {
    method: "POST",
    data: utils.rejectNull(options),
  })
}

const put = (url, options) => {
  return request(url, {
    method: "PUT",
    data: utils.changeObjNull(options),
  })
}

// 不能声明DELETE（关键字）
const remove = (url, options) => {
  return request(url, {
    method: "DELETE",
    data: utils.rejectNull(options),
  })
}

module.exports = {
  get,
  post,
  put,
  remove,
}
