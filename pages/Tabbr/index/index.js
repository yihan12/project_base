// pages/Tabbr/index/index.js
const app = getApp();
import moment from "../../../libs/moment";
moment.locale();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selfPoint: {
      name: "第一个项目",
    },
    text: "通知通知通知通知通知通知！！！！！",
    tables: [],
    unit: "",
    mentionPointLists: [],
    productList: [],
    buttonColor: app.globalData.theme.buttonColor,
    time: "",
    info: {},
    bannerList: [],
    indicatorDots: true,
    circular: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    stockList: [],
    icon: "showFalse",
    name: "firstJob",
    iconShow: "show",
    value: "",
    authorization: app.globalData.authorization,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
