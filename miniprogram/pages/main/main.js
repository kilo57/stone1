// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hoveredItem: null,
    animations: [],
    menuItems: [
      {
        id: "chat",
        label: "聊天",
        subtitle: "Chat",
        icon: "/images/聊天.png",
        bgColor: "bg-purple-400",
        hoverColor: "bg-purple-500",
      },
      {
        id: "accounting",
        label: "记账",
        subtitle: "Accounting",
        icon: "/images/记账.png",
        bgColor: "bg-green-400",
        hoverColor: "bg-green-500",
      },
      {
        id: "reminder",
        label: "提醒",
        subtitle: "Reminder",
        icon: "/images/闹钟.png",
        bgColor: "bg-pink-400",
        hoverColor: "bg-pink-500",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 创建动画实例
    const that = this;
    const animations = [];
    
    this.data.menuItems.forEach(function(_, index) {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      });
      
      // 初始状态
      animation.opacity(0).translateY(20).step({ duration: 0 });
      animations.push(animation.export());
      
      // 延迟显示，模拟原项目的入场动画
      setTimeout(function() {
        animation.opacity(1).translateY(0).step();
        const updateData = {};
        updateData[`animations[${index}]`] = animation.export();
        that.setData(updateData);
      }, 100 * (index + 1));
    });

    this.setData({
      animations: animations
    });
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
   * 处理返回按钮点击
   */
  handleBackClick: function() {
    console.log('back button clicked');
    wx.navigateBack({
      fail: function(err) {
        console.error('navigateBack失败：', err);
        wx.redirectTo({
          url: '../index/index'
        });
      }
    });
  },

  /**
   * 处理菜单项点击
   */
  handleItemClick: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击了菜单项：', id);
    
    // 延迟200毫秒跳转，让用户看到点击效果
    const that = this;
    setTimeout(function() {
      wx.navigateTo({
        url: `../${id}/${id}`,
        success: function() {
          console.log('导航成功');
        },
        fail: function(err) {
          console.error('navigateTo跳转失败:', err);
          // 尝试使用redirectTo作为备选方案
          wx.redirectTo({
            url: `../${id}/${id}`,
            fail: function(redirectErr) {
              console.error('redirectTo也失败了:', redirectErr);
            }
          });
        }
      });
    }, 200);
  },

  /**
   * 处理触摸开始事件
   */
  handleTouchStart: function(e) {
    const id = e.currentTarget.dataset.id;
    const index = this.data.menuItems.findIndex(function(item) {
      return item.id === id;
    });
    
    this.setData({
      hoveredItem: id
    });
    
    // 创建触摸动画
    const animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    });
    
    animation.scale(0.98).step();
    
    const updateData = {};
    updateData[`animations[${index}]`] = animation.export();
    this.setData(updateData);
  },

  /**
   * 处理触摸结束事件
   */
  handleTouchEnd: function() {
    const that = this;
    this.setData({
      hoveredItem: null
    });
    
    // 重置所有按钮的动画
    this.data.menuItems.forEach(function(_, index) {
      const animation = wx.createAnimation({
        duration: 100,
        timingFunction: 'ease',
      });
      
      animation.scale(1).step();
      
      const updateData = {};
      updateData[`animations[${index}]`] = animation.export();
      that.setData(updateData);
    });
  }
})