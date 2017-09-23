// pages/Recycle/recycle.js
let util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapHeight: 0,
    recyclers: [],
    currentItem: {
      show: false
    },
    location: {
      latitude: 0,
      longitude: 0,
      markers: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this;
    wx.getSystemInfo({
      success: (resp) => {
        me.setData({
          mapHeight: resp.windowHeight
        })
        this.getLocation();
        this.getRecycles();
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
  
  },

  getLocation: function () {
    let me = this
    wx.getLocation({
      success: function (res) {
        me.setData({
          "location.latitude": res.latitude,
          "location.longitude": res.longitude
        });
      },
    })
  },

  getRecycles: function () {
    let me = this;
    let url = util.dbUrl + '/recyclers/_all_docs';
    wx.request({
      url: url,
      data: {
        include_docs: true
      },
      success: (resp) => {
        let markers = resp.data.rows.map(item => {
          let marker = {};
          marker.id = item.doc._id;
          marker.latitude = item.doc.current_location.latitude;
          marker.longitude = item.doc.current_location.longitude;
          marker.iconPath = "../../images/location.png";
          marker.width = 32;
          marker.height = 32;
          return marker;
        });
        me.setData({
          recyclers: resp.data.rows.map(item => item.doc),
          "location.markers": markers
        })
      }
    })
  },

  selectItem: function (e) {
    let me = this;
    let url = util.dbUrl + '/recyclers/' + e.markerId;
    wx.request({
      url: url,
      success: (resp) => {
        let current_item = resp.data;
        current_item.show = true;
        me.setData({
          currentItem: current_item
        })
      }
    })
  },

  tapMap: function(e) {
    this.setData({
      currentItem: {
        show: false
      }
    })
  }
})