// pages/reminder/reminder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reminders: [
      { id: 1, type: 'work', title: "喂食时间", time: "12:00", date: "每天", completed: false },
      { id: 2, type: 'life', title: "带石小石散步", time: "18:30", date: "周末", completed: true },
    ],
    showAddOptions: false // 控制添加选项弹出层的显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以从本地存储加载提醒数据
    const storedReminders = wx.getStorageSync('reminders');
    if (storedReminders) {
      this.setData({
        reminders: storedReminders
      });
    }
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
    // 从本地存储加载最新的提醒数据
    this.loadReminders();
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
  handleBackClick() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 处理添加提醒按钮点击（顶部的+按钮）
   */
  handleAddReminder() {
    this.showAddOptions();
  },

  /**
   * 切换提醒完成状态
   */
  toggleReminder(e) {
    const id = e.currentTarget.dataset.id;
    const reminders = this.data.reminders.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    
    this.setData({ reminders });
    
    // 保存到本地存储
    wx.setStorageSync('reminders', reminders);
  },

  /**
   * 显示添加选项弹出层
   */
  showAddOptions() {
    this.setData({
      showAddOptions: true
    });
  },

  /**
   * 隐藏添加选项弹出层
   */
  hideAddOptions() {
    this.setData({
      showAddOptions: false
    });
  },

  /**
   * 阻止冒泡
   */
  preventBubble() {
    // 阻止点击事件冒泡
  },

  /**
   * 选择任务类型
   */
  selectOptionType(e) {
    const type = e.currentTarget.dataset.type;
    
    // 隐藏选项弹出层
    this.hideAddOptions();
    
    // 跳转到编辑页面，传递类型参数
    wx.navigateTo({
      url: `/pages/reminder/edit/edit?type=${type}`
    });
  },

  /**
   * 添加工作提醒
   */
  addWorkReminder() {
    // 已由新的编辑页面替代
  },

  /**
   * 添加学习提醒
   */
  addStudyReminder() {
    // 已由新的编辑页面替代
  },

  /**
   * 添加生活提醒
   */
  addLifeReminder() {
    // 已由新的编辑页面替代
  },

  /**
   * 显示删除确认对话框
   */
  showDeleteConfirm(e) {
    const id = e.currentTarget.dataset.id;
    const reminder = this.data.reminders.find(item => item.id === id);
    
    if (!reminder) return;
    
    wx.showModal({
      title: '删除提醒',
      content: `确定要删除"${reminder.title}"吗？`,
      confirmText: '删除',
      confirmColor: '#FF0000',
      success: (res) => {
        if (res.confirm) {
          this.deleteReminder(id);
        }
      }
    });
  },
  
  /**
   * 删除提醒
   */
  deleteReminder(id) {
    const reminders = this.data.reminders.filter(item => item.id !== id);
    
    this.setData({
      reminders
    });
    
    // 保存到本地存储
    wx.setStorageSync('reminders', reminders);
    
    // 显示删除成功提示
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    });
  },

  /**
   * 处理提醒项点击
   */
  handleReminderClick(e) {
    const id = e.currentTarget.dataset.id;
    
    // 查找提醒项
    const reminder = this.data.reminders.find(item => item.id === id);
    
    if (reminder) {
      // 跳转到编辑页面
      wx.navigateTo({
        url: `/pages/reminder/edit/edit?id=${id}&type=${reminder.type || 'work'}`
      });
    }
  },

  /**
   * 加载提醒数据
   */
  loadReminders() {
    const storedReminders = wx.getStorageSync('reminders');
    if (storedReminders) {
      this.setData({
        reminders: storedReminders
      });
    }
  }
})