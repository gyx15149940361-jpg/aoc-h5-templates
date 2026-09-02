---
name: aoc-h5-template
description: 一句话生成基于 AOC H5 模板库的营销落地页。支持 5 套预设模板 + 30+ 视觉区块模块的自由替换/删除/新增，可调用 figma MCP 把 Figma 设计转成新模块。当用户提到"H5 模板""AOC 模板""H5 营销页""H5 落地页""模板组装""替换/新增/删除 H5 模块"时触发。
metadata:
  version: "1.0.0"
---

# AOC H5 Template Skill

为 AOC 营销活动一键生成 H5 落地页。底层资源（CSS、JS、图片、字体）全部通过可直接加载的发布地址引用，Skill 本身只承载模块清单、配方和组装规则，体积保持在 30KB 以内。

## 1. 资源根 URL

```
CDN_BASE = https://cdn.jsdelivr.net/gh/gyx15149940361-jpg/aoc-h5-templates@main
```

- 样式表：`${CDN_BASE}/styles.css`
- 渲染脚本：`${CDN_BASE}/script.js`
- 资源目录：`${CDN_BASE}/assets/...`

所有生成的 H5 必须通过该发布地址引用资源，禁止把 CSS/JS/图片复制进生成产物。

## 2. 工作流（必须按顺序执行）

第 1 步 — **理解需求**
- 用户给出活动名/目标/风格，或直接指明使用第 N 套模板。
- 默认产物：单个 HTML 文件（可在浏览器直接打开预览）。

第 2 步 — **挑选配方**
- 读取 [references/recipes.json](./references/recipes.json)，列出 5 套预设配方（base / 4802 / 5737 / 6222 / 3425），向用户简短说明每套的定位和包含的区块。
- 若用户语义明确（如"竞赛排行""收集任务""审核类活动"），直接选配方；否则用 1 条对照说明请用户挑选。

第 3 步 — **可选定制**
- 用户可要求替换、删除、新增模块。读取 [references/modules.json](./references/modules.json) 拿到模块清单（每条含 id / name / 用途 / 默认顺序），按需调整配方。
- 增删替换规则见 [references/usage.md](./references/usage.md) 的「Patch 指令」章节。

**默认继承规则（HARD RULE）**
- 每次生成都必须先确定 1 个 recipe id，再从该 recipe 的完整 `modules` 数组出发生成页面。
- 用户如果只说“改奖励”“改任务”“改规则”“做一个 collect/campaign/CRP 页面”，这表示**在已选 recipe 上修改对应模块**，不是从零拼一个只包含被提及模块的页面。
- 除非用户明确说“删除 / 去掉 / 替换”某个模块，否则 recipe 自带模块必须保留。
- 例如选择 `5737`（Collect）后，即使用户只提奖励和任务，默认仍应保留 `timeline`、`activity-anchor`、`other-activities`；选择 `3425`（CRP）后则默认保留 `work-review`、`guidance`、`tips` 等 recipe 内置模块。

第 4 步 — **如需 Figma 新模块**
- 当用户提供 Figma 链接或要求"按设计稿做一个模块"时，按 [references/figma-integration.md](./references/figma-integration.md) 流程：
  1. 调用 figma MCP 的 `get_design_context` + `get_screenshot`
  2. 把节点翻译为单段 HTML/CSS 片段（沿用 styles.css 的 design token 类名）
  3. 写成一个新的 `render*` 函数注入到 H5 输出里
- 若 Skill 加载 figma 工具失败，提示用户用 `/figma` 显式触发后再回到本 Skill。

第 5 步 — **生成 HTML 文件**
- 用 [references/output-template.html](./references/output-template.html) 作为骨架，把选定的模块顺序写入 `window.AOC_OVERRIDE_SECTIONS`（脚本会优先读取它，覆盖 templateSections 的默认配方）。
- 任何"新增/替换"的自定义模块，把它的 HTML 字符串挂到 `window.AOC_CUSTOM_MODULES`。
- 文件名默认 `template-custom-<slug>.html`，路径放在用户当前工作目录。

第 6 步 — **交付**
- 用 file:/// 链接告知用户文件路径
- 列出最终采用的模块顺序、是否包含 Figma 新模块、资源发布地址出处
- 提示用户用浏览器直接打开即可预览（无须本地服务器）

## 3. 模块粒度

中粒度视觉区块。共 15 个 section 级模块 + 多个内置子组件。完整列表在 [references/modules.json](./references/modules.json)。常用：

- `timeline` — 倒计时/活动时间
- `prize` — 奖品展示（含 prize cards）
- `rules` — 规则条款
- `campaign-tasks` — Campaign 任务列表
- `collect-task-list` / `collect-single-reward` / `collect-tier-reward` — Collect 玩法三档
- `how-it-works` — 玩法步骤说明
- `video` — 示例视频区
- `inspiration` — 灵感卡片
- `activity-anchor` — 活动入口锚点
- `other-activities` — 其他活动
- `work-review` — 作品审核区（CRP）
- `guidance` — 创作指南
- `tips` — Tips 列表

新增模块（来自 Figma 或自定义）使用 `custom-*` 前缀的 id。

## 4. 输出规则

- 仅生成 1 个 HTML 文件（含必要的 inline `<script>` 配置）
- 不要把 CSS/JS 内联到 HTML，全部走 CDN_BASE
- 不要写 README、不要写多余说明文档
- **默认语言一律使用英文**（lang="en"）。这是为了与源 repo 内置文案保持一致，避免文案错位/翻译丢失语义。
- 一定要写 `<meta name="viewport" content="width=device-width, initial-scale=1">`

## 5. 文案与字段修改边界（HARD RULE，不可违反）

默认原则：**不是整模块开放，而是字段级白名单开放。** 允许修改哪些字段，以 [references/modules.json](./references/modules.json) 和 [references/usage.md](./references/usage.md) 的 field-level policy 为准。

| 类别 | 是否允许改文案 | 实现方式 |
|---|---|---|
| 模块中未列入白名单的内置字符串（标题、按钮、提示、标签等） | **禁止** | 由源 `script.js` 统一维护，Skill 不得改写 |
| 模块中列入白名单的字段（如 timeline 的日期、rules 条目、prize 列表等） | **允许** | 通过结构化 props 传入，仅改指定字段 |
| URL 变体参数（variant / crp / review） | **允许** | 通过 `data-collect-variant` 等属性或 URL query 设置 |
| `custom-*` 模块（用户自定义或 Figma 新增） | **允许** | 用户对自己的 HTML 全权负责 |

**关键禁令：**
- 严禁修改白名单之外的文案，哪怕同一模块内其他字段允许改。
- 严禁通过把现成模块改写成 `custom-*` 的方式来绕过字段级限制。
- 严禁把未开放的英文内置文案翻译成中文或其他语言后塞回 `AOC_CUSTOM_MODULES`。
- 若用户要求修改的字段不在白名单内，必须明确拒绝，并指出应在源 repo 中调整对应 render 函数。

## 6. 边界

- 仅支持 H5 单页输出，不做多页路由
- 仅支持发布地址作为资源源；默认使用 jsDelivr 的 GitHub 发布入口。如果用户要换 CDN，提示其先上传同结构资产
- 修改底层 styles.css / script.js 不在 Skill 职责内，超出范围时引导用户直接在源 repo 改

详细字段、API、示例见 references 目录的 4 个文件。
