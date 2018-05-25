// pages/crm/custom/create_custom/create_custom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    work_number: ''
    // company:'',
    // telephone:'',
    // remark:''
  },
  onLoad: function (options) {
    var work_number = options.work_number;
    console.log(work_number);
    this.setData({
      work_number: work_number
    })
  },
  bindNameInput:function(e){
    this.data.name=e.detail.value
  },
  // bindCompanyInput:function(e){
  //   this.data.company=e.detail.value
  // },
  // bindTelephoneInput:function(e){
  //   this.data.telephone=e.detail.value
  // },
  // bindRemarkInput:function(e){
  //   this.data.remark=e.detail.value
  // },
  formSubmit:function(e){
    var client_name=this.data.name;
    var work_number = this.data.work_number;
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
      url: 'https://www.qstar.xin/login/addClient',
      method:'POST',
      data:{
        user_worknumber: work_number,
        client_name:client_name,
        client_create_time:date
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        if (res.data.code == work_number) {
          // wx.showToast({
          //   title: '添加成功',
          // })
          wx.navigateTo({
            url: '../custom?work_number=' + res.data.code,
          })
        } else {
          wx.showToast({
            title: '添加失败',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
 
 
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