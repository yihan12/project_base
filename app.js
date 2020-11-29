//app.js
App({
  globalData: {
    root: "https://damei.coollu.vip",
    // root: "http://192.168.2.118:8050",
    avatarUrl: "",
    nickName: "",
    token: "",
    thirdType: "1",
    categoryId: null,
    token_type: "",
    refresh_token: "",
    comId: "8",
    telephone: 13800000000,
    password: "123456",
    code: "",
    openId: null,
    appId: "wx5fc83aa3f963863b",
    secret: "eb124d73e88d438132de04aad084ab85",
    authorization: "",
    customerId: null, //客户id
    INVENTED_CUSTOMER_ID: "", //虚拟客户账号
    INDEX_CATEGORY: 18, //虚拟
    warehouseCode: "", //仓库编码
    userInfo: null,
    hmac: 123,
    thirdType: "1",
    theme: {
      //顶部配色
      navigationBarColor: "#00ecad",
      buttonColor: "#00dfbe",
      //图标配色
      images: ["../../images/addShop.png", "../../images/yuyue.png"],
      // body 中含有亮粉的字体配色 ex: 产品活动价格 98
      bodyFontColor: "#df4ecd",
      // 各个栏目标题配色 ex: 活动产品 人员推荐 等
      titleColor: "#e67dd8",
    },
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
  },
  onShow: function (options) {
    this.getUserInfo(function (userInfo) {});
  },
  getUserInfo: function (cb) {
    var that = this;
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo);
    } else {
      // 登录
      wx.login({
        success: (res) => {
          let code = res.code;
          that.globalData.code = code;
          // 获取用户信息
          wx.getSetting({
            success: (res1) => {
              if (res1.authSetting["scope.userInfo"]) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: (res2) => {
                    console.log(res2, 777);
                    // 可以将 res 发送给后台解码出 unionId
                    that.globalData.userInfo = res2.userInfo;
                    that.globalData.avatarUrl = res2.userInfo.avatarUrl;
                    that.globalData.nickName = res2.userInfo.nickName;
                    console.log(
                      that.globalData.avatarUrl,
                      that.globalData.nickName,
                      888
                    );
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res2);
                    }
                  },
                  fail: function (res2) {
                    wx.getSetting({
                      success: (res3) => {
                        if (res3.authSetting["scope.userInfo"]) {
                          // 进入这里说明用户重新授权了，重新执行获取用户信息的方法
                          that.getUserInfo();
                        }
                      },
                    });
                  },
                });
              }
            },
          });
        },
      });
    }
  },
});
