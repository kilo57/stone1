// pages/accounting/accounting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expenses: [
      {
        id: 1,
        category: "食物",
        icon: "coffee",
        iconColor: "#3B82F6", // 蓝色
        amount: 45.5,
        date: "今天",
        description: "石小石的零食"
      },
      {
        id: 2,
        category: "日用品",
        icon: "shopping-bag",
        iconColor: "#10B981", // 绿色
        amount: 120.25,
        date: "昨天",
        description: "石小石的玩具"
      },
      {
        id: 3,
        category: "住宿",
        icon: "home",
        iconColor: "#8B5CF6", // 紫色
        amount: 200,
        date: "06-10",
        description: "石小石的小屋"
      }
    ],
    totalExpense: 0,
    showAddOptions: false // 控制添加选项弹出层的显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.calculateTotal();
  },

  /**
   * 计算总支出
   */
  calculateTotal() {
    const totalExpense = this.data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.setData({
      totalExpense: totalExpense.toFixed(2)
    });
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
   * 添加新支出（顶部按钮）
   */
  handleAddExpense() {
    this.showAddOptions();
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
   * 选择支出类型
   */
  selectExpenseType(e) {
    const type = e.currentTarget.dataset.type;
    
    // 隐藏选项弹出层
    this.hideAddOptions();
    
    // 跳转到编辑页面，传递类型参数
    wx.navigateTo({
      url: `/pages/accounting/edit/edit?type=${type}`
    });
  },
  
  /**
   * 添加日常消费
   */
  addDailyExpense() {
    // 已由新的编辑页面替代
  },
  
  /**
   * 添加购物消费
   */
  addShoppingExpense() {
    // 已由新的编辑页面替代
  },
  
  /**
   * 添加住房支出
   */
  addHousingExpense() {
    // 已由新的编辑页面替代
  },
  
  /**
   * 添加支出记录
   */
  addExpenseRecord(expense) {
    // 添加到支出列表
    const expenses = [expense, ...this.data.expenses];
    
    this.setData({
      expenses
    });
    
    // 重新计算总支出
    this.calculateTotal();
    
    // 保存到本地存储
    wx.setStorageSync('expenses', expenses);
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
    // 从本地存储加载最新的支出数据
    this.loadExpenses();
  },
  
  /**
   * 加载支出数据
   */
  loadExpenses() {
    const storedExpenses = wx.getStorageSync('expenses');
    if (storedExpenses) {
      this.setData({
        expenses: storedExpenses
      });
      this.calculateTotal();
    }
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
   * 处理支出项点击
   */
  handleExpenseClick(e) {
    const id = e.currentTarget.dataset.id;
    
    // 查找支出项
    const expense = this.data.expenses.find(item => item.id === id);
    
    if (expense) {
      // 确定支出类型
      let type = 'daily';
      if (expense.icon === 'shopping-bag') {
        type = 'shopping';
      } else if (expense.icon === 'home') {
        type = 'housing';
      }
      
      // 跳转到编辑页面
      wx.navigateTo({
        url: `/pages/accounting/edit/edit?id=${id}&type=${type}`
      });
    }
  },

  /**
   * 显示删除确认对话框
   */
  showDeleteConfirm(e) {
    const id = e.currentTarget.dataset.id;
    const expense = this.data.expenses.find(item => item.id === id);
    
    if (!expense) return;
    
    wx.showModal({
      title: '删除支出',
      content: `确定要删除"${expense.category} ¥${expense.amount}"吗？`,
      confirmText: '删除',
      confirmColor: '#FF0000',
      success: (res) => {
        if (res.confirm) {
          this.deleteExpense(id);
        }
      }
    });
  },
  
  /**
   * 删除支出
   */
  deleteExpense(id) {
    const expenses = this.data.expenses.filter(item => item.id !== id);
    
    this.setData({
      expenses
    });
    
    // 重新计算总支出
    this.calculateTotal();
    
    // 保存到本地存储
    wx.setStorageSync('expenses', expenses);
    
    // 显示删除成功提示
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000
    });
  }
})