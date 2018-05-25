// pages/sign/sign.js
var bmap = require('../../libs/bmap-wx.min.js')
// var bmap = require('../../../libs/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak: "z4q3g52wHuZIyy80SXbvsgTBYkWQEskI", //填写申请到的ak    
    markers: [],     //地图标记 这里暂没用到  
    longitude: '',   //经度    
    latitude: '',    //纬度    
    address: '',     //地址    6
    year: '',
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  sign: function (options) {
    // console.log(1);
    // console.log("定位");
    var that = this;
    //新建百度地图对象  
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var success = function (data) {
      // console.log(data);
      wxMarkerData = data.wxMarkerData;
      var address = wxMarkerData[0].address;
      var latitude = wxMarkerData[0].latitude;
      var longitude = wxMarkerData[0].longitude;
      var client_id = that.data.sale_id;
      console.log(address);
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var h = date.getHours();
      //分  
      var m = date.getMinutes();
      //秒  
      var s = date.getSeconds();
      var date = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
      });

      // console.log(address);

      // wx.request({
      //   url: 'https://www.qstar.xin/login/signMessage',
      //   method: 'POST',
      //   data: {
      //     sale_id: client_id,
      //     sign_latitude: latitude,
      //     sign_longitude: longitude,
      //     sign_location: address,
      //     sign_time: date
      //   },
      //   header: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function (res) {
      //     // console.log(res.data.sign_time);
      //     var a = '1';
      //     // if(res.data){
      //     //   wx.showToast({
      //     //     title: '签到成功',
      //     //   })
      //     // }

      //     wx.navigateTo({
      //       url: 'info_sale?id=' + client_id + '&aaa=' + a,
      //     })
      //     that.processTime(res.data)
      //   }
      // })
    }
    // var fail = function (data) {
    //   console.log(data);
    //   console.log(this.data.address);
    // }
    BMap.regeocoding({
      // fail: fail,
      success: success
    });
    // console.log(this.data.address);

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