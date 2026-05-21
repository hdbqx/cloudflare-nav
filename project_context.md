# Project Structure

cloudflare-nav/
├── README.md
├── functions
│   └── api
│       ├── bilibili-cover.js
│       ├── config.js
│       └── defaultData.js
├── public
│   ├── ServiceWorker.js
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   ├── img
│   │   │   └── preview
│   │   └── js
│   │       ├── app.js
│   │       ├── colorExtractor.js
│   │       └── utils.js
│   ├── index.html
│   └── manifest.json
└── server.js


## File: README.md

```md
# 🧭 CloudNav - 极简高效的个人网站导航

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build](https://img.shields.io/badge/build-Cloudflare%20Pages-orange.svg)
![Vanilla JS](https://img.shields.io/badge/es6-Vanilla%20JS-yellow.svg)
![PWA](https://img.shields.io/badge/PWA-Supported-8A2BE2.svg)

**基于 Cloudflare Pages 和 Workers KV 构建的纯云端、无服务器个人导航页。**<br>
零代码基础，全程使用 Google Gemini 问答和生成代码，采用响应式毛玻璃（Glassmorphism）卡片设计，原生 JavaScript 开发，0 成本 5 分钟极速部署。

[👉 在线预览 Demo ，登录后台密码 123456  👈](https://cloudflare-nav-demo.pages.dev)

</div>

## 📸 界面预览

<table style="width: 100%; border-collapse: collapse; border: none;">
  <tr style="border: none;">
    <td align="center" style="border: none; width: 50%;">
      <img src="public/assets/img/preview/homepage.jpg" width="100%" alt="首页页面预览" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
      <br>
      <sub><b>✨ 首页页面预览</b></sub>
    </td>
    <td align="center" style="border: none; width: 50%;">
      <img src="public/assets/img/preview/setting.jpg" width="100%" alt="后台管理页面预览" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
      <br>
      <sub><b>⚙️ 后台管理页面预览</b></sub>
    </td>
  </tr>
  <tr style="border: none;">
    <td align="center" style="border: none; width: 50%;">
      <img src="public/assets/img/preview/web1.jpg" width="100%" alt="网址条目新增页面预览" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
      <br>
      <sub><b>➕ 网址条目新增页面预览</b></sub>
    </td>
    <td align="center" style="border: none; width: 50%;">
      <img src="public/assets/img/preview/web2.jpg" width="100%" alt="分类管理页面预览" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
      <br>
      <sub><b>📁 分类管理页面预览</b></sub>
    </td>
  </tr>
</table>

---

## ✨ 核心特性

### 🚀 极速轻量
- 纯原生 HTML/CSS/JS 开发，无冗余前端框架
- 无需 Webpack/Vue/React 构建，直接部署源文件
- 丝滑流畅的交互体验，首屏加载快

### 🎨 现代 UI 设计
- 采用高级毛玻璃（Glassmorphism）视觉效果
- 半透明卡片背景 + 模糊滤镜，视觉层次分明
- **左侧导航栏** + 连续滚动主内容区，导航体验更流畅
- 6 列网格布局（自适应 5/4/3 列响应式断点）
- 悬停上浮动画，交互反馈细腻
- 支持**亮色/暗色主题**自动切换和手动切换
- 支持简约模式（关闭毛玻璃效果，提升低端设备性能）

### 🖼️ 双模式视图
- **默认模式（Style 0）**：经典图标网格，紧凑高效
- **缤纷模式（Style 2）**：列表详情 + 用户自定义背景色，信息更丰富
- 侧边栏底部一键切换视图风格

### 🛠️ 纯云端无服务器
- 完美接入 Cloudflare Pages + KV 数据库
- **零服务器成本**，免去繁琐运维
- 全球 CDN 加速，访问速度有保障
- Serverless 架构，按需自动伸缩

### 🖼️ 动态每日壁纸
- 自动拉取 Bing 每日高清壁纸
- 搭配半透明暗色遮罩，确保文字清晰可读
- 12 小时缓存机制，减少重复请求
- 支持自定义背景图片 URL 或纯色背景

### 📱 完美响应式与 PWA
- 自动适配 PC 端与移动端屏幕
- 移动端侧边栏变为滑出式抽屉，点击汉堡菜单打开
- 支持 PWA 离线缓存，可像原生 App 一样添加到桌面
- 断网也能正常访问已缓存的页面

### 🔐 安全内置后台
- 安全 Token 鉴权（SHA-256 哈希存储，密码不泄露）
- 支持在线可视化增删改查分类与书签
- 支持鼠标/手指**拖拽排序**（网站卡片 + 视频卡片均支持）
- 敏感数据（隐藏的分类/书签）对普通游客不可见
- 支持**批量选择**与批量删除/移动操作

### 🎬 视频导航
- 自动识别 **Bilibili** 和 **YouTube** 视频链接
- 视频分类以大卡片网格展示，含封面图、平台标识
- 点击视频卡片弹出内嵌播放器，无需跳转页面
- 视频弹窗**仅关闭按钮可退出**，避免误触关闭
- 管理员模式下视频卡片支持**拖拽排序**
- 封面加载失败自动降级为图标占位

### 💻 JSON 数据编辑器
- 内置 **Monaco Editor**（VS Code 同款编辑器）
- 可直接在线编辑原始 JSON 数据，适合高级用户批量修改
- 支持一键格式化、保存

### 🤖 智能图标获取
- 内置 Favicon.im 和 DuckDuckGo 接口
- 填入网址自动智能抓取网站图标
- 支持 Iconify 图标库搜索
- 支持 Emoji 图标作为备选
- 图标加载失败时自动回退到随机 Emoji

### 📊 智能"常去"分类
- 自动记录每个书签的点击次数
- 根据访问频次智能生成"常去网站"分类
- 默认展示你最常访问的 Top 12 网站

### 💾 数据安全与便携
- 支持一键**导出配置**（JSON 格式）
- 支持从文件**导入配置**
- 支持一键**恢复默认**配置

---

## 💻 技术栈

| 层级 | 技术 |
|------|------|
| **前端视图** | HTML5, CSS3, ES6 Vanilla JavaScript |
| **后端 API** | Cloudflare Pages Functions (`functions/api/config.js`) |
| **数据存储** | Cloudflare Workers KV |
| **静态资源** | Cloudflare Pages (全球 CDN) |
| **第三方库** | [SortableJS](https://github.com/SortableJS/Sortable) - 拖拽排序 |
| **第三方库** | [RemixIcon](https://remixicon.com/) - 开源精美字体图标 |
| **第三方库** | [Iconify](https://iconify.design/) - 图标搜索服务 |
| **第三方库** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) - 在线代码编辑器 |

---

## 📂 目录结构

```text
cloudflare-nav/
├── public/                           # 静态前端资源 (Pages 部署的根目录)
│   ├── assets/                       # 辅助资源
│   │   ├── css/
│   │   │   └── style.css             # 核心样式（设计系统 + 响应式 + 主题）
│   │   ├── js/
│   │   │   ├── app.js                # 核心前端逻辑（导航渲染、管理、视频、Monaco）
│   │   │   ├── utils.js              # 通用工具函数 (escapeHTML, debounce, emoji)
│   │   │   ├── emoji-pool.js         # Emoji 资源池
│   │   │   └── colorExtractor.js     # 颜色提取工具（缤纷模式）
│   │   └── img/                      # 项目预览图或 UI 图片
│   │       └── preview/              # 项目预览截图
│   ├── index.html                    # 纯净的 HTML 入口
│   ├── manifest.json                 # PWA 配置文件
│   └── ServiceWorker.js              # PWA 核心脚本 (缓存策略)
├── functions/                        # 后端 Serverless API
│   └── api/
│       ├── config.js                 # API 处理逻辑 (GET/POST/DELETE)
│       └── defaultData.js            # 默认初始化数据
├── .gitattributes                    # Git 属性配置
└── README.md                         # 项目文档
```

---

## 🎨 设计系统

### 布局架构
- **左侧导航栏**（250px 宽度）：分类导航 + 风格切换 + 管理操作
- **主内容区**：连续滚动的分类区块，最大宽度 62rem (992px)
- **卡片网格**：6 列 → 5 列 → 4 列 → 3 列，响应式断点分别为 1200px / 900px / 600px

### 主题系统
| 主题 | 说明 |
|------|------|
| 暗色主题 | 默认深色毛玻璃风格 |
| 亮色主题 | 温和柔光风格，柔和不刺眼 |
| 跟随系统 | 根据 OS 偏好自动切换亮暗 |
| 简约模式 | 关闭 backdrop-filter 毛玻璃效果 |

### 视图模式
| 模式 | 说明 |
|------|------|
| 默认模式（Style 0） | 经典图标 + 文字卡片网格 |
| 缤纷模式（Style 2） | 横排列表卡片，支持自定义背景色 |

---

## 🚀 部署指南 (Cloudflare Pages)

**完全免费，整个部署过程不超过 10 分钟！**

### 准备工作

1. **注册 Cloudflare 账号**：访问 [dash.cloudflare.com](https://dash.cloudflare.com/) 注册
2. **准备 GitHub 仓库**：将项目代码上传到你的 GitHub 仓库

### 第一步：上传到 GitHub

1. 登录 GitHub，新建一个仓库（例如 `my-nav`）
2. 将本地 `cloudflare-nav` 文件夹内容上传到该仓库
3. 或者直接 Fork 本项目到你的 GitHub 账户

### 第二步：创建 Cloudflare 项目

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
2. 在左侧菜单找到 **Workers & Pages** → 点击 **创建应用程序 (Create application)**
3. 切换到 **Pages** 标签页 → 点击 **连接到 Git (Connect to Git)**
4. 授权 GitHub 并选择你刚刚准备好的仓库
5. **构建设置 (Build Settings)**：
   - 框架预设 (Framework preset): `None`（重要！）
   - 构建命令 (Build command): *(留空)*
   - 构建输出目录 (Build output directory): `public`
6. 点击 **保存并部署 (Save and Deploy)** 按钮

### 第三步：配置 KV 数据库

> 这是数据存储的核心，必须配置！

1. 回到 Cloudflare 控制台，进入左侧 **Workers & Pages** → **KV**
2. 点击 **创建命名空间 (Create a namespace)**
3. 输入名字（例如 `my_nav_db`），点击确认创建
4. **注意**：记下这个 KV 名字，后面会用到

### 第四步：绑定 KV 到 Pages 项目

1. 进入你刚才部署好的 Pages 项目详情页
2. 点击 **设置 (Settings)** 选项卡
3. 找到 **Functions** → **KV 命名空间绑定 (KV namespace bindings)**
4. 点击 **绑定变量 (Bind variable)**：
   - **变量名称 (Variable name)**：必须填入 `nav`（这是代码中硬编码的变量名）
   - **KV 命名空间**：选择你刚才创建的数据库（如 `my_nav_db`）
5. 点击 **保存 (Save)** 按钮

### 第五步：设置管理员密码

> 这是一个重要的安全步骤，用于保护你的后台管理功能

1. 在项目设置页面，找到 **环境变量 (Environment variables)**（在 Functions 下方）
2. 点击 **添加变量 (Add variable)**：
   - **变量名称**：必须填入 `TOKEN`（这是代码中硬编码的变量名）
   - **值 (Value)**：填入你想要的后台登录密码（例如 `mypassword123`）
3. ⚠️ **建议**：点击右侧的 `加密` 按钮将密码加密存储
4. 点击 **保存 (Save)** 按钮

> **注意**：密码建议使用强密码，包含字母、数字、特殊字符，长度不少于 8 位。

### 第六步：重新部署生效

1. 返回到项目的 **部署 (Deployments)** 页面
2. 找到最新的一次部署记录
3. 点击最右侧的三个点 `...` → **重试部署 (Retry deployment)**
4. 等待部署完成后，点击系统分配的域名即可访问！

---

## 🎮 使用说明

### 首次访问

1. 打开 Cloudflare 分配给你的域名
2. 你将看到默认的导航页面，包含预设的分类和书签

### 进入后台管理

1. 点击**左侧导航栏底部**的 **"管理"** 按钮
2. 弹出登录框，输入你在环境变量中设置的 `TOKEN` 密码
3. 点击登录即可进入管理模式

### 管理员功能

| 功能 | 操作说明 |
|------|----------|
| **新增书签** | 在对应分类下点击虚线框的 **"新增"** 卡片 |
| **编辑书签** | 点击书签右上角的 ✏️ 编辑图标 |
| **删除书签** | 点击书签右上角的 🗑️ 删除图标 |
| **隐藏书签** | 点击书签右上角的 👁️ 眼睛图标（隐藏后普通用户看不到） |
| **拖拽排序** | 管理员模式下按住卡片拖动调整顺序（网站卡片 & 视频卡片均支持） |
| **批量操作** | 点击书签右上角的 ☑️ 批量选择按钮，支持批量删除和移动 |
| **播放视频** | 点击视频卡片弹出内嵌播放器（仅关闭按钮可退出弹窗） |
| **切换视图** | 在侧边栏底部点击 **"默认"** / **"缤纷"** 切换风格 |
| **切换主题** | 点击侧边栏管理区域的主题切换按钮（亮色/暗色/跟随系统） |
| **新增分类** | 进入管理模式后，点击 **"偏好设置"** → **"+ 新增分类"** |
| **编辑分类** | 在偏好设置中修改分类名称和图标 |
| **隐藏分类** | 在偏好设置中点击分类右侧的眼睛图标 |
| **删除分类** | 在偏好设置中点击分类右侧的删除图标（会同时删除该分类下所有书签） |
| **调整分类顺序** | 在偏好设置中拖拽分类卡片调整顺序 |
| **设置卡片宽度** | 在偏好设置中调整"网格宽度"数值 |
| **自定义背景** | 在偏好设置中填入图片 URL 或纯色（如 `#222`），留空使用 Bing 壁纸 |
| **JSON 编辑** | 点击 **"JSON编辑"** 使用 Monaco Editor 直接编辑原始数据 |
| **导出配置** | 点击 **"导出"** 按钮下载 JSON 备份文件 |
| **导入配置** | 点击 **"导入"** 按钮从 JSON 文件恢复 |
| **恢复默认** | 点击 **"默认"** 按钮恢复初始配置 |
| **退出管理** | 点击 **"登出"** 按钮退出管理模式 |

### 游客视图 vs 管理员视图

- **普通游客**：只能看到未隐藏的分类和书签
- **管理员**：可以看到所有内容，包括隐藏的分类和书签，并进行编辑操作

### 视频导航说明

当分类被标记为**视频分类**时，该分类下的书签会以视频卡片形式展示：

- **Bilibili 视频**：自动显示封面图、Bilibili 标识，支持内嵌播放
- **YouTube 视频**：自动显示封面图、YouTube 标识，支持内嵌播放
- **其他链接**：以普通卡片展示，点击在新窗口打开
- **弹窗播放**：点击视频卡片弹出播放器，**只能通过右上角关闭按钮退出**
- **拖拽排序**：管理员模式下视频卡片可拖拽调整顺序

---

## ⚙️ 进阶配置

### 绑定自定义域名（可选）

1. 在 Cloudflare 控制台进入你的 Pages 项目
2. 点击 **自定义域 (Custom domains)**
3. 输入你已有的域名，按照提示配置 DNS 记录

### 开启 HTTPS

- Cloudflare Pages 默认自动提供 HTTPS
- 如果绑定自定义域名，确保 Cloudflare 自动签发 SSL 证书

### 性能优化

- Cloudflare 会自动缓存静态资源
- 可以在 Cloudflare 控制台配置页面规则优化缓存策略
- 低端设备可开启**简约模式**，关闭毛玻璃效果提升渲染性能

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 🙏 致谢

- [SortableJS](https://github.com/SortableJS/Sortable) - 拖拽排序功能
- [RemixIcon](https://remixicon.com/) - 精美的图标字体
- [Iconify](https://iconify.design/) - 丰富的图标搜索服务
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - 在线代码编辑器
- [Favicon.im](https://favicon.im/) - 智能 favicon 获取
- [Bing](https://www.bing.com/) - 每日高清壁纸

```


## File: server.js

```js
/**
 * server.js - 本地测试服务器
 * 模拟 Cloudflare Pages Functions API
 * 提供 /api/config 端点并托管静态文件
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// ====== 默认数据（来自 defaultData.js） ======
const defaultData = {
  settings: { cardWidth: 90 },
  categories: [
    { id: "A01", name: "社交网站", icon: "💬", hidden: false },
    { id: "B01", name: "直播网站", icon: "💻", hidden: false },
    { id: "F01", name: "视频网站", icon: "🎬", hidden: false, _isVideo: true },
    { id: "C01", name: "新闻门户", icon: "📰", hidden: false },
    { id: "D01", name: "人工智能", icon: "🤖", hidden: false }
  ],
  items: [
    { id: "A001", catId: "A01", title: "知乎", url: "https://www.zhihu.com/", desc: "问答社区", icon: "https://favicon.im/www.zhihu.com", hidden: false },
    { id: "A002", catId: "A01", title: "豆瓣", url: "https://www.douban.com/", desc: "书影音社区", icon: "https://favicon.im/www.douban.com", hidden: false },
    { id: "A003", catId: "A01", title: "百度贴吧", url: "https://tieba.baidu.com/", desc: "兴趣社区", icon: "https://favicon.im/tieba.baidu.com", hidden: false },
    { id: "A004", catId: "A01", title: "新浪微博", url: "https://weibo.com/", desc: "微博客平台", icon: "https://favicon.im/weibo.com", hidden: false },
    { id: "A005", catId: "A01", title: "虎扑社区", url: "https://www.hupu.com/", desc: "体育社区", icon: "https://favicon.im/www.hupu.com", hidden: false },
    { id: "A006", catId: "A01", title: "微信网页版", url: "https://wx.qq.com/", desc: "微信网页版", icon: "https://favicon.im/wx.qq.com", hidden: false },
    { id: "A007", catId: "A01", title: "QQ空间", url: "https://qzone.qq.com/", desc: "QQ社交空间", icon: "https://favicon.im/qzone.qq.com", hidden: false },
    { id: "A008", catId: "A01", title: "煎蛋网", url: "https://jandan.net/", desc: "趣图段子", icon: "https://favicon.im/jandan.net", hidden: false },
    { id: "B001", catId: "B01", title: "腾讯视频", url: "https://v.qq.com/", desc: "视频平台", icon: "https://favicon.im/v.qq.com", hidden: false },
    { id: "B002", catId: "B01", title: "优酷网", url: "https://www.youku.com/", desc: "视频平台", icon: "https://favicon.im/www.youku.com", hidden: false },
    { id: "B003", catId: "B01", title: "芒果TV", url: "https://www.mgtv.com/", desc: "湖南卫视", icon: "https://favicon.im/www.mgtv.com", hidden: false },
    { id: "B004", catId: "B01", title: "搜狐视频", url: "https://tv.sohu.com/", desc: "视频平台", icon: "https://favicon.im/tv.sohu.com", hidden: false },
    { id: "B005", catId: "B01", title: "斗鱼TV", url: "https://www.douyu.com/", desc: "游戏直播", icon: "https://favicon.im/www.douyu.com", hidden: false },
    { id: "B006", catId: "B01", title: "哔哩哔哩", url: "https://www.bilibili.com/", desc: "弹幕视频", icon: "https://favicon.im/www.bilibili.com", hidden: false },
    { id: "B007", catId: "B01", title: "虎牙直播", url: "https://www.huya.com/", desc: "游戏直播", icon: "https://favicon.im/www.huya.com", hidden: false },
    { id: "B008", catId: "B01", title: "爱奇艺", url: "https://www.iqiyi.com/", desc: "视频平台", icon: "https://favicon.im/www.iqiyi.com", hidden: false },
    { id: "B009", catId: "B01", title: "ACfun", url: "https://www.acfun.cn/", desc: "弹幕视频", icon: "https://favicon.im/www.acfun.cn", hidden: false },
    { id: "F001", url: "https://www.youtube.com/watch?v=NZ-0-A_PJHI", title: "三立新闻", desc: "Youtube三立新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F002", url: "https://www.youtube.com/watch?v=0HfK88DB41E", title: "三立新闻", desc: "Youtube三立新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F004", url: "https://www.youtube.com/watch?v=m_dhMSvUCIc", title: "TVBS新闻", desc: "Youtube TVBS新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F005", url: "https://www.youtube.com/watch?v=6IquAgfvYmc", title: "寰宇新闻", desc: "Youtube寰宇新闻", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F003", url: "https://www.youtube.com/watch?v=rqJz_D-6B_o", title: "哏传媒", desc: "Youtube哏传媒", icon: "https://favicon.im/www.youtube.com", bgColor: "", catId: "F01", hidden: false },
    { id: "F006", url: "https://www.bilibili.com/video/BV1Cj9qByEaf", title: "楼下粉猪君", desc: "", icon: "https://favicon.im/live.bilibili.com", bgColor: "", catId: "F01", hidden: false },
    { id: "C001", catId: "C01", title: "新浪新闻", url: "https://news.sina.com.cn/", desc: "综合新闻", icon: "https://favicon.im/news.sina.com.cn", hidden: false },
    { id: "C002", catId: "C01", title: "腾讯新闻", url: "https://news.qq.com/", desc: "综合新闻", icon: "https://favicon.im/news.qq.com", hidden: false },
    { id: "C003", catId: "C01", title: "凤凰军事", url: "https://news.ifeng.com/mil/", desc: "军事新闻", icon: "https://favicon.im/news.ifeng.com", hidden: false },
    { id: "C004", catId: "C01", title: "网易新闻", url: "https://news.163.com/", desc: "综合新闻", icon: "https://favicon.im/news.163.com", hidden: false },
    { id: "C005", catId: "C01", title: "环球网", url: "https://www.huanqiu.com/", desc: "国际新闻", icon: "https://favicon.im/www.huanqiu.com", hidden: false },
    { id: "C006", catId: "C01", title: "参考消息", url: "http://www.cankaoxiaoxi.com/", desc: "参考消息", icon: "https://favicon.im/www.cankaoxiaoxi.com", hidden: false },
    { id: "C007", catId: "C01", title: "博海拾贝", url: "https://www.bohaishibei.com/", desc: "资讯聚合", icon: "https://favicon.im/bohaishibei.com", hidden: false },
    { id: "D001", catId: "D01", title: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI助手", icon: "https://img.icons8.com/ios/100/FFFFFF/chatgpt.png", hidden: false },
    { id: "D002", catId: "D01", title: "Grok", url: "https://grok.com/", desc: "X平台AI", icon: "https://favicon.im/grok.com", hidden: false },
    { id: "D003", catId: "D01", title: "阿里千问", url: "https://chat.qwen.ai/", desc: "阿里AI助手", icon: "https://favicon.im/chat.qwen.ai", hidden: false },
    { id: "D004", catId: "D01", title: "DeepSeek", url: "https://chat.deepseek.com/", desc: "深度求索AI", icon: "https://favicon.im/chat.deepseek.com", hidden: false },
    { id: "D005", catId: "D01", title: "豆包", url: "https://www.doubao.com/chat/", desc: "字节AI助手", icon: "https://favicon.im/www.doubao.com", hidden: false },
    { id: "D006", catId: "D01", title: "Kimi", url: "https://www.kimi.com/", desc: "月之暗面AI", icon: "https://favicon.im/www.kimi.com", hidden: false },
    { id: "D007", catId: "D01", title: "元宝", url: "https://yuanbao.tencent.com/", desc: "腾讯AI助手", icon: "https://favicon.im/yuanbao.tencent.com", hidden: false },
    { id: "D008", catId: "D01", title: "即梦AI", url: "https://jimeng.jianying.com/", desc: "字节AI绘画", icon: "https://favicon.im/jimeng.jianying.com", hidden: false },
    { id: "D009", catId: "D01", title: "Gemini", url: "https://gemini.google.com/", desc: "谷歌AI助手", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg", hidden: false }
  ]
};

// ====== 存储状态（模拟 KV） ======
let storedData = JSON.parse(JSON.stringify(defaultData));
storedData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

// ====== MIME 类型映射 ======
const MIME_TYPES = {
  '.html': 'text/html;charset=UTF-8',
  '.css': 'text/css;charset=UTF-8',
  '.js': 'application/javascript;charset=UTF-8',
  '.json': 'application/json;charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

// ====== HTTP 服务器 ======
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // ====== API 路由 ======
  if (pathname === '/api/config') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET') {
      // 返回数据 + bgUrl + isAdmin
      const bgUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920';
      const auth = req.headers['authorization'] || url.searchParams.get('token') || '';
      // Token: admin 的 SHA-256 哈希 = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
      const isAdmin = auth === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

      let responseData = JSON.parse(JSON.stringify(storedData));
      if (!isAdmin) {
        responseData.categories = responseData.categories.filter(c => !c.hidden);
        responseData.items = responseData.items.filter(i => !i.hidden);
      }
      responseData.bgUrl = bgUrl;
      responseData.isAdmin = isAdmin;

      res.writeHead(200);
      res.end(JSON.stringify(responseData));
      return;
    }

    if (req.method === 'POST') {
      const auth = req.headers['authorization'] || '';
      if (auth !== '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const newData = JSON.parse(body);
          newData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
          storedData = newData;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      const auth = req.headers['authorization'] || '';
      if (auth !== '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
      storedData = JSON.parse(JSON.stringify(defaultData));
      storedData.lastUpdated = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: "已重置为默认配置" }));
      return;
    }

    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // ====== Bilibili 封面代理（解决 CORS） ======
  if (pathname === '/api/bilibili-cover') {
    const bvid = url.searchParams.get('bvid');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method !== 'GET') {
      res.writeHead(405);
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      return;
    }

    if (!bvid || !/^BV[a-zA-Z0-9]+$/.test(bvid)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid bvid parameter' }));
      return;
    }

    // 本地测试：无需缓存
    fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
      }
    })
    .then(biliRes => biliRes.json())
    .then(biliData => {
      const coverUrl = biliData?.data?.pic || null;
      res.writeHead(200);
      res.end(JSON.stringify({ code: biliData.code, bvid, coverUrl }));
    })
    .catch(err => {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    });
    return;
  }

  // ====== 静态文件服务 ======
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 找不到文件时返回 index.html（SPA fallback）
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
        res.end(data2);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  🚀 本地测试服务器已启动`);
  console.log(`  📍 http://localhost:${PORT}`);
  console.log(`  📁 静态文件目录: ${PUBLIC_DIR}`);
  console.log(`  🔑 管理员入口: 密码输入 "admin"`);
  console.log(`========================================\n`);
});

```


## File: functions\api\bilibili-cover.js

```js
/**
 * ==========================================
 * bilibili-cover.js - Bilibili 封面代理 API
 * 路由: /api/bilibili-cover?bvid=BVxxxxxx
 * 解决前端直接请求 Bilibili API 的 CORS 问题
 * 通过 Cloudflare Pages Functions 服务端中转
 * ==========================================
 */

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const bvid = url.searchParams.get('bvid');

  // CORS 头（允许跨域）
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // 仅支持 GET
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }

  // 参数校验
  if (!bvid || !/^BV[a-zA-Z0-9]+$/.test(bvid)) {
    return new Response(JSON.stringify({ error: 'Invalid bvid parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }

  try {
    // 服务端请求 Bilibili API（无 CORS 限制）
    const biliRes = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
      },
      cf: { cacheTtl: 86400 }, // 缓存 24 小时
    });

    if (!biliRes.ok) {
      return new Response(JSON.stringify({ error: 'Bilibili API error', status: biliRes.status }), {
        status: biliRes.status,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
      });
    }

    const biliData = await biliRes.json();

    // 提取封面 URL 返回
    const coverUrl = biliData?.data?.pic || null;

    return new Response(JSON.stringify({
      code: biliData.code,
      bvid,
      coverUrl,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', ...corsHeaders },
    });
  }
}

```


## File: functions\api\config.js

```js
/**
 * ==========================================
 * config.js - 后端 Serverless API 处理
 * 路由: /api/config
 * 基于 Cloudflare Pages Functions + Workers KV
 * ==========================================
 */

import { defaultData } from './defaultData.js';

const CONFIG = {
  bingApi: "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
};

function formatCNTime(date) {
  const d = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

const getFreshDefaultData = () => ({
  ...defaultData,
  lastUpdated: formatCNTime(new Date())
});

// ====== 新增：后端 SHA-256 哈希计算函数 ======
async function sha256(text) {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.nav) {
    return new Response(JSON.stringify({
      error: "KV_BINDING_MISSING",
      message: "后端错误：未检测到名为 'nav' 的 KV 数据库绑定。"
    }), { status: 500, headers: { "Content-Type": "application/json;charset=UTF-8" } });
  }

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-store"
  };

  try {
    // ==========================================
    // 核心安全优化：动态识别明文与哈希
    // ==========================================
    let expectedToken = env.TOKEN || "";
    // SHA-256 哈希值的固定长度是 64。
    // 如果长度不是 64，说明你在 Cloudflare 后台填的是“明文密码”。
    // 我们就在后端内部安全地将其转为哈希值，用来与前端发来的哈希值比对。
    if (expectedToken.length !== 64) {
      expectedToken = await sha256(expectedToken);
    }

    // 1. 处理恢复默认配置 (DELETE)
    if (request.method === "DELETE") {
      const auth = request.headers.get("Authorization");
      if (auth !== expectedToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
      }
      const resetData = getFreshDefaultData();
      await env.nav.put("config", JSON.stringify(resetData));
      return new Response(JSON.stringify({ success: true, message: "已重置为默认配置" }), { headers });
    }

    // 2. 处理保存数据 (POST)
    if (request.method === "POST") {
      const auth = request.headers.get("Authorization");
      if (auth !== expectedToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers });
      }
      const newData = await request.json();
      newData.lastUpdated = formatCNTime(new Date());
      await env.nav.put("config", JSON.stringify(newData));
      return new Response(JSON.stringify({ success: true }), { headers });
    }

    // 3. 处理获取数据 (GET)
    if (request.method === "GET") {
      let dataStr = await env.nav.get("config");
      let dataObj = JSON.parse(dataStr || JSON.stringify(getFreshDefaultData()));

      const url = new URL(request.url);
      const auth = request.headers.get("Authorization") || url.searchParams.get("token");
      // 使用转换后的哈希值进行验证
      const isAdmin = (auth === expectedToken);

      if (!isAdmin) {
        dataObj.categories = dataObj.categories.filter(c => !c.hidden);
        dataObj.items = dataObj.items.filter(i => !i.hidden);
      }

      let bgUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920"; 

      try {
        const cachedBingStr = await env.nav.get("bing_cache");
        const now = Date.now();
        let useCache = false;

        if (cachedBingStr) {
          const cachedBing = JSON.parse(cachedBingStr);
          if (cachedBing.url && cachedBing.expiresAt > now) {
            bgUrl = cachedBing.url;
            useCache = true;
          }
        }

        if (!useCache) {
          const bingRes = await fetch(CONFIG.bingApi, { cf: { cacheTtl: 3600 } });
          if (bingRes.ok) {
            const bingData = await bingRes.json();
            bgUrl = "https://www.bing.com" + bingData.images[0].url;
            await env.nav.put("bing_cache", JSON.stringify({
              url: bgUrl,
              expiresAt: now + 43200000
            }));
          }
        }
      } catch (e) {
        console.log("Bing 壁纸获取或缓存写入失败", e);
      }

      return new Response(JSON.stringify({ ...dataObj, bgUrl, isAdmin }), { headers });
    }

    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers });

  } catch (err) {
    return new Response(JSON.stringify({ error: "SERVER_ERROR", message: err.toString() }), { status: 500, headers });
  }
}
```


## File: functions\api\defaultData.js

```js
/**
 * ==========================================
 * defaultData.js - 默认初始化数据
 * 包含分类和网站条目的默认配置
 * ==========================================
 */

export const defaultData = {
  settings: { },
  categories: [
    { id: "D01", name: "人工智能", icon: "🤖", hidden: false }
  ],
  items: [
    { id: "D001", catId: "D01", title: "ChatGPT", url: "https://chat.openai.com/", desc: "OpenAI助手", icon: "https://img.icons8.com/ios/100/FFFFFF/chatgpt.png", hidden: false },
    { id: "D002", catId: "D01", title: "Grok", url: "https://grok.com/", desc: "X平台AI", icon: "https://favicon.im/grok.com", hidden: false },
    { id: "D003", catId: "D01", title: "阿里千问", url: "https://chat.qwen.ai/", desc: "阿里AI助手", icon: "https://favicon.im/chat.qwen.ai", hidden: false },
    { id: "D004", catId: "D01", title: "DeepSeek", url: "https://chat.deepseek.com/", desc: "深度求索AI", icon: "https://favicon.im/chat.deepseek.com", hidden: false },
    { id: "D005", catId: "D01", title: "豆包", url: "https://www.doubao.com/chat/", desc: "字节AI助手", icon: "https://favicon.im/www.doubao.com", hidden: false },
    { id: "D006", catId: "D01", title: "Kimi", url: "https://www.kimi.com/", desc: "月之暗面AI", icon: "https://favicon.im/www.kimi.com", hidden: false },
    { id: "D007", catId: "D01", title: "元宝", url: "https://yuanbao.tencent.com/", desc: "腾讯AI助手", icon: "https://favicon.im/yuanbao.tencent.com", hidden: false },
    { id: "D008", catId: "D01", title: "即梦AI", url: "https://jimeng.jianying.com/", desc: "字节AI绘画", icon: "https://favicon.im/jimeng.jianying.com", hidden: false },
    { id: "D009", catId: "D01", title: "Gemini", url: "https://gemini.google.com/", desc: "谷歌AI助手", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg", hidden: false }
  ]
};

```


## File: public\index.html

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人网站导航</title>
    
    <!-- DNS 预解析与预连接 -->
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    
    <!-- RemixIcon 图标字体（异步加载，不阻塞 load 事件）
         先用 media="print" 让浏览器异步下载，下载完成后切换为 screen -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"></noscript>
    
    <!-- Favicon（内联 SVG，零网络请求） -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>">
    <link rel="shortcut icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>">
    
    <!-- PWA 配置 -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#111111">
    <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>">
    
    <!-- 拖拽排序库 -->
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js" defer></script>
    
    <!-- 样式文件 -->
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <!-- Toast 提示 -->
    <div id="toast">操作成功</div>
    
    <!-- 全局加载遮罩 -->
    <div id="global-loading-overlay" class="modal" style="z-index: 9999;">
        <div class="global-spinner"></div>
        <div id="global-loading-text" style="color: #fff; font-size: 15px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">正在处理中...</div>
    </div>

    <!-- 移动端汉堡菜单按钮 -->
    <button id="sidebar-toggle" class="sidebar-toggle" aria-label="打开导航菜单">
        <i class="ri-menu-line"></i>
    </button>
    <!-- 移动端遮罩 -->
    <div id="sidebar-overlay" class="sidebar-overlay"></div>

    <div class="app-layout">
        <!-- 左侧导航栏 -->
        <aside id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <span class="sidebar-logo" id="sidebar-logo">🌐</span>
                <span class="sidebar-title" id="sidebar-title">个人导航</span>
            </div>
            <nav id="sidebar-nav" class="sidebar-nav"></nav>
            <div id="sidebar-footer" class="sidebar-footer">
                <div id="sidebar-admin-actions" class="sidebar-admin-section"></div>
                <div class="sidebar-style-switcher">
                    <button class="sidebar-style-btn active" data-style="0" title="经典图标样式">
                        <i class="ri-grid-fill"></i><span>默认</span>
                    </button>
                    <button class="sidebar-style-btn" data-style="2" title="缤纷模式">
                        <i class="ri-palette-fill"></i><span>缤纷</span>
                    </button>
                </div>
            </div>
        </aside>

        <!-- 主内容区域 -->
        <main class="main-content">
            <!-- 骨架屏（加载占位） -->
            <div id="skeleton-screen">
                <div class="skel-tabs">
                    <div class="skel-tab skel-anim"></div>
                    <div class="skel-tab skel-anim"></div>
                    <div class="skel-tab skel-anim"></div>
                </div>
                <div class="skel-grid">
                    <div class="skel-card skel-anim"></div>
                    <div class="skel-card skel-anim"></div>
                    <div class="skel-card skel-anim"></div>
                    <div class="skel-card skel-anim"></div>
                    <div class="skel-card skel-anim"></div>
                    <div class="skel-card skel-anim"></div>
                </div>
            </div>

            <!-- 导航内容 -->
            <div id="main-content" style="display: none;">
                <div id="grid-container" class="grid-container"></div>
            </div>
        </main>
    </div>
    
    <!-- 页脚缓存信息 -->
    <div id="footer-cache" class="footer-info"></div>
    
    <!-- 隐藏的文件输入框（用于导入配置） -->
    <input type="file" id="import-file" accept=".json" style="display:none">

    <!-- 登录验证弹窗 -->
    <div id="auth-overlay" class="modal">
        <div class="modal-content" style="text-align:center">
            <button id="btn-close-auth" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#777; cursor:pointer; font-size:24px">×</button>
            <h3>管理验证</h3>
            <input type="password" id="auth-input" placeholder="请输入Token" autocomplete="new-password" style="text-align:center; margin: 20px 0">
            <button id="btn-login" class="tab-btn active" style="width:100%">进入后台</button>
        </div>
    </div>

    <!-- 编辑弹窗 -->
    <div id="edit-modal" class="modal">
        <div class="modal-content">
            <button id="btn-close-edit" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#777; cursor:pointer; font-size:24px">×</button>
            <h4 id="edit-title" style="margin-bottom:20px; font-size:16px">编辑详情</h4>
            <div id="edit-form-body"></div>
            <button id="btn-confirm-edit" class="tab-btn active" style="width:100%; margin-top:10px">确认保存修改</button>
        </div>
    </div>

    <!-- 视频播放弹窗 -->
    <div id="video-modal" class="modal">
        <div class="video-modal-content">
            <button id="btn-close-video" class="video-close-btn"><i class="ri-close-line"></i></button>
            <div class="video-player-wrapper">
                <iframe id="video-iframe" src="" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" frameborder="0"></iframe>
            </div>
            <div class="video-info">
                <h3 id="video-title"></h3>
                <p id="video-desc"></p>
                <a id="video-link" href="#" target="_blank" class="video-ext-link">
                    <i class="ri-external-link-line"></i> 在原平台打开
                </a>
            </div>
        </div>
    </div>

    <!-- Monaco Editor 弹窗 -->
    <div id="monaco-modal" class="modal">
        <div class="monaco-modal-content">
            <div class="monaco-header">
                <h4><i class="ri-code-s-slash-line"></i> JSON 数据编辑器</h4>
                <div class="monaco-actions">
                    <button id="btn-monaco-format" class="monaco-action-btn" title="格式化"><i class="ri-align-left"></i> 格式化</button>
                    <button id="btn-monaco-save" class="monaco-action-btn primary" title="保存"><i class="ri-save-line"></i> 保存</button>
                    <button id="btn-close-monaco" class="monaco-action-btn close" title="关闭"><i class="ri-close-line"></i></button>
                </div>
            </div>
            <div id="monaco-container" class="monaco-container"></div>
        </div>
    </div>

    <!-- JavaScript 文件 -->
    <script src="/assets/js/utils.js"></script>
    <script src="/assets/js/colorExtractor.js"></script>
    <script src="/assets/js/app.js"></script>
</body>
</html>

```


## File: public\manifest.json

```json
{
  "name": "个人导航",
  "short_name": "Nav",
  "description": "极简高效的个人导航页",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#111111",
  "theme_color": "#399dff",
  "icons": [
    {
      "src": "https://icons.duckduckgo.com/ip3/github.com.ico",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://icons.duckduckgo.com/ip3/github.com.ico",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

```


## File: public\ServiceWorker.js

```js
/**
 * ==========================================
 * ServiceWorker.js - PWA 核心脚本
 * 实现 Stale-While-Revalidate 缓存策略
 * ==========================================
 */

// 缓存版本号（更新时需修改）
const CACHE_NAME = 'nav-cache-v7';

// 需要缓存的核心静态资源
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/utils.js',
  '/assets/js/colorExtractor.js',
  '/assets/js/app.js',
  'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

/**
 * 安装事件
 * @description 缓存核心静态资源，跳过等待直接激活
 *               单个资源失败不影响其他资源的缓存
 */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 逐个缓存，单个失败不影响整体（比 cache.addAll 更健壮）
      return Promise.allSettled(
        URLS_TO_CACHE.map(url =>
          cache.add(url).catch(err => console.warn('SW 缓存失败:', url, err.message))
        )
      );
    })
  );
});

/**
 * 激活事件
 * @description 清理旧版本缓存，确保只保留当前版本
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/**
 * 请求拦截事件
 */
self.addEventListener('fetch', event => {
  // API 请求不走 SW 缓存
  if (event.request.url.includes('/api/')) return;

  // 1. 对于 HTML 页面请求，优先使用缓存，后台更新（Stale-While-Revalidate）
  //    避免每次导航都等待网络，提升首屏加载速度
  const acceptHeader = event.request.headers.get('accept') || '';
  if (event.request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
          }
          return networkResponse;
        }).catch(() => {});
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 2. 其他静态资源 (CSS/JS/图片) 保持 Stale-While-Revalidate (缓存优先并后台更新)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse.ok) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => {});
      return cachedResponse || fetchPromise;
    })
  );
});
```


## File: public\assets\css\style.css

```css
/**
 * ==========================================
 * style.css - 核心样式文件（升级版 v5）
 * 左侧导航 + 连续滚动 + 视频导航 + Monaco Editor
 * Style 0: 经典图标网格
 * Style 2: 缤纷模式（列表详情 + 用户自定义背景色）
 * ==========================================
 */

/* ==================== CSS 变量定义 ==================== */
:root {
    /* 毛玻璃效果颜色 */
    --glass: rgba(255, 255, 255, 0.15);
    --glass-hover: rgba(255, 255, 255, 0.3);
    --glass-border: rgba(255, 255, 255, 0.1);

    /* 文字颜色 */
    --text: #ffffff;
    --text-dim: rgba(255, 255, 255, 0.85);

    /* 主题色 */
    --primary: #399dff;

    /* 圆角与尺寸 */
    --radius: 15px;
    --card-w: 85px;
    --card-h: 85px;
    --card-h-default: 85px;
    --card-h-colorful: 85px;

    /* 背景遮罩透明度 */
    --bg-overlay-opacity: 0.4;

    /* 网站卡片图标尺寸（按样式独立） */
    --icon-size-default: 32px;
    --icon-size-colorful: 32px;
    --emoji-size-default: 32px;
    --emoji-size-colorful: 32px;

    /* 侧边栏尺寸 */
    --sidebar-width: 250px;
    --sidebar-collapsed-width: 60px;
}

/* ==================== 亮色模式 ==================== */
body.light-theme {
    --glass: rgba(255, 255, 255, 0.55);
    --glass-hover: rgba(255, 255, 255, 0.75);
    --glass-border: rgba(0, 0, 0, 0.07);
    --text: #2c3e50;
    --text-dim: rgba(44, 62, 80, 0.7);
    --bg-overlay-opacity: 0.25;
}

body.light-theme {
    background-color: #eef1f5;
}

body.light-theme::before {
    background: rgba(240, 243, 248, var(--bg-overlay-opacity));
}

body.light-theme .sidebar {
    background: rgba(255, 255, 255, 0.72);
    border-color: rgba(0, 0, 0, 0.06);
}

body.light-theme .sidebar-nav-item {
    color: #5a6a7a;
}

body.light-theme .sidebar-nav-item.active {
    background: var(--primary);
    color: white;
}

body.light-theme .sidebar-nav-item:hover:not(.active) {
    background: rgba(0, 0, 0, 0.05);
}

body.light-theme .tab-btn {
    color: #3d4f5f;
    border-color: rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, 0.5);
}

body.light-theme .tab-btn.active {
    background: var(--primary);
    color: white;
}

body.light-theme .card {
    background: rgba(255, 255, 255, 0.55);
}

body.light-theme .card:hover {
    background: rgba(255, 255, 255, 0.8);
}

body.light-theme .card h3 {
    color: #3d4f5f;
}

body.light-theme .modal-content {
    background: rgba(255, 255, 255, 0.92);
    border-color: rgba(0, 0, 0, 0.08);
}

body.light-theme .modal-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
}

body.light-theme input,
body.light-theme select {
    background: rgba(255, 255, 255, 0.7);
    border-color: rgba(0, 0, 0, 0.1);
    color: #3d4f5f;
}

body.light-theme .admin-actions {
    background: rgba(255, 255, 255, 0.85);
}

body.light-theme .batch-actions-bar {
    background: rgba(255, 255, 255, 0.92);
    border-color: rgba(0, 0, 0, 0.08);
}

body.light-theme .batch-btn.delete {
    background: rgba(231, 76, 60, 0.85);
}

body.light-theme .batch-btn.move {
    background: rgba(57, 157, 255, 0.85);
}

body.light-theme .sidebar-header {
    border-color: rgba(0, 0, 0, 0.06);
}

body.light-theme .sidebar-footer {
    border-color: rgba(0, 0, 0, 0.06);
}

body.light-theme .category-section-title {
    color: #3d4f5f;
}

body.light-theme .sidebar-toggle {
    background: rgba(255, 255, 255, 0.8);
    color: #3d4f5f;
}

body.light-theme .video-card {
    background: rgba(255, 255, 255, 0.6);
    border-color: rgba(0, 0, 0, 0.06);
}

body.light-theme .video-card .video-card-title {
    color: #3d4f5f;
}

body.light-theme .video-card .video-card-desc {
    color: #8a9aaa;
}

body.light-theme .video-modal-content {
    background: rgba(245, 247, 250, 0.98);
}

body.light-theme .video-info h3 {
    color: #3d4f5f;
}

body.light-theme .video-info p {
    color: #8a9aaa;
}

body.light-theme .monaco-modal-content {
    background: rgba(245, 247, 250, 0.98);
}

body.light-theme .monaco-header {
    border-color: rgba(0, 0, 0, 0.08);
}

body.light-theme .monaco-header h4 {
    color: #3d4f5f;
}

/* ==================== 简约模式 ==================== */
body.no-blur::before {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: rgba(0, 0, 0, var(--bg-overlay-opacity));
}

body.no-blur.light-theme::before {
    background: rgba(255, 255, 255, var(--bg-overlay-opacity));
}

body.no-blur .sidebar {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}

body.no-blur .modal {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}

body.no-blur .card.has-bg,
body.no-blur body.view-style-2 .card.has-bg {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
}

/* 移动端减少阴影 */
@media (max-width: 768px) {
    .card:not([data-color-ready]):hover {
        box-shadow: none;
    }

    body.view-style-2 .card.has-bg:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
}

/* ==================== 全局重置 ==================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

/* ==================== 页面主体样式 ==================== */
body {
    background-color: #111;
    background-repeat: no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
    color: var(--text);
    overflow-x: hidden;
    transition: background-image 0.8s ease-in-out;
}

body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    z-index: -1;
}

/* ==================== 应用布局（左侧边栏 + 主内容） ==================== */
.app-layout {
    display: flex;
    min-height: 100vh;
}

/* ==================== 左侧导航栏 ==================== */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--sidebar-width);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-right: 1px solid var(--glass-border);
    display: flex;
    flex-direction: column;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.sidebar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px 16px 16px;
    border-bottom: 1px solid var(--glass-border);
    flex-shrink: 0;
}

.sidebar-logo {
    font-size: 24px;
    flex-shrink: 0;
}

.sidebar-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 10px 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.15) transparent;
}

.sidebar-nav::-webkit-scrollbar {
    width: 4px;
}

.sidebar-nav::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 4px;
}

.sidebar-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid transparent;
    margin-bottom: 3px;
    user-select: none;
}

.sidebar-nav-item .nav-icon {
    font-size: 18px;
    flex-shrink: 0;
    width: 22px;
    text-align: center;
}

.sidebar-nav-item .nav-label {
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar-nav-item .nav-count {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    min-width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.12);
    color: var(--text-dim);
    padding: 0 5px;
    flex-shrink: 0;
}

.sidebar-nav-item.active .nav-count {
    background: rgba(255, 255, 255, 0.25);
    color: white;
}

body.light-theme .sidebar-nav-item .nav-count {
    background: rgba(0, 0, 0, 0.07);
    color: #888;
}

body.light-theme .sidebar-nav-item.active .nav-count {
    background: rgba(255, 255, 255, 0.35);
    color: white;
}

.sidebar-nav-item:hover:not(.active) {
    background: rgba(255, 255, 255, 0.08);
}

.sidebar-nav-item.active {
    background: var(--primary);
    color: white;
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 12px rgba(57, 157, 255, 0.35);
}

.sidebar-nav-item.hidden-item {
    opacity: 0.4;
    text-decoration: line-through;
}

.sidebar-footer {
    padding: 10px 8px;
    border-top: 1px solid var(--glass-border);
    flex-shrink: 0;
}

.sidebar-footer .manage-cat-btn {
    width: 100%;
    text-align: left;
    padding: 8px 14px;
    font-size: 13px;
}

/* 移动端侧边栏切换按钮 */
.sidebar-toggle {
    display: none;
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 150;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    color: white;
    font-size: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.sidebar-toggle:hover {
    background: var(--primary);
}

.sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.sidebar-overlay.visible {
    display: block;
}

/* ==================== 主内容区域 ==================== */
.main-content {
    margin-left: var(--sidebar-width);
    flex: 1;
    min-height: 100vh;
    padding: 20px 20px 80px;
}

.grid-container {
    max-width: 62rem;
    margin: 0 auto;
}

/* ==================== 分类区块（连续滚动） ==================== */
.category-section {
    margin-bottom: 16px;
    scroll-margin-top: 10px;
}

.category-section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
    padding: 8px 4px 10px;
    margin-bottom: 12px;
}

.category-section-title .cat-icon {
    font-size: 20px;
}

/* ==================== 分类按钮样式（保留用于管理弹窗内） ==================== */
.tab-btn {
    white-space: nowrap;
    padding: 8px 22px;
    border-radius: 25px;
    border: 1px solid var(--glass-border);
    background: var(--glass);
    color: var(--text);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: bold;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.tab-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    transform: scale(1.05);
}

.tab-btn.hidden-item {
    opacity: 0.4;
    text-decoration: line-through;
}

/* ==================== 分类管理按钮 ==================== */
.manage-cat-btn {
    background: transparent;
    border: 1px dashed var(--glass-border);
    color: var(--text-dim);
    padding: 8px 16px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 15px;
    white-space: nowrap;
}

/* ==================== 导航网格布局（Style 0 默认） ==================== */
.nav-grid {
    display: grid;
    gap: 15px;
    margin: 0 auto;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
    animation: fadeInUp 0.4s ease-out;
}

@media (max-width: 1200px) {
    .nav-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}

@media (max-width: 900px) {
    .nav-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 600px) {
    .nav-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 淡入上浮动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(15px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ==================== 卡片样式（Style 0 默认） ==================== */
.card {
    --icon-color: #3b82f6;
    --icon-color-rgb: 59, 130, 246;
    background: var(--glass);
    border: 1px solid transparent;
    border-radius: var(--radius);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    cursor: pointer;
    min-height: var(--card-h-default, 85px);
    height: var(--card-h-default, 85px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.card:hover {
    background: var(--glass-hover);
    transform: translateY(-2px);
    z-index: 100;
}

/* ==================== 卡片悬停彩色光晕效果 ==================== */

/* 模糊图标背景 — 扩散光（参考 favorite-main icon-bg） */
.card .card-glow-bg {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
    display: grid;
    place-items: center;
}

.card .card-glow-bg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: blur(25px) saturate(4) brightness(1.4) contrast(1.5);
    scale: 2.8;
    opacity: 0.2;
    transition: opacity 0.35s ease-out;
    will-change: transform, filter;
    translate: calc(var(--pointer-x, -10) * 40%) calc(var(--pointer-y, -10) * 40%);
}

.card .card-glow-bg .glow-emoji {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    scale: 2.8;
    filter: blur(25px) saturate(4) brightness(1.4) contrast(1.5);
    color: var(--icon-color, #3b82f6);
    opacity: 0.2;
    transition: opacity 0.35s ease-out;
    will-change: transform, filter;
    translate: calc(var(--pointer-x, -10) * 40%) calc(var(--pointer-y, -10) * 40%);
}

/* 非悬停时保留微光但明显可见 */
.card:not(:hover) .card-glow-bg img,
.card:not(:hover) .card-glow-bg .glow-emoji {
    opacity: calc(0.2 * 0.3);
    transition: opacity 0.4s ease-out;
}

/* 悬停时大幅增强扩散光 */
.card[data-color-ready]:hover .card-glow-bg img,
.card[data-color-ready]:hover .card-glow-bg .glow-emoji {
    opacity: 0.3;
}

/* 亮色模式下光晕更柔和但明显可见 */
body.light-theme .card .card-glow-bg img,
body.light-theme .card .card-glow-bg .glow-emoji {
    filter: blur(20px) saturate(3) brightness(1.2) contrast(1.3);
    opacity: 0.15;
}

body.light-theme .card:not(:hover) .card-glow-bg img,
body.light-theme .card:not(:hover) .card-glow-bg .glow-emoji {
    opacity: calc(0.15 * 0.3);
}

body.light-theme .card[data-color-ready]:hover .card-glow-bg img,
body.light-theme .card[data-color-ready]:hover .card-glow-bg .glow-emoji {
    opacity: 0.2;
}

/* 暗色模式下光晕稍强（默认值即暗色，此处作为保障） */
.dark-theme .card .card-glow-bg img,
.dark-theme .card .card-glow-bg .glow-emoji {
    filter: blur(25px) saturate(4) brightness(1.4) contrast(1.5);
    opacity: 0.2;
}

.dark-theme .card:not(:hover) .card-glow-bg img,
.dark-theme .card:not(:hover) .card-glow-bg .glow-emoji {
    opacity: calc(0.2 * 0.3);
}

.dark-theme .card[data-color-ready]:hover .card-glow-bg img,
.dark-theme .card[data-color-ready]:hover .card-glow-bg .glow-emoji {
    opacity: 0.3;
}

/* 悬停边框 + 阴影 — 轮廓光 */
.card[data-color-ready]:hover {
    border-color: rgba(var(--icon-color-rgb), 0.6) !important;
    box-shadow:
        0 0 0 1.5px rgba(var(--icon-color-rgb), 0.4),
        0 0 20px -4px rgba(var(--icon-color-rgb), 0.3),
        0 12px 35px -6px rgba(var(--icon-color-rgb), 0.15);
}

/* 亮色模式下阴影较浅 */
body.light-theme .card[data-color-ready]:hover {
    border-color: rgba(var(--icon-color-rgb), 0.5) !important;
    box-shadow:
        0 0 0 1.5px rgba(var(--icon-color-rgb), 0.3),
        0 0 16px -4px rgba(var(--icon-color-rgb), 0.2),
        0 10px 25px -6px rgba(var(--icon-color-rgb), 0.1);
}

/* 暗色模式下稍强 */
.dark-theme .card[data-color-ready]:hover {
    border-color: rgba(var(--icon-color-rgb), 0.6) !important;
    box-shadow:
        0 0 0 1.5px rgba(var(--icon-color-rgb), 0.4),
        0 0 24px -4px rgba(var(--icon-color-rgb), 0.3),
        0 12px 30px -6px rgba(var(--icon-color-rgb), 0.15);
}

/* 无颜色数据时的回退蓝色光晕 */
.card:not([data-color-ready]):hover {
    border-color: rgba(59, 130, 246, 0.5) !important;
    box-shadow:
        0 0 0 1.5px rgba(59, 130, 246, 0.3),
        0 0 18px -4px rgba(59, 130, 246, 0.2),
        0 10px 25px -5px rgba(59, 130, 246, 0.15);
}

/* 鼠标跟随径向渐变 — 聚光效果 */
.card .card-glow-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.35s ease-out;
    background: radial-gradient(
        800px circle
        at calc(var(--pointer-x, 0.5) * 100%) calc(var(--pointer-y, 0.5) * 100%),
        rgba(var(--icon-color-rgb), 0.15) 0%,
        rgba(var(--icon-color-rgb), 0.06) 20%,
        transparent 40%
    );
}

.card[data-color-ready]:hover .card-glow-bg::after {
    opacity: 1;
}

/* 暗色模式下聚光稍强 */
.dark-theme .card .card-glow-bg::after {
    background: radial-gradient(
        800px circle
        at calc(var(--pointer-x, 0.5) * 100%) calc(var(--pointer-y, 0.5) * 100%),
        rgba(var(--icon-color-rgb), 0.15) 0%,
        rgba(var(--icon-color-rgb), 0.06) 20%,
        transparent 40%
    );
}

body.light-theme .card .card-glow-bg::after {
    background: radial-gradient(
        800px circle
        at calc(var(--pointer-x, 0.5) * 100%) calc(var(--pointer-y, 0.5) * 100%),
        rgba(var(--icon-color-rgb), 0.1) 0%,
        rgba(var(--icon-color-rgb), 0.04) 20%,
        transparent 40%
    );
}

/* 缤纷模式下的光晕适配 */
body.view-style-2 .card[data-color-ready]:hover {
    border-color: rgba(var(--icon-color-rgb), 0.55) !important;
    box-shadow:
        0 0 0 1.5px rgba(var(--icon-color-rgb), 0.35),
        0 0 18px -4px rgba(var(--icon-color-rgb), 0.25),
        0 12px 30px -6px rgba(var(--icon-color-rgb), 0.2);
}

body.view-style-2 .card.has-bg[data-color-ready]:hover {
    border-color: rgba(var(--icon-color-rgb), 0.5) !important;
    box-shadow:
        0 0 0 1.5px rgba(var(--icon-color-rgb), 0.3),
        0 0 16px -4px rgba(var(--icon-color-rgb), 0.2),
        0 10px 24px -5px rgba(var(--icon-color-rgb), 0.15);
}

/* 卡片内容层确保在光晕之上 */
.card > a {
    position: relative;
    z-index: 2;
}

.card .admin-actions {
    z-index: 3;
}

/* 尊重用户动画偏好 */
@media (prefers-reduced-motion: reduce) {
    .card .card-glow-bg img,
    .card .card-glow-bg .glow-emoji {
        will-change: auto;
        transition: none;
    }
    .card:hover .icon-wrapper {
        transform: none;
    }
    .icon-wrapper {
        transition: none;
    }
    .card[data-color-ready]:hover {
        transition: none;
    }
}

/* 移动端光晕适当减弱 */
@media (max-width: 768px) {
    .card .card-glow-bg img,
    .card .card-glow-bg .glow-emoji {
        scale: 2.4;
        filter: blur(15px) saturate(2) brightness(1.1);
        opacity: 0.12;
    }
    .card:not(:hover) .card-glow-bg img,
    .card:not(:hover) .card-glow-bg .glow-emoji {
        opacity: calc(0.12 * 0.3);
    }
    .card[data-color-ready]:hover .card-glow-bg img,
    .card[data-color-ready]:hover .card-glow-bg .glow-emoji {
        opacity: 0.2;
    }
    .card[data-color-ready]:hover {
        border-color: rgba(var(--icon-color-rgb), 0.45) !important;
        box-shadow:
            0 0 0 1.5px rgba(var(--icon-color-rgb), 0.3),
            0 0 12px -4px rgba(var(--icon-color-rgb), 0.2),
            0 6px 16px -4px rgba(var(--icon-color-rgb), 0.12);
    }
}

.card.sortable-ghost {
    opacity: 0.4;
    background: var(--primary);
}

.card.hidden-item {
    opacity: 0.3;
    filter: grayscale(1);
}

.card a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow: hidden;
    gap: 6px;
}

/* ==================== 卡片提示框 ==================== */
.card[data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: rgba(25, 25, 25, 0.95);
    backdrop-filter: blur(8px);
    color: #eee;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    white-space: pre-wrap;
    z-index: 1000;
    border: 1px solid var(--glass-border);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    pointer-events: none;
    width: max-content;
    max-width: 200px;
    text-align: center;
    line-height: 1.5;
}

.card[data-tooltip]::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 2px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    border: 6px solid transparent;
    border-top-color: rgba(25, 25, 25, 0.95);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    z-index: 1000;
    pointer-events: none;
}

.card[data-tooltip]:hover::after,
.card[data-tooltip]:hover::before {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* 悬停时确保 tooltip 不被父容器裁剪 */
.card[data-tooltip]:hover {
    overflow: visible;
}

/* ==================== 卡片图标与标题（Style 0） ==================== */
.icon-wrapper {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px auto 6px auto;
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .icon-wrapper {
    transform: scale(1.05);
}

.card img {
    width: var(--icon-size-default, 32px);
    height: var(--icon-size-default, 32px);
    border-radius: 4px;
    object-fit: contain;
}

.card .emoji-icon {
    font-size: var(--emoji-size-default, 32px);
}

.card h3 {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
    color: #fff;
    line-height: 1.2;
    min-height: 1.5em;
}

/* ==================== 管理操作按钮 ==================== */
.admin-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    gap: 3px;
    z-index: 20;
    opacity: 1;
}

.action-mini {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: 22px;
    height: 22px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ==================== 侧边栏样式切换器 ==================== */
.sidebar-style-switcher {
    display: flex;
    gap: 2px;
    padding: 3px;
    margin-top: 4px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 25px;
    border: 1px solid var(--glass-border);
}

.sidebar-style-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 5px 10px;
    border-radius: 25px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.sidebar-style-btn i {
    font-size: 13px;
}

.sidebar-style-btn:hover:not(.active) {
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
}

.sidebar-style-btn.active {
    background: var(--primary);
    color: white;
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 8px rgba(57, 157, 255, 0.3);
}

.sidebar-admin-section {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

/* 亮色模式 - 侧边栏样式切换器 */
body.light-theme .sidebar-style-switcher {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.08);
}

body.light-theme .sidebar-style-btn {
    color: #666;
}

body.light-theme .sidebar-style-btn:hover:not(.active) {
    background: rgba(0, 0, 0, 0.06);
    color: #333;
}

body.light-theme .sidebar-style-btn.active {
    background: var(--primary);
    color: white;
}

/* ==================== 模态框 ==================== */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    z-index: 2000;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: rgba(30, 30, 30, 0.95);
    width: 90%;
    max-width: 450px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    backdrop-filter: blur(15px);
    max-height: 85vh;
    overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
    width: 4px;
}

.modal-content::-webkit-scrollbar-track {
    background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
}

/* ==================== 表单元素 ==================== */
.form-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
}

.form-row label {
    width: 70px;
    text-align: left;
    font-size: 13px;
    color: #ccc;
    flex-shrink: 0;
    font-weight: bold;
}

input,
select {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    outline: none;
    font-size: 14px;
    width: 100%;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

/* ==================== 复选框和单选框 ==================== */
input[type="checkbox"],
input[type="radio"] {
    margin: 0;
    padding: 10px;
    flex-shrink: 0;
    width: auto !important;
    min-width: 18px;
    max-width: 18px;
    height: 18px;
}

/* ==================== 图标预览容器 ==================== */
.preview-container {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
    border-radius: 8px;
    margin-left: 8px;
}

.preview-container img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

/* ==================== Toast 提示 ==================== */
#toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(50px);
    background: #27ae60;
    color: white;
    padding: 12px 30px;
    border-radius: 30px;
    border: 1px solid var(--glass-border);
    z-index: 3000;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    pointer-events: none;
}

#toast.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

/* ==================== 加载动画 ==================== */
.global-spinner {
    width: 45px;
    height: 45px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top: 4px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

#global-loading-overlay {
    display: none;
    flex-direction: column;
}

/* ==================== 骨架屏 ==================== */
#skeleton-screen {
    display: none;
    width: 100%;
    max-width: 62rem;
    margin: 0 auto;
    padding-top: 10px;
}

.skel-tabs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    width: 120px;
}

.skel-tab {
    width: 100%;
    height: 35px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
}

.skel-grid {
    display: grid;
    gap: 15px;
    margin: 0 auto;
    width: 100%;
    grid-template-columns: repeat(6, 1fr);
}

.skel-card {
    height: var(--card-h, 85px);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
}

.skel-anim::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}

/* ==================== 页脚信息 ==================== */
.footer-info {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 11px;
    pointer-events: none;
    z-index: 50;
}

/* ==================== 拖拽排序相关 ==================== */
.card.sortable-ghost {
    opacity: 0.4;
    background: var(--primary);
}

.card.sortable-drag {
    opacity: 0.9;
    transform: rotate(3deg) scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(57, 157, 255, 0.4);
    z-index: 1000;
}

.card.drag-over {
    transform: translateY(5px);
    border-color: var(--primary);
}

/* 视频卡片拖拽排序样式 */
.video-card.sortable-ghost {
    opacity: 0.4;
    background: var(--primary);
}

.video-card.sortable-drag {
    opacity: 0.9;
    transform: rotate(2deg) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(57, 157, 255, 0.4);
    z-index: 1000;
}

.video-card.drag-over {
    transform: translateY(5px);
    border-color: var(--primary);
}

.cat-item-row.sortable-ghost {
    background: var(--primary) !important;
    opacity: 0.5;
}

.drag-handle {
    cursor: grab;
    color: #666;
    margin-right: 5px;
    font-size: 18px;
}

/* ==================== 批量选择样式 ==================== */
.card.selected {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    background: rgba(57, 157, 255, 0.2);
}

.card.selected::after {
    content: '✓';
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.batch-actions-bar {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 30px;
    padding: 10px 20px;
    display: none;
    gap: 10px;
    align-items: center;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.batch-actions-bar.visible {
    display: flex;
}

.batch-actions-bar span {
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
    margin-right: 5px;
}

.batch-btn {
    padding: 8px 16px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    transition: all 0.2s ease;
}

.batch-btn.delete {
    background: rgba(231, 76, 60, 0.8);
    color: white;
}

.batch-btn.move {
    background: rgba(57, 157, 255, 0.8);
    color: white;
}

.batch-btn:hover {
    transform: scale(1.05);
}

.batch-btn:active {
    transform: scale(0.95);
}

/* ==================== Emoji 推荐选中状态 ==================== */
.emoji-suggestion {
    cursor: pointer;
    padding: 4px 8px;
    font-size: 20px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    transition: 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.emoji-suggestion.selected {
    background: rgba(57, 157, 255, 0.4);
    box-shadow: 0 0 8px rgba(57, 157, 255, 0.5);
}

body.light-theme .emoji-suggestion {
    background: rgba(0, 0, 0, 0.08);
}

body.light-theme .emoji-suggestion.selected {
    background: rgba(57, 157, 255, 0.3);
}

/* ==================== 缤纷模式 ==================== */
body.view-style-2 .nav-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;
}

@media (max-width: 1200px) {
    body.view-style-2 .nav-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}

@media (max-width: 900px) {
    body.view-style-2 .nav-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 600px) {
    body.view-style-2 .nav-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

body.view-style-2 .card {
    border-radius: var(--radius);
    background: var(--glass);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: none;
    justify-content: flex-start;
    transition: all 0.25s ease;
    min-height: var(--card-h-colorful, 85px);
    height: var(--card-h-colorful, 85px);
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
}

body.view-style-2 .card:hover {
    z-index: 100;
}

body.view-style-2 .card.has-bg {
    background: var(--card-bg-color, rgba(255,255,255,0.15));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

body.view-style-2 .card.has-bg:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

body.view-style-2 .card:not(.has-bg)[data-color-ready]:hover {
    background: rgba(var(--icon-color-rgb), 0.18);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

body.view-style-2 .card:not(.has-bg):not([data-color-ready]):hover {
    background: rgba(110, 115, 135, 0.32);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

body.view-style-2 .card a {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 4px;
    gap: 10px;
    box-sizing: border-box;
}

body.view-style-2 .icon-wrapper {
    width: calc(var(--icon-size-colorful, 32px) + 10px);
    height: calc(var(--icon-size-colorful, 32px) + 10px);
    min-width: calc(var(--icon-size-colorful, 32px) + 10px);
    border-radius: 8px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    overflow: hidden;
    flex-shrink: 0;
}

body.view-style-2 .card img {
    width: var(--icon-size-colorful, 32px);
    height: var(--icon-size-colorful, 32px);
    border-radius: 5px;
    object-fit: contain;
}

body.view-style-2 .card .emoji-icon {
    font-size: calc(var(--emoji-size-colorful, 32px) + 4px);
}

body.view-style-2 .card-text-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    min-width: 0;
    flex: 1 1 0%;
    overflow: hidden;
}

body.view-style-2 .card h3 {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    margin-left: 0;
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    color: #fff;
    line-height: 1.3;
    min-height: unset;
    word-break: break-all;
}

body.view-style-2 .card[data-tooltip]::after {
    left: 50%;
    transform: translateX(-50%) translateY(10px);
}

body.view-style-2 .card[data-tooltip]:hover::after {
    transform: translateX(-50%) translateY(0);
}

body.view-style-2 .card[data-tooltip]::before {
    display: none;
}

/* ==================== 视频卡片网格 ==================== */
.video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 0 auto;
    width: 100%;
}

.video-card {
    background: var(--glass);
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid var(--glass-border);
    position: relative;
}

.video-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.video-card-cover {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 */
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
}

.video-card-cover img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.video-card:hover .video-card-cover img {
    transform: scale(1.05);
}

.video-card-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    z-index: 2;
    backdrop-filter: blur(4px);
}

.video-card-badge.bilibili {
    background: rgba(251, 114, 153, 0.9);
    color: white;
}

.video-card-badge.youtube {
    background: rgba(255, 0, 0, 0.9);
    color: white;
}

.video-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s;
    z-index: 1;
}

.video-card:hover .video-play-overlay {
    background: rgba(0, 0, 0, 0.3);
}

.video-play-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: scale(0.75);
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.video-play-btn i {
    font-size: 24px;
    color: #333;
    margin-left: 2px;
}

.video-card:hover .video-play-btn {
    opacity: 1;
    transform: scale(1);
}

.video-card-body {
    padding: 10px 12px;
}

.video-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 4px;
}

.video-card-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 视频封面加载失败占位 */
.video-card-cover-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(57, 157, 255, 0.2), rgba(139, 92, 246, 0.2));
}

.video-card-cover-fallback i {
    font-size: 40px;
    color: rgba(255, 255, 255, 0.5);
}

/* 视频封面异步加载插槽 */
.video-cover-slot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.video-cover-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.video-card:hover .video-cover-slot img {
    transform: scale(1.05);
}

/* ==================== 视频播放弹窗 ==================== */
.video-modal-content {
    background: rgba(20, 20, 20, 0.98);
    width: 90%;
    max-width: 900px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
}

.video-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.2s;
}

.video-close-btn:hover {
    background: rgba(231, 76, 60, 0.8);
    transform: scale(1.1);
}

.video-player-wrapper {
    width: 100%;
    padding-top: 56.25%; /* 16:9 */
    position: relative;
    background: #000;
}

.video-player-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.video-info {
    padding: 16px 20px;
}

.video-info h3 {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
}

.video-info p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    margin-bottom: 10px;
}

.video-ext-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--primary);
    font-size: 13px;
    text-decoration: none;
    transition: opacity 0.2s;
}

.video-ext-link:hover {
    opacity: 0.8;
}

/* ==================== Monaco Editor 弹窗 ==================== */
.monaco-modal-content {
    background: rgba(20, 20, 20, 0.98);
    width: 92%;
    max-width: 1000px;
    height: 80vh;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
}

.monaco-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
}

.monaco-header h4 {
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
}

.monaco-actions {
    display: flex;
    gap: 8px;
}

.monaco-action-btn {
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.08);
    color: #ccc;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
}

.monaco-action-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
}

.monaco-action-btn.primary {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
}

.monaco-action-btn.primary:hover {
    opacity: 0.9;
}

.monaco-action-btn.close:hover {
    background: rgba(231, 76, 60, 0.8);
    border-color: rgba(231, 76, 60, 0.8);
    color: white;
}

.monaco-container {
    flex: 1;
    min-height: 0;
}

/* ==================== 跟随系统偏好 ==================== */
@media (prefers-color-scheme: light) {
    body:not(.light-theme):not(.dark-theme) {
        --glass: rgba(255, 255, 255, 0.55);
        --glass-hover: rgba(255, 255, 255, 0.75);
        --glass-border: rgba(0, 0, 0, 0.07);
        --text: #2c3e50;
        --text-dim: rgba(44, 62, 80, 0.7);
        --bg-overlay-opacity: 0.25;
    }

    body:not(.light-theme):not(.dark-theme) {
        background-color: #eef1f5;
    }

    body:not(.light-theme):not(.dark-theme)::before {
        background: rgba(240, 243, 248, var(--bg-overlay-opacity));
    }

    body:not(.light-theme):not(.dark-theme) .sidebar {
        background: rgba(255, 255, 255, 0.72);
        border-color: rgba(0, 0, 0, 0.06);
    }

    body:not(.light-theme):not(.dark-theme) .sidebar-nav-item {
        color: #5a6a7a;
    }

    body:not(.light-theme):not(.dark-theme) .sidebar-nav-item.active {
        background: var(--primary);
        color: white;
    }

    body:not(.light-theme):not(.dark-theme) .sidebar-nav-item:hover:not(.active) {
        background: rgba(0, 0, 0, 0.05);
    }

    body:not(.light-theme):not(.dark-theme) .card {
        background: rgba(255, 255, 255, 0.55);
    }

    body:not(.light-theme):not(.dark-theme) .card h3 {
        color: #3d4f5f;
    }

    body:not(.light-theme):not(.dark-theme) .modal-content {
        background: rgba(255, 255, 255, 0.92);
        border-color: rgba(0, 0, 0, 0.08);
    }

    body:not(.light-theme):not(.dark-theme) input,
    body:not(.light-theme):not(.dark-theme) select {
        background: rgba(255, 255, 255, 0.7);
        border-color: rgba(0, 0, 0, 0.1);
        color: #3d4f5f;
    }
}

/* ==================== 响应式设计 ==================== */
@media (max-width: 1024px) {
    :root {
        --card-w: 80px;
        --card-h: 80px;
    }

    .video-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    :root {
        --card-w: 75px;
        --card-h: 75px;
        --sidebar-width: 250px;
    }

    /* 移动端：侧边栏变为滑出式 */
    .sidebar {
        transform: translateX(-100%);
    }

    .sidebar.open {
        transform: translateX(0);
    }

    .sidebar-toggle {
        display: flex;
    }

    .main-content {
        margin-left: 0;
        padding: 60px 12px 80px;
    }

    body.view-style-2 .nav-grid {
        gap: 12px;
    }

    .video-grid {
        grid-template-columns: 1fr;
    }

    .video-modal-content {
        width: 96%;
        max-width: none;
    }

    .monaco-modal-content {
        width: 98%;
        height: 90vh;
    }

    .category-section-title {
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    :root {
        --card-w: 70px;
        --card-h: 70px;
    }

    .main-content {
        padding: 60px 10px 80px;
    }

    .batch-actions-bar {
        bottom: 60px;
        padding: 8px 14px;
    }

    .batch-btn {
        padding: 6px 12px;
        font-size: 12px;
    }
}

```


## File: public\assets\js\app.js

```js
﻿/**
 * ==========================================
 * app.js - 核心前端逻辑（升级版 v5）
 * CloudNav 个人导航页主程序
 * 支持：左侧导航、连续滚动、视频导航、Monaco Editor
 * Style 0: 经典图标网格
 * Style 2: 缤纷模式
 * ==========================================
 */

// ==================== 全局变量定义 ====================
let appData = { settings: { siteName: '个人导航', siteIcon: '🌐', cardHeightDefault: 85, cardHeightColorful: 85 }, categories: [], items: [] };
let activeCatId = '';
let sysToken = localStorage.getItem('nav_token') || '';
let isAdmin = false;
let editingType = 'items';
let editingId = null;
let toastTimer = null;
let currentViewStyle = parseInt(localStorage.getItem('nav_view_style') || '0');
let batchSelectMode = false;
let selectedCardIds = new Set();
let themeMode = localStorage.getItem('nav_theme_mode') || 'auto';
let simpleMode = localStorage.getItem('nav_simple_mode') === 'true';
let monacoEditor = null;

// ==================== Bilibili 封面缓存 ====================
const bilibiliCoverCache = new Map();

/**
 * 异步获取 Bilibili 视频封面 URL
 * @param {string} bvid - BV 号
 * @returns {Promise<string|null>} 封面图片 URL
 */
const fetchBilibiliCover = async (bvid) => {
    if (bilibiliCoverCache.has(bvid)) return bilibiliCoverCache.get(bvid);
    try {
        const res = await fetch(`/api/bilibili-cover?bvid=${bvid}`);
        const data = await res.json();
        if (data.coverUrl) {
            bilibiliCoverCache.set(bvid, data.coverUrl);
            return data.coverUrl;
        }
    } catch (e) {
        console.warn('Bilibili 封面获取失败:', bvid, e);
    }
    return null;
};

/**
 * 批量异步加载视频卡片封面（在 DOM 插入后调用）
 * @param {HTMLElement} container - 包含 video-card 的容器
 */
const loadVideoCovers = async (container) => {
    const coverSlots = container.querySelectorAll('.video-cover-slot[data-bvid]');
    for (const slot of coverSlots) {
        const bvid = slot.getAttribute('data-bvid');
        const coverUrl = await fetchBilibiliCover(bvid);
        if (coverUrl) {
            slot.innerHTML = `<img src="${coverUrl}" alt="" loading="lazy" referrerpolicy="no-referrer"
                onerror="this.style.display='none'; this.nextElementSibling && (this.nextElementSibling.style.display='flex');">`;
            // 隐藏 fallback
            const fallback = slot.querySelector('.video-card-cover-fallback');
            if (fallback) fallback.style.display = 'none';
        }
    }
};

// ==================== 视频平台检测 ====================

/**
 * 检测URL是否为视频平台链接
 * @returns {{ type: 'bilibili'|'youtube', videoId: string, bvid?: string, aid?: string } | null}
 */
const detectVideoPlatform = (url) => {
    if (!url || !url.startsWith('http')) return null;
    try {
        const urlObj = new URL(url);
        // Bilibili 检测
        if (urlObj.hostname.includes('bilibili.com')) {
            const bvidMatch = urlObj.pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/);
            if (bvidMatch) return { type: 'bilibili', videoId: bvidMatch[1], bvid: bvidMatch[1] };
            const avidMatch = urlObj.pathname.match(/\/video\/av(\d+)/);
            if (avidMatch) return { type: 'bilibili', videoId: 'av' + avidMatch[1], aid: avidMatch[1] };
        }
        // YouTube 检测
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname === 'youtu.be') {
            let videoId = '';
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            } else if (urlObj.pathname.startsWith('/watch')) {
                videoId = urlObj.searchParams.get('v');
            } else if (urlObj.pathname.startsWith('/shorts/')) {
                videoId = urlObj.pathname.split('/')[2];
            } else if (urlObj.pathname.startsWith('/embed/')) {
                videoId = urlObj.pathname.split('/')[2];
            }
            if (videoId) return { type: 'youtube', videoId };
        }
    } catch (e) { }
    return null;
};

/**
 * 生成视频嵌入 iframe URL
 */
const getVideoEmbedUrl = (videoInfo) => {
    if (!videoInfo) return '';
    if (videoInfo.type === 'bilibili') {
        if (videoInfo.bvid) {
            return `//player.bilibili.com/player.html?bvid=${videoInfo.bvid}&autoplay=1&high_quality=1`;
        }
        if (videoInfo.aid) {
            return `//player.bilibili.com/player.html?aid=${videoInfo.aid}&autoplay=1&high_quality=1`;
        }
    }
    if (videoInfo.type === 'youtube') {
        return `https://www.youtube.com/embed/${videoInfo.videoId}?autoplay=1`;
    }
    return '';
};

/**
 * 判断分类是否为视频分类（名称包含"视频"或图标为特定emoji）
 */
const isVideoCategory = (cat) => {
    return cat.name.includes('视频') || cat.icon === '🎬' || cat.icon === '📺' || cat.icon === '🎥' || cat._isVideo;
};

// ==================== 安全与工具函数 ====================
const hashPassword = async (password) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// ==================== 初始化入口 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 注册 Service Worker（在 load 事件后注册，不阻塞页面加载）
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/ServiceWorker.js')
                .catch(err => console.log('SW 注册失败:', err));
        });
    }

    initThemeMode();
    initSimpleMode();
    initSidebar();

    // 全局监听卡片点击
    document.getElementById('grid-container').addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const link = e.target.closest('a');
        if (card && link && !card.classList.contains('card-add-new') && !e.target.closest('.admin-actions')) {
            const id = card.getAttribute('data-id');
            let clicks = JSON.parse(localStorage.getItem('nav_clicks') || '{}');
            clicks[id] = (clicks[id] || 0) + 1;
            localStorage.setItem('nav_clicks', JSON.stringify(clicks));
        }
    });

    initStyleSwitcher();
    initVideoModal();
    initMonacoModal();
    init();

    // 页面完全加载后确保隐藏加载遮罩（安全兜底）
    window.addEventListener('load', () => {
        hideLoader();
    });
});

// ==================== 侧边栏初始化 ====================
const initSidebar = () => {
    const toggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    const sidebar = document.getElementById('sidebar');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    });

    // 点击侧边栏导航项后关闭（移动端）
    document.getElementById('sidebar-nav').addEventListener('click', (e) => {
        const item = e.target.closest('.sidebar-nav-item');
        if (item && window.innerWidth <= 768) {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
        }
    });
};

// ==================== 视频播放弹窗 ====================
const initVideoModal = () => {
    document.getElementById('btn-close-video').addEventListener('click', closeVideoModal);
    // 不允许点击弹窗外区域关闭，只能通过关闭按钮退出
};

const openVideoModal = (item, videoInfo) => {
    const iframe = document.getElementById('video-iframe');
    iframe.src = getVideoEmbedUrl(videoInfo);
    document.getElementById('video-title').textContent = item.title;
    document.getElementById('video-desc').textContent = item.desc || '';
    const extLink = document.getElementById('video-link');
    extLink.href = item.url;
    extLink.style.display = item.url ? 'inline-flex' : 'none';
    document.getElementById('video-modal').style.display = 'flex';
};

const closeVideoModal = () => {
    const iframe = document.getElementById('video-iframe');
    iframe.src = '';
    document.getElementById('video-modal').style.display = 'none';
};

// ==================== Monaco Editor 弹窗 ====================
const initMonacoModal = () => {
    document.getElementById('btn-close-monaco').addEventListener('click', closeMonacoModal);
    document.getElementById('monaco-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeMonacoModal();
    });
    document.getElementById('btn-monaco-format').addEventListener('click', () => {
        if (monacoEditor) {
            monacoEditor.getAction('editor.action.formatDocument').run();
        }
    });
    document.getElementById('btn-monaco-save').addEventListener('click', saveMonacoData);
};

const openMonacoEditor = () => {
    const modal = document.getElementById('monaco-modal');
    const container = document.getElementById('monaco-container');
    modal.style.display = 'flex';

    if (monacoEditor) {
        monacoEditor.setValue(JSON.stringify(getCleanAppData(), null, 2));
        return;
    }

    // 显示加载提示在容器中
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#aaa;font-size:14px;"><i class="ri-loader-4-line" style="animation:spin 1s linear infinite;margin-right:8px;"></i>正在加载代码编辑器...</div>';

    // 动态加载 Monaco Editor loader 脚本（按需加载，不阻塞页面初始加载）
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
    script.onload = () => {
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], () => {
            container.innerHTML = '';
            monacoEditor = monaco.editor.create(container, {
                value: JSON.stringify(getCleanAppData(), null, 2),
                language: 'json',
                theme: 'vs-dark',
                automaticLayout: true,
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: 2,
                formatOnPaste: true,
                formatOnType: true
            });
            // 注册格式化快捷键
            monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                saveMonacoData();
            });
        });
    };
    script.onerror = () => {
        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#e74c3c;font-size:14px;">代码编辑器加载失败，请检查网络后重试</div>';
    };
    document.body.appendChild(script);
};

const saveMonacoData = () => {
    if (!monacoEditor) return;
    try {
        const text = monacoEditor.getValue();
        const parsed = JSON.parse(text);
        if (!parsed.categories || !parsed.items) {
            showToast('JSON 格式不正确：需要 categories 和 items 字段', '#e74c3c');
            return;
        }
        appData = { ...appData, ...parsed, isAdmin: appData.isAdmin, bgUrl: appData.bgUrl };
        localStorage.setItem('nav_app_data', JSON.stringify(appData));
        updateGridWidth();
        renderTools();
        renderNav();
        applyBackgroundConfig();
        saveAll(true);
        showToast('JSON 数据已保存');
    } catch (e) {
        showToast('JSON 解析错误: ' + e.message, '#e74c3c');
    }
};

const closeMonacoModal = () => {
    document.getElementById('monaco-modal').style.display = 'none';
};

const getCleanAppData = () => {
    const data = { ...appData };
    delete data.isAdmin;
    delete data.bgUrl;
    return data;
};

// ==================== 样式切换 ====================
const initStyleSwitcher = () => {
    document.querySelectorAll('.sidebar-style-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const style = parseInt(btn.getAttribute('data-style'));
            setViewStyle(style);
        });
    });
    applyViewStyle(currentViewStyle);
};

const setViewStyle = (style) => {
    if (currentViewStyle === style) return;
    currentViewStyle = style;
    localStorage.setItem('nav_view_style', style);
    applyViewStyle(style);
    renderNav();
};

const applyViewStyle = (style) => {
    document.body.classList.remove('view-style-0', 'view-style-2');
    if (style !== 0) {
        document.body.classList.add('view-style-' + style);
    }
    document.querySelectorAll('.sidebar-style-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.getAttribute('data-style')) === style);
    });
};

// ==================== 主题切换功能 ====================
const initThemeMode = () => { applyThemeMode(); };

const applyThemeMode = () => {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (themeMode === 'light') {
        document.body.classList.add('light-theme');
    } else if (themeMode === 'dark') {
        document.body.classList.add('dark-theme');
    }
};

const toggleThemeMode = () => {
    if (themeMode === 'auto') themeMode = 'light';
    else if (themeMode === 'light') themeMode = 'dark';
    else themeMode = 'auto';
    localStorage.setItem('nav_theme_mode', themeMode);
    applyThemeMode();
    showToast(`主题: ${getThemeModeLabel()}`);
};

const getThemeModeLabel = () => {
    const labels = { auto: '跟随系统', light: '亮色', dark: '暗色' };
    return labels[themeMode] || '跟随系统';
};

// ==================== 简约模式 ====================
const initSimpleMode = () => {
    if (simpleMode) document.body.classList.add('no-blur');
};

const toggleSimpleMode = () => {
    simpleMode = !simpleMode;
    localStorage.setItem('nav_simple_mode', simpleMode);
    document.body.classList.toggle('no-blur', simpleMode);
    showToast(simpleMode ? '已开启简约模式' : '已关闭简约模式');
};

// ==================== 核心函数 ====================
const updateGridWidth = () => {
    // 卡片宽度固定为 85px（由默认高度/缤纷高度独立控制卡片高度）
    document.documentElement.style.setProperty('--card-w', '85px');
    document.documentElement.style.setProperty('--card-h', '85px');
    // 默认样式与缤纷样式各自独立的高度
    const hDefault = (appData.settings && appData.settings.cardHeightDefault) ? appData.settings.cardHeightDefault : 85;
    const hColorful = (appData.settings && appData.settings.cardHeightColorful) ? appData.settings.cardHeightColorful : 85;
    document.documentElement.style.setProperty('--card-h-default', hDefault + 'px');
    document.documentElement.style.setProperty('--card-h-colorful', hColorful + 'px');
    // 默认样式与缤纷样式各自独立的图标尺寸
    const iconSizeDefault = (appData.settings && appData.settings.iconSizeDefault) ? appData.settings.iconSizeDefault : 32;
    const iconSizeColorful = (appData.settings && appData.settings.iconSizeColorful) ? appData.settings.iconSizeColorful : 32;
    document.documentElement.style.setProperty('--icon-size-default', iconSizeDefault + 'px');
    document.documentElement.style.setProperty('--icon-size-colorful', iconSizeColorful + 'px');
    document.documentElement.style.setProperty('--emoji-size-default', iconSizeDefault + 'px');
    document.documentElement.style.setProperty('--emoji-size-colorful', iconSizeColorful + 'px');
};

const showLoader = (text = '正在处理中...') => {
    document.getElementById('global-loading-text').innerText = text;
    document.getElementById('global-loading-overlay').style.display = 'flex';
};

const hideLoader = () => {
    document.getElementById('global-loading-overlay').style.display = 'none';
};

const showToast = (msg = "操作成功", color = "#27ae60") => {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.background = color;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
};

const toggleSkeleton = (show) => {
    document.getElementById('skeleton-screen').style.display = show ? 'block' : 'none';
    document.getElementById('main-content').style.display = show ? 'none' : 'block';
};

const loadBackground = async (url) => {
    if (!url) return;
    
    // 用 CSS background-image 直接加载（不阻塞浏览器 load 事件）
    // 浏览器原生管理图片加载，即使图片慢也不会让标签页一直转圈
    document.body.style.backgroundImage = `url('${url}')`;
    
    // 后台尝试缓存到 Cache API，不影响页面加载
    try {
        const bgCacheName = 'nav-bg-cache-v1';
        const cache = await caches.open(bgCacheName);
        const cachedResponse = await cache.match(url);
        if (cachedResponse) {
            const blob = await cachedResponse.blob();
            document.body.style.backgroundImage = `url('${URL.createObjectURL(blob)}')`;
            return;
        }
        // 后台 fetch 更新缓存（不 await，完全异步）
        fetch(url, { mode: 'cors' }).then(async response => {
            if (response.ok) {
                await cache.put(url, response.clone());
                const blob = await response.blob();
                document.body.style.backgroundImage = `url('${URL.createObjectURL(blob)}')`;
            }
        }).catch(() => { });
    } catch (e) {
        // Cache API 不可用时忽略，CSS background 已直接设置
    }
};

const applyBackgroundConfig = () => {
    const customBg = appData.settings?.bgUrl;
    if (customBg) {
        if (customBg.startsWith('#') || customBg.startsWith('rgb')) {
            document.body.style.backgroundImage = 'none';
            document.body.style.backgroundColor = customBg;
        } else {
            loadBackground(customBg);
        }
    } else if (appData.bgUrl) {
        loadBackground(appData.bgUrl);
    }
};

const init = async (forceRender = false) => {
    let fetchUrl = '/api/config';
    const gridContainer = document.getElementById('grid-container');
    const localCache = localStorage.getItem('nav_app_data');
    let initialIsAdmin = isAdmin;

    if (localCache) {
        try {
            appData = JSON.parse(localCache);
            isAdmin = appData.isAdmin || false;
            initialIsAdmin = isAdmin;
            updateGridWidth();
            toggleSkeleton(false);
            renderTools();
            renderNav();
            applyBackgroundConfig();
            updateSidebarHeader();
            if (appData.lastUpdated) {
                document.getElementById('footer-cache').innerText = '最后同步：' + utils.escapeHTML(appData.lastUpdated);
            }
        } catch (e) {
            toggleSkeleton(true);
        }
    } else {
        toggleSkeleton(true);
    }

    try {
        // 添加 8 秒超时保护，防止 API 冷启动慢时页面挂起
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(fetchUrl, {
            headers: sysToken ? { 'Authorization': sysToken } : {},
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem('nav_token');
                sysToken = '';
                isAdmin = false;
            }
            throw new Error(`HTTP Error ${res.status}`);
        }

        const newData = await res.json();
        const isDataChanged = !localCache ||
            JSON.stringify(appData.items) !== JSON.stringify(newData.items) ||
            JSON.stringify(appData.categories) !== JSON.stringify(newData.categories);

        appData = newData;
        isAdmin = appData.isAdmin || false;
        localStorage.setItem('nav_app_data', JSON.stringify(appData));

        updateGridWidth();
        const isAdminChanged = initialIsAdmin !== isAdmin;
        applyBackgroundConfig();
        updateSidebarHeader();

        if (forceRender || isDataChanged || isAdminChanged || !localCache) {
            toggleSkeleton(false);
            renderTools();
            renderNav();
        }

        if (appData.lastUpdated) {
            document.getElementById('footer-cache').innerText = '最后同步：' + utils.escapeHTML(appData.lastUpdated);
        }

    } catch (e) {
        if (e.name === 'AbortError') {
            console.error("API 请求超时", e);
            if (!localCache) {
                gridContainer.innerHTML = `<div style="margin:50px auto; padding:20px; background:rgba(255,165,0,0.2); border:1px solid orange; border-radius:10px; text-align:left;">
                    <h3 style="color:#f39c12; margin-bottom:10px;">⏱️ 数据加载超时</h3>
                    <p>服务器响应超时，已显示本地缓存数据（如有）</p>
                </div>`;
                toggleSkeleton(false);
            }
        } else {
            console.error("后台数据更新失败", e);
            if (!localCache) {
                gridContainer.innerHTML = `<div style="margin:50px auto; padding:20px; background:rgba(255,0,0,0.2); border:1px solid red; border-radius:10px; text-align:left;">
                    <h3 style="color:#ff6b6b; margin-bottom:10px;">⚠️ 数据加载失败</h3>
                    <p>${utils.escapeHTML(e.message)}</p>
                </div>`;
                toggleSkeleton(false);
            }
        }
    }
};

// ==================== 管理工具渲染 ====================
const renderTools = () => {
    const sidebarAdminActions = document.getElementById('sidebar-admin-actions');
    sidebarAdminActions.innerHTML = '';

    const createSidebarBtn = (icon, text, action) => {
        const btn = document.createElement('div');
        btn.className = 'sidebar-nav-item';
        btn.innerHTML = `<span class="nav-icon"><i class="${icon}"></i></span><span class="nav-label">${text}</span>`;
        btn.addEventListener('click', action);
        sidebarAdminActions.appendChild(btn);
    };

    if (isAdmin) {
        document.title = "管理后台";
        // 侧边栏底部管理按钮
        createSidebarBtn('ri-settings-3-line', '偏好设置', manageCats);
        createSidebarBtn('ri-code-s-slash-line', 'JSON编辑', openMonacoEditor);
        createSidebarBtn('ri-save-line', '保存', () => saveAll(false));
        createSidebarBtn('ri-download-line', '导出', exportConfig);
        createSidebarBtn('ri-upload-line', '导入', () => document.getElementById('import-file').click());
        createSidebarBtn('ri-refresh-line', '默认', resetConfig);
        createSidebarBtn('ri-logout-box-r-line', '登出', doLogout);
    } else {
        document.title = "个人导航";
        createSidebarBtn('ri-lock-line', '管理', () => {
            document.getElementById('auth-overlay').style.display = 'flex';
            setTimeout(() => document.getElementById('auth-input').focus(), 100);
        });
    }
};

// ==================== 图标多源降级工具 ====================
/**
 * 从URL提取域名
 */
const extractDomain = function (url) {
    try { return new URL(url).hostname; } catch (e) { return null; }
};

/**
 * 获取备用图标 URL（在不同 favicon 服务间切换）
 */
const getAltFaviconUrl = function (currentSrc, itemUrl) {
    var domain = extractDomain(itemUrl);
    if (!domain) return null;
    if (currentSrc && currentSrc.indexOf('favicon.im') !== -1) {
        return 'https://icons.duckduckgo.com/ip3/' + domain + '.ico';
    }
    return 'https://favicon.im/' + domain;
};

/**
 * 图标加载失败时的智能降级处理（全局挂载）
 * 先尝试备用图标源，都失败后才回退到 emoji
 * 备用源使用 off-DOM Image 预加载验证，避免 404 URL 产生控制台报错
 */
window.handleIconError = function (img) {
    if (img.dataset.fallbackTried) {
        img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>';
        return;
    }
    img.dataset.fallbackTried = '1';
    var card = img.closest('.card');
    if (card) {
        var itemId = card.getAttribute('data-id');
        var item = appData.items.find(function (i) { return i.id === itemId; });
        if (item && item.url) {
            var altSrc = getAltFaviconUrl(img.src, item.url);
            if (altSrc) {
                // 创建 off-DOM Image 对象预加载备用源
                // 不在 DOM 中的 Image 加载失败不会触发控制台 404 报错
                var preloader = new Image();
                preloader.onload = function () {
                    img.src = altSrc;
                };
                preloader.onerror = function () {
                    img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>';
                };
                preloader.src = altSrc;
                return;
            }
        }
    }
    img.outerHTML = '<span class="emoji-icon">' + window.utils.getRandomEmoji() + '</span>';
};

/**
 * glow-bg 图片的降级处理（静默隐藏，避免控制台报错）
 * 备用源使用 off-DOM Image 预加载验证，避免 404 URL 产生控制台报错
 */
window.handleGlowIconError = function (img) {
    if (img.dataset.fallbackTried) {
        img.style.display = 'none';
        return;
    }
    img.dataset.fallbackTried = '1';
    var card = img.closest('.card');
    if (card) {
        var itemId = card.getAttribute('data-id');
        var item = appData.items.find(function (i) { return i.id === itemId; });
        if (item && item.url) {
            var altSrc = getAltFaviconUrl(img.src, item.url);
            if (altSrc) {
                var preloader = new Image();
                preloader.onload = function () {
                    img.src = altSrc;
                };
                preloader.onerror = function () {
                    img.style.display = 'none';
                };
                preloader.src = altSrc;
                return;
            }
        }
    }
    img.style.display = 'none';
};

// ==================== 卡片 HTML 生成 ====================
const buildCardInnerHTML = (item, adminHtml, style) => {

    var fallbackAttr = 'onerror="window.handleIconError(this)"';

    const safeIcon = utils.escapeHTML(item.icon);

    const isImgIcon = item.icon && item.icon.startsWith('http');

    const iconHtml = isImgIcon

        ? `<img src="${safeIcon}" loading="lazy" ${fallbackAttr}>`

        : `<span class="emoji-icon">${safeIcon || '\u{1F517}'}</span>`;



    const safeUrl = utils.escapeHTML(item.url);

    const safeTitle = utils.escapeHTML(item.title);



    // 光晕背景层：用图标图片或 emoji 作为模糊扩散光源
    var glowFallback = 'onerror="window.handleGlowIconError(this)"';

    const glowBgHtml = isImgIcon

        ? `<div class="card-glow-bg"><img src="${safeIcon}" loading="lazy" aria-hidden="true" ${glowFallback}></div>`

        : `<div class="card-glow-bg"><div class="glow-emoji">${safeIcon || '\u{1F517}'}</div></div>`;



    if (style === 2) {

        return `${glowBgHtml}${adminHtml}<a href="${safeUrl}" target="_blank">

            <div class="icon-wrapper">${iconHtml}</div>

            <div class="card-text-block"><h3>${safeTitle}</h3></div>

        </a>`;

    } else {

        return `${glowBgHtml}${adminHtml}<a href="${safeUrl}" target="_blank"><div class="icon-wrapper">${iconHtml}</div><h3>${safeTitle}</h3></a>`;

    }

};



// ==================== 批量选择功能 ====================
const toggleCardSelection = (id) => {
    if (selectedCardIds.has(id)) selectedCardIds.delete(id);
    else selectedCardIds.add(id);
    updateBatchUI();
    renderNav();
};

const updateBatchUI = () => {
    let batchBar = document.querySelector('.batch-actions-bar');
    if (selectedCardIds.size > 0) {
        if (!batchBar) {
            batchBar = document.createElement('div');
            batchBar.className = 'batch-actions-bar';
            batchBar.innerHTML = `
                <span>已选 <b id="batch-count">0</b> 项</span>
                <button class="batch-btn move" id="batch-move-btn">移动到分类</button>
                <button class="batch-btn delete" id="batch-delete-btn">批量删除</button>
                <button class="batch-btn" id="batch-cancel-btn" style="background:rgba(150,150,150,0.8); color:white;">取消</button>
            `;
            document.body.appendChild(batchBar);
            document.getElementById('batch-delete-btn').addEventListener('click', batchDelete);
            document.getElementById('batch-move-btn').addEventListener('click', showBatchMoveDialog);
            document.getElementById('batch-cancel-btn').addEventListener('click', clearSelection);
        }
        batchBar.classList.add('visible');
        document.getElementById('batch-count').textContent = selectedCardIds.size;
    } else {
        if (batchBar) batchBar.classList.remove('visible');
    }
};

const clearSelection = () => {
    selectedCardIds.clear();
    updateBatchUI();
    renderNav();
};

const batchDelete = () => {
    if (selectedCardIds.size === 0) return;
    if (!confirm(`确定删除选中的 ${selectedCardIds.size} 个网站？`)) return;
    appData.items = appData.items.filter(item => !selectedCardIds.has(item.id));
    clearSelection();
    saveAll(false);
    showToast('批量删除成功');
};

const showBatchMoveDialog = () => {
    if (selectedCardIds.size === 0) return;
    const cats = appData.categories;
    const catOptions = cats.map(c => `<option value="${c.id}">${utils.escapeHTML(c.icon)} ${utils.escapeHTML(c.name)}</option>`).join('');
    const dialog = document.createElement('div');
    dialog.className = 'modal';
    dialog.style.display = 'flex';
    dialog.innerHTML = `
        <div class="modal-content" style="text-align:center">
            <h3 style="margin-bottom:15px;">移动到分类</h3>
            <select id="batch-move-cat" style="width:100%; margin-bottom:15px;">${catOptions}</select>
            <div style="display:flex; gap:10px;">
                <button class="tab-btn active" id="batch-move-confirm" style="flex:1;">确认移动</button>
                <button class="tab-btn" id="batch-move-cancel" style="flex:1; background:rgba(150,150,150,0.5);">取消</button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    document.getElementById('batch-move-cancel').addEventListener('click', () => document.body.removeChild(dialog));
    document.getElementById('batch-move-confirm').addEventListener('click', () => {
        const targetCatId = document.getElementById('batch-move-cat').value;
        appData.items.forEach(item => { if (selectedCardIds.has(item.id)) item.catId = targetCatId; });
        document.body.removeChild(dialog);
        clearSelection();
        saveAll(false);
        showToast(`已移动到目标分类`);
    });
};

// ==================== 渲染导航内容（连续滚动） ====================
const renderNav = () => {
    const sidebarNav = document.getElementById('sidebar-nav');
    const container = document.getElementById('grid-container');
    sidebarNav.innerHTML = '';
    container.innerHTML = '';

    const clickData = JSON.parse(localStorage.getItem('nav_clicks') || '{}');
    const hasFrequent = Object.keys(clickData).length > 0;

    let cats = isAdmin ? [...appData.categories] : appData.categories.filter(c => !c.hidden);

    // 常去虚拟分类
    if (hasFrequent) {
        cats.unshift({ id: 'VIRTUAL_FREQ', name: '常去网站', icon: '⭐', hidden: false });
    }

    if (cats.length > 0 && !activeCatId) activeCatId = cats[0].id;
    if (!cats.find(c => c.id === activeCatId) && cats.length > 0) activeCatId = cats[0].id;

    // 渲染侧边栏导航项
    cats.forEach((cat) => {
        // 计算该分类下的可见项目数量
        let catCount = 0;
        if (cat.id === 'VIRTUAL_FREQ') {
            const allAvailableItems = appData.items.filter(i => isAdmin || !i.hidden);
            catCount = allAvailableItems.filter(i => clickData[i.id] > 0).slice(0, 12).length;
        } else {
            catCount = appData.items.filter(i => i.catId === cat.id && (isAdmin || !i.hidden)).length;
        }
        const item = document.createElement('div');
        item.className = 'sidebar-nav-item' + (activeCatId === cat.id ? ' active' : '') + (cat.hidden ? ' hidden-item' : '');
        item.setAttribute('data-cat-id', cat.id);
        item.innerHTML = `<span class="nav-icon">${utils.escapeHTML(cat.icon)}</span><span class="nav-label">${utils.escapeHTML(cat.name)}</span><span class="nav-count">${catCount}</span>`;
        item.addEventListener('click', () => {
            activeCatId = cat.id;
            renderNav();
            // 滚动到对应分类区块
            const section = document.getElementById('section-' + cat.id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        sidebarNav.appendChild(item);
    });

    // 连续滚动：渲染所有分类区块
    cats.forEach((cat) => {
        const section = document.createElement('div');
        section.className = 'category-section';
        section.id = 'section-' + cat.id;

        // 分类标题
        const title = document.createElement('div');
        title.className = 'category-section-title';
        title.innerHTML = `<span class="cat-icon">${utils.escapeHTML(cat.icon)}</span> ${utils.escapeHTML(cat.name)}`;
        section.appendChild(title);

        // 判断是否为视频分类
        const catIsVideo = isVideoCategory(cat);

        // 获取该分类下的项目
        let catItems = [];
        if (cat.id === 'VIRTUAL_FREQ') {
            const allAvailableItems = appData.items.filter(i => isAdmin || !i.hidden);
            catItems = allAvailableItems
                .filter(i => clickData[i.id] > 0)
                .sort((a, b) => (clickData[b.id] || 0) - (clickData[a.id] || 0))
                .slice(0, 12);
        } else {
            catItems = appData.items.filter(i => i.catId === cat.id && (isAdmin || !i.hidden));
        }

        if (catIsVideo) {
            // 视频分类：使用视频卡片网格
            const videoGrid = document.createElement('div');
            videoGrid.className = 'video-grid';

            catItems.forEach((item) => {
                const videoInfo = detectVideoPlatform(item.url);
                const videoCard = buildVideoCard(item, videoInfo);
                videoGrid.appendChild(videoCard);
            });

            // 管理员模式：新增卡片
            if (isAdmin && cat.id !== 'VIRTUAL_FREQ') {
                const addCard = document.createElement('div');
                addCard.className = 'video-card';
                addCard.style.borderStyle = 'dashed';
                addCard.style.display = 'flex';
                addCard.style.alignItems = 'center';
                addCard.style.justifyContent = 'center';
                addCard.style.minHeight = '120px';
                addCard.innerHTML = `<div style="text-align:center; color:rgba(255,255,255,0.5);"><i class="ri-add-line" style="font-size:32px;"></i><div style="font-size:12px; margin-top:4px;">新增</div></div>`;
                addCard.addEventListener('click', (e) => {
                    e.preventDefault();
                    openItemEdit('', cat.id);
                });
                videoGrid.appendChild(addCard);
            }

            section.appendChild(videoGrid);

            // 异步加载 Bilibili 封面
            loadVideoCovers(videoGrid);

            // 视频分类拖拽排序
            if (isAdmin && typeof Sortable !== 'undefined' && cat.id !== 'VIRTUAL_FREQ') {
                new Sortable(videoGrid, {
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    filter: '.card-add-new',
                    onMove: (evt) => {
                        // 不允许拖到"新增"卡片位置
                        if (evt.related && evt.related.style && evt.related.style.borderStyle === 'dashed') return false;
                    },
                    onEnd: () => {
                        const newIdOrder = Array.from(videoGrid.querySelectorAll('.video-card[data-id]')).map(el => el.getAttribute('data-id'));
                        const currentCatItems = appData.items.filter(i => i.catId === cat.id);
                        const sortedCurrentItems = newIdOrder.map(id => currentCatItems.find(i => i.id === id));
                        let newGlobalItems = [];
                        appData.categories.forEach(c => {
                            if (c.id === cat.id) newGlobalItems.push(...sortedCurrentItems);
                            else newGlobalItems.push(...appData.items.filter(i => i.catId === c.id));
                        });
                        appData.items = newGlobalItems;
                        saveAll(true);
                    }
                });
            }
        } else {
            // 普通网站分类：使用原有网格
            const grid = document.createElement('div');
            grid.className = 'nav-grid';
            grid.id = 'grid-' + cat.id;

            grid.addEventListener('click', (e) => {
                const actionBtn = e.target.closest('.action-mini');
                if (actionBtn) {
                    e.preventDefault();
                    e.stopPropagation();
                    const action = actionBtn.getAttribute('data-action');
                    const targetId = actionBtn.getAttribute('data-id');
                    if (action === 'toggleHide') toggleHide('items', targetId);
                    if (action === 'edit') openItemEdit(targetId, null);
                    if (action === 'delete') deleteObj('items', targetId);
                    return;
                }
                if (e.target.closest('.card-add-new')) {
                    e.preventDefault();
                    e.stopPropagation();
                    openItemEdit('', cat.id);
                }
            });

            const fragment = document.createDocumentFragment();

            catItems.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'card' + (item.hidden ? ' hidden-item' : '');
                card.setAttribute('data-id', utils.escapeHTML(item.id));

                // 检测是否有视频链接（非视频分类中的视频链接）
                const videoInfo = detectVideoPlatform(item.url);

                if (currentViewStyle === 2 && item.bgColor) {
                    card.style.setProperty('--card-bg-color', item.bgColor);
                    card.classList.add('has-bg');
                }

                const safeDesc = utils.escapeHTML(item.desc || '');
                const safeTitle = utils.escapeHTML(item.title);
                const tooltip = safeDesc ? `${safeTitle}\n${safeDesc}` : safeTitle;
                card.setAttribute('data-tooltip', tooltip);

                let adminHtml = '';
                if (isAdmin && cat.id !== 'VIRTUAL_FREQ') {
                    adminHtml = `<div class="admin-actions">
                        <button class="action-mini batch-select-btn" data-id="${utils.escapeHTML(item.id)}"><i class="ri-checkbox-${selectedCardIds.has(item.id) ? 'fill' : 'blank-line'}"></i></button>
                        <button class="action-mini" data-action="toggleHide" data-id="${utils.escapeHTML(item.id)}"><i class="ri-eye-${item.hidden ? 'off-' : ''}line"></i></button>
                        <button class="action-mini" data-action="edit" data-id="${utils.escapeHTML(item.id)}"><i class="ri-edit-line"></i></button>
                        <button class="action-mini" data-action="delete" data-id="${utils.escapeHTML(item.id)}"><i class="ri-delete-bin-line"></i></button>
                    </div>`;
                }

                card.innerHTML = buildCardInnerHTML(item, adminHtml, currentViewStyle);

                // 如果检测到视频链接，点击卡片打开视频播放弹窗
                if (videoInfo) {
                    const linkEl = card.querySelector('a');
                    if (linkEl) {
                        linkEl.addEventListener('click', (e) => {
                            if (e.target.closest('.admin-actions')) return;
                            e.preventDefault();
                            openVideoModal(item, videoInfo);
                        });
                    }
                }

                if (selectedCardIds.has(item.id)) {
                    card.classList.add('selected');
                }
                fragment.appendChild(card);
            });

            // 新增卡片按钮
            if (isAdmin && cat.id !== 'VIRTUAL_FREQ') {
                const addCard = document.createElement('div');
                addCard.className = 'card card-add-new';
                addCard.style.borderStyle = 'dashed';
                if (currentViewStyle === 2) {
                    addCard.innerHTML = `<a href="javascript:void(0)">
                        <div class="icon-wrapper"><div class="emoji-icon">➕</div></div>
                        <div class="card-text-block"><h3>新增</h3></div>
                    </a>`;
                } else {
                    addCard.innerHTML = '<a href="javascript:void(0)"><div class="icon-wrapper"><div class="emoji-icon">➕</div></div><h3>新增</h3></a>';
                }
                fragment.appendChild(addCard);
            }

            grid.appendChild(fragment);
            section.appendChild(grid);

            // 批量选择事件
            if (isAdmin && cat.id !== 'VIRTUAL_FREQ') {
                grid.querySelectorAll('.batch-select-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const id = btn.getAttribute('data-id');
                        toggleCardSelection(id);
                    });
                });
            }

            // 拖拽排序
            if (isAdmin && typeof Sortable !== 'undefined' && cat.id !== 'VIRTUAL_FREQ') {
                new Sortable(grid, {
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    filter: '.card-add-new',
                    onMove: (evt) => { if (evt.related.classList.contains('card-add-new')) return false; },
                    onEnd: () => {
                        const newIdOrder = Array.from(grid.querySelectorAll('.card[data-id]')).map(el => el.getAttribute('data-id'));
                        const currentCatItems = appData.items.filter(i => i.catId === cat.id);
                        const sortedCurrentItems = newIdOrder.map(id => currentCatItems.find(i => i.id === id));
                        let newGlobalItems = [];
                        appData.categories.forEach(c => {
                            if (c.id === cat.id) newGlobalItems.push(...sortedCurrentItems);
                            else newGlobalItems.push(...appData.items.filter(i => i.catId === c.id));
                        });
                        appData.items = newGlobalItems;
                        saveAll(true);
                    }
                });
            }
        }

        container.appendChild(section);
    });

    // 滚动监听：自动高亮当前可见分类
    initScrollSpy();
    // 卡片光晕效果初始化
    initCardGlow(container);
};

// ==================== 视频卡片构建 ====================
const buildVideoCard = (item, videoInfo) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('data-id', utils.escapeHTML(item.id));

    const safeTitle = utils.escapeHTML(item.title);
    const safeDesc = utils.escapeHTML(item.desc || '');
    const safeUrl = utils.escapeHTML(item.url);

    // 平台标识
    let badgeHtml = '';
    if (videoInfo) {
        const badgeClass = videoInfo.type === 'bilibili' ? 'bilibili' : 'youtube';
        const badgeText = videoInfo.type === 'bilibili' ? 'Bilibili' : 'YouTube';
        badgeHtml = `<div class="video-card-badge ${badgeClass}">${badgeText}</div>`;
    }

    // 封面区域
    let coverHtml = '';
    if (videoInfo?.type === 'bilibili') {
        // Bilibili：使用异步加载封面（需要 API 获取真实 URL）
        coverHtml = `<div class="video-cover-slot" data-bvid="${videoInfo.bvid}">
            <div class="video-card-cover-fallback"><i class="ri-play-circle-line"></i></div>
        </div>`;
    } else if (videoInfo?.type === 'youtube') {
        coverHtml = `<img src="https://img.youtube.com/vi/${videoInfo.videoId}/mqdefault.jpg" alt="${safeTitle}" loading="lazy"
            onerror="this.style.display='none';">`;
    } else {
        coverHtml = `<div class="video-card-cover-fallback"><i class="ri-play-circle-line"></i></div>`;
    }

    // 管理员操作
    let adminHtml = '';
    if (isAdmin) {
        adminHtml = `<div class="admin-actions">
            <button class="action-mini" data-action="toggleHide" data-id="${utils.escapeHTML(item.id)}"><i class="ri-eye-${item.hidden ? 'off-' : ''}line"></i></button>
            <button class="action-mini" data-action="edit" data-id="${utils.escapeHTML(item.id)}"><i class="ri-edit-line"></i></button>
            <button class="action-mini" data-action="delete" data-id="${utils.escapeHTML(item.id)}"><i class="ri-delete-bin-line"></i></button>
        </div>`;
    }

    card.innerHTML = `
        ${adminHtml}
        <div class="video-card-cover">
            ${badgeHtml}
            ${coverHtml}
            <div class="video-play-overlay">
                <div class="video-play-btn"><i class="ri-play-fill"></i></div>
            </div>
        </div>
        <div class="video-card-body">
            <div class="video-card-title">${safeTitle}</div>
            <div class="video-card-desc">${safeDesc || (videoInfo ? (videoInfo.type === 'bilibili' ? 'Bilibili' : 'YouTube') : '')}</div>
        </div>
    `;

    // 点击播放视频
    card.addEventListener('click', (e) => {
        if (e.target.closest('.admin-actions')) {
            // 管理操作
            const actionBtn = e.target.closest('.action-mini');
            if (actionBtn) {
                e.preventDefault();
                e.stopPropagation();
                const action = actionBtn.getAttribute('data-action');
                const targetId = actionBtn.getAttribute('data-id');
                if (action === 'toggleHide') toggleHide('items', targetId);
                if (action === 'edit') openItemEdit(targetId, null);
                if (action === 'delete') deleteObj('items', targetId);
            }
            return;
        }
        if (videoInfo) {
            e.preventDefault();
            openVideoModal(item, videoInfo);
        } else if (item.url) {
            window.open(item.url, '_blank');
        }
    });

    if (item.hidden) {
        card.style.opacity = '0.3';
        card.style.filter = 'grayscale(1)';
    }

    return card;
};

// ==================== 卡片悬停光晕效果 ====================
const initCardGlow = (container) => {
    const cards = container.querySelectorAll('.card[data-id]');
    const extractor = window.colorExtractor;
    if (!extractor) return;

    // 用队列控制并发数，避免同时发起大量请求导致雪崩
    var queue = [];
    var activeCount = 0;
    var MAX_CONCURRENT = 6;

    var processQueue = function () {
        if (activeCount >= MAX_CONCURRENT || queue.length === 0) return;
        activeCount++;
        var task = queue.shift();
        task().then(function () {
            activeCount--;
            processQueue();
        }).catch(function () {
            activeCount--;
            processQueue();
        });
        // 尝试继续填充并发槽
        if (activeCount < MAX_CONCURRENT && queue.length > 0) {
            processQueue();
        }
    };

    cards.forEach(function (card) {
        var item = appData.items.find(function (i) { return i.id === card.getAttribute('data-id'); });
        if (!item) return;

        var iconSrc = item.icon;
        var isImgIcon = iconSrc && iconSrc.startsWith('http');
        var title = item.title || '';

        // 记录已尝试的 URL，防止在两个图标源之间无限递归
        var triedUrls = new Set();

        /**
         * 最终兜底：使用文本生成颜色
         */
        var fallbackToTextColor = function () {
            var fc = extractor.generateColorFromText(title);
            if (fc) {
                card.style.setProperty('--icon-color', fc.hex);
                card.style.setProperty('--icon-color-rgb', fc.rgb);
                card.setAttribute('data-color-ready', '');
            }
        };

        /**
         * 尝试从图片提取颜色，失败时尝试备用源或降级到文本色
         * @param {string} src - 要提取颜色的图片 URL
         * @param {boolean} allowRetry - 是否允许尝试备用图标源
         * @returns {Promise}
         */
        var tryExtractColor = function (src, allowRetry) {
            // 已经尝试过这个 URL，直接回退到文本色
            if (triedUrls.has(src)) {
                fallbackToTextColor();
                return Promise.resolve();
            }
            triedUrls.add(src);

            return extractor.extractColorFromImage(src).then(function (color) {
                if (color) {
                    card.style.setProperty('--icon-color', color.hex);
                    card.style.setProperty('--icon-color-rgb', color.rgb);
                    card.setAttribute('data-color-ready', '');
                } else if (allowRetry) {
                    // 颜色提取无结果，尝试备用图标源
                    var altSrc = item.url ? getAltFaviconUrl(src, item.url) : null;
                    if (altSrc && altSrc !== src && !triedUrls.has(altSrc)) {
                        return tryExtractColor(altSrc, true);
                    } else {
                        fallbackToTextColor();
                    }
                } else {
                    fallbackToTextColor();
                }
            }).catch(function () {
                // CORS 或其他错误：尝试备用图标源
                var altSrc = item.url ? getAltFaviconUrl(src, item.url) : null;
                if (altSrc && altSrc !== src && !triedUrls.has(altSrc)) {
                    return tryExtractColor(altSrc, true);
                } else {
                    fallbackToTextColor();
                }
            });
        };

        if (isImgIcon) {
            // 加入队列，控制并发
            queue.push(function () {
                return tryExtractColor(iconSrc, true);
            });
        } else {
            // Emoji 或无图标：从文本生成颜色
            var color = extractor.generateColorFromText(iconSrc || title);
            if (color) {
                card.style.setProperty('--icon-color', color.hex);
                card.style.setProperty('--icon-color-rgb', color.rgb);
                card.setAttribute('data-color-ready', '');
            }
        }

        // 鼠标跟踪（RAF 节流）
        var rafId = null;
        card.addEventListener('mousemove', function (e) {
            if (rafId) return;
            rafId = requestAnimationFrame(function () {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;
                card.style.setProperty('--pointer-x', x.toFixed(3));
                card.style.setProperty('--pointer-y', y.toFixed(3));
                rafId = null;
            });
        });

        card.addEventListener('mouseleave', function () {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            card.style.setProperty('--pointer-x', '0.5');
            card.style.setProperty('--pointer-y', '0.5');
        });
    });

    // 启动队列处理
    processQueue();
};

// ==================== 滚动监听（自动高亮侧边栏） ====================
let scrollSpyInitialized = false;
const initScrollSpy = () => {
    // 使用 IntersectionObserver 替代 scroll 监听以提升性能
    const sections = document.querySelectorAll('.category-section');
    if (sections.length === 0) return;

    // 清理旧的 observer
    if (window._scrollSpyObserver) {
        window._scrollSpyObserver.disconnect();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const catId = entry.target.id.replace('section-', '');
                activeCatId = catId;
                // 更新侧边栏高亮
                document.querySelectorAll('.sidebar-nav-item').forEach(item => {
                    item.classList.toggle('active', item.getAttribute('data-cat-id') === catId);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
    window._scrollSpyObserver = observer;
};

// ==================== 编辑相关函数 ====================
const debouncedHandleUrlInput = utils.debounce((val) => handleUrlInput(val), 500);

const openItemEdit = (id, catId) => {
    editingType = 'items';
    editingId = id;

    const item = id
        ? appData.items.find(i => i.id === id)
        : { id: 'i' + Date.now(), title: '', url: '', desc: '', icon: '', catId: catId };

    const safeUrl = utils.escapeHTML(item.url);
    const safeTitle = utils.escapeHTML(item.title);
    const safeIcon = utils.escapeHTML(item.icon);
    const safeDesc = utils.escapeHTML(item.desc || '');
    const safeBgColor = utils.escapeHTML(item.bgColor || '');

    // 检测当前是否为视频分类
    const currentCat = appData.categories.find(c => c.id === (item.catId || catId));
    const isVideoCat = currentCat && isVideoCategory(currentCat);
    const videoInfo = detectVideoPlatform(item.url);

    document.getElementById('edit-title').innerText = id ? '编辑网站' : '新增网站';
    document.getElementById('edit-form-body').innerHTML = `
        <div class="form-row"><label>网站 URL</label><input id="f-url" value="${safeUrl}"></div>
        ${isVideoCat || videoInfo ? `<div style="background:rgba(57,157,255,0.1); border:1px solid rgba(57,157,255,0.3); border-radius:8px; padding:8px 12px; margin-bottom:8px; font-size:12px; color:rgba(255,255,255,0.8);">
            <i class="ri-film-line"></i> 视频链接已自动识别${videoInfo ? '（' + (videoInfo.type === 'bilibili' ? 'Bilibili' : 'YouTube') + '）' : ''}，点击卡片将直接播放
        </div>` : ''}
        <div class="form-row"><label>网站名称</label><input id="f-title" value="${safeTitle}"></div>
        <div class="form-row"><label>网站说明</label><input id="f-desc" value="${safeDesc}" placeholder="选填，鼠标悬停时显示"></div>
        <div class="form-row"><label>当前图标</label>
            <div style="display:flex; width:100%; align-items:center;">
                <input id="f-icon" value="${safeIcon}" placeholder="可手动填入，或选择下方智能接口">
                <div id="preview-box" class="preview-container"></div>
            </div>
        </div>
        <div class="form-row"><label style="font-size:12px; font-weight:normal; color:#999;">Favicon.im</label>
            <div style="display:flex; align-items:center; width:100%;">
                <input type="radio" name="icon_sel" id="opt-fav1" style="width:18px; height:18px; flex-shrink:0; margin:0 6px 0 0; cursor:pointer;">
                <input id="txt-fav1" readonly placeholder="等待填写 URL 自动解析..." style="flex:1; min-width:0; color:#aaa; font-size:13px; cursor:pointer; background:rgba(0,0,0,0.3);">
                <div class="preview-container" style="background:rgba(0,0,0,0.3);"><img id="img-fav1" src="" loading="lazy"></div>
            </div>
        </div>
        <div class="form-row"><label style="font-size:12px; font-weight:normal; color:#999;">DuckDuckGo</label>
            <div style="display:flex; align-items:center; width:100%;">
                <input type="radio" name="icon_sel" id="opt-fav2" style="width:18px; height:18px; flex-shrink:0; margin:0 6px 0 0; cursor:pointer;">
                <input id="txt-fav2" readonly placeholder="等待填写 URL 自动解析..." style="flex:1; min-width:0; color:#aaa; font-size:13px; cursor:pointer; background:rgba(0,0,0,0.3);">
                <div class="preview-container" style="background:rgba(0,0,0,0.3);"><img id="img-fav2" src="" loading="lazy"></div>
            </div>
        </div>
        <div class="form-row"><label style="font-size:12px; font-weight:normal; color:#999;">图标搜索</label>
            <div style="display:flex; flex-direction:column; width:100%; gap:5px;">
                <div style="display:flex; gap:5px;">
                    <input id="iconify-search" placeholder="输入英文关键词, 如 github" style="flex:1;">
                    <button type="button" class="manage-cat-btn" id="btn-iconify-search" style="border: 1px solid var(--primary); color: white; background: var(--primary);">搜索</button>
                </div>
                <div id="iconify-results" style="display:flex; flex-wrap:wrap; gap:5px; max-height:80px; overflow-y:auto; margin-top:5px;"></div>
            </div>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 10px;">
            <label style="font-size:12px; font-weight:normal; color:#999;">智能 Emoji</label>
            <div style="display:flex; flex-direction:column; width:100%; gap:5px;">
                <div style="display:flex; gap:5px; align-items:center;">
                    <input id="emoji-recommend-title" value="${safeTitle}" placeholder="输入网站名称获取推荐" style="flex:1;">
                    <button type="button" class="manage-cat-btn" id="btn-emoji-recommend" style="border: 1px solid var(--primary); color: white; background: var(--primary);">推荐</button>
                    <button type="button" class="manage-cat-btn" id="btn-emoji-refresh" title="换一组" style="padding:8px 12px;">🔄</button>
                </div>
                <div id="emoji-results" style="display:flex; flex-wrap:wrap; gap:5px; max-height:60px; overflow-y:auto; margin-top:5px;">
                    ${safeIcon && !safeIcon.startsWith('http') ? `<span class="emoji-suggestion selected" data-emoji="${safeIcon}">${safeIcon}</span>` : ''}
                </div>
            </div>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 10px;">
            <label style="font-size:12px;">网格背景色</label>
            <div style="display:flex; align-items:center; gap:8px; width:100%;">
                <input type="color" id="f-bg-color" value="${safeBgColor || '#399dff'}" style="width:40px; height:36px; padding:2px; border:none; border-radius:6px; cursor:pointer; background:transparent; flex-shrink:0;">
                <input id="f-bg-color-text" value="${safeBgColor}" placeholder="如 rgba(57,157,255,0.45) 或 #3b82f6，留空使用默认" style="flex:1;">
            </div>
        </div>
        <div class="form-row"><label>归属分类</label>
            <select id="f-cat">${appData.categories.map(c => `<option value="${utils.escapeHTML(c.id)}" ${c.id === item.catId ? 'selected' : ''}>${utils.escapeHTML(c.name)}</option>`).join('')}</select>
        </div>
    `;

    // 背景色取色器与输入框联动
    const colorInput = document.getElementById('f-bg-color');
    const colorText = document.getElementById('f-bg-color-text');
    colorInput.addEventListener('input', () => { colorText.value = colorInput.value; });
    colorText.addEventListener('input', () => {
        if (/^#[0-9a-fA-F]{6}$/.test(colorText.value)) colorInput.value = colorText.value;
    });

    document.getElementById('f-url').addEventListener('input', (e) => debouncedHandleUrlInput(e.target.value));
    document.getElementById('f-icon').addEventListener('input', (e) => updatePreview(e.target.value));

    ['1', '2'].forEach(num => {
        const opt = document.getElementById('opt-fav' + num);
        const txt = document.getElementById('txt-fav' + num);
        opt.addEventListener('change', () => selectIcon(txt.value));
        txt.addEventListener('click', () => { if (txt.value) { opt.checked = true; selectIcon(txt.value); } });
    });

    document.getElementById('btn-iconify-search').addEventListener('click', async () => {
        const query = document.getElementById('iconify-search').value.trim();
        if (!query) return;
        const resBox = document.getElementById('iconify-results');
        resBox.innerHTML = '<span style="font-size:12px;">搜索中...</span>';
        try {
            const req = await fetch(`https://api.iconify.design/search?query=${query}&limit=12`);
            const data = await req.json();
            resBox.innerHTML = '';
            if (data.icons && data.icons.length > 0) {
                data.icons.forEach(iconName => {
                    const imgUrl = `https://api.iconify.design/${iconName}.svg`;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.style.cssText = 'width:30px; height:30px; cursor:pointer; background:rgba(255,255,255,0.1); border-radius:6px; padding:4px; transition: 0.2s;';
                    img.onmouseover = () => img.style.background = 'rgba(255,255,255,0.3)';
                    img.onmouseout = () => img.style.background = 'rgba(255,255,255,0.1)';
                    img.onclick = () => selectIcon(imgUrl);
                    resBox.appendChild(img);
                });
            } else {
                resBox.innerHTML = '<span style="font-size:12px; color:#aaa;">未找到结果</span>';
            }
        } catch (e) {
            resBox.innerHTML = '<span style="font-size:12px; color:#e74c3c;">网络或接口错误</span>';
        }
    });

    const EMOJI_KEYWORDS = {
        'github': '🐙', 'git': '📦', 'code': '💻', '编程': '💻', '开发': '🛠️',
        'google': '🔍', 'search': '🔍', '搜索': '🔍',
        'youtube': '📺', 'video': '🎬', '视频': '🎬', 'music': '🎵', '音乐': '🎵',
        'twitter': '🐦', 'facebook': '👥', 'social': '🌐', '社交': '🌐',
        'mail': '📧', 'email': '📧', '邮箱': '📧', 'message': '💬', '消息': '💬',
        'shop': '🛒', 'store': '🏪', '购物': '🛒', 'buy': '🛍️',
        'game': '🎮', 'games': '🎲', '游戏': '🎮', 'play': '▶️',
        'book': '📚', 'read': '📖', 'learn': '📝', '学习': '📚', '教育': '🎓',
        'news': '📰', 'newspaper': '📰', '新闻': '📰', 'blog': '📝',
        'weather': '🌤️', '天气': '🌤️',
        'photo': '📷', 'image': '🖼️', '图片': '🖼️', 'camera': '📸',
        'food': '🍔', 'restaurant': '🍽️', '美食': '🍜', 'eat': '🍕',
        'travel': '✈️', 'trip': '🧳', '旅行': '🧳', 'map': '🗺️',
        'money': '💰', 'finance': '💵', 'pay': '💳', '支付': '💳', 'bank': '🏦',
        'cloud': '☁️', 'cloudflare': '☁️', 'aws': '☁️', 'server': '🖥️',
        'chat': '💬', 'talk': '🗣️', 'ai': '🤖', 'bot': '🤖',
        'home': '🏠', '生活': '🏠',
        'work': '💼', 'office': '🏢', 'business': '💼', '工作': '💼',
        'health': '🏥', 'medical': '🏥', '医院': '🏥', 'doctor': '👨‍⚕️',
        'sport': '⚽', 'sports': '🏃', '运动': '⚽', 'fitness': '💪',
        'star': '⭐', 'favorite': '⭐', '收藏': '⭐', 'bookmark': '🔖',
        'setting': '⚙️', 'config': '🔧', '设置': '⚙️', 'tool': '🛠️',
        'download': '⬇️', 'upload': '⬆️', 'file': '📁', 'folder': '📁',
        'link': '🔗', 'connect': '🔗', 'chain': '🔗', '链接': '🔗',
        'lock': '🔒', 'security': '🔐', 'secure': '🔒', '安全': '🔐',
        'design': '🎨', 'art': '🎨', 'creative': '🎨', '设计': '🎨',
        'api': '🔌', 'data': '📊', 'database': '🗄️', '数据': '📊',
        'terminal': '💻', 'console': '⌨️', 'ssh': '🔐', '命令': '⌨️',
        'wifi': '📶', 'network': '🌐', 'internet': '🌐', 'web': '🌐',
        'notification': '🔔', 'bell': '🔔', 'alert': '⚠️', '通知': '🔔',
        'fire': '🔥', 'hot': '🔥', 'trending': '📈', '热门': '🔥',
        'bilibili': '📺', 'b站': '📺', '哔哩哔哩': '📺'
    };

    const getRecommendedEmojis = (title) => {
        const results = new Set();
        const lowerTitle = title.toLowerCase();
        for (const [keyword, emoji] of Object.entries(EMOJI_KEYWORDS)) {
            if (lowerTitle.includes(keyword)) results.add(emoji);
        }
        if (results.size === 0) {
            return window.emojiPool ? window.emojiPool.getRandomEmojis(8) : ['🌐', '🔗', '📌', '⭐', '💡', '✨', '🎯', '🚀'];
        }
        const extras = window.emojiPool ? window.emojiPool.getRandomEmojis(4) : ['🌟', '💫', '✨', '🔮'];
        return [...results, ...extras].slice(0, 8);
    };

    const renderEmojiSuggestions = (emojis) => {
        const container = document.getElementById('emoji-results');
        if (!container) return;
        container.innerHTML = '';
        emojis.forEach(emoji => {
            const span = document.createElement('span');
            span.className = 'emoji-suggestion';
            span.textContent = emoji;
            span.dataset.emoji = emoji;
            span.onclick = () => {
                document.querySelectorAll('.emoji-suggestion').forEach(el => el.classList.remove('selected'));
                span.classList.add('selected');
                selectIcon(emoji);
            };
            container.appendChild(span);
        });
    };

    const recommendEmojis = () => {
        const title = document.getElementById('emoji-recommend-title').value;
        renderEmojiSuggestions(getRecommendedEmojis(title || safeTitle));
    };

    document.getElementById('btn-emoji-recommend').addEventListener('click', recommendEmojis);
    document.getElementById('btn-emoji-refresh').addEventListener('click', () => {
        renderEmojiSuggestions(getRecommendedEmojis(document.getElementById('emoji-recommend-title').value || safeTitle));
    });
    document.getElementById('emoji-recommend-title').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') recommendEmojis();
    });

    updatePreview(item.icon);
    if (item.url) handleUrlInput(item.url, false);
    document.getElementById('edit-modal').style.display = 'flex';
};

const selectIcon = (url) => {
    if (!url) return;
    document.getElementById('f-icon').value = url;
    updatePreview(url);
};

const handleUrlInput = (url, autoSelect = true) => {
    if (url && url.startsWith('http')) {
        try {
            const domain = new URL(url).hostname;
            const icon1 = "https://favicon.im/" + domain;
            const icon2 = "https://icons.duckduckgo.com/ip3/" + domain + ".ico";
            document.getElementById('txt-fav1').value = icon1;
            document.getElementById('img-fav1').src = icon1;
            document.getElementById('txt-fav2').value = icon2;
            document.getElementById('img-fav2').src = icon2;
            const currentIconVal = document.getElementById('f-icon').value;
            if (autoSelect && !currentIconVal) {
                document.getElementById('opt-fav1').checked = true;
                selectIcon(icon1);
            } else if (currentIconVal === icon1) {
                document.getElementById('opt-fav1').checked = true;
            } else if (currentIconVal === icon2) {
                document.getElementById('opt-fav2').checked = true;
            } else {
                document.getElementById('opt-fav1').checked = false;
                document.getElementById('opt-fav2').checked = false;
            }
        } catch (e) { }
    } else {
        document.getElementById('txt-fav1').value = "";
        document.getElementById('img-fav1').src = "";
        document.getElementById('opt-fav1').checked = false;
        document.getElementById('txt-fav2').value = "";
        document.getElementById('img-fav2').src = "";
        document.getElementById('opt-fav2').checked = false;
    }
};

const updatePreview = (val) => {
    const box = document.getElementById('preview-box');
    if (!val) { box.innerHTML = '🔗'; return; }
    const safeVal = utils.escapeHTML(val);
    if (safeVal.startsWith('http')) {
        let fallbackAttr = `onerror="this.outerHTML='<span class=\\'emoji-icon\\'>'+window.utils.getRandomEmoji()+'</span>';"`;
        box.innerHTML = `<img src="${safeVal}" loading="lazy" ${fallbackAttr}>`;
    } else {
        box.innerHTML = `<span class="emoji-icon">${safeVal}</span>`;
    }
};

// ==================== 分类管理 ====================
const manageCats = () => {
    editingType = 'cats';
    document.getElementById('edit-title').innerText = '偏好与分类设置';

    const currentBg = (appData.settings && appData.settings.bgUrl) ? appData.settings.bgUrl : '';
    const bgIsColor = /^#[0-9a-fA-F]{6}$/.test(currentBg);

    const themeOptions = [
        { value: 'auto', label: '跟随系统' },
        { value: 'light', label: '亮色模式' },
        { value: 'dark', label: '暗色模式' }
    ].map(opt => `<option value="${opt.value}" ${themeMode === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('');

    const currentSiteName = (appData.settings && appData.settings.siteName) ? appData.settings.siteName : '个人导航';
    const currentSiteIcon = (appData.settings && appData.settings.siteIcon) ? appData.settings.siteIcon : '🌐';

    const currentDefaultHeight = (appData.settings && appData.settings.cardHeightDefault) ? appData.settings.cardHeightDefault : 85;
    const currentColorfulHeight = (appData.settings && appData.settings.cardHeightColorful) ? appData.settings.cardHeightColorful : 85;
    const currentIconSizeDefault = (appData.settings && appData.settings.iconSizeDefault) ? appData.settings.iconSizeDefault : 32;
    const currentIconSizeColorful = (appData.settings && appData.settings.iconSizeColorful) ? appData.settings.iconSizeColorful : 32;

    document.getElementById('edit-form-body').innerHTML = `
        <div class="form-row" style="margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <label>站点图标</label><input type="text" id="setting-site-icon" value="${utils.escapeHTML(currentSiteIcon)}" placeholder="🌐 输入 emoji 或图标 URL" style="flex:1; padding:5px">
        </div>
        <div class="form-row" style="margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <label>站点名称</label><input type="text" id="setting-site-name" value="${utils.escapeHTML(currentSiteName)}" placeholder="个人导航" style="flex:1; padding:5px">
        </div>
        <div class="form-row" style="margin-bottom: 10px;">
            <label>默认高度</label><input type="number" id="setting-height-default" value="${currentDefaultHeight}"><span style="color:#666; margin-left:10px;">px</span>
        </div>
        <div class="form-row" style="margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
            <label>默认图标</label><input type="number" id="setting-icon-size-default" value="${currentIconSizeDefault}" min="16" max="128"><span style="color:#666; margin-left:10px;">px</span>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
            <label>缤纷高度</label><input type="number" id="setting-height-colorful" value="${currentColorfulHeight}"><span style="color:#666; margin-left:10px;">px</span>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
            <label>缤纷图标</label><input type="number" id="setting-icon-size-colorful" value="${currentIconSizeColorful}" min="16" max="128"><span style="color:#666; margin-left:10px;">px</span>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
            <label>自定义背景</label>
            <div style="display:flex; align-items:center; gap:8px; flex:1;">
                <input type="color" id="setting-bg-color" value="${bgIsColor ? currentBg : '#222222'}" style="width:40px; height:36px; padding:2px; border:none; border-radius:6px; cursor:pointer; background:transparent; flex-shrink:0;">
                <input type="text" id="setting-bg" value="${utils.escapeHTML(currentBg)}" placeholder="填URL或纯色(如#222), 留空使用Bing" style="flex:1;">
            </div>
        </div>
        <div class="form-row" style="margin-bottom: 10px;">
            <label>主题模式</label>
            <select id="setting-theme" style="flex:1;">${themeOptions}</select>
        </div>
        <div class="form-row" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px;">
            <label>简约模式</label>
            <div style="display:flex; align-items:flex-start; gap:6px; flex:1;">
                <input type="checkbox" id="setting-simple-mode" ${simpleMode ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer; margin-top:2px;">
                <span style="font-size:12px; color:#999; line-height:1.4;">关闭模糊效果（提升低端设备性能）</span>
            </div>
        </div>
        <div id="cat-list-sort" style="max-height: 300px; overflow-y: auto;">
            ${appData.categories.map((c) => `
                <div class="cat-item-row" data-id="${utils.escapeHTML(c.id)}" style="display:flex; gap:8px; margin-bottom:10px; align-items:center; background:rgba(255,255,255,0.05); padding:8px; border-radius:10px;">
                    <i class="ri-drag-move-fill drag-handle"></i>
                    <input class="cat-icon-input" data-id="${utils.escapeHTML(c.id)}" value="${utils.escapeHTML(c.icon)}" style="width:40px; text-align:center; padding:5px">
                    <input class="cat-name-input" data-id="${utils.escapeHTML(c.id)}" value="${utils.escapeHTML(c.name)}" style="flex:1; padding:5px">
                    <label style="font-size:11px; color:#999; display:flex; align-items:center; gap:3px; flex-shrink:0; cursor:pointer;">
                        <input type="checkbox" class="cat-video-toggle" data-id="${utils.escapeHTML(c.id)}" ${c._isVideo ? 'checked' : ''} style="width:14px; height:14px; cursor:pointer;"> 🎬
                    </label>
                    <button class="action-mini btn-cat-hide" data-id="${utils.escapeHTML(c.id)}"><i class="ri-eye-${c.hidden ? 'off-' : ''}line"></i></button>
                    <button class="action-mini btn-cat-del" data-id="${utils.escapeHTML(c.id)}"><i class="ri-delete-bin-line"></i></button>
                </div>
            `).join('')}
        </div>
        <button class="tab-btn active" id="btn-add-cat" style="width:100%; margin-top:15px">+ 新增分类</button>
    `;

    document.getElementById('setting-height-default').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.cardHeightDefault = parseInt(e.target.value) || 85;
        updateGridWidth();
    });
    document.getElementById('setting-height-colorful').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.cardHeightColorful = parseInt(e.target.value) || 85;
        updateGridWidth();
    });
    document.getElementById('setting-icon-size-default').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.iconSizeDefault = parseInt(e.target.value) || 32;
        updateGridWidth();
    });
    document.getElementById('setting-icon-size-colorful').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.iconSizeColorful = parseInt(e.target.value) || 32;
        updateGridWidth();
    });
    document.getElementById('setting-theme').addEventListener('change', (e) => {
        themeMode = e.target.value;
        localStorage.setItem('nav_theme_mode', themeMode);
        applyThemeMode();
    });
    document.getElementById('setting-simple-mode').addEventListener('change', (e) => {
        simpleMode = e.target.checked;
        localStorage.setItem('nav_simple_mode', simpleMode);
        document.body.classList.toggle('no-blur', simpleMode);
    });

    document.getElementById('setting-site-icon').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.siteIcon = e.target.value || '🌐';
        updateSidebarHeader();
    });

    document.getElementById('setting-site-name').addEventListener('input', (e) => {
        if (!appData.settings) appData.settings = {};
        appData.settings.siteName = e.target.value || '个人导航';
        updateSidebarHeader();
    });

    const bgColorPicker = document.getElementById('setting-bg-color');
    const bgTextInput = document.getElementById('setting-bg');
    bgColorPicker.addEventListener('input', () => {
        bgTextInput.value = bgColorPicker.value;
        if (!appData.settings) appData.settings = {};
        appData.settings.bgUrl = bgColorPicker.value;
        applyBackgroundConfig();
    });
    bgTextInput.addEventListener('input', () => {
        const val = bgTextInput.value.trim();
        if (/^#[0-9a-fA-F]{6}$/.test(val)) bgColorPicker.value = val;
        if (!appData.settings) appData.settings = {};
        appData.settings.bgUrl = val;
        applyBackgroundConfig();
    });
    document.getElementById('btn-add-cat').addEventListener('click', addCat);

    const catListSort = document.getElementById('cat-list-sort');
    catListSort.addEventListener('change', (e) => {
        if (e.target.classList.contains('cat-icon-input')) {
            updateCatData(e.target.getAttribute('data-id'), 'icon', e.target.value);
        } else if (e.target.classList.contains('cat-name-input')) {
            updateCatData(e.target.getAttribute('data-id'), 'name', e.target.value);
        } else if (e.target.classList.contains('cat-video-toggle')) {
            updateCatData(e.target.getAttribute('data-id'), '_isVideo', e.target.checked);
            renderNav();
        }
    });
    catListSort.addEventListener('click', (e) => {
        const hideBtn = e.target.closest('.btn-cat-hide');
        if (hideBtn) { e.preventDefault(); toggleHide('categories', hideBtn.getAttribute('data-id')); }
        const delBtn = e.target.closest('.btn-cat-del');
        if (delBtn) { e.preventDefault(); deleteObj('categories', delBtn.getAttribute('data-id')); }
    });

    new Sortable(catListSort, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        onEnd: () => {
            const newIdOrder = Array.from(catListSort.querySelectorAll('.cat-item-row')).map(el => el.getAttribute('data-id'));
            appData.categories = newIdOrder.map(id => appData.categories.find(c => c.id === id));
            let newGlobalItems = [];
            appData.categories.forEach(cat => {
                newGlobalItems.push(...appData.items.filter(i => i.catId === cat.id));
            });
            appData.items = newGlobalItems;
            renderNav();
            saveAll(true);
        }
    });

    document.getElementById('edit-modal').style.display = 'flex';
};

const updateSidebarHeader = () => {
    const logo = document.getElementById('sidebar-logo');
    const title = document.getElementById('sidebar-title');
    if (logo && title) {
        const icon = (appData.settings && appData.settings.siteIcon) || '🌐';
        const name = (appData.settings && appData.settings.siteName) || '个人导航';
        logo.textContent = icon;
        title.textContent = name;
    }
};

const updateCatData = (id, field, val) => {
    const cat = appData.categories.find(c => c.id === id);
    if (cat) cat[field] = val;
    renderNav();
};

const addCat = () => {
    const usedLetters = appData.categories.map(c => c.id.charAt(0).toUpperCase());
    let nextLetter = 'A';
    if (usedLetters.length > 0) {
        const maxCharCode = Math.max(...usedLetters.map(l => l.charCodeAt(0)));
        nextLetter = String.fromCharCode(maxCharCode + 1);
    }
    if (nextLetter > 'Z') nextLetter = 'Z' + Date.now().toString().slice(-2);
    appData.categories.push({ id: `${nextLetter}01`, name: '新分类', icon: '📁', hidden: false });
    manageCats();
    renderNav();
};

const confirmEdit = () => {
    if (editingType === 'items') {
        const url = document.getElementById('f-url').value;
        const title = document.getElementById('f-title').value;
        const desc = document.getElementById('f-desc').value;
        const icon = document.getElementById('f-icon').value;
        const bgColor = document.getElementById('f-bg-color-text').value.trim();
        const catId = document.getElementById('f-cat').value;

        if (editingId) {
            const idx = appData.items.findIndex(i => i.id === editingId);
            if (idx > -1) {
                appData.items[idx] = { ...appData.items[idx], url, title, desc, icon, bgColor, catId };
            }
        } else {
            const catLetter = catId.charAt(0).toUpperCase();
            const siblingItems = appData.items.filter(i => i.catId === catId);
            let nextNum = 1;
            if (siblingItems.length > 0) {
                const ids = siblingItems.map(i => parseInt(i.id.slice(1)) || 0);
                nextNum = Math.max(...ids) + 1;
            }
            const newId = `${catLetter}${String(nextNum).padStart(3, '0')}`;
            appData.items.push({ id: newId, url, title, desc, icon, bgColor, catId, hidden: false });
        }
    }
    renderNav();
    closeModal();
    saveAll(false);
};

const toggleHide = (type, id) => {
    const item = appData[type].find(o => o.id === id);
    if (item) item.hidden = !item.hidden;
    saveAll(false);
    renderNav();
    if (type === 'categories') manageCats();
};

const deleteObj = (type, id) => {
    if (confirm('确定删除？')) {
        const idx = appData[type].findIndex(o => o.id === id);
        if (idx > -1) appData[type].splice(idx, 1);
        renderNav();
        if (type === 'categories') manageCats();
        saveAll(false);
    }
};

// ==================== 认证相关 ====================
const doLogin = async () => {
    showLoader('正在验证管理员身份...');
    const rawPwd = document.getElementById('auth-input').value.trim();
    if (!rawPwd) { hideLoader(); return showToast("请输入密码", "#e67e22"); }

    sysToken = await hashPassword(rawPwd);
    localStorage.setItem('nav_token', sysToken);
    document.getElementById('auth-overlay').style.display = 'none';

    await init(true);
    hideLoader();
    if (!isAdmin) {
        showToast("验证失败，密码不正确", "#e74c3c");
        localStorage.removeItem('nav_token');
        sysToken = '';
    } else {
        showToast("已进入管理模式");
        document.getElementById('auth-input').value = '';
    }
};

const doLogout = async () => {
    showLoader('正在退出管理模式...');
    await new Promise(r => setTimeout(r, 600));
    localStorage.removeItem('nav_token');
    sysToken = '';
    isAdmin = false;
    appData.isAdmin = false;
    localStorage.setItem('nav_app_data', JSON.stringify(appData));

    hideLoader();
    showToast("已退出管理模式", "#399dff");
    init(true);
};

// ==================== 数据操作 ====================
const saveAll = async (silent = false) => {
    if (!silent) showLoader('正在同步配置中...');

    const dataToSave = { ...appData };
    delete dataToSave.isAdmin;
    delete dataToSave.bgUrl;
    localStorage.setItem('nav_app_data', JSON.stringify(appData));

    try {
        const res = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Authorization': sysToken, 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave)
        });
        if (!silent) hideLoader();
        if (res.ok && !silent) { showToast("保存成功！"); }
        else if (!res.ok && !silent) { showToast("保存失败，权限不足", "#e74c3c"); }
    } catch (error) {
        if (!silent) { hideLoader(); showToast("网络错误，配置仅保存在本地", "#e67e22"); }
    }
};

const importConfig = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.categories && imported.items) {
                appData = imported;
                renderTools();
                renderNav();
                await saveAll(false);
                showToast("配置导入成功！");
            } else {
                showToast("无效的配置文件格式", "#e74c3c");
            }
        } catch (err) {
            showToast("文件解析失败", "#e74c3c");
        }
    };
    reader.readAsText(file);
    event.target.value = '';
};

const exportConfig = () => {
    let sortedItems = [];
    appData.categories.forEach(cat => {
        sortedItems.push(...appData.items.filter(i => i.catId === cat.id));
    });
    const dataToExport = { settings: appData.settings, categories: appData.categories, items: sortedItems };
    let jsonStr = JSON.stringify(dataToExport, null, 2);
    jsonStr = jsonStr.replace(/\{[\s\S]*?\}/g, (match) => match.replace(/\n\s+/g, ' '));

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `nav-backup-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("配置已按紧凑格式导出");
};

const resetConfig = async () => {
    if (!confirm('确定恢复默认配置？此操作不可撤销。')) return;
    showLoader('正在重置...');
    try {
        const res = await fetch('/api/config', {
            method: 'DELETE',
            headers: { 'Authorization': sysToken }
        });
        hideLoader();
        if (res.ok) {
            localStorage.removeItem('nav_app_data');
            showToast("已重置为默认配置");
            init(true);
        } else {
            showToast("重置失败，权限不足", "#e74c3c");
        }
    } catch (e) {
        hideLoader();
        showToast("网络错误", "#e74c3c");
    }
};

const closeModal = () => {
    document.getElementById('edit-modal').style.display = 'none';
};

// ==================== 事件绑定 ====================
document.getElementById('btn-login').addEventListener('click', doLogin);
document.getElementById('auth-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin(); });
document.getElementById('btn-close-auth').addEventListener('click', () => { document.getElementById('auth-overlay').style.display = 'none'; });
document.getElementById('btn-confirm-edit').addEventListener('click', confirmEdit);
document.getElementById('btn-close-edit').addEventListener('click', closeModal);
document.getElementById('import-file').addEventListener('change', importConfig);

```


## File: public\assets\js\colorExtractor.js

```js
/**
 * colorExtractor.js - 从图标中提取主色调
 * 用于悬停光晕效果的颜色自适应
 */

(function () {
  'use strict';

  // 颜色缓存，避免重复提取
  const colorCache = new Map();

  // 默认颜色
  const DEFAULT_COLOR = { hex: '#3b82f6', rgb: '59, 130, 246' };

  /**
   * RGB 转 HEX
   */
  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function (x) {
      var hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * 从图片 URL 提取主色调
   * @param {string} imgUrl - 图标图片 URL
   * @returns {Promise<{hex: string, rgb: string}|null>}
   */
  function extractColorFromImage(imgUrl) {
    if (colorCache.has(imgUrl)) {
      return Promise.resolve(colorCache.get(imgUrl));
    }

    return new Promise(function (resolve) {
      var img = new Image();
      // 不使用 crossOrigin 避免 CORS 错误（favicon 服务通常不支持 CORS）
      // 如果 canvas 被跨域污染，会在 getImageData 时静默降级
      var timeoutId = setTimeout(function () {
        img.src = '';
        resolve(null);
      }, 8000);

      img.onload = function () {
        clearTimeout(timeoutId);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(null);
          return;
        }

        // 缩小图片以提高性能（最大 50px）
        var scale = 50 / Math.max(img.width, img.height, 1);
        canvas.width = Math.max(1, Math.floor(img.width * scale));
        canvas.height = Math.max(1, Math.floor(img.height * scale));

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        var imageData;
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (e) {
          // CORS 限制导致 canvas 被污染，静默降级
          resolve(null);
          return;
        }
        var data = imageData.data;

        // 分析颜色分布（16px 量化粒度 + 鲜艳色加权）
        var colorBuckets = {};
        var maxCount = 0;
        var dominantKey = '';

        for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i + 1];
          var b = data[i + 2];
          var a = data[i + 3];

          // 跳过透明像素
          if (a < 128) continue;

          // 跳过近白/近灰像素（通常是背景）
          var brightness = (r + g + b) / 3;
          var maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          if (brightness > 235 || (brightness > 200 && maxDiff < 20)) continue;

          // 颜色量化（16px 粒度）
          var qR = Math.round(r / 16) * 16;
          var qG = Math.round(g / 16) * 16;
          var qB = Math.round(b / 16) * 16;
          var key = qR + ',' + qG + ',' + qB;

          // 鲜艳色加权
          var weight = maxDiff > 60 ? 1.5 : 1;
          colorBuckets[key] = (colorBuckets[key] || 0) + weight;
          if (colorBuckets[key] > maxCount) {
            maxCount = colorBuckets[key];
            dominantKey = key;
          }
        }

        var result;
        if (dominantKey) {
          var parts = dominantKey.split(',').map(Number);
          result = {
            hex: rgbToHex(parts[0], parts[1], parts[2]),
            rgb: parts[0] + ', ' + parts[1] + ', ' + parts[2]
          };
        } else {
          // 无有效色：取图片中央像素的颜色
          var cx = Math.floor(canvas.width / 2);
          var cy = Math.floor(canvas.height / 2);
          var centerIdx = (cy * canvas.width + cx) * 4;
          if (centerIdx >= 0 && centerIdx + 2 < data.length) {
            result = {
              hex: rgbToHex(data[centerIdx], data[centerIdx + 1], data[centerIdx + 2]),
              rgb: data[centerIdx] + ', ' + data[centerIdx + 1] + ', ' + data[centerIdx + 2]
            };
          } else {
            resolve(null);
            return;
          }
        }

        colorCache.set(imgUrl, result);
        resolve(result);
      };

      img.onerror = function () {
        clearTimeout(timeoutId);
        resolve(null);
      };

      img.src = imgUrl;
    });
  }

  /**
   * 从文本生成颜色（用于 Emoji 或无图标时）
   * DJB2 哈希变体 → HSL → RGB
   * @param {string} text - 标题或 emoji 字符
   * @returns {{hex: string, rgb: string}}
   */
  function generateColorFromText(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
    }

    var hue = ((hash % 360) + 360) % 360; // 保证正数
    var saturation = 65 + (Math.abs(hash) % 15); // 65-80%
    var lightness = 45 + (Math.abs(hash >> 8) % 10); // 45-55%

    // HSL → RGB
    var s = saturation / 100;
    var l = lightness / 100;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    var m = l - c / 2;

    var r1, g1, b1;
    if (hue < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (hue < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (hue < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (hue < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (hue < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }

    var r = Math.round((r1 + m) * 255);
    var g = Math.round((g1 + m) * 255);
    var b = Math.round((b1 + m) * 255);

    return {
      hex: rgbToHex(r, g, b),
      rgb: r + ', ' + g + ', ' + b
    };
  }

  // 挂载到全局
  window.colorExtractor = {
    extractColorFromImage: extractColorFromImage,
    generateColorFromText: generateColorFromText
  };
})();

```


## File: public\assets\js\utils.js

```js
/**
 * ==========================================
 * utils.js - 通用工具函数库
 * ==========================================
 */

/**
 * 防抖函数
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖后的函数
 * @description 在连续触发时，只执行最后一次调用
 */
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

/**
 * HTML 转义函数
 * @param {string} str - 需要转义的字符串
 * @returns {string} - 转义后的安全字符串
 * @description 防止 XSS 攻击，将特殊字符转换为 HTML 实体
 */
const escapeHTML = (str) => {
    if (!str && str !== 0) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
};

/**
 * 备用 Emoji 列表
 * @description 当图标加载失败时随机显示的 Emoji
 */
const FALLBACK_EMOJIS = ['🌍', '🌟', '🚀', '💡', '🔥', '✨', '🎈', '🎉', '🍀', '💎', '🧭', '🛸', '🔮', '🧩', '🎨'];

/**
 * 获取随机 Emoji
 * @returns {string} - 随机 Emoji 字符
 */
const getRandomEmoji = () => FALLBACK_EMOJIS[Math.floor(Math.random() * FALLBACK_EMOJIS.length)];

// 导出工具函数（全局挂载）
window.utils = {
    debounce,
    escapeHTML,
    getRandomEmoji,
    FALLBACK_EMOJIS
};

```
