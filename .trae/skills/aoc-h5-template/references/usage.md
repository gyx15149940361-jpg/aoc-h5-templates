# Usage Guide

## Patch 指令（自然语言 → 操作）

| 用户说法示例 | 操作 |
|---|---|
| "把规则区放到奖品区前面" | 重排 modules 数组顺序 |
| "去掉灵感卡片" | 从 modules 移除 `inspiration` |
| "把视频区换成 how-it-works" | replace `video` → `how-it-works` |
| "在底部加一个 Tips 区" | append `tips` |
| "改下视频区标题为 XXX" | 把对象形式 `{ "id": "video", "props": { "title": "XXX" } }` 替换原条目 |
| "按这个 Figma 链接做一个 Hero 区放最前面" | 走 figma-integration.md 流程，生成 `custom-hero` 并 prepend |

## SECTIONS_JSON 格式

```json
[
  "timeline",
  "prize",
  { "id": "video", "props": { "title": "Examples" } },
  "custom-hero"
]
```

- 字符串 → 直接调用 modules.json 里 `id` 对应的 `render*` 函数（无参）
- 对象 → 调用对应 render 函数并把 `props` 中的字段按位置传入

## 字段级 Props 白名单（HARD RULE）

仅以下模块支持结构化字段修改。**允许改的是字段，不是整模块文案。** 未在表内列出的任何字符串，默认不可改。

| 模块 id | 允许修改的字段 | 不允许修改的字段 |
|---|---|---|
| `timeline` | `periods[].dateRange` | `Submission Period` / `Winner Selection` / `Winners Showcase` 等阶段标题 |
| `prize` | `prizes[]` 列表内容、数量、图片；超过 7 个时自动折叠并显示 `See more` | `Contest Prizes` 标题、`See more/See less` 文案 |
| `rules` | `items[]` 全量条目文本；`#hashtag` 自动识别并高亮 | 模块外层样式和高亮逻辑 |
| `collect-tier-reward` | `highlightAmount`、`tierRewards[]`、`milestones[]`、`tasks[]` | `UP TO` / `USD PRIZES !`、说明文案 `Reward description text`、默认按钮基础样式 |
| `video` | `title`、`videoIds[]`（由业务接口解析为视频卡片） | 非数据驱动的静态占位文案，除非由视频接口返回 |
| `other-activities` | `banners[]`（banner 图、跳转链接） | `Other Fun Activities` 标题 |

### 细化说明

1. `timeline`
   - 固定 3 个阶段，仅允许用户修改 3 个日期 `span`
   - 不允许改阶段名

2. `prize`
   - 支持修改奖励个数、奖励名称、奖励说明等列表内容
   - 支持修改奖励图片
   - 奖励图片优先根据“奖励名称 + 上线国家/地区”命中已配置素材；命不中时再走用户显式传图
   - 当奖励数 `> 7` 时，必须自动折叠超出部分，并保留点击展开行为

3. `rules`
   - 全部规则条目可改
   - 仅识别文本中的 `#hashtag` 并自动加重点色，不允许用户指定任意富文本样式

4. `collect-tier-reward`
   - 只允许修改红色金额数字，不允许改整句 `UP TO ... USD PRIZES !`
   - 说明文案 `Reward description text` 目前锁定，不可改
   - 奖励卡片列表支持改数量和奖励内容
   - 里程碑列表支持改数量和门槛
   - 任务列表支持改任务文案和任务类型
   - 任务类型采用固定枚举，按钮文案和交互应由类型自动派生，不接受任意自由文本按钮

5. `video`
   - 需要预留视频接口
   - 用户给出视频 ID 后，`article.video-card` 需通过业务接口拉取并渲染对应视频数据
   - 页面层不手写假数据卡片，除非接口不可用且用户明确接受占位

6. `other-activities`
   - 只允许修改活动入口 banner 和跳转链接

如果用户要求改某个不在白名单的字段：
1. 明确告诉用户该字段是源 repo 内置，Skill 无权修改
2. 提供两条出路：
   - **a.** 在源 repo 提 PR 修改 [script.js](https://github.com/gyx15149940361-jpg/aoc-h5-templates/blob/main/script.js) 对应 render 函数
   - **b.** 新做一个 `custom-*` 模块，但不能冒充已有模块

## CUSTOM_MODULES_JSON 格式

```json
{
  "custom-hero": "<section class=\"hero\">...</section>",
  "custom-banner": "<div class=\"banner\">...</div>"
}
```

key 必须以 `custom-` 开头，value 是完整 HTML 字符串。引用图片走 `https://raw.githubusercontent.com/.../assets/...` 或用户外链。

## 生成产物的固定写法

1. 选择最贴近的 base recipe（recipes.json）作为 `data-template` 值，让 script.js 内部资源加载逻辑正常工作（比如 reward 图片路径、CRP 状态等）。
2. 把最终模块顺序写到 `window.AOC_OVERRIDE_SECTIONS`。脚本检测到该全局变量时会跳过默认 `templateSections[activeTemplate]`。
3. 自定义模块的 HTML 挂到 `window.AOC_CUSTOM_MODULES`。
4. URL 参数兼容：`?variant=tasklist|single|tier` 用于切换 collect-* 子模块；`?crp=earning|empty|locked` 用于切换 CRP 状态；`?review=empty` 用于审核空态。这些仍然可用，无需 patch。

## 例：用户说"基于 collect 模板做一个，去掉 video，再加 tips"

最终 SECTIONS_JSON：

```json
["timeline","prize","rules","collect","activity-anchor","tips","other-activities"]
```

`data-template` 用 `5737`。

## 例：插入 Figma 新模块到最前

CUSTOM_MODULES_JSON：

```json
{ "custom-hero": "<section class=\"hero\"><h1>...</h1></section>" }
```

SECTIONS_JSON：

```json
["custom-hero","timeline","prize","rules", ...]
```

## 与底层脚本的协议

`script.js` 已内置以下扩展点（v20260626 起）：

- `window.AOC_OVERRIDE_SECTIONS`：数组，覆盖 `templateSections[activeTemplate]` 的默认配方
- `window.AOC_CUSTOM_MODULES`：对象，key 为 `custom-<slug>`，value 为完整 HTML 字符串
- 模块 id → render 函数映射表（`moduleIdToFn`）已写死在 script.js 中，与 [modules.json](./modules.json) 保持一致

只要在 `<script src=".../script.js">` 之前的 inline `<script>` 里设置这两个全局变量，`renderApp()` 会在首次渲染前自动应用覆盖。无需用户改动 repo。

数组元素的两种写法：

```js
window.AOC_OVERRIDE_SECTIONS = [
  "timeline",                                        // 字符串：无参调用
  { id: "video", props: { title: "Examples" } },     // 对象：按 props 顺序传参
  "custom-hero"                                      // custom-* 前缀：读 AOC_CUSTOM_MODULES
];
```
