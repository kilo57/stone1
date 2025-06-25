# 石小石 - 微信小程序

这是"领养一小石"的微信小程序版本，基于原Web项目改造而来。

## 项目结构

```
miniprogram/
├── app.json             # 应用配置
├── app.ts               # 应用入口文件
├── app.wxss             # 全局样式
├── images/              # 图片资源目录
│   ├── icons/           # 图标
│   │   ├── chat-icon.png
│   │   ├── accounting-icon.png
│   │   └── reminder-icon.png
│   ├── stone-welcome.png    # 欢迎页面的石小石图片
│   ├── stone-main.png       # 主页面的石小石图片
│   └── stone-avatar.png     # 聊天界面的石小石头像
├── pages/               # 页面目录
│   ├── index/           # 欢迎页面
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.ts
│   │   └── index.json
│   └── main/            # 主页面
│       ├── main.wxml
│       ├── main.wxss
│       ├── main.ts
│       └── main.json
└── typings/             # 类型定义
```

## 当前进度

已完成的页面：
- 欢迎页面 (index)
- 主菜单页面 (main)

待实现的页面：
- 聊天页面 (chat)
- 记账页面 (accounting)
- 提醒页面 (reminder)

## 图片资源

当前项目中的图片是占位符，需要替换为实际图片：
- stone-welcome.png: 建议尺寸 250x250px
- stone-main.png: 建议尺寸 120x120px
- stone-avatar.png: 建议尺寸 40x40px
- 所有图标: 建议尺寸 40x40px

## 如何运行

1. 使用微信开发者工具导入项目
2. 选择 `miniprogram` 文件夹
3. 填写AppID或使用测试号
4. 点击编译按钮运行 