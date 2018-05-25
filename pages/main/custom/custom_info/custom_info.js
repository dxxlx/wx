// pages/crm/custom/exist_custom/custom_info/custom_info.js
var app = getApp()
// 引用百度地图微信小程序JSAPI模块 换成你的文件路径   
var bmap = require('../../../../libs/bmap-wx.min.js');
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
    business: {},    //商圈   
    desc: '',        //描述  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);  
    var id=options.id;
    var that=this;
    this.setData({
      client_id:id
    })
    wx.request({
      url: 'https://www.qstar.xin/login/getClientId',
      method: 'POST',
      data: {
        client_id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.processData(res.data);
      },
      fail: function () {
        console.log("连接出问题了");
      }

    })
  },
  processData: function (data) {
    console.log(data.client_name);
    var temps = {
      client_name: data.client_name,
      // sale_name: data.sale_name,
      area: data.client_industry,
      phone: data.client_phone,
      client_id:data.client_id,
      create_time:data.client_create_time,
      update_time:data.client_update_time
    }
    
    // console.log(info.sale_name);
    this.setData({
      info: temps
    })
  },
  sign:function(options){
    console.log(1);
    console.log("定位");
    var that = this;
    //新建百度地图对象  
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var success = function (data) {
      console.log(data);
      wxMarkerData = data.wxMarkerData;
      var address = wxMarkerData[0].address;
      var latitude = wxMarkerData[0].latitude;
      var longitude = wxMarkerData[0].longitude;
      var client_id=that.data.client_id;
      console.log(latitude);
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
      console.log(address);
      wx.request({
        url: 'https://www.qstar.xin/login/signMessage',
        method:'POST',
        data:{
          client_id:client_id,
          sign_latitude: latitude,
          sign_longitude: longitude,
          sign_location: address,
          sign_time: date
        },
         header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log(res);
        }
      })
    }
    var fail = function (data) {
      console.log(data);
      console.log(this.data.address);
    }
    BMap.regeocoding({
      fail: fail,
      success: success
    });
    console.log(this.data.address);
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  formSubmit: function (e) {
    console.log(this.data.client_id)
    console.log(e.detail.value.telephone);
    console.log(e.detail.value.company);
    var client_id = this.data.client_id;
    var telephone = e.detail.value.telephone;
    var area = e.detail.value.company;
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
    var work_number = wx.getStorageSync('work_number');
    wx.request({
      url: 'https://www.qstar.xin/login/updateClientInfo',
      method: 'POST',
      data: {
        client_id: client_id,
        client_phone: telephone,
        client_industry:area,
        client_update_time: date
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.client_id) {
          wx.showToast({
            title: '修改成功',
          })
          wx.redirectTo({
            url: '../custom?work_number=' + work_number,
          })
        }
      }

    })
  },
  deleteinfo: function () {
    var client_id = this.data.client_id;
    console.log(client_id);
    var work_number = wx.getStorageSync('work_number');
    console.log(work_number);
    wx.request({
      url: '',
      method: 'POST',
      data: {
        sale_id: sale_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '删除成功',
          })
          wx.navigateTo({
            url: 'custom/custom?work_number=' + work_number,
          })
        }
      }

    })
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