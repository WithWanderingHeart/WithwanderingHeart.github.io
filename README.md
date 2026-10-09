# 精进

jay zhao 的写作页。静态页面，中文为主。首页是题目和两条线的入口，文章按栏目分组。

本地预览：

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

## 页面

| 路径 | 说明 |
|------|------|
| `index.html` | 首页。题目「精进」，认知差 / 信息差入口，最近文章 |
| `writing/index.html` | 文章目录。两个标题下四个栏目 |
| `writing/cognition/` | 认知差。思辨、知行 |
| `writing/info/` | 信息差。大浪淘金、日有所进 |
| `vanholtz.html` | 另一套视觉，链回首页 |
| `styles.css` / `script.js` | 样式与导航。系统字体，无构建 |

线上从 `main` 根目录发布，仓库里有 `.nojekyll`。

- 首页 <https://withwanderingheart.github.io/>
- 文章 <https://withwanderingheart.github.io/writing/>
- 认知差 <https://withwanderingheart.github.io/writing/cognition/>
- 信息差 <https://withwanderingheart.github.io/writing/info/>

## 如何新增一篇文章

1. 复制同栏目里的一篇到对应目录：思辨、知行在 `writing/cognition/`，大浪淘金、日有所进在 `writing/info/`。
2. 改 `title`、`description`、`canonical`、日期、标题和正文。文末「继续读」换成同栏目其他篇。
3. 在栏目页（`sibian.html` / `zhixing.html` / `dalang.html` / `riyou.html`）列表最上方加一条。
4. 在 `writing/index.html` 对应分组最上方加一条。根目录 `index.html` 的「最近」保留最新几条。
5. 只有改了 `styles.css` 或 `script.js` 时，才把各页的 `?v=` 换成新参数。

`writing/index.html` 顶部的 HTML 注释里有同样的步骤。

旧地址 `writing/chengwu.html`、`writing/fde.html`、`writing/settlement-to-yield.html` 会转到新路径。
