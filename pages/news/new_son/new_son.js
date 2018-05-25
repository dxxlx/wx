// pages/news/new_son/new_son.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // background:"#fff"
    isChecked:false,
    isChecked2:false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var work_number=wx.getStorageSync('work_number')
    wx.request({
      url: 'https://www.qstar.xin/login/getMessage',
      method:'GET',
      data:{
        send_user:work_number
      },
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        that.processData(res.data);
      }
    })
  },
  processData:function(data){
    if(data){
      this.setData({
        isChecked: false,
        isChecked2: true,
      })
    }else{
      this.setData({
        isChecked: true,
        isChecked2: false,
      })
    }
    var info=[];
    for(var i=0;i<data.length;i++){
      if(data[i].isRead==0){
        var isread='未读'
      }else{
        var isread='已读'
      }
      var temp={
        id:data[i].id,
        name:data[i].send_username,
        topic:data[i].send_topic,
        isRead:isread,
        
      }
      info.push(temp)
    }
    this.setData({
      info:info
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  checknew:function(event){
    var id = event.currentTarget.dataset.postid;
    console.log(id)
    wx.request({
      url: 'https://www.qstar.xin/login/searchMessage',
      method:'GET',
      data:{
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        wx.navigateTo({
          url: 'new_info/new_info?id='+id,
        })
      }
    })
  },

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