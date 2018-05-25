// pages/plan/create_plan/leader_list/leader_list.js
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
   
    var that=this;
    wx.request({
      url: 'https://www.qstar.xin/login/getAllUser',
      method:'GET',
      header:{
        'content-type': 'application/json',
      },
      success:function(res){
        console.log(res.data);
        that.processData(res.data);
      }
    })
  },
  processData:function(data){
    var info=[]
    for(var i=0;i<data.length;i++){
      var temp={
        userworknumber:data[i].user_work_number,
        name:data[i].user_name
      }
      info.push(temp);
    }
    this.setData({
      info:info
    })
    console.log(this.data.info)
  },
  selectLeader:function(event){
    var name= event.currentTarget.dataset.postname
    var userworknumber = event.currentTarget.dataset.postid
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      leadername:name,
      user_worknumber: userworknumber
    })
    wx.navigateBack({
      delta: 1
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