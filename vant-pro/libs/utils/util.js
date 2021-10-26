const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  )
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : "0" + n
}

function encodeUTF8(s) {
  var i,
    r = [],
    c,
    x
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c)
    else if (c < 0x800) r.push(0xc0 + ((c >> 6) & 0x1f), 0x80 + (c & 0x3f))
    else {
      if ((x = c ^ 0xd800) >> 10 == 0)
        //对四字节UTF-16转换为Unicode
        (c = (x << 10) + (s.charCodeAt(++i) ^ 0xdc00) + 0x10000),
          r.push(0xf0 + ((c >> 18) & 0x7), 0x80 + ((c >> 12) & 0x3f))
      else r.push(0xe0 + ((c >> 12) & 0xf))
      r.push(0x80 + ((c >> 6) & 0x3f), 0x80 + (c & 0x3f))
    }
  return r
}

// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t
  var l = (((data.length + 8) >>> 6) << 4) + 16,
    s = new Uint8Array(l << 2)
  s.set(new Uint8Array(data.buffer)), (s = new Uint32Array(s.buffer))
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2)
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8)
  s[l - 1] = data.length << 3
  var w = [],
    f = [
      function () {
        return (m[1] & m[2]) | (~m[1] & m[3])
      },
      function () {
        return m[1] ^ m[2] ^ m[3]
      },
      function () {
        return (m[1] & m[2]) | (m[1] & m[3]) | (m[2] & m[3])
      },
      function () {
        return m[1] ^ m[2] ^ m[3]
      },
    ],
    rol = function (n, c) {
      return (n << c) | (n >>> (32 - c))
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776]
  ;(m[2] = ~m[0]), (m[3] = ~m[1])
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0)
    for (j = 0; j < 80; j++)
      (w[j] =
        j < 16
          ? s[i + j]
          : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)),
        (t =
          (rol(m[0], 5) + f[(j / 20) | 0]() + m[4] + w[j] + k[(j / 20) | 0]) |
          0),
        (m[1] = rol(m[1], 30)),
        m.pop(),
        m.unshift(t)
    for (j = 0; j < 5; j++) m[j] = (m[j] + o[j]) | 0
  }
  t = new DataView(new Uint32Array(m).buffer)
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2)

  var hex = Array.prototype.map
    .call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
      return (e < 16 ? "0" : "") + e.toString(16)
    })
    .join("")

  return hex
}
const EARTH_RADIUS = 6378.137 //地球半径
function rad(d) {
  return (d * Math.PI) / 180.0
}

function getDistance(lng1, lat1, lng2, lat2) {
  var radLat1 = rad(lat1)
  var radLat2 = rad(lat2)
  var a = radLat1 - radLat2
  var b = rad(lng1) - rad(lng2)
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  s = s * EARTH_RADIUS
  s = Math.round(s * 10000) / 10000
  return s //返回数值单位：公里
}

function getCurveByTwoPoints(obj1, obj2) {
  if (!obj1 || !obj2) {
    return null
  }
  var B1 = function (x) {
    return 1 - 2 * x + x * x
  }
  var B2 = function (x) {
    return 2 * x - 2 * x * x
  }
  var B3 = function (x) {
    return x * x
  }
  var curveCoordinates = []
  var count = 30
  var isFuture = false
  var t, h, h2, lat3, lng3, j, t2
  var LnArray = []
  var i = 0
  var inc = 0
  if (typeof obj2 == "undefined") {
    if (typeof curveCoordinates != "undefined") {
      curveCoordinates = []
    }
    return
  }
  var lat1 = parseFloat(obj1.lat)
  var lat2 = parseFloat(obj2.lat)
  var lng1 = parseFloat(obj1.lng)
  var lng2 = parseFloat(obj2.lng)
  if (lng2 > lng1) {
    if (parseFloat(lng2 - lng1) > 180) {
      if (lng1 < 0) {
        lng1 = parseFloat(180 + 180 + lng1)
      }
    }
  }
  if (lng1 > lng2) {
    if (parseFloat(lng1 - lng2) > 180) {
      if (lng2 < 0) {
        lng2 = parseFloat(180 + 180 + lng2)
      }
    }
  }
  j = 0
  t2 = 0
  if (lat2 == lat1) {
    t = 0
    h = lng1 - lng2
  } else {
    if (lng2 == lng1) {
      t = Math.PI / 2
      h = lat1 - lat2
    } else {
      t = Math.atan((lat2 - lat1) / (lng2 - lng1))
      h = (lat2 - lat1) / Math.sin(t)
    }
  }
  if (t2 == 0) {
    t2 = t + Math.PI / 5
  }
  h2 = h / 2
  lng3 = h2 * Math.cos(t2) + lng1
  lat3 = h2 * Math.sin(t2) + lat1
  for (i = 0; i < count + 1; i++) {
    curveCoordinates.push({
      lng: lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc),
      lat: lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc),
    })
    inc = inc + 1 / count
  }
  return curveCoordinates
}

function getCurvePoints(points) {
  var curvePoints = []
  for (var i = 0; i < points.length - 1; i++) {
    var p = getCurveByTwoPoints(points[i], points[i + 1])
    if (p && p.length > 0) {
      curvePoints = curvePoints.concat(p)
    }
  }
  return curvePoints
}

/**
 * 深拷贝
 
 */
function deepClone(obj) {
  // 判断数据形式
  let clone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 属性是对象则进行递归
        if (obj[key] && typeof obj[key] === "object") {
          clone[key] = deepClone(obj[key])
        } else {
          clone[key] = obj[key]
        }
      }
    }
  }
  return clone
}

/**
 * json对象去空
 
 */
function rejectNull(obj, whiteKeys = [], getMethod = false) {
  var newObj = deepClone(obj)
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key) && !whiteKeys.includes(key)) {
      const element = newObj[key]
      if (element === "" || element === null || element === undefined) {
        delete newObj[key]
      } else if (getMethod && getType(element) === "array") {
        newObj[key] = element.join(",")
        if (
          newObj[key] === "" ||
          newObj[key] === null ||
          newObj[key] === undefined
        ) {
          delete newObj[key]
        }
      }
    }
  }
  return newObj
}

/**
 * 更新操作
 
 */
function changeObjNull(obj, whiteKeys = [], getMethod = false) {
  var newObj = deepClone(obj)
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key) && !whiteKeys.includes(key)) {
      const element = newObj[key]
      if (element === "" || element === null || element === undefined) {
        newObj[key] = ""
      } else if (getMethod && getType(element) === "array") {
        newObj[key] = element.join(",")
        if (
          newObj[key] === "" ||
          newObj[key] === null ||
          newObj[key] === undefined
        ) {
          newObj[key] = ""
        }
      }
    }
  }
  return newObj
}

/**
 * 函数节流
 * @param fn 需要进行节流操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function throttle(fn, interval) {
  let enterTime = 0 //触发的时间
  let gapTime = interval || 500 //间隔时间，如果interval不传，则默认500ms
  return function () {
    let context = this
    let backTime = new Date() //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments[0]) //arguments[0]是事件处理函数默认事件参数event call绑定当前page对象
      enterTime = backTime //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  }
}

/**
 * 函数防抖
 * @param fn 需要进行防抖操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function debounce(fn, interval) {
  let timer
  let gapTime = interval || 800 //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer)
    let context = this
    let args = arguments[0] //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
    timer = setTimeout(function () {
      fn.call(context, args) //args是事件处理函数默认事件参数event  call绑定当前page对象
    }, gapTime)
  }
}

module.exports = {
  formatTime: formatTime,
  sha1: sha1,
  rad: rad,
  getDistance: getDistance,
  getCurvePoints: getCurvePoints,
  rejectNull: rejectNull,
  changeObjNull: changeObjNull,
  throttle: throttle,
  debounce: debounce,
}
