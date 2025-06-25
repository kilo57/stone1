Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false, // 是否是编辑模式
    expenseId: null, // 支出ID，编辑模式时使用
    expenseType: 'daily', // 支出类型：daily, shopping, housing
    expenseTypeText: '日常消费', // 支出类型文本
    iconColor: '#3B82F6', // 图标颜色
    amount: '', // 支出金额
    category: '', // 支出类别
    description: '', // 支出描述
    date: '', // 支出日期，格式为YYYY-MM-DD
    dateText: '今天' // 支出日期显示文本
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取当前日期
    const today = new Date();
    const dateStr = this.formatDate(today);
    
    // 获取传递的参数
    const { type, id } = options;
    
    // 设置支出类型
    if (type) {
      this.setExpenseType(type);
    }
    
    // 设置初始日期
    this.setData({
      date: dateStr,
      dateText: '今天'
    });
    
    // 如果有ID，说明是编辑模式
    if (id) {
      this.setData({
        isEdit: true,
        expenseId: id
      });
      
      // 加载支出数据
      this.loadExpenseData(id);
    }
  },
  
  /**
   * 设置支出类型
   */
  setExpenseType(type) {
    let typeText = '日常消费';
    let color = '#3B82F6';
    
    switch (type) {
      case 'daily':
        typeText = '日常消费';
        color = '#3B82F6'; // 蓝色
        break;
      case 'shopping':
        typeText = '购物消费';
        color = '#10B981'; // 绿色
        break;
      case 'housing':
        typeText = '住房支出';
        color = '#8B5CF6'; // 紫色
        break;
    }
    
    this.setData({
      expenseType: type,
      expenseTypeText: typeText,
      iconColor: color
    });
  },
  
  /**
   * 加载支出数据
   */
  loadExpenseData(id) {
    // 从本地存储中获取支出列表
    const expenses = wx.getStorageSync('expenses') || [];
    
    // 查找对应ID的支出
    const expense = expenses.find(item => item.id === parseInt(id));
    
    if (expense) {
      // 设置支出类型
      let type = 'daily';
      if (expense.icon === 'shopping-bag') {
        type = 'shopping';
      } else if (expense.icon === 'home') {
        type = 'housing';
      }
      
      // 设置日期文本
      let dateText = expense.date;
      if (dateText === '今天' || dateText === '昨天') {
        // 保持原样
      } else {
        // 转换为日期对象以便格式化
        const dateParts = expense.date.split('-');
        if (dateParts.length === 2) {
          dateText = `${dateParts[0]}月${dateParts[1]}日`;
        }
      }
      
      // 更新表单数据
      this.setData({
        expenseType: type,
        expenseTypeText: this.getTypeText(type),
        iconColor: expense.iconColor,
        amount: expense.amount.toString(),
        category: expense.category,
        description: expense.description,
        dateText: dateText
      });
    }
  },
  
  /**
   * 获取类型文本
   */
  getTypeText(type) {
    switch (type) {
      case 'daily':
        return '日常消费';
      case 'shopping':
        return '购物消费';
      case 'housing':
        return '住房支出';
      default:
        return '日常消费';
    }
  },
  
  /**
   * 处理金额输入
   */
  handleAmountInput(e) {
    this.setData({
      amount: e.detail.value
    });
  },
  
  /**
   * 处理类别输入
   */
  handleCategoryInput(e) {
    this.setData({
      category: e.detail.value
    });
  },
  
  /**
   * 处理描述输入
   */
  handleDescriptionInput(e) {
    this.setData({
      description: e.detail.value
    });
  },
  
  /**
   * 处理日期选择
   */
  handleDateChange(e) {
    const dateStr = e.detail.value;
    
    // 判断是否是今天或昨天
    const today = new Date();
    const todayStr = this.formatDate(today);
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = this.formatDate(yesterday);
    
    let dateText = '';
    if (dateStr === todayStr) {
      dateText = '今天';
    } else if (dateStr === yesterdayStr) {
      dateText = '昨天';
    } else {
      const date = new Date(dateStr);
      dateText = `${date.getMonth() + 1}月${date.getDate()}日`;
    }
    
    this.setData({
      date: dateStr,
      dateText: dateText
    });
  },
  
  /**
   * 格式化日期为YYYY-MM-DD
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
    
    // 构造支出对象
    const expense = {
      id: this.data.isEdit ? parseInt(this.data.expenseId) : Date.now(),
      category: this.data.category,
      icon: this.getIconName(),
      iconColor: this.data.iconColor,
      amount: parseFloat(this.data.amount),
      date: this.data.dateText,
      description: this.data.description
    };
    
    // 保存支出
    this.saveExpense(expense);
    
    // 返回上一页
    wx.navigateBack();
  },
  
  /**
   * 获取图标名称
   */
  getIconName() {
    switch (this.data.expenseType) {
      case 'daily':
        return 'coffee';
      case 'shopping':
        return 'shopping-bag';
      case 'housing':
        return 'home';
      default:
        return 'coffee';
    }
  },
  
  /**
   * 表单验证
   */
  validateForm() {
    if (!this.data.amount) {
      wx.showToast({
        title: '请输入支出金额',
        icon: 'none'
      });
      return false;
    }
    
    if (isNaN(parseFloat(this.data.amount)) || parseFloat(this.data.amount) <= 0) {
      wx.showToast({
        title: '请输入有效的金额',
        icon: 'none'
      });
      return false;
    }
    
    if (!this.data.category.trim()) {
      wx.showToast({
        title: '请输入支出类别',
        icon: 'none'
      });
      return false;
    }
    
    return true;
  },
  
  /**
   * 保存支出
   */
  saveExpense(expense) {
    // 从本地存储中获取支出列表
    let expenses = wx.getStorageSync('expenses') || [];
    
    if (this.data.isEdit) {
      // 编辑模式：更新现有支出
      expenses = expenses.map(item => {
        if (item.id === expense.id) {
          return expense;
        }
        return item;
      });
    } else {
      // 新增模式：添加到列表
      expenses = [expense, ...expenses];
    }
    
    // 保存到本地存储
    wx.setStorageSync('expenses', expenses);
    
    // 显示成功提示
    wx.showToast({
      title: this.data.isEdit ? '更新成功' : '添加成功',
      icon: 'success'
    });
  }
}) 