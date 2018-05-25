// pages/crm/sale/exist_sale/info_sale/info_sale.js
// var postData=require("../../../../data/data.js")
var app = getApp()
// 引用百度地图微信小程序JSAPI模块 换成你的文件路径   
var bmap=require('../../../../libs/bmap-wx.min.js')
// var bmap = require('../../../libs/bmap-wx.min.js');
var wxMarkerData = [];  //定位成功回调对象  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '',
    ischecked:true,
    ischecked2:false,
    ischecked3:true,
    ischecked4:true,
    ak: "z4q3g52wHuZIyy80SXbvsgTBYkWQEskI", //填写申请到的ak    
    markers: [],     //地图标记 这里暂没用到  
    longitude: '',   //经度    
    latitude: '',    //纬度    
    address: '',     //地址    6
    year:'',
    time:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option.aaa)
    var that = this;
    var postID = option.id;
    // console.log(postID)
    this.setData({
      sale_id: postID
    })
    if (option.aaa){
      this.setData({
        ischecked: false,
        ischecked2: true,
        // ischecked3: false,
        // ischecked4: false
      })
      // wx.request({
      //   url: 'https://www.qstar.xin/login/getsignMessage',
      //   method: 'GET',
      //   data: {
      //     sale_id: postID
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     console.log(res.data);
      //     that.processLoction(res.data);
      //   },
      // })
    }
    wx.request({
      url: 'https://www.qstar.xin/login/getSaleId',
      method: 'POST',
      data: {
        sale_id: postID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res.data);
        that.processData(res.data);
      },
      // fail: function () {
      //   console.log("连接出问题了");
      // }
    })
    // console.log(postID);
    // this.data.currentPostId=postID;
  },
  processLoction:function(data){
    console.log("1")
    var info=[]
    for(var i=0;i<data.length;i++){
      var time=data[i].sign_time.split(" ")
      var year=time[0]
      var time=time[1]
      var sign_location = data[i].sign_location
      
      var temp={
        year:year,
        time:time,
        location: sign_location
      }
      info.push(temp)
    }
    this.setData({
      info:info
    })
  },
  record:function(){
    var that=this
    this.setData({
      ischecked: false,
      ischecked2: true,
      ischecked3: false,
      ischecked4:false
    })
    var postID = this.data.sale_id
    wx.request({
      url: 'https://www.qstar.xin/login/getsignMessage',
      method: 'GET',
      data: {
        sale_id: postID
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);

        that.processLoction(res.data);
      },
    })
  },
  info:function(){
    var postID=this.data.sale_id
    var that=this
    this.setData({
      ischecked: true,
      ischecked2: false,
      ischecked3: true,
      ischecked4: true
    })
    wx.request({
      url: 'https://www.qstar.xin/login/getSaleId',
      method: 'POST',
      data: {
        sale_id: postID
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res.data);
        that.processData(res.data);
      },
      // fail: function () {
      //   console.log("连接出问题了");
      // }
    })
  },
  // bindNameInput: function (e) {
  //   console.log(e.detail.value);
  //   this.setData({
  //     inputName: e.detail.value
  //   })
  //   // this.data.inputName = e.detail.value
  // },
  processData: function (data) {
    // console.log(data.sale_name)
    var temps = {
      client_name: data.client_name,
      sale_name: data.sale_name,
      sale_create_time: data.sale_create_time,
      save_level:data.sale_level,
      sale_update_time: data.sale_update_time
    }

    // console.log(info.sale_name);
    this.setData({
      info: temps
    })
  },

 formSubmit:function(e){
  //  console.log(this.data.sale_id)
  //  console.log(e.detail.value.state);
  //  console.log(e.detail.value.name);
  //  console.log(e.detail.value.company);
  //  console.log(e.detail.value.product);
  
   var sale_id = this.data.sale_id;
   var state = e.detail.value.state;
   var name = e.detail.value.name;
   var product = e.detail.value.product;
   var work_number = wx.getStorageSync('work_number');
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
   wx.request({
     url:"https://www.qstar.xin/login/updateSaleId",
     method:'POST',
     data:{
       sale_id:sale_id,
       sale_level:state,
       client_name:name,
       sale_name:product,
       sale_update_time:date
     },
     header: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     success:function(res){
      //  console.log(res);
       if(res.data.sale_id){
         wx.showToast({
           title: '修改成功',
         })
        //  wx.navigateBack({
        //    delta: 1
        //  })
         wx.redirectTo({
           url: '../sale?work_number=' + work_number,
         })
       }
     }

   })
 },
  deleteinfo:function(){
    var sale_id = this.data.sale_id;
    console.log(sale_id);
    var work_number = wx.getStorageSync('work_number');
    // console.log(work_number);
    wx.request({
      url: "https://www.qstar.xin/login/deleteSaleId",
      method:'POST',
      data:{
        sale_id:sale_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // console.log(res);
        if(res.data.code==1){
          wx.showToast({
            title: '删除成功',
          })
          wx.navigateTo({
            url: '../sale?work_number=' + work_number,
          })
        }
      }

    })
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
      console.log(client_id);
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
     
      wx.request({
        url: 'https://www.qstar.xin/login/signMessage',
        method: 'POST',
        data: {
          sale_id: client_id,
          sign_latitude: latitude,
          sign_longitude: longitude,
          sign_location: address,
          sign_time: date
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res.data.sign_time);
          var a='1';
          // if(res.data){
          //   wx.showToast({
          //     title: '签到成功',
          //   })
          // }
         
          wx.navigateTo({
            url: 'info_sale?id=' + client_id+'&aaa='+a,
          })
        that.processTime(res.data)
        }
      })
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
  processTime:function(data){
    if(data){
      this.setData({
        ischecked: false,
        ischecked2: true,
        ischecked3: false,
        ischecked4: false
      })
    }
    // var info = []
    // console.log(1)
    // for (var i = 0; i < data.length; i++) {
    //   var time = data[i].sign_time.split(" ")
    //   var year = time[0]
    //   var time = time[1]
    //   var sign_location = data[i].sign_location
    //   console.log(year)
    //   var temp = {
    //     year: year,
    //     time: time,
    //     location: sign_location
    //   }
    //   info.push(temp)
    // }
    // this.setData({
    //   info: info
    // })
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