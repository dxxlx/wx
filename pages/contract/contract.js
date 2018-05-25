// pages/contract/contract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create:false,
    display:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var work_number=wx.getStorageSync('work_number')
    var that=this
    wx.request({
      url: 'https://www.qstar.xin/login/findContract',
      data:{
        user_worknumber:work_number
      },
      method:'GET',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res)
        that.processData(res.data)
      }
    })
  },
  processData:function(data){
      if(data){
        this.setData({
          create:false,
          display:true
        })
      }else{
        this.setData({
          create:true,
          display:false
        })
      }
      for(var i=0;i<data.length;i++){
        var info=[];
        for(var i=0;i<data.length;i++){
          var temp={
            contract_topic: data[i].contract_topic,
            name:data[i].client_name,
          }
          info.push(temp)
        }
        this.setData({
          info:info
        })
      }
  },
  createContract:function(){
    wx.navigateTo({
      url: 'create_contract/create_contract',
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