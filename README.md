# stone1
1
#  AI创意产品名称（例如：AI诗人 / 梦境翻译器 / 情绪日志猫）

## 项目简介
本项目是基于微信小程序 + AI 智能体开发的创意产品，旨在通过语言模型的生成能力，为用户提供沉浸式对话和工具辅助 体验。

## 功能概览
- 与AI智能体实时对话（人格设定：知心宠物伙伴）
- 关键词触发式多模态响应
## 技术栈
- 微信小程序（前端界面）
- OpenAI GPT-4 API（自然语言生成）
- Cursor IDE（AI辅助开发）
- 火山引擎（自动部署流程）
- Figma + V0（界面原型设计）

## 使用说明
1. 打开微信 → 扫码进入小程序  
2. 点击“聊天”进入功能界面  
3. 输入文本 / 点击选项开始交互  
4. 查看结果


## 智能体设定摘要
- 角色：如 AI伙伴助手
- 性格：活泼、引导型，带情感识别能力
- 任 务：根据用户输入，输出符合情感/功能目标的语句，建议内容结构如下：

> “你好！我是石小石，有什么可以帮助你的吗？”

## 项目结构说明
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
## 运行方法
1. 克隆本项目至本地
2. 使用微信开发者工具打开 `/miniprogram` 文件夹
3. 填入 `.env` 文件中的 API KEY
4. 运行并调试（推荐真机测试）

## 许可证
MIT License
