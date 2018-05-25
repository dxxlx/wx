// pages/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create:false,
    list:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.sale_id)
    // console.log(options.name)
    var name=options.name
    // console.log(name)
    this.setData({
      name:name
    })
    // console.log(this.data.name)
    var sale_id = options.sale_id
    console.log(sale_id)
    this.setData({
      sale_id:sale_id
    })
    var that=this
    wx.request({
      url: 'https://www.qstar.xin/login/findBySaleId',
      data:{
        sale_id:sale_id
      },
      method:'GET',
      header:{
        'content-type': 'application/json' 
      },
      success:function(res){
        console.log(res.data);
        that.processdata(res.data);
       
      }
    })
  },
  createContract:function(){
    var name=this.data.name
    var sale_id=this.data.sale_id
    wx.navigateTo({
      url: '../create_plan/create_plan?name='+name+'&sale_id='+sale_id,
    })
  },
  processdata:function(data){
    if (data) {
      this.setData({
        create: false,
        list: true
      })
    } else {
      this.setData({
        create: true,
        list: false
      })
    }
    var info=[];
    for (var i = 0; i < data.length; i++) {
      // console.log(data[i].sale_id)
      var temp = {
        sale_id: data[i].sale_id,
        client_name: data[i].visit_topic,
        sale_name: data[i].sale_name,
        sale_state: data[i].sale_level,
        visit_time: data[i].visit_time
      }
      info.push(temp);

    }
    // console.log(info);
    this.setData({
      info: info
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