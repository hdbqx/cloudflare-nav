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
