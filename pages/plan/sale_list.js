// pages/plan/sale_list.js
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
    // console.log(wx.getStorageSync("work_number"))
    var work_number = wx.getStorageSync("work_number");
    // console.log(work_number);
    var that=this;
    // this.setData({
    //   work_number:work_number
    // })
    wx.request({
      url: 'https://www.qstar.xin/login/getAllByUserNumber',
      data:{
        user_worknumber:work_number
      },
      method:'GET',
      header:{
        'content-type': 'application/json'
      },
      success:function(res){
        // console.log(res);
        that.processData(res.data)
      }
    })
  },
  processData:function(data){
    var info = [];
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].sale_id)
      var temp = {
        sale_id: data[i].sale_id,
        client_name: data[i].client_name,
        sale_name: data[i].sale_name,
        sale_state: data[i].sale_level
      }
      info.push(temp);

    }
    // console.log(info);
    this.setData({
      info: info
    })
  },
  skip:function(event){
    // console.log(event.currentTarget.dataset.postname)
    var sale_id = event.currentTarget.dataset.postid
    var name = event.currentTarget.dataset.postname
    wx.navigateTo({
      //url:"display_plan/plan"
       url: 'display_plan/plan?sale_id='+sale_id+'&name='+name,
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