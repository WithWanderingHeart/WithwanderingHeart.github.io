# jay zhao 个人主页

简单、克制的静态个人主页（中文界面）。本地打开 `index.html` 即可预览。

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 页面结构与中文占位内容 |
| `styles.css` | 柔和深色极简样式 |
| `script.js` | 页脚年份与移动端导航 |

板块：工作反思 · 个人成长 · 实践经验 · 随记（名称待定）

## 本地预览

用浏览器直接打开 `index.html`，或在本目录启动静态服务：

```bash
# Python
python3 -m http.server 8080

# 或 Node (需已安装 npx)
npx --yes serve -p 8080
```

然后访问 `http://localhost:8080`。

## 发布到 GitHub Pages

无需构建步骤。任选一种方式：

### 方式 A：仓库根目录即站点

1. 在 GitHub 新建仓库（例如 `personal-site`）。
2. 将本目录内容推送到默认分支（`main`）：
   ```bash
   git init
   git add .
   git commit -m "Initial personal homepage"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
3. 打开仓库 **Settings → Pages**。
4. **Source** 选 **Deploy from a branch**，分支选 `main`，文件夹选 `/ (root)`，保存。
5. 稍等一两分钟，站点地址一般为：  
   `https://<你的用户名>.github.io/<仓库名>/`

### 方式 B：用户主站（`username.github.io`）

1. 新建名为 `<你的用户名>.github.io` 的仓库。
2. 将本目录文件推送到该仓库的 `main` 分支。
3. 在 **Settings → Pages** 启用从 `main` / root 部署。
4. 站点地址：`https://<你的用户名>.github.io/`

### 自定义域名（可选）

在 Pages 设置里填入域名，并按 GitHub 文档配置 DNS（通常是 `CNAME` 或 `A` 记录）。仓库根目录可放置一个内容为你域名的 `CNAME` 文件。

## 修改内容

直接编辑 `index.html` 中各 `section` 的标题与段落即可。样式改 `styles.css`，导航交互改 `script.js`。

## 许可

个人使用；内容请自行替换为真实文字后再公开发布。
