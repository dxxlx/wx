// pages/crm/sale/sale.jsr 
// var postsData=require("../../../data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    create:false,
    display:false,
    user_worknumber:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    //  console.log(options.work_number);
    var work_number = options.work_number;
    this.setData({
      // posts_key:postsData.postList
      user_worknumber: work_number
    })
    // console.log(this.data.user_worknumber);
    var that = this;
    // console.log(this.data.posts_key)
    wx.request({
     
      url: 'https://www.qstar.xin/login/getSale',
      method:'POST',
      data:{
        user_worknumber: work_number
      },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.processData(res.data);
        // that.processData(res.data);
      }
    })
  },
  add:function(event){
   
    // console.log( event.currentTarget.dataset)
    // var that=this;
    // console.log(1);
    console.log(this.data.user_worknumber);
    var work_number = this.data.user_worknumber;
    // console.log(work_number);
    wx.navigateTo({
      url: 'create_sale/create_sale?work_number='+work_number,
    })
  },
  processData:function(data){
    // console.log(data);
    if(data){
      this.setData({
        display:true,
        create:false
      })
    }else{
      this.setData({
        display:false,
        create:true
      })
    }
    // console.log(data);
    // console.log(data[1].user_worknumber);
     var info=[];
    for(var i=0;i<data.length;i++){
      // console.log(data[i].sale_id)
      var temp={
        sale_id:data[i].sale_id,
        client_name:data[i].client_name,
        sale_name:data[i].sale_name,
        sale_state:data[i].sale_level
      }
      info.push(temp);
      
    }
    // console.log(info);
    this.setData({
      info:info
    })
  },
  createSale:function(event){
    console.log(this.data.user_worknumber);
    var work_number = this.data.user_worknumber;
    wx.navigateTo({
      url: 'create_sale/create_sale?work_number=' + work_number
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  checkInfo:function(event){
    // console.log(event.currentTarget.dataset);
    var postId = event.currentTarget.dataset.postid;
    // console.log(postId);
    wx.navigateTo({
      url: 'info_sale/info_sale?id=' + postId,
    })
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