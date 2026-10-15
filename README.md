# Becoming XLZ

jay zhao 的个人站，静态页面。首页是空的品牌框架：题目、两条线、最近、关于。文章目录同样只留空壳。

本地预览：

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

线上地址仍是 `https://withwanderingheart.github.io/`。GitHub 用户名和仓库名还没改；账号改名之后再换 canonical / og:url。

## 页面

| 路径 | 说明 |
|------|------|
| `index.html` | 首页。Becoming XLZ，两条空线，最近为空 |
| `writing/index.html` | 文章目录。认知差（思辨、知行）与信息差（大浪淘金、日有所进），篇目为空 |
| `writing/cognition/` | 认知差。思辨、知行，目前没有文章 |
| `writing/info/` | 信息差。大浪淘金、日有所进，目前没有文章 |
| `vanholtz.html` | 另一套视觉，链回首页，没有旧正文 |
| `styles.css` / `script.js` | 样式与导航。系统字体，无构建 |

线上从 `main` 根目录发布，仓库里有 `.nojekyll`。

- 首页 <https://withwanderingheart.github.io/>
- 文章 <https://withwanderingheart.github.io/writing/>
- 认知差 <https://withwanderingheart.github.io/writing/cognition/>
- 信息差 <https://withwanderingheart.github.io/writing/info/>

## 如何新增一篇文章

1. 在对应栏目目录新建一篇 HTML：思辨、知行在 `writing/cognition/`，大浪淘金、日有所进在 `writing/info/`。页头页脚沿用栏目页。
2. 改 `title`、`description`、`canonical`、日期、标题和正文。
3. 在栏目页（`sibian.html` / `zhixing.html` / `dalang.html` / `riyou.html`）列表加上一条，并在 `writing/index.html` 同一分组加上一条。
4. 根目录 `index.html` 的「最近」只留最新几条。
5. 只有改了 `styles.css` 或 `script.js` 时，才把各页的 `?v=` 换成新参数。

`writing/index.html` 顶部的 HTML 注释里有同样的步骤。
