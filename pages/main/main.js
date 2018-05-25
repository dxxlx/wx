// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:"",
   userInfo:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.userInfo);
    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // console.log(this.data.name);
    // console.log(1);
    // console.log(options.name);
    // console.log(options.work_number);
    var name=options.name;
    var work_number=options.work_number;
    this.setData({
      name: name,
      work_number:work_number
    })
  },
  saleModule:function(){
    
    var work_number=this.data.work_number;
    // console.log(work_number);
    wx.navigateTo({
      url: 'sale/sale?work_number='+work_number,
    })
  },
  custom:function(){
    var work_number = this.data.work_number;
    // console.log(work_number);
    wx.navigateTo({
      url: 'custom/custom?work_number='+work_number,
    })
  },
  product:function(){
    wx.navigateTo({
      url: '../product/product',
    })
  },
  plan:function(){
    wx.navigateTo({
      url: '../plan/sale_list',
    })
  },
  count:function(){
    wx.navigateTo({
      url: '../count/count',
    })
  },
  contract:function(){
    wx.navigateTo({
      url: '../contract/contract',
    })
  },
  sign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})