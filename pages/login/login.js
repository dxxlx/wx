var CODE = '';
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputNameValue: '',
    inputKeyValue: '',

  },
  bindNameInput: function (e) {
    this.data.inputNameValue = e.detail.value;
    // console.log(this.data.inputNameValue);
  },
  bindKeyInput: function (e) {
    this.data.inputKeyValue = e.detail.value;
    // console.log(this.data.inputKeyValue);
  },
  formSubmit: function (e) {
    var name = this.data.inputNameValue;
    var key = this.data.inputKeyValue
    if (name.length == 0 || key.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.login({
        success: function (res) {
          // console.log(name);
          // console.log(key);
          CODE = res.code;//code  
        
          if (CODE) {
            // console.log(name);
            wx.request({
              url: 'https://www.qstar.xin/login/weChatLogin',
              method: 'POST',
              data: {
                user_work_number: name,
                user_name: key,
                code: CODE
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data);
                console.log(res.data.user_work_number);
                wx.setStorageSync(
                  'user_work_number', res.data.user_work_number,
                  'user_name', res.data.user_name,
                  'openid', res.data.openid
                )
                if (res.data) {
                  console.log(res.data);
                  console.log(1);
                  var name = res.data.user_name
                  var work_number=res.data.user_work_number
                  wx.setStorageSync('user_name', name);
                  wx.setStorageSync('work_number', work_number);
                  wx.reLaunch({
                    url: '../main/main?name='+name +'&work_number='+work_number,
                  })
                }
                // console.log(res);
                // if (res.code = 1) {
                //   wx.showToast({
                //     title: '绑定成功',
                //   })
                // } else {
                //   console.log("登录失败");
                // }
              }

            })
          }
        }
      })


    }
    //  wx.showToast({
    //    title: '登录成功',
    //  })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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