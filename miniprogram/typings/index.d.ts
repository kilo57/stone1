/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    statusBarHeight?: number;
    screenWidth?: number;
    screenHeight?: number;
    [key: string]: any;
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
} 