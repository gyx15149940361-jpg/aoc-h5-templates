const app = document.querySelector("#app");

const templateOrder = ["base", "4802", "5737", "6222", "3425"];
const query = new URLSearchParams(window.location.search);
const embeddedTemplate = app?.dataset.template || document.body.dataset.template || "";
const requestedTemplate = (query.get("template") || embeddedTemplate)
  .replace(/^4[:-]/, "")
  .replace(/^node-/, "");
const activeTemplate = templateOrder.includes(requestedTemplate) ? requestedTemplate : "base";
const CONTENT = window.AOC_CONTENT || {};
const I18N = window.AOC_I18N || {};

function t(key, fallback = "") {
  if (Object.prototype.hasOwnProperty.call(I18N, key)) {
    return I18N[key];
  }
  return fallback || key;
}

function getContent(path, fallback) {
  const value = path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), CONTENT);
  return value === undefined ? fallback : value;
}

const statusIcons = {
  signal: `<svg class="status-signal" width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.48828 7.99902C3.17542 7.99902 3.73238 8.53566 3.73242 9.19824V11.5977C3.73242 12.2603 3.17545 12.7979 2.48828 12.7979H1.24414C0.557013 12.7978 0 12.2603 0 11.5977V9.19824C4.37578e-05 8.53568 0.55704 7.99907 1.24414 7.99902H2.48828ZM8.34375 5.59863C9.03091 5.59863 9.58789 6.1362 9.58789 6.79883V11.5977C9.58789 12.2603 9.03091 12.7979 8.34375 12.7979H7.09961C6.41248 12.7978 5.85547 12.2603 5.85547 11.5977V6.79883C5.85547 6.13623 6.41248 5.59868 7.09961 5.59863H8.34375ZM14.1992 2.7998C14.8863 2.7998 15.4432 3.33655 15.4434 3.99902V11.5977C15.4434 12.2603 14.8864 12.7979 14.1992 12.7979H12.9551C12.268 12.7978 11.7109 12.2603 11.7109 11.5977V3.99902C11.7111 3.33657 12.2681 2.79985 12.9551 2.7998H14.1992ZM20.0537 0C20.7409 0 21.2979 0.537572 21.2979 1.2002V11.5977C21.2979 12.2603 20.7409 12.7979 20.0537 12.7979H18.8096C18.1224 12.7978 17.5654 12.2603 17.5654 11.5977V1.2002C17.5654 0.537598 18.1224 4.23049e-05 18.8096 0H20.0537Z" fill="black"/></svg>`,
  connection: `<svg class="status-connection" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.28223 9.95884C7.75889 8.67986 9.92181 8.67982 11.3984 9.95884C11.4726 10.0276 11.5155 10.125 11.5176 10.2274C11.5196 10.3299 11.4806 10.429 11.4092 10.5008L9.09669 12.8905C9.02892 12.9606 8.9362 12.9999 8.83985 12.9999C8.74349 12.9998 8.65076 12.9607 8.58302 12.8905L6.27052 10.5008C6.19914 10.429 6.16007 10.3299 6.16212 10.2274C6.16424 10.1248 6.20789 10.0276 6.28223 9.95884ZM3.19727 6.77037C6.37863 3.74015 11.305 3.74009 14.4863 6.77037C14.5582 6.84144 14.5996 6.93958 14.6006 7.04185C14.6015 7.14402 14.5625 7.24281 14.4922 7.31529L13.1553 8.6981C13.0175 8.83924 12.7946 8.8424 12.6533 8.70494C11.6087 7.73624 10.2501 7.19911 8.84083 7.19908C7.43234 7.19968 6.07335 7.73676 5.0293 8.70494C4.88804 8.84199 4.66596 8.83902 4.52833 8.6981L3.19141 7.31529C3.12092 7.24289 3.08212 7.14408 3.08302 7.04185C3.08396 6.93955 3.12541 6.84143 3.19727 6.77037ZM0.111336 3.59166C4.99087 -1.19727 12.6888 -1.19716 17.5684 3.59166C17.639 3.66279 17.6791 3.75975 17.6797 3.86119C17.6803 3.96265 17.6421 4.06068 17.5723 4.13267L16.2334 5.51549C16.0956 5.65713 15.8724 5.65877 15.7324 5.51939C13.8734 3.70941 11.4059 2.70026 8.84083 2.70006C6.27536 2.70005 3.8076 3.70921 1.94825 5.51939C1.80833 5.65928 1.58407 5.65761 1.4463 5.51549L0.108406 4.13267C0.0386479 4.06064 -0.000636694 3.96264 7.80721e-06 3.86119C0.000659323 3.75977 0.0407069 3.66274 0.111336 3.59166Z" fill="black"/></svg>`,
  battery: `<svg class="status-battery" width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#clip0_status_battery)"><rect opacity="0.4" x="0.538462" y="0.538462" width="25.8462" height="12.9231" rx="3.76923" stroke="black" stroke-width="1.07692"/><path opacity="0.5" d="M28 4.84619V9.15388C28.8679 8.78905 29.4323 7.94034 29.4323 7.00004C29.4323 6.05974 28.8679 5.21103 28 4.84619" fill="black"/><rect x="2.1543" y="2.15381" width="18.3077" height="9.69231" rx="2.15385" fill="black"/></g><defs><clipPath id="clip0_status_battery"><rect width="29.4323" height="14" fill="white"/></clipPath></defs></svg>`,
};

const LAUNCH_CURRENCY = "USD";

const CURRENCY_FOLDER = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  JPY: "JPY",
  KRW: "KRW",
  IDR: "IDR",
  VND: "VND",
  THB: "บาท",
};

const REWARD_PIC_BASE = "./assets/reward_pic";
const PROFILE_FRAME_IMAGE = "./assets/profile-frame-78-3305-682e06.png";
const REVIEW_EMPTY_STATE_IMAGE = "./assets/review-empty-illustration.png";
const REVIEW_PANEL_VARIANT = query.get("review") === "empty" ? "empty" : "list";
const CRP_COLLECT_STATE = query.get("crp") || "earning";
const COLLECT_VARIANT = (query.get("variant") || app?.dataset.collectVariant || "default").toLowerCase();

function rewardPicUrl(relPath) {
  return encodeURI(`${REWARD_PIC_BASE}/${relPath}`);
}

function cashAmountToLevel(amount) {
  if (amount >= 1000) return 1;
  if (amount >= 500) return 2;
  if (amount >= 100) return 3;
  if (amount >= 10) return 4;
  return 5;
}

function cashImageByLevel(level, currency = LAUNCH_CURRENCY) {
  if (level <= 3) {
    const folder = CURRENCY_FOLDER[currency] || CURRENCY_FOLDER.USD;
    return rewardPicUrl(`cash/${folder}/Level ${level}.png`);
  }
  return rewardPicUrl(`cash/Level ${level}.png`);
}

const NON_CASH_KEYWORDS = [
  { test: /swag/i, file: "Swag_01.png" },
  { test: /trophy|bonus/i, file: "Trophy.png" },
  { test: /medal|surprise/i, file: "Medal.png" },
  { test: /ticket/i, file: "Ticket.png" },
  { test: /boarding|pass/i, file: "Boarding Pass.png" },
  { test: /heating/i, file: "Heating Coupon.png" },
  { test: /promote|coupon/i, file: "Promote Coupon.png" },
  { test: /top creator|creator/i, file: "Top Creator.png" },
];

function nonCashImage(text) {
  const hit = NON_CASH_KEYWORDS.find((k) => k.test.test(text));
  return hit ? rewardPicUrl(`other type/${hit.file}`) : "";
}

function resolveRewardImage(...texts) {
  const text = texts.filter(Boolean).join(" ");
  const cashMatch = text.match(/\$\s*([\d,]+(?:\.\d+)?)/);
  if (cashMatch || /cash/i.test(text)) {
    const amount = cashMatch ? parseFloat(cashMatch[1].replace(/,/g, "")) : 0;
    return cashImageByLevel(cashAmountToLevel(amount));
  }
  return nonCashImage(text);
}

function renderRewardArt(sizeClass, ...texts) {
  const src = resolveRewardImage(...texts);
  const cls = ["reward-art", sizeClass, src ? "has-img" : ""].filter(Boolean).join(" ");
  return `<div class="${cls}" aria-hidden="true">${src ? `<img src="${src}" alt="" />` : ""}</div>`;
}

function renderProfileFrameArt(sizeClass = "") {
  const cls = ["reward-art", sizeClass, "has-img"].filter(Boolean).join(" ");
  return `<div class="${cls}" aria-hidden="true"><img src="${PROFILE_FRAME_IMAGE}" alt="" /></div>`;
}


function renderReviewEmptyState() {
  return `
    <div class="review-empty-state">
      <div class="review-empty-state-hero">
        <img class="review-empty-state-image" src="${REVIEW_EMPTY_STATE_IMAGE}" alt="" aria-hidden="true" />
      </div>
      <strong>${t("review.emptyTitle", "No submission yet, you can post now")}</strong>
    </div>
  `;
}

function renderStatusBar() {
  return `
    <div class="mock-status-bar" aria-hidden="true">
      <span class="mock-status-time">8:00</span>
      <div class="mock-status-icons">
        ${statusIcons.signal}
        ${statusIcons.connection}
        ${statusIcons.battery}
      </div>
    </div>
  `;
}

function renderNavigation() {
  return `
    <div class="navigation-bar">
      <div class="navigation-bar-veil" aria-hidden="true"></div>
      ${renderStatusBar()}
      <nav class="top-nav" aria-label="${t("navigation.ariaLabel", "Page actions")}">
        <button class="nav-back" type="button" aria-label="${t("navigation.back", "Back")}"></button>
        <div class="nav-actions">
          <button type="button">${t("navigation.share", "Share")}</button>
          <button type="button">${t("navigation.rules", "Rules")}</button>
        </div>
      </nav>
    </div>
  `;
}

function renderShell(content) {
  return `
    <div class="page-shell template-${activeTemplate}" data-template="${activeTemplate}">
      <header class="kv" aria-label="${t("shell.heroAria", "Campaign hero")}">
        ${renderNavigation()}
      </header>
      <main class="slot">${content}</main>
      <footer class="bottom-cta">
        <button type="button">${t("shell.postCta", "Post")}</button>
        <a href="#">${t("shell.unauthorizedAccess", "Unauthorized Access")}</a>
        <span aria-hidden="true"></span>
      </footer>
    </div>
  `;
}

function renderFloor(title, body, className = "") {
  const id = `${className || "floor"}-${activeTemplate}`.replace(/\s+/g, "-");
  return `
    <section class="floor ${className}" aria-labelledby="${id}">
      <h2 id="${id}" class="floor-title">${title}</h2>
      ${body}
    </section>
  `;
}

function renderTimeline() {
  const periods = getContent("timeline.periods", []);
  return `
    <section class="timeline" aria-label="${t("timeline.ariaLabel", "Contest timeline")}">
      <div class="timeline-labels">
        ${periods
          .map(
            (period) => `
              <div${period.active ? ' class="is-active"' : ""}>
                <strong>${t(period.labelKey, period.labelKey)}</strong>
                <span>${period.dateRange}</span>
              </div>
            `
          )
          .join("")}
      </div>
      <div class="timeline-track" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  `;
}

function renderPrizeCard(card) {
  const art = card.upload
    ? renderProfileFrameArt("")
    : card.image
      ? `<div class="reward-art has-img" aria-hidden="true"><img src="${card.image}" alt="" /></div>`
      : renderRewardArt("", card.prize);
  return `
    <article class="prize-card mini-prize${card.extra ? " is-extra-prize" : ""}">
      ${art}
      <p><span>${card.rank}</span><strong>${card.prize}</strong></p>
    </article>
  `;
}

function renderPrizeSection() {
  const toggleId = `prize-toggle-${activeTemplate}`;
  const prizeContent = getContent("prize", { grandPrize: {}, cards: [] });
  const grandPrize = prizeContent.grandPrize || {};
  return renderFloor(
    t("prize.floorTitle", "Contest Prizes"),
    `
      <div class="prizes-stack">
        <input class="prize-toggle" id="${toggleId}" type="checkbox" aria-label="${t("prize.toggleAria", "Toggle more prizes")}" />
        <div class="prize-wrap" aria-label="${t("prize.listAria", "Prize list")}">
          <article class="prize-card grand-prize">
            ${renderRewardArt("cash-large", `${grandPrize.amount || ""} ${grandPrize.label || ""}`)}
            <div>
              <span class="prize-rank">${grandPrize.rank || ""}</span>
              <strong>${grandPrize.amount || ""}</strong>
              <span>${grandPrize.label || ""}</span>
            </div>
          </article>
          ${(prizeContent.cards || []).map(renderPrizeCard).join("")}
        </div>
        <label class="see-more prize-toggle-label" for="${toggleId}" role="button" tabindex="0">
          <span class="more-label">${t("common.seeMore", "See more")}</span>
          <span class="less-label">${t("common.seeLess", "See less")}</span>
          <i aria-hidden="true"></i>
        </label>
      </div>
    `,
    "prizes-floor"
  );
}

function highlightHashtags(text) {
  const stash = [];
  const safe = text.replace(/<strong>[\s\S]*?<\/strong>/g, (m) => {
    stash.push(m);
    return `\u0000${stash.length - 1}\u0000`;
  });
  const replaced = safe.replace(/#[A-Za-z0-9_]+/g, (m) => `<strong>${m}</strong>`);
  return replaced.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)]);
}

function renderRulesSection() {
  const rules = getContent("rules.items", []);
  return renderFloor(
    t("rules.floorTitle", "How to Enter the Contest"),
    `
      <div class="panel rules-panel">
        ${rules
          .map((rule) => `<p><i aria-hidden="true"></i><span>${highlightHashtags(rule)}</span></p>`)
          .join("")}
      </div>
    `,
    "rules-floor"
  );
}

function renderTinyPostButton(label = "Post") {
  return `<button class="tiny-post" type="button">${label || t("common.post", "Post")}</button>`;
}

function renderPanelCopy(text, withHelp = false, className = "") {
  const copyClass = ["panel-copy", withHelp ? "has-help-icon" : "", className].filter(Boolean).join(" ");
  return `<p class="${copyClass}"><span>${text}</span>${withHelp ? `<i aria-hidden="true"></i>` : ""}</p>`;
}

function renderRewardTask(title, copy, withButton = true, className = "", options = {}) {
  const taskClass = ["reward-task", className].filter(Boolean).join(" ");
  const showIcon = options.showIcon !== false;

  return `
    <div class="${taskClass}">
      ${showIcon ? `<i aria-hidden="true"></i>` : ""}
      <div>
        <strong>${title}</strong>
        <p>${copy}</p>
      </div>
      ${withButton ? renderTinyPostButton(options.buttonLabel) : ""}
    </div>
  `;
}

function renderCampaignTasksSection() {
  const toggleId = `campaign-toggle-${activeTemplate}`;
  const campaign = getContent("campaign", { tabs: [], tasks: [] });

  return renderFloor(
    t("campaign.floorTitle", "Post to Win Rewards"),
    `
      <div class="campaign-shell">
        <input class="campaign-toggle" id="${toggleId}" type="checkbox" aria-label="Toggle more tasks" />
        <div class="chip-row" role="tablist" aria-label="${t("campaign.tablistAria", "Topics")}">
          ${(campaign.tabs || [])
            .map(
              (tab, index) =>
                `<button type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}">${tab}</button>`
            )
            .join("")}
        </div>
        <div class="panel campaign-panel">
          <div class="campaign-note">
            <strong><i aria-hidden="true"></i><span>${campaign.noteTitle || ""}</span></strong>
            <p>${campaign.noteCopy || ""}</p>
          </div>
          <div class="reward-task-list">
            ${(campaign.tasks || [])
              .map((task) =>
                renderRewardTask(task.title, task.copy, true, task.extraClass || "", {
                  showIcon: task.showIcon,
                  buttonLabel: task.buttonLabel,
                })
              )
              .join("")}
          </div>
          <label class="see-more campaign-toggle-label" for="${toggleId}" role="button" tabindex="0">
            <span class="more-label">${t("common.seeMore", "See more")}</span>
            <span class="less-label">${t("common.seeLess", "See less")}</span>
            <i aria-hidden="true"></i>
          </label>
        </div>
      </div>
    `,
    "tasks-floor"
  );
}

function renderCollectCompactSection() {
  const compact = getContent("collect.compact", {});
  const rankRewards = compact.rankRewards || [];

  const renderRankReward = ({ rank, amount, label, level }) => {
    const src = cashImageByLevel(level);
    const art = `<i class="reward-art has-img" aria-hidden="true"><img src="${src}" alt="" /></i>`;
    return `<article><span>${rank}</span>${art}<strong>${amount}<br />${label}</strong></article>`;
  };

  return renderFloor(
    t("collect.floorTitle", "How to Collect Rewards"),
    `
      <div class="collect-panel collect-panel-compact">
        <div class="collect-card collect-card-task">
          ${renderPanelCopy(t("collect.rewardDescription", "Reward description text"), true)}
          ${renderRewardTask(compact.lockedRewardTask?.title || "", compact.lockedRewardTask?.copy || "", true, "locked-reward-task", { buttonLabel: compact.lockedRewardTask?.buttonLabel })}
        </div>
        <div class="collect-card collect-card-ranking">
          <p class="collect-highlight-title">${t("collect.upToPrefix", "UP TO")} <span>${compact.highlightAmount || ""}</span> ${t("collect.upToSuffix", "USD PRIZES !")}</p>
          ${renderPanelCopy(t("collect.rewardDescription", "Reward description text"), true)}
          <div class="rank-rewards">
            ${rankRewards.map(renderRankReward).join("")}
          </div>
          <div class="collect-divider"></div>
          ${renderRewardTask(compact.statusTask?.title || "", compact.statusTask?.copy || "", true, "status-task", {
            showIcon: false,
            buttonLabel: compact.statusTask?.buttonLabel,
          })}
        </div>
      </div>
    `,
    "collect-floor"
  );
}

function renderTaskProgress({ value, total }) {
  return `
    <div class="cv-progress">
      <span class="cv-progress-bar" aria-hidden="true"><span style="width:${Math.min(100, Math.round((value / total) * 100))}%"></span></span>
      <span class="cv-progress-text"><em>${value}</em><span>/${total}</span></span>
    </div>
  `;
}

function renderCollectTaskListVariantSection() {
  const tasks = getContent("collect.taskList.tasks", []);

  const renderArt = (state) =>
    `<i class="cv-art cv-art--${state}" aria-hidden="true"></i>`;

  const renderTaskItem = (task) => {
    const isDone = task.kind === "done";
    const artState = isDone ? "done" : "locked";
    const buttonHTML = isDone
      ? `<button class="tiny-post tiny-post--done" type="button" disabled>${task.buttonLabel}</button>`
      : `<button class="tiny-post" type="button">${task.buttonLabel}</button>`;

    return `
      <article class="cv-task-row">
        ${renderArt(artState)}
        <div class="cv-task-body">
          <strong>${task.title}</strong>
          <p>${task.copy}</p>
          ${task.kind === "progress" ? renderTaskProgress(task.progress) : ""}
        </div>
        ${buttonHTML}
      </article>
    `;
  };

  return renderFloor(
    t("collect.floorTitle", "How to Collect Rewards"),
    `
      <div class="collect-panel collect-panel-variant cv-task-list">
        ${renderPanelCopy(t("collect.rewardDescription", "Reward description text"), true)}
        <div class="cv-task-stack">
          ${tasks.map(renderTaskItem).join('<div class="cv-divider"></div>')}
        </div>
      </div>
    `,
    "collect-floor"
  );
}

function renderCollectSingleRewardVariantSection() {
  const singleReward = getContent("collect.singleReward", {});
  const tasks = singleReward.tasks || [];

  const renderTask = (task) => `
    <article class="cv-task-row cv-task-row--plain">
      <div class="cv-task-body">
        <strong>${task.title}</strong>
        ${task.copy ? `<p>${task.copy}</p>` : ""}
        ${task.progress ? renderTaskProgress(task.progress) : ""}
      </div>
      <button class="tiny-post" type="button">${task.buttonLabel}</button>
    </article>
  `;

  return renderFloor(
    t("collect.floorTitle", "How to Collect Rewards"),
    `
      <div class="collect-panel collect-panel-variant cv-single-reward">
        <div class="cv-single-card">
          <div class="cv-single-art" aria-hidden="true"></div>
          <div class="cv-single-body">
            <strong>${singleReward.cardTitle || ""}</strong>
            <span class="cv-single-meta"><span>${singleReward.cardMeta || ""}</span><i aria-hidden="true"></i></span>
          </div>
          <span class="cv-single-lock" aria-hidden="true"></span>
        </div>
        <div class="cv-section-title">${singleReward.sectionTitle || ""}</div>
        <div class="cv-task-stack">
          ${tasks.map(renderTask).join('<div class="cv-divider"></div>')}
        </div>
      </div>
    `,
    "collect-floor"
  );
}

function renderCollectTierRewardVariantSection() {
  const tierReward = getContent("collect.tierReward", {});
  const tiers = tierReward.tiers || [];
  const milestones = tierReward.milestones || [];
  const reachedMilestoneIndex = tierReward.reachedMilestoneIndex || 0;
  const tierCount = tiers.length;
  const tierStageClass = tierCount >= 3 ? "cv-tier-stage is-scrollable" : "cv-tier-stage";

  const renderTier = ({ label, art }) => {
    const labelHTML = label.split("\n").map((line) => `<span>${line}</span>`).join("");
    return `<article class="cv-tier-card"><span class="cv-tier-art" aria-hidden="true"><img src="${art}" alt="" /></span><strong>${labelHTML}</strong></article>`;
  };

  const renderMilestone = ({ text, state }) => `
    <div class="cv-milestone cv-milestone--${state}">
      <span class="cv-milestone-dot" aria-hidden="true"></span>
      <span class="cv-milestone-text">${text}</span>
    </div>
  `;

  return renderFloor(
    t("collect.floorTitle", "How to Collect Rewards"),
    `
      <div class="collect-panel collect-panel-variant cv-tier-reward">
        <div class="cv-tier-header">
          <p class="collect-highlight-title">${t("collect.upToPrefix", "UP TO")} <span>${tierReward.highlightAmount || ""}</span> ${t("collect.upToSuffix", "USD PRIZES !")}</p>
          ${renderPanelCopy(t("collect.rewardDescription", "Reward description text"), true)}
        </div>
        <div class="${tierStageClass}" style="--cv-tier-count:${tierCount}">
          <div class="cv-tier-list">
            ${tiers.map(renderTier).join("")}
          </div>
          <div class="cv-tier-track">
            <div class="cv-tier-bar"><span style="width:calc((var(--cv-tier-cell) / 2) + (${reachedMilestoneIndex} * (var(--cv-tier-cell) + var(--cv-tier-gap))))"></span></div>
            <div class="cv-milestone-row">
              ${milestones.map(renderMilestone).join("")}
            </div>
          </div>
        </div>
        <div class="cv-divider"></div>
        ${renderRewardTask(tierReward.statusTask?.title || "", tierReward.statusTask?.copy || "", true, "status-task", {
          showIcon: false,
          buttonLabel: tierReward.statusTask?.buttonLabel,
        })}
      </div>
    `,
    "collect-floor"
  );
}

function renderCollectVariantSection() {
  switch (COLLECT_VARIANT) {
    case "collect-task-list":
      return renderCollectTaskListVariantSection();
    case "single-reward":
      return renderCollectSingleRewardVariantSection();
    case "tier-reward":
      return renderCollectTierRewardVariantSection();
    default:
      return renderCollectCompactSection();
  }
}

function renderCollectRichSection() {
  const crp = getContent("crp", {});
  const states = crp.states || {};
  const state = states[CRP_COLLECT_STATE] || states.earning || {};
  const detailsText = crp.detailsText || "";
  const detailsLink = crp.detailsLink || "";
  const detailsSuffix = state.linkPeriodInside ? "" : ".";
  const tooltipMessage = state.tooltipVariant ? crp.tooltipCopy?.[state.tooltipVariant] || "" : "";
  const renderCrpTooltipTrigger = () =>
    tooltipMessage
      ? `<span class="crp-copy-info-wrap">
          <button class="crp-copy-info" type="button" aria-label="${t("crp.showDetailsAria", "Show double reward details")}" aria-expanded="${state.tooltipOpen ? "true" : "false"}">
            <img src="./assets/icon-question-circle.svg" alt="" aria-hidden="true" />
          </button>
          <span class="crp-tooltip ${state.tooltipOpen ? "is-open" : ""}" role="note">
            <span class="crp-tooltip-arrow" aria-hidden="true"></span>
            <span class="crp-tooltip-text">${tooltipMessage}</span>
          </span>
        </span>`
      : "";
  const detailsCopy = `
    <span>${detailsText}</span>
    <span class="crp-copy-link-wrap">
      <u>${detailsLink}</u>${detailsSuffix ? `<span class="crp-copy-suffix">${detailsSuffix}</span>` : ""}
      ${renderCrpTooltipTrigger()}
    </span>
  `;

  return renderFloor(
    t("collect.floorTitle", "How to Collect Rewards"),
    `
      <div class="panel collect-panel collect-panel-rich">
        <div class="crp-summary">
          <h3>${state.title}</h3>
          <p><span>${state.eligibleLabel || t("crp.eligiblePosts", "Eligible posts:")}</span><strong>${state.eligibleValue || ""}</strong></p>
          <p><span>${t("crp.getDoubledIncome", "Get doubled income:")}</span><strong>${state.doubledIncome || ""}</strong></p>
        </div>
        <div class="crp-reward-hero" aria-label="${t("crp.rewardProgressAria", "Reward progress")}">
          <div class="crp-base-reward">
            <div class="crp-income">
              <div><small>$</small><strong>${state.baseReward || ""}</strong></div>
              <span>${t("crp.baseRewards", "Base Rewards")}</span>
            </div>
            <img src="${cashImageByLevel(5)}" alt="" />
          </div>
          <div class="crp-double-reward">
            <div class="crp-double-placeholder" aria-hidden="true"><img src="${cashImageByLevel(1)}" alt="" /></div>
            <div class="crp-income crp-income-double">
              <div><small>$</small><strong>${state.totalReward || ""}</strong></div>
              <span>${t("crp.totalRewards", "Total Rewards")}</span>
            </div>
            ${
              state.locked
                ? `<div class="crp-lock" aria-hidden="true">
              <img src="./assets/icon-lock-badge.svg" alt="" />
              <span>${t("crp.locked", "Locked")}</span>
            </div>`
                : ""
            }
          </div>
          <div class="crp-x2" aria-hidden="true">
            <img src="./assets/double.svg" alt="" />
          </div>
        </div>
        ${state.cta ? `<button class="crp-outline-cta" type="button">${state.cta}<i aria-hidden="true"></i></button>` : ""}
        ${state.showDetails ? `<p class="panel-copy crp-copy">${detailsCopy}</p>` : ""}
        ${state.showTask ? `<div class="collect-divider"></div>` : ""}
        ${state.showTask ? renderRewardTask(crp.topicTask?.title || "", crp.topicTask?.copy || "", true, "crp-task topic-task", { buttonLabel: crp.topicTask?.buttonLabel }) : ""}
      </div>
    `,
    "collect-floor"
  );
}

function renderLockedRewardTile() {
  const rewardName = getContent("howItWorks.rewardName", "Reward name");
  return `
    <article class="locked-reward-card">
      ${renderProfileFrameArt("")}
      <strong>${rewardName}</strong>
      <span class="lock-badge" aria-hidden="true"><img src="./assets/icon-lock-large-fill.svg" alt="" /></span>
    </article>
  `;
}

function renderHowItWorksSection() {
  const howItWorks = getContent("howItWorks", {});
  const tasks = howItWorks.tasks || [];

  return renderFloor(
    t("howItWorks.floorTitle", "How it works"),
    `
      <div class="how-works-stack">
        ${tasks
          .map(
            (task) => `
              <article class="panel how-work-card">
                <h3>${task.title}</h3>
                <p>${howItWorks.cardCopy || ""} <strong>${t("howItWorks.learnMore", "Learn more")}</strong></p>
                <div class="locked-reward-grid">
                  ${Array.from({ length: task.rewards }, renderLockedRewardTile).join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `,
    "how-works-floor"
  );
}

function renderAvatar() {
  return `
    <span class="creator-icon" aria-hidden="true">
      <img class="avatar-base" src="./assets/avatar-base.svg" alt="" />
      <img class="avatar-shape" src="./assets/avatar-shape.svg" alt="" />
    </span>
  `;
}

function renderVideoCard(card) {
  return `
    <article class="video-card${card.extra ? " is-extra-video" : ""}">
      <div class="video-thumb">
        <div class="video-metrics" aria-hidden="true">
          <img class="video-heart" src="./assets/video-heart.svg" alt="" aria-hidden="true" />
          <span>${card.likes}</span>
        </div>
      </div>
      <strong>${card.title}</strong>
      <span class="creator">${renderAvatar()}<span>${card.creator || t("common.username", "Username")}</span></span>
    </article>
  `;
}

function renderVideoSection(title = "Post to Win Rewards") {
  const videoCards = getContent("video.cards", []);
  return renderFloor(
    title || t("video.defaultTitle", "Post to Win Rewards"),
    `
      <div class="panel examples-panel">
        ${renderPanelCopy(t("video.panelCopy", "Check out the following creators making high-quality #Cartok content."))}
        <div class="video-grid">
          ${videoCards.map(renderVideoCard).join("")}
        </div>
        <button class="see-more" type="button" data-toggle-target="video-extra" aria-expanded="false" aria-label="${t("video.seeMoreAria", "Show more videos")}">
          <span>${t("common.seeMore", "See more")}</span>
          <i aria-hidden="true"></i>
        </button>
      </div>
    `,
    "examples-floor"
  );
}

function renderActivityAnchor() {
  return `
    <section class="activity-anchor" aria-label="${t("activityAnchor.ariaLabel", "Activity anchor setting")}">
      <div>
        <strong>${t("activityAnchor.title", "Show Activity Anchor")}</strong>
        <p>${t("activityAnchor.copy", "Turning this on will place an activity anchor on your screen for most of your posts and could lead to more user engagement")}</p>
      </div>
      <button class="toggle is-on" type="button" aria-pressed="true" aria-label="${t("activityAnchor.toggleAria", "Show Activity Anchor")}"></button>
    </section>
  `;
}

function renderInspirationSection() {
  const tagRows = getContent("inspiration.tags", []);
  return renderFloor(
    t("inspiration.floorTitle", "Get inspired and create"),
    `
      <div class="panel inspiration-panel">
        ${renderPanelCopy(t("inspiration.panelCopy", "Get inspired by these topics to start your creative journey, and don't forget to use the contest hashtags"))}
        <div class="tag-cloud" aria-label="${t("inspiration.suggestedTopics", "Suggested topics")}">
          ${tagRows
            .map((row, index) => {
              const rowClass =
                index === 1 ? "tag-row tag-row-offset-left" : index === 2 ? "tag-row tag-row-offset-right" : "tag-row";
              return `<div class="${rowClass}">${row.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`;
            })
            .join("")}
        </div>
      </div>
    `,
    "inspiration-floor"
  );
}

function renderOtherActivities() {
  const banners = getContent("otherActivities.banners", []);
  return renderFloor(
    t("otherActivities.floorTitle", "Other Fun Activities"),
    `
      ${banners.map((banner) => `<a class="activity-card" href="${banner.href || "#"}" aria-label="${banner.ariaLabel || ""}"></a>`).join("")}
    `,
    "activities-floor"
  );
}

function renderWorkReviewSection() {
  const reviewItems = getContent("review.items", []);
  const renderReviewItem = (item, extraClass = "") => `
    <article class="review-item${extraClass ? ` ${extraClass}` : ""}">
      <div class="review-thumb" aria-hidden="true"><span>${item.duration || "0:48"}</span></div>
      <div class="review-body">
        <strong>${item.title}</strong>
        <span class="review-date">${item.date}</span>
        <p class="review-total">${t("review.totalRewards", "Total rewards:")} ${item.total}</p>
        <p class="review-status${item.tone === "danger" ? " is-danger" : ""}${item.link ? " has-link" : ""}">${item.status}</p>
      </div>
    </article>
  `;

  return renderFloor(
    t("review.floorTitle", "My Works Review"),
    `
      <div class="panel review-panel">
        ${renderPanelCopy(t("review.panelCopy", "Only posts that add the activity hashtag will be displayed here."))}
        ${
          REVIEW_PANEL_VARIANT === "empty"
            ? renderReviewEmptyState()
            : `
        <div class="review-notice-card">
          <p class="review-info"><i aria-hidden="true"></i><span>${t("review.notice", "These videos meet the Activity Incentive criteria but won't get the rewards as the monthly maximum has been reached.")}</span></p>
          ${renderReviewItem(reviewItems[0])}
        </div>
        <div class="review-list">
          ${reviewItems.slice(1, 4).map((item) => renderReviewItem(item)).join("")}
          ${reviewItems.slice(4, 6).map((item) => renderReviewItem(item, "is-extra-review")).join("")}
        </div>
        <button class="see-more" type="button" data-toggle-target="review-extra" aria-expanded="false" aria-label="${t("review.seeMoreAria", "Show more review items")}">
          <span>${t("common.seeMore", "See more")}</span>
          <i aria-hidden="true"></i>
        </button>`
        }
      </div>
    `,
    "review-floor"
  );
}

function renderMiniVideoThumb() {
  const videoTemplate = getContent("guidance.videoTemplate", {});
  return `
    <div class="guide-video" aria-hidden="true">
      <div class="guide-video-meta">
        <strong>${videoTemplate.titleHtml || ""}</strong>
        <div class="guide-video-footer">
          <span class="guide-video-user">${renderAvatar()}${videoTemplate.user || t("common.username", "Username")}</span>
          <em><img class="video-heart" src="./assets/guidance-heart.svg" alt="" />${videoTemplate.likes || ""}</em>
        </div>
      </div>
    </div>
  `;
}

function renderGuidanceSection() {
  const blocks = getContent("guidance.blocks", []);

  return renderFloor(
    t("guidance.floorTitle", "Guidance"),
    `
      <div class="panel guidance-panel">
        ${blocks
          .map(
            (block) => `
              <article class="guidance-block guidance-block--${block.key}">
                <div class="guidance-title"><i aria-hidden="true"></i><strong>${block.title}</strong></div>
                <p>${block.copy}</p>
                <div class="guide-video-row">
                  ${renderMiniVideoThumb()}
                  ${renderMiniVideoThumb()}
                  ${renderMiniVideoThumb()}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `,
    "guidance-floor"
  );
}

function renderTipsSection() {
  const tips = getContent("tips", {});
  return renderFloor(
    t("tips.floorTitle", "Tips for You"),
    `
      <div class="panel tips-panel">
        ${renderPanelCopy(t("tips.panelCopy", "Join the community for more trending info and learn to create quality videos."))}
        <article class="follower-card">
          <span class="follower-avatar" aria-hidden="true"></span>
          <div>
            <strong>${tips.cardTitle || ""}</strong>
            <p>${tips.cardCopy || ""}</p>
          </div>
          ${renderTinyPostButton(tips.buttonLabel)}
        </article>
      </div>
    `,
    "tips-floor"
  );
}

const templateSections = {
  base: [
    renderTimeline,
    renderPrizeSection,
    renderRulesSection,
    () => renderVideoSection(t("video.examplesTitle", "Examples & Inspiration")),
    renderInspirationSection,
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "4802": [
    renderTimeline,
    renderPrizeSection,
    renderRulesSection,
    renderCampaignTasksSection,
    () => renderVideoSection(t("video.defaultTitle", "Post to Win Rewards")),
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "5737": [
    renderTimeline,
    renderPrizeSection,
    renderRulesSection,
    renderCollectVariantSection,
    () => renderVideoSection(t("video.defaultTitle", "Post to Win Rewards")),
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "6222": [
    renderTimeline,
    renderHowItWorksSection,
    renderRulesSection,
    () => renderVideoSection(t("video.defaultTitle", "Post to Win Rewards")),
    renderOtherActivities,
  ],
  "3425": [
    renderRulesSection,
    renderCollectRichSection,
    renderWorkReviewSection,
    renderGuidanceSection,
    renderTipsSection,
    renderActivityAnchor,
    renderOtherActivities,
  ],
};

const moduleIdToFn = {
  timeline: renderTimeline,
  prize: renderPrizeSection,
  rules: renderRulesSection,
  "campaign-tasks": renderCampaignTasksSection,
  "collect-task-list": renderCollectTaskListVariantSection,
  "collect-single-reward": renderCollectSingleRewardVariantSection,
  "collect-tier-reward": renderCollectTierRewardVariantSection,
  collect: renderCollectVariantSection,
  "collect-rich": renderCollectRichSection,
  "how-it-works": renderHowItWorksSection,
  video: renderVideoSection,
  inspiration: renderInspirationSection,
  "activity-anchor": renderActivityAnchor,
  "other-activities": renderOtherActivities,
  "work-review": renderWorkReviewSection,
  guidance: renderGuidanceSection,
  tips: renderTipsSection,
};

function resolveOverrideEntry(entry) {
  if (typeof entry === "string") {
    if (entry.startsWith("custom-")) {
      return () => window.AOC_CUSTOM_MODULES?.[entry] || "";
    }
    const fn = moduleIdToFn[entry];
    return fn ? () => fn() : () => "";
  }
  if (entry && typeof entry === "object" && entry.id) {
    if (entry.id.startsWith("custom-")) {
      return () => window.AOC_CUSTOM_MODULES?.[entry.id] || "";
    }
    const fn = moduleIdToFn[entry.id];
    if (!fn) return () => "";
    const args = entry.props ? Object.values(entry.props) : [];
    return () => fn(...args);
  }
  return () => "";
}

function applyOverrideSections() {
  if (!Array.isArray(window.AOC_OVERRIDE_SECTIONS)) return;
  templateSections[activeTemplate] = window.AOC_OVERRIDE_SECTIONS.map(resolveOverrideEntry);
}

function bindNavigationBar() {
  const navigationBar = document.querySelector(".navigation-bar");
  const updateNavigationBar = () => {
    navigationBar?.classList.toggle("is-scrolled", window.scrollY > 0);
  };

  window.addEventListener("scroll", updateNavigationBar, { passive: true });
  updateNavigationBar();
}

function bindVideoToggles() {
  document.querySelectorAll('button.see-more[data-toggle-target="video-extra"]').forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".examples-panel");
      const label = button.querySelector("span");
      const expanded = panel?.classList.toggle("is-expanded");
      button.classList.toggle("is-expanded", Boolean(expanded));
      button.setAttribute("aria-expanded", String(Boolean(expanded)));
      label.textContent = expanded ? t("common.seeLess", "See less") : t("common.seeMore", "See more");
    });
  });
}

function bindReviewToggles() {
  document.querySelectorAll('button.see-more[data-toggle-target="review-extra"]').forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".review-panel");
      const label = button.querySelector("span");
      const expanded = panel?.classList.toggle("is-expanded");
      button.classList.toggle("is-expanded", Boolean(expanded));
      button.setAttribute("aria-expanded", String(Boolean(expanded)));
      label.textContent = expanded ? t("common.seeLess", "See less") : t("common.seeMore", "See more");
    });
  });
}

function bindPrizeToggle() {
  const prizeToggle = document.querySelector(".prize-toggle");
  const prizeToggleLabel = document.querySelector(".prize-toggle-label");
  const syncPrizeToggle = () => {
    prizeToggleLabel?.setAttribute("aria-expanded", String(Boolean(prizeToggle?.checked)));
  };

  prizeToggle?.addEventListener("change", syncPrizeToggle);
  prizeToggleLabel?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    prizeToggle.checked = !prizeToggle.checked;
    prizeToggle.dispatchEvent(new Event("change", { bubbles: true }));
  });
  syncPrizeToggle();
}

function bindActivityToggle() {
  document.querySelector(".toggle")?.addEventListener("click", (event) => {
    const toggle = event.currentTarget;
    const isOn = toggle.classList.toggle("is-on");
    toggle.setAttribute("aria-pressed", String(isOn));
  });
}

function bindCampaignTabs() {
  document.querySelectorAll(".chip-row").forEach((tablist) => {
    tablist.addEventListener("click", (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (!tab || !tablist.contains(tab)) {
        return;
      }

      tablist.querySelectorAll('[role="tab"]').forEach((item) => {
        item.setAttribute("aria-selected", String(item === tab));
      });
      tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    });
  });
}

function bindCrpTooltip() {
  document.querySelectorAll(".crp-copy-info").forEach((button) => {
    const initialTooltip = button.parentElement?.querySelector(".crp-tooltip.is-open");
    if (initialTooltip) {
      requestAnimationFrame(() => positionCrpTooltip(button, initialTooltip));
    }

    button.addEventListener("click", () => {
      const wrap = button.parentElement;
      const tooltip = wrap?.querySelector(".crp-tooltip");
      if (!tooltip) return;
      const expanded = !tooltip.classList.contains("is-open");
      tooltip.classList.toggle("is-open", expanded);
      button.setAttribute("aria-expanded", String(expanded));
      if (expanded) positionCrpTooltip(button, tooltip);
    });
  });
}

function repositionOpenCrpTooltips() {
  document.querySelectorAll(".crp-tooltip.is-open").forEach((tooltip) => {
    const button = tooltip.parentElement?.querySelector(".crp-copy-info");
    if (button) positionCrpTooltip(button, tooltip);
  });
}

function positionCrpTooltip(button, tooltip) {
  const wrap = button.parentElement;
  const arrow = tooltip.querySelector(".crp-tooltip-arrow");
  if (!wrap || !arrow) return;
  const wrapRect = wrap.getBoundingClientRect();
  const iconRect = button.getBoundingClientRect();
  const pageRect = document.querySelector(".page-shell")?.getBoundingClientRect();
  const tooltipLeft = (pageRect?.left || 0) + 16;
  tooltip.style.left = `${tooltipLeft - wrapRect.left}px`;
  tooltip.style.right = "auto";
  const iconCenterX = iconRect.left + iconRect.width / 2;
  arrow.style.left = `${iconCenterX - tooltipLeft}px`;
}

function renderApp() {
  applyOverrideSections();
  const sections = templateSections[activeTemplate].map((section) => section()).join("");
  app.innerHTML = renderShell(sections);
  document.documentElement.dataset.template = activeTemplate;
  window.AOC_TEMPLATE = activeTemplate;
  bindNavigationBar();
  bindVideoToggles();
  bindReviewToggles();
  bindPrizeToggle();
  bindActivityToggle();
  bindCampaignTabs();
  bindCrpTooltip();
  window.addEventListener("resize", repositionOpenCrpTooltips, { once: true });

  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: "start" });
      });
    });
  }
}

renderApp();
