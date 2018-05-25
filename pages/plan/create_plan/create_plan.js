// pages/plan/create_plan/create_plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name=options.name
    var sale_id=options.sale_id
    this.setData({
      name:name,
      sale_id:sale_id
    })
 
  },
  report:function(){
    wx.navigateTo({
      url: 'leader_list/leader_list',
    })
  },
  formSubmit:function(e){
    var wn = this.data.user_worknumber
    console.log(wn)
    var sale_id=this.data.sale_id;
    var name=this.data.name;
    var theme = e.detail.value.theme;
    var date=this.data.date;
    var content = e.detail.value.visit_content
    var result = e.detail.value.result
    var other = e.detail.value.other
    var lname = e.detail.value.leadername
    console.log(lname)
    // var work_number=wx.getStorageSync('work_number')
    // var user_name = wx.getStorageSync('user_name');
    wx.request({
      url: 'https://www.qstar.xin/login/addVisit',
      data:{
        sale_id:sale_id,
        visit_topic:theme,
        client_name:name,
        visit_time:date,
        visit_content:content,
        visit_appointToId: wn,
        visit_apponitName: lname,
        visit_result:result,
        visit_note:other
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res.data);
        if(res.data){
          wx.navigateTo({
            url: '../display_plan/plan?sale_id='+sale_id+'&name='+name
          })
        }
      
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
    console.log(this.data.mydata)
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