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
   var work_number=wx.getStorageSync('work_number')
   var that=this
    wx.request({
      url: 'https://www.qstar.xin/login/getSale',
      data:{
        user_worknumber:work_number
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data);
        that.processData(res.data)
      }
    })
  },
  processData:function(data){
    var info=[];
    for(var i=0;i<data.length;i++){
      console.log(data[i].client_name);
      var temp={
        name: data[i].client_name
      }
      info.push(temp);
    }
    this.setData({
      info: info
    })
  },
  selectCustom:function(event){
    var postname=event.currentTarget.dataset.postname;
    wx.navigateTo({
      url: '../create_contract?name='+postname,
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