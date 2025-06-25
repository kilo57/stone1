// pages/reminder/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false, // 是否是编辑模式
    reminderId: null, // 提醒ID，编辑模式时使用
    reminderType: 'work', // 提醒类型：work, study, life
    reminderTypeText: '工作', // 提醒类型文本
    title: '', // 提醒标题
    dateOptions: ['每天', '工作日', '周末', '每周一', '每周二', '每周三', '每周四', '每周五', '每周六', '每周日', '每月'],
    dateIndex: 0, // 选中的日期选项索引
    time: '12:00', // 提醒时间
    remark: '' // 备注信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传递的参数
    const { type, id } = options;
    
    // 设置提醒类型
    if (type) {
      this.setReminderType(type);
    }
    
    // 如果有ID，说明是编辑模式
    if (id) {
      this.setData({
        isEdit: true,
        reminderId: id
      });
      
      // 加载提醒数据
      this.loadReminderData(id);
    }
  },
  
  /**
   * 设置提醒类型
   */
  setReminderType(type) {
    let typeText = '工作';
    
    switch (type) {
      case 'work':
        typeText = '工作';
        break;
      case 'study':
        typeText = '学习';
        break;
      case 'life':
        typeText = '生活';
        break;
    }
    
    this.setData({
      reminderType: type,
      reminderTypeText: typeText
    });
  },
  
  /**
   * 加载提醒数据
   */
  loadReminderData(id) {
    // 从本地存储中获取提醒列表
    const reminders = wx.getStorageSync('reminders') || [];
    
    // 查找对应ID的提醒
    const reminder = reminders.find(item => item.id === parseInt(id));
    
    if (reminder) {
      // 设置日期索引
      const dateIndex = this.data.dateOptions.indexOf(reminder.date);
      
      // 更新表单数据
      this.setData({
        reminderType: reminder.type || 'work',
        reminderTypeText: this.getTypeText(reminder.type || 'work'),
        title: reminder.title || '',
        dateIndex: dateIndex !== -1 ? dateIndex : 0,
        time: reminder.time || '12:00',
        remark: reminder.remark || ''
      });
    }
  },
  
  /**
   * 获取类型文本
   */
  getTypeText(type) {
    switch (type) {
      case 'work':
        return '工作';
      case 'study':
        return '学习';
      case 'life':
        return '生活';
      default:
        return '工作';
    }
  },
  
  /**
   * 处理标题输入
   */
  handleTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },
  
  /**
   * 处理日期选择
   */
  handleDateChange(e) {
    this.setData({
      dateIndex: parseInt(e.detail.value)
    });
  },
  
  /**
   * 处理时间选择
   */
  handleTimeChange(e) {
    this.setData({
      time: e.detail.value
    });
  },
  
  /**
   * 处理备注输入
   */
  handleRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },
  
  /**
   * 处理返回按钮点击
   */
  handleBackClick() {
    wx.navigateBack();
  },
  
  /**
   * 处理保存按钮点击
   */
  handleSaveClick() {
    // 表单验证
    if (!this.validateForm()) {
      return;
    }
    
    // 构造提醒对象
    const reminder = {
      id: this.data.isEdit ? parseInt(this.data.reminderId) : Date.now(),
      type: this.data.reminderType,
      title: this.data.title,
      date: this.data.dateOptions[this.data.dateIndex],
      time: this.data.time,
      remark: this.data.remark,
      completed: false
    };
    
    // 保存提醒
    this.saveReminder(reminder);
    
    // 返回上一页
    wx.navigateBack();
  },
  
  /**
   * 表单验证
   */
  validateForm() {
    if (!this.data.title.trim()) {
      wx.showToast({
        title: '请输入提醒标题',
        icon: 'none'
      });
      return false;
    }
    
    return true;
  },
  
  /**
   * 保存提醒
   */
  saveReminder(reminder) {
    // 从本地存储中获取提醒列表
    let reminders = wx.getStorageSync('reminders') || [];
    
    if (this.data.isEdit) {
      // 编辑模式：更新现有提醒
      reminders = reminders.map(item => {
        if (item.id === reminder.id) {
          return reminder;
        }
        return item;
      });
    } else {
      // 新增模式：添加到列表
      reminders.push(reminder);
    }
    
    // 保存到本地存储
    wx.setStorageSync('reminders', reminders);
    
    // 显示成功提示
    wx.showToast({
      title: this.data.isEdit ? '更新成功' : '添加成功',
      icon: 'success'
    });
  }
}) 