# Figma → Custom Module 流程

## 触发条件

用户消息满足任一即触发此流程：
- 包含 figma.com 链接
- 明确说"按设计稿做一个模块"/"把这个 Figma 节点变成模块"
- 给出 node-id 参数

## 步骤

### 1. 获取设计上下文
调用 figma MCP：

```
get_design_context(node_id=<extracted_id>, depth=2)
get_screenshot(node_id=<extracted_id>)
```

若返回过大，先用 `get_metadata` 拿大纲，再针对子节点重复 `get_design_context`。

### 2. 翻译为 HTML 片段

约束：
- **只输出一段** HTML，外层是单个 `<section class="custom-block custom-<slug>">`
- **复用现有 design tokens**：颜色、间距、字号优先查 styles.css 现有 class（如 `.page-shell`、`.section-title`、`.btn-primary`、`.card-base` 等）
- 自定义 CSS 用 inline `<style>` 写在 section 内部，class 名带 `custom-<slug>-` 前缀，避免污染全局
- 图片资源：若 Figma 给出 localhost 图片 URL，直接保留；若需托管，提示用户上传到 repo 的 `assets/figma/` 目录后再用 raw URL

### 3. 注册到 CUSTOM_MODULES

把生成的 HTML 字符串作为 `custom-<slug>` 的值添加到 `window.AOC_CUSTOM_MODULES`。

### 4. 注入到配方

向用户确认插入位置（开头 / 末尾 / 某个已有模块之前/之后），然后调整 SECTIONS_JSON。

## 示例

用户："https://www.figma.com/design/.../?node-id=123-456 把这个 hero 放在最前面"

执行：
1. `get_design_context(node_id="123:456")` → 拿到 hero 的结构
2. `get_screenshot(node_id="123:456")` → 视觉参考
3. 生成 HTML：
   ```html
   <section class="custom-block custom-hero">
     <style>
       .custom-hero-bg { background: linear-gradient(...); padding: 24px 16px; }
       .custom-hero-title { font: 700 28px/1.2 var(--font-base); color: #fff; }
     </style>
     <div class="custom-hero-bg">
       <h1 class="custom-hero-title">活动主题</h1>
       <p class="custom-hero-sub">副标题</p>
     </div>
   </section>
   ```
4. 写入产物：
   ```js
   window.AOC_CUSTOM_MODULES = { "custom-hero": "<section ...>" };
   window.AOC_OVERRIDE_SECTIONS = ["custom-hero", "timeline", ...];
   ```

## 容错

- 若 figma MCP 不可用：提示用户先运行 `/figma` 显式加载该 skill 后回到本任务
- 若 Figma 节点过复杂（含动画 / 视频 / 数据可视化）：仅还原静态布局，并在交付说明里告知用户哪些交互/动画未实现
- 若节点尺寸明显不是 H5 移动端宽度（375 / 750）：按等比缩放策略适配，写明缩放比

## 不做的事

- 不重新设计、不补全设计师未提供的细节
- 不下载 Figma 私有字体到 repo（沿用 styles.css 已有的 TikTokSans-VF.woff2）
- 不为新模块单独创建 JS 行为（如需交互，提示用户在 repo 的 script.js 加 bind 函数）
