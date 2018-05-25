App({
  globalData: {
    userInfo: null,
    workname:'',
    work_number:''
  },
  onLaunch:function(){
    this.globalData.workname = 'luxin'
    console.log(this.globalData.workname)
    wx.login({
      success: function (res) {
       if(res.code){
         wx.request({
           url: 'https://www.qstar.xin/login/weChat',
            method:'POST',
            data: {
              code: res.code
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              var user_name = res.data.user_name
              var work_number = res.data.user_work_number
              wx.setStorageSync('user_name', user_name);
              wx.setStorageSync('work_number', work_number);
              if(res.data.code==1){
                var name=res.data.user_name
                var work_number=res.data.user_work_number
                wx.reLaunch({
                  url: '../main/main?name='+name+'&work_number='+work_number,
                })
              }else{
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
       }
      }
    });
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
},
})