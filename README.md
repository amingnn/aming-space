# Aming Space

我的个人网站，基于 React + Vite 构建，部署在 Cloudflare Pages。

**在线地址：** https://aming-space.pages.dev（部署后更新）

---

## 技术栈

| 技术 | 用途 |
|---|---|
| React 19 + Vite 8 | 框架与构建工具 |
| Framer Motion | 滚动动画、卡片过渡 |
| Three.js | Hero 首屏神经网络粒子背景 |
| Tailwind CSS v4 | 样式工具类 |
| Cloudflare Pages | 免费静态托管与部署 |

---

## 本地运行

```bash
# 安装依赖（推荐使用 uv 或 npm）
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:5173
```

---

## 构建与部署

### 本地构建

```bash
npm run build
# 产物输出到 dist/ 目录
```

### 部署到 Cloudflare Pages

1. 将代码推送到 GitHub（仓库：`aming-space`）
2. 打开 [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create → Pages → Connect to Git
3. 选择 `aming-space` 仓库，填写构建配置：
   - **Framework preset：** Vite
   - **Build command：** `npm run build`
   - **Build output directory：** `dist`
4. 点击 Deploy，等待约 1 分钟，获得 `xxx.pages.dev` 地址

**之后每次更新只需：**

```bash
git add .
git commit -m "更新内容"
git push
# Cloudflare 自动检测并重新部署
```

---

## 项目结构

```
src/
  components/
    Hero.jsx       # 首屏：Three.js 粒子 + 打字机文字
    About.jsx      # 关于我：头像 + 自我介绍
    Skills.jsx     # 技能栈：5 列卡片，3D 倾斜悬停
    Gallery.jsx    # 作品快照：网格照片墙
    Contact.jsx    # 联系方式：社交链接卡片
    Cursor.jsx     # 自定义渐变鼠标光晕
    Navbar.jsx     # 导航栏（滚动后毛玻璃固定）
  index.css        # 全局样式、渐变变量、Aurora 背景
  App.jsx          # 页面组装入口
public/
  avatar.jpg       # 头像（替换为自己的照片）
  gallery/         # 作品照片目录
```

---

## 如何修改个人信息

### 修改自我介绍

编辑 `src/components/About.jsx`，找到两段 `<p>` 标签直接改文字。
底部三个信息卡片修改 `INFO_CARDS` 数组。

### 修改打字机文字

编辑 `src/components/Hero.jsx` 顶部的 `ROLES` 数组：

```js
const ROLES = [
  'AI Vision Engineer',
  // 改成你想展示的身份...
]
```

### 修改技能列表

编辑 `src/components/Skills.jsx` 顶部的 `SKILLS` 数组，每项格式：

```js
{ name: '技能名', desc: '简短描述' }
```

### 替换头像

将照片文件（支持 jpg/png/webp）放到 `public/` 目录，命名为 `avatar.jpg`。
若使用其他文件名，同步修改 `About.jsx` 第 65 行的 `src` 路径。

### 添加 Gallery 照片

1. 将照片放入 `public/gallery/` 目录
2. 打开 `src/components/Gallery.jsx`，修改 `PHOTOS` 数组中的 `src` 字段：

```js
{ id: 1, src: '/gallery/photo1.jpg', label: '照片描述', tag: 'AI', color: '#a855f7', span: 2 }
```

- `span: 2` 表示该卡片占两列（宽图），`span: 1` 为正方形
- `tag` 显示在卡片左上角角标

### 修改联系方式

编辑 `src/components/Contact.jsx` 顶部的 `LINKS` 数组，修改 `handle`（显示文字）和 `url`（链接地址）。

---

## 主色调调整

全站渐变色在 `src/index.css` 顶部的 CSS 变量中统一管理：

```css
:root {
  --c-purple: #a855f7;
  --c-blue:   #3b82f6;
  --c-cyan:   #06b6d4;
  --c-pink:   #ec4899;
}
```

修改这四个颜色即可影响全站主题色。
