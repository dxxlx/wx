// pages/personal/personal_info/personal_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    number:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name);
    var name = options.name;
    var number=options.number;
    console.log(options.number);
    this.setData({
      name: name,
      number:number
    })
    var that = this;
    wx.request({
      url: 'https://www.qstar.xin/login/weChatInfo',
      method:'POST',
      data:{
        user_work_number:number
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
       
        that.processData(res);
      }
    })
  },
  processData:function(data){
    console.log(data.data.user_cellphone)
    var info=[];
   
      var temp = {
        phone: data.data.user_cellphone,
        email: data.data.user_email,
        company: data.data.user_company,
        department: data.data.user_department,
        position: data.data.user_position
      }
      info.push(temp);
   
    this.setData({
      info: info
    })
    console.log(this.data.info[0].phone)
  },
  formSubmit: function (e) {
    console.log(e.detail.value.phone_number);
    console.log(e.detail.value.email);
    console.log(e.detail.value.company);
    console.log(e.detail.value.department);
    console.log(e.detail.value.position);
    var phone_number = e.detail.value.phone_number;
    var email = e.detail.value.email;
    var company = e.detail.value.company;
    var department = e.detail.value.department;
    var position = e.detail.value.position;
    var number=this.data.number;
    wx.request({
      url: 'https://www.qstar.xin/login/weChatUpDateInfo',
      method:'POST',
      data:{
        user_work_number:number,
        user_cellphone:phone_number,
        user_email:email,
        user_company:company,
        user_department:department,
        user_position:position
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        // console.log(res.data);
        if(res.data){
          wx.showToast({
            title: '更改成功',
          })
          wx.switchTab({
           
            url: '../personal',
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