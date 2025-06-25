// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    this.globalData.statusBarHeight = systemInfo.statusBarHeight
    this.globalData.screenWidth = systemInfo.screenWidth
    this.globalData.screenHeight = systemInfo.screenHeight
  }
}) 