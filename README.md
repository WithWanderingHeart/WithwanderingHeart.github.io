# 游心 · With Wandering Heart

jay zhao 的线上根据地。静态页面，中文为主。首页放立场和入口，长文放在文章目录里。

本地预览：

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

## 页面

| 路径 | 说明 |
|------|------|
| `index.html` | 首页。大标题、立场、最近三篇文章、短的关于 |
| `writing/index.html` | 文章目录。标题、日期、摘录、阅读 |
| `writing/*.html` | 单篇文章 |
| `vanholtz.html` | 另一套视觉，链回首页 |
| `styles.css` / `script.js` | 样式与导航。系统字体，无构建 |

线上：

- 首页 <https://withwanderingheart.github.io/>
- 文章 <https://withwanderingheart.github.io/writing/>

GitHub Pages 从 `main` 根目录发布。仓库里有 `.nojekyll`。

## 如何新增一篇文章

不需要 CMS。复制一篇旧文，改文字，再在两个列表里各加一行。

1. 复制 `writing/chengwu.html`（或任意一篇）为 `writing/你的文件名.html`。
2. 修改这一篇里的 `title`、`description`、`canonical`、`og:*`、日期、`h1` 和正文。文末「继续读」改成其他文章的链接。
3. 打开 `writing/index.html`，在 `ol.letter-list` **最上方**加一条（时间倒序）。一条里要有：`<time>`、标题链接、一两句摘录、`阅读` 链接。
4. 打开根目录 `index.html` 的「文章」区块，同样保持**最新 3 条**。更早的只留在目录页。
5. 只有改了 `styles.css` 或 `script.js` 时，才把各页的 `?v=` 换成新参数，避免浏览器继续用旧文件。

`writing/index.html` 顶部的 HTML 注释里有同样的步骤。

单篇文章用相对路径：样式是 `../styles.css`，首页是 `../index.html`，目录是 `index.html`。
