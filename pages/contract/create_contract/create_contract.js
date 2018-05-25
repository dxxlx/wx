// pages/contract/create_contract/create_contract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    var name = options.name
    this.setData({
      name:name
    })
  },
  custom:function(){
    wx.navigateTo({
      url: 'custom_list/custom_list',
    })
  },
  formSubmit:function(e){
    var name=e.detail.value.custom
    console.log(name);
    var theme=e.detail.value.theme
    var money=e.detail.value.money
    var status=e.detail.value.radiogroup
    // var work_number=wx.getStorageSync('work_number')
    var work_number = wx.getStorageSync('work_number')
    wx.request({
      url: 'https://www.qstar.xin/login/addContract',
      method: 'POST',
      data: {
        user_worknumber: work_number,
        contract_topic:theme,
        client_name:name,
        amount:money,
        status:status
      },
     
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: '../contract',
        })
        // that.processData(res.data)
      }
    
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