// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messages: [],
    inputValue: '',
    toView: '',
    isLoading: false, // 是否正在加载AI回复
    apiKey: 'c0423a22-4543-4b6b-9935-c41f806983a0', // 火山引擎API Key
    chatHistory: [] // 用于存储与API通信的聊天历史
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 初始化聊天记录
    const timestamp = Date.now();
    this.setData({
      messages: [
        {
          id: timestamp,
          type: 'received',
          content: '你好！我是石小石，有什么可以帮助你的吗？',
          time: this.formatTime(new Date())
        }
      ],
      chatHistory: [
        {
          role: 'system',
          content: '你是一个名叫石小石的可爱宠物，性格活泼开朗，喜欢帮助主人解决问题。请用友好、亲切的语气回答问题，回答要简短精炼。'
        },
        {
          role: 'assistant',
          content: '你好！我是石小石，有什么可以帮助你的吗？'
        }
      ]
    });
    // 确保初始化后滚动到底部
    this.setData({
      toView: `msg-0`
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 页面渲染完成后，确保滚动到底部
    this.scrollToBottom();
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
  handleBackClick() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 处理消息输入
   */
  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  /**
   * 发送消息
   */
  sendMessage() {
    const { inputValue, messages, chatHistory } = this.data;
    if (!inputValue.trim() || this.data.isLoading) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'sent',
      content: inputValue,
      time: this.formatTime(new Date())
    };

    // 更新聊天历史
    const updatedChatHistory = [...chatHistory, {
      role: 'user',
      content: inputValue
    }];

    this.setData({
      messages: [...messages, userMessage],
      inputValue: '',
      chatHistory: updatedChatHistory,
      isLoading: true
    }, () => {
      this.scrollToBottom();
    });

    // 添加一个临时的"正在输入"消息
    const loadingMessage = {
      id: Date.now() + 1,
      type: 'received',
      content: '正在思考中...',
      time: this.formatTime(new Date())
    };
    
    this.setData({
      messages: [...this.data.messages, loadingMessage]
    }, () => {
      this.scrollToBottom();
    });

    // 调用火山引擎API获取回复
    this.getAIResponse(updatedChatHistory);
  },

  /**
   * 调用火山引擎API获取AI回复
   */
  getAIResponse(chatHistory) {
    const that = this;
    
    wx.request({
      url: 'https://ark.cn-beijing.volces.com/api/v3/bots/chat/completions',
      method: 'POST',
      header: {
        'Authorization': `Bearer ${that.data.apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: 'bot-20250623222712-zbbnc',
        stream: false, // 微信小程序不支持流式响应，设置为false
        messages: chatHistory,
        thinking: {
          type: 'disabled' // 已确认关闭深度思考模式
        }
      },
      success(res) {
        console.log('AI响应:', res.data);
        
        if (res.data && res.data.choices && res.data.choices.length > 0) {
          const aiReply = res.data.choices[0].message.content;
          
          // 更新聊天历史
          const updatedChatHistory = [...that.data.chatHistory, {
            role: 'assistant',
            content: aiReply
          }];
          
          // 移除临时的"正在输入"消息
          const updatedMessages = that.data.messages.slice(0, -1);
          
          // 添加AI回复消息
          const aiMessage = {
            id: Date.now(),
            type: 'received',
            content: aiReply,
            time: that.formatTime(new Date())
          };
          
          that.setData({
            messages: [...updatedMessages, aiMessage],
            chatHistory: updatedChatHistory,
            isLoading: false
          }, () => {
            that.scrollToBottom();
          });
        } else {
          that.handleAIError('无法获取AI回复');
        }
      },
      fail(error) {
        console.error('API请求失败:', error);
        that.handleAIError('网络请求失败，请稍后再试');
      }
    });
  },
  
  /**
   * 处理AI响应错误
   */
  handleAIError(errorMessage) {
    // 移除临时的"正在输入"消息
    const updatedMessages = this.data.messages.slice(0, -1);
    
    // 添加错误消息
    const errorMsg = {
      id: Date.now(),
      type: 'received',
      content: errorMessage,
      time: this.formatTime(new Date())
    };
    
    this.setData({
      messages: [...updatedMessages, errorMsg],
      isLoading: false
    }, () => {
      this.scrollToBottom();
    });
  },

  /**
   * 格式化时间
   */
  formatTime(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return [hour, minute].map(this.formatNumber).join(':');
  },

  /**
   * 格式化数字
   */
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  },

  /**
   * 滚动到底部
   */
  scrollToBottom() {
    setTimeout(() => {
      this.setData({
        toView: `msg-${this.data.messages.length - 1}`
      });
    }, 200);
  }
})