# AOC H5 Template Skill — 安装与使用说明

一句话生成基于 AOC H5 模板库的营销落地页。支持 5 套预设模板 + 17 个视觉区块模块的自由替换/删除/新增，可通过 Figma MCP 把 Figma 设计稿翻译成新模块插入。

Skill 本体仅 28 KB，不含任何 PNG/字体/JS/CSS — 这些资源在运行时从公开 GitHub repo 自动加载。

---

## 1. 安装

第 1 步 — 解压 `aoc-h5-template-skill.zip`，得到一个 `aoc-h5-template/` 文件夹。

第 2 步 — 把整个 `aoc-h5-template/` 文件夹放到下面任一位置：

| 位置 | 生效范围 | 命令示例 |
|---|---|---|
| **全局（推荐）** | 所有项目都能调用 | `cp -R aoc-h5-template ~/.trae-cn/skills/` |
| **单个项目** | 仅在该项目里生效 | `cp -R aoc-h5-template <项目>/.trae/skills/` |

第 3 步 — 重启 TRAE 编辑器，让它重新扫描 Skill 目录。

第 4 步 — 验证：在对话框输入一句"用 AOC H5 模板做一个 collect 玩法的活动页"，如果 TRAE 自动调用了 `aoc-h5-template` Skill，说明安装成功。

---

## 2. 使用方式

直接用自然语言告诉 TRAE 你想要什么。Skill 会引导你确认模板、调整模块、生成单个 HTML 文件。

### 典型场景

| 想要做的事 | 一句话示例 |
|---|---|
| 从 5 套预设里挑一套 | "用 AOC 模板第 2 套做一个 Campaign 活动页" |
| 在预设上微调 | "用 collect 玩法做一个，去掉视频区，最后加一个 tips 区" |
| 复用模块 | "把 work-review 这个审核模块加到我的活动页里" |
| 增删调序 | "把规则区放到奖品区前面" |
| 改文案 | "把视频区标题改成 Examples & Inspiration" |
| 加 Figma 新模块 | "https://www.figma.com/design/.../?node-id=123-456 把这个 hero 放在最前面" |

### 5 套预设模板速览

| 配方 id | 定位 | 适用场景 |
|---|---|---|
| `base` | 通用基础版 | 标准活动页：时间线 + 奖品 + 规则 + 灵感 |
| `4802` | Campaign 任务型 | 带具体任务列表的 Campaign |
| `5737` | Collect 收集玩法 | 进度收集 / 阶梯奖励，3 种变体（tasklist / single / tier）|
| `6222` | How-it-works 解释型 | 新玩法 / 复杂规则，重在步骤说明 |
| `3425` | CRP 审核型 | Creator Reward Plan 类，含作品审核 + 创作指南 + Tips |

### 生成时的默认规则

- Skill 每次都必须先识别并选中 1 套预设模板，再基于该模板的完整默认模块做修改。
- 用户如果只说“改奖励”“改任务”“改规则”，表示在对应模板里改内容，不表示删掉其他默认模块。
- 除非用户明确说“去掉 / 删除 / 替换”某个模块，否则模板自带模块要保留。

例如：
- `5737` Collect 默认带：`timeline`、`prize`、`rules`、`collect`、`video`、`activity-anchor`、`other-activities`
- `3425` CRP 默认带：`rules`、`collect-rich`、`work-review`、`guidance`、`tips`、`activity-anchor`、`other-activities`

### 17 个可组合模块

`timeline` `prize` `rules` `campaign-tasks` `collect-task-list` `collect-single-reward` `collect-tier-reward` `collect` `collect-rich` `how-it-works` `video` `inspiration` `activity-anchor` `other-activities` `work-review` `guidance` `tips`

完整说明见 zip 内的 `aoc-h5-template/references/modules.json`。

### 文案修改边界（重要！）

为了保持设计稿一致性、避免翻译走样，Skill 对文案修改有硬性限制：

| 类别 | 是否允许 Skill 修改 |
|---|---|
| 模块内置英文文案（标题、按钮、规则、奖品名等） | ❌ 禁止 |
| 模块开放的 props 字段（目前只有 `video.title`） | ✅ 允许 |
| `custom-*` 自定义模块（用户/Figma 提供的整段 HTML） | ✅ 允许 |
| 默认语言 | 锁定 `en`（英文） |

如果你想改某段内置文案（比如把"Post to Win Rewards"翻译成中文，或改成"Win Big Prizes"），有两条路：
1. **改源 repo**：去 [aoc-h5-templates](https://github.com/gyx15149940361-jpg/aoc-h5-templates) 提 PR 修改 `script.js` 对应 render 函数
2. **整段重写**：让 Skill 把该模块以 `custom-<slug>` 形式重写，但你要自己提供完整 HTML 和样式还原

⚠️ **不要让 Skill 帮你"翻译现成模块"**，那样会绕过约束、生成的页面会和设计稿不一致。

---

## 3. 产物如何打开

Skill 生成单个 HTML 文件（默认文件名 `template-custom-<slug>.html`）。

- 直接双击在浏览器打开即可预览，**无须本地服务器、无须 npm install**
- 所有 CSS / JS / 图片 / 字体都从发布地址加载：
  `https://cdn.jsdelivr.net/gh/gyx15149940361-jpg/aoc-h5-templates@main/...`
- 想换 CDN，请联系 Skill 维护者更新 SKILL.md 里的 `CDN_BASE`

---

## 4. Figma 集成

需要先安装并启用 `figma` Skill（即 Figma MCP）。当你提供 Figma 链接或 node-id 时，本 Skill 会自动调用 Figma MCP 获取设计稿，翻译成 HTML 片段并插入到模板。

如果 Figma MCP 未配置，Skill 会提示你先运行 `/figma` 完成设置。

---

## 5. 常见问题

**Q: 安装后 TRAE 没识别这个 Skill？**
- 确认目录结构是 `~/.trae-cn/skills/aoc-h5-template/SKILL.md`（路径里只有一层 `aoc-h5-template/`，不要套两层）
- 重启 TRAE 编辑器

**Q: 生成的 HTML 打开是白屏？**
- 检查浏览器是否拦截了发布地址资源，或旧产物是否仍引用了 `raw.githubusercontent.com`
- 打开开发者工具看 Network，应该能看到 styles.css / script.js 200 返回

**Q: Finder 看不到 `~/.trae-cn/` 这个目录？**
- macOS 默认隐藏点开头的文件夹。在 Finder 按 `⌘ + Shift + .` 临时显示，或用 `⌘ + Shift + G` 直接粘贴路径访问

**Q: 想本地修改 Skill 指令？**
- 直接编辑 `aoc-h5-template/SKILL.md` 或 `references/` 下的文件，重启 TRAE 即可

---

## 6. 反馈

源代码仓库：https://github.com/gyx15149940361-jpg/aoc-h5-templates

Skill 内容遇到问题或想新增模块，请直接在 repo 提 issue 或 PR。
