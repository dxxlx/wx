// pages/crm/sale/create_sale/create_sale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '',
    inputCompany: '',
    inputProduct: '',
    work_number:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.work_number);
    var work_number = options.work_number;
    this.setData({
      work_number: work_number
    })
  },
  bindNameInput: function (e) {
    this.data.inputName = e.detail.value
  },
  // bindCompanyInput: function (e) {
  //   this.data.inputName = e.detail.value
  // },
  bindProductInput: function (e) {
    this.data.inputProduct = e.detail.value
  },
  formSubmit: function (e) {
    var cus_name = this.data.inputName;
    // var cus_company = this.data.inputCompany;
    var product = this.data.inputProduct;
    var work_number=this.data.work_number;
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();
    var date=Y+"-"+M+"-"+D+" "+h+":"+m+":"+s;
    // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
    // console.log(date);
    // console.log(cus_name + "--" + cus_company + "--" + product)
    if (!cus_name && !product) {
      wx.showToast({
        title: '必填处不能为空',
        icon: 'none',

      })
    } else {

      wx.request({
        url: 'https://www.qstar.xin/login/addSale',
        method: 'POST',
        data: {
          user_worknumber:work_number,
          client_name: cus_name,
          // cus_company: cus_company,
          sale_name: product,
          sale_create_time:date
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success:function(res){
          console.log(res);
          if (res.data.code == work_number){
              wx.navigateTo({
                url: '../sale?work_number='+res.data.code,
              })
          }else{
            wx.showToast({
              title: '添加失败',
            })
          }
        }
      })
    }
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