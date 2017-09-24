// pages/Profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: [{
      id: 1,
      name: "Martin",
      like: true,
      avatarUrl: 'http://wx.qlogo.cn/mmhead/niczpHRtM046EFJYDGcrj57bWCzxdQMY1RhmR52sIOVk/132',
      level: 'Level 6 - 3200 points'
    }, {
      id: 2,
      name: "Stanton",
      like: false,
      level: "Level 3 - 1800 points"
    }],
    avatarUrl: null,
    nickName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo();
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
  
  },

  getUserInfo: function() {
    let me = this;
    wx.getUserInfo({
      success: function (res) {
        me.setData({
          nickName : res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },

  toggleLike: function(e) {
    let friend = e.currentTarget.dataset.friend;
    friend.like = !friend.like;
    this.data.friends[friend.id - 1] = friend;
    this.setData({
      friends: this.data.friends
    })
  }
})