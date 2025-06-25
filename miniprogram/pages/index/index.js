// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('index page loaded');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 处理Start按钮点击事件
   */
  handleStartClick: function() {
    console.log('start button clicked - in index.js');
    wx.navigateTo({
      url: '../main/main',
      success: function() {
        console.log('导航成功');
      },
      fail: function(err) {
        console.error('navigateTo跳转失败:', err);
        // 尝试使用redirectTo作为备选方案
        wx.redirectTo({
          url: '../main/main',
          success: function() {
            console.log('重定向成功');
          },
          fail: function(redirectErr) {
            console.error('redirectTo也失败了:', redirectErr);
            // 最后尝试switchTab
            wx.switchTab({
              url: '../main/main',
              fail: function(switchErr) {
                console.error('所有导航方法都失败了:', switchErr);
              }
            });
          }
        });
      }
    });
  }
})