console.log('NODE_ENV:',process.env.NODE_ENV);
console.log('VUE_APP_URL:',process.env.VUE_APP_URL);

// 生产环境，测试和正式 判断是否是生产环境
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// 测试
var HOST_URL = 'http://1123.com'
var HOST_URL_SEC = 'http://2234.com'


// 代理对象 - 依据api/config内配置同步地址
const proxy = {}
const prefixs = [
  {
    path: '/dev-url',
    target: HOST_URL, // 目标代理接口地址
    pathRewrite: {
      '^/dev-url': ''
    }
  },
  {
    path: '/dev-sec',
    target: HOST_URL_SEC,
    pathRewrite: {
      '^/dev-sec': ''
    }
  }
]
prefixs.forEach(item => {
  const { path, target, pathRewrite } = item
  proxy[path] = {
    target,
    pathRewrite,
    changeOrigin: true //开启代理，在本地创建一个虚拟服务器
    // ws: true, // 是否启用websockets
  }
})
module.exports = {
  // 默认'/'，部署应用包时的基本 URL
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./",
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 生成的静态资源 - 相对于 outputDir 的 静态资源(js、css、img、fonts)目录
  assetsDir: './static',
  // 生成的 index.html 的输出路径 - 相对于 outputDir 的 目录
  indexPath: './index.html',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 设置是否在开发环境下每次保存代码时都启用 eslint验证。
  lintOnSave: !IS_PROD,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"]
          }),
          require("postcss-pxtorem")({
            rootValue: 75, // 换算的基数
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ["ig"],
            propList: ["*"],
            exclude: /node_modules/
          })
        ]
      }
    }
  },
  // dev-server 服务代理配置
  devServer: {
    open: false, // 配置自启浏览器
    host: '0.0.0.0',
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    port: 8088, // 端口
    https: false,
    hotOnly: false, // 热更新
    proxy // 设置代理
  }
}