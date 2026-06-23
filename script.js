const app = document.querySelector("#app");

const templateOrder = ["base", "4802", "5737", "6222", "3425"];
const query = new URLSearchParams(window.location.search);
const embeddedTemplate = app?.dataset.template || document.body.dataset.template || "";
const requestedTemplate = (query.get("template") || embeddedTemplate)
  .replace(/^4[:-]/, "")
  .replace(/^node-/, "");
const activeTemplate = templateOrder.includes(requestedTemplate) ? requestedTemplate : "base";

const statusIcons = {
  signal: `<svg class="status-signal" width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.48828 7.99902C3.17542 7.99902 3.73238 8.53566 3.73242 9.19824V11.5977C3.73242 12.2603 3.17545 12.7979 2.48828 12.7979H1.24414C0.557013 12.7978 0 12.2603 0 11.5977V9.19824C4.37578e-05 8.53568 0.55704 7.99907 1.24414 7.99902H2.48828ZM8.34375 5.59863C9.03091 5.59863 9.58789 6.1362 9.58789 6.79883V11.5977C9.58789 12.2603 9.03091 12.7979 8.34375 12.7979H7.09961C6.41248 12.7978 5.85547 12.2603 5.85547 11.5977V6.79883C5.85547 6.13623 6.41248 5.59868 7.09961 5.59863H8.34375ZM14.1992 2.7998C14.8863 2.7998 15.4432 3.33655 15.4434 3.99902V11.5977C15.4434 12.2603 14.8864 12.7979 14.1992 12.7979H12.9551C12.268 12.7978 11.7109 12.2603 11.7109 11.5977V3.99902C11.7111 3.33657 12.2681 2.79985 12.9551 2.7998H14.1992ZM20.0537 0C20.7409 0 21.2979 0.537572 21.2979 1.2002V11.5977C21.2979 12.2603 20.7409 12.7979 20.0537 12.7979H18.8096C18.1224 12.7978 17.5654 12.2603 17.5654 11.5977V1.2002C17.5654 0.537598 18.1224 4.23049e-05 18.8096 0H20.0537Z" fill="black"/></svg>`,
  connection: `<svg class="status-connection" width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.28223 9.95884C7.75889 8.67986 9.92181 8.67982 11.3984 9.95884C11.4726 10.0276 11.5155 10.125 11.5176 10.2274C11.5196 10.3299 11.4806 10.429 11.4092 10.5008L9.09669 12.8905C9.02892 12.9606 8.9362 12.9999 8.83985 12.9999C8.74349 12.9998 8.65076 12.9607 8.58302 12.8905L6.27052 10.5008C6.19914 10.429 6.16007 10.3299 6.16212 10.2274C6.16424 10.1248 6.20789 10.0276 6.28223 9.95884ZM3.19727 6.77037C6.37863 3.74015 11.305 3.74009 14.4863 6.77037C14.5582 6.84144 14.5996 6.93958 14.6006 7.04185C14.6015 7.14402 14.5625 7.24281 14.4922 7.31529L13.1553 8.6981C13.0175 8.83924 12.7946 8.8424 12.6533 8.70494C11.6087 7.73624 10.2501 7.19911 8.84083 7.19908C7.43234 7.19968 6.07335 7.73676 5.0293 8.70494C4.88804 8.84199 4.66596 8.83902 4.52833 8.6981L3.19141 7.31529C3.12092 7.24289 3.08212 7.14408 3.08302 7.04185C3.08396 6.93955 3.12541 6.84143 3.19727 6.77037ZM0.111336 3.59166C4.99087 -1.19727 12.6888 -1.19716 17.5684 3.59166C17.639 3.66279 17.6791 3.75975 17.6797 3.86119C17.6803 3.96265 17.6421 4.06068 17.5723 4.13267L16.2334 5.51549C16.0956 5.65713 15.8724 5.65877 15.7324 5.51939C13.8734 3.70941 11.4059 2.70026 8.84083 2.70006C6.27536 2.70005 3.8076 3.70921 1.94825 5.51939C1.80833 5.65928 1.58407 5.65761 1.4463 5.51549L0.108406 4.13267C0.0386479 4.06064 -0.000636694 3.96264 7.80721e-06 3.86119C0.000659323 3.75977 0.0407069 3.66274 0.111336 3.59166Z" fill="black"/></svg>`,
  battery: `<svg class="status-battery" width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#clip0_status_battery)"><rect opacity="0.4" x="0.538462" y="0.538462" width="25.8462" height="12.9231" rx="3.76923" stroke="black" stroke-width="1.07692"/><path opacity="0.5" d="M28 4.84619V9.15388C28.8679 8.78905 29.4323 7.94034 29.4323 7.00004C29.4323 6.05974 28.8679 5.21103 28 4.84619" fill="black"/><rect x="2.1543" y="2.15381" width="18.3077" height="9.69231" rx="2.15385" fill="black"/></g><defs><clipPath id="clip0_status_battery"><rect width="29.4323" height="14" fill="white"/></clipPath></defs></svg>`,
};

const rules = [
  "You must click to join and accept the terms and conditions in order to participate.",
  "Create and post videos with <strong>#MVP</strong>! High-quality and topic-related posts could get the reward!",
  "Accounts must be registered in the US to participate.",
  "All qualifying videos must include the contest hashtags <strong>#MVP</strong> and in the video caption",
];

const prizeCards = [
  { rank: "Top 4-11", prize: "$1,500 Cash Reward", art: "cash-small" },
  { rank: "Top 14-30", prize: "$500 Cash Reward", art: "cash-small" },
  { rank: "Top 20 Rising Creators", prize: "$150 Cash Reward", art: "coins" },
  { rank: "Top 50 posts by views from TikTok Studio App", prize: "$5 Cash Reward", art: "coins-flat" },
  { rank: "Top 100 posts by views from", prize: "TikTok Studio App", art: "voucher" },
  { rank: "Reach 1000 VV", prize: "Profile Frame", art: "frame-badge" },
  { rank: "Top 200 posts by views from TikTok Studio App", prize: "TikTok Swag", art: "", extra: true },
  { rank: "Selected high-quality creators", prize: "Bonus Reward", art: "", extra: true },
  { rank: "Lucky participating creators", prize: "Surprise Reward", art: "", extra: true },
];

const videoCards = Array.from({ length: 6 }, (_, index) => ({
  title: "Video title supports up to 2 lines of displ...",
  likes: index < 4 ? "783.8K" : "702.1K",
  extra: index >= 4,
}));

const reviewItems = [
  {
    title: "How I scan scammers for 20k",
    date: "Video release time",
    total: "$10.00",
    status: "Activity incentive: $0.00",
  },
  {
    title: "How I scan scammers for 20k",
    date: "Jul 28, 2025",
    total: "To be updated",
    status: "Activity incentive: To be updated",
  },
  {
    title: "Tips for Modern Life",
    date: "Jul 28, 2025",
    total: "To be updated",
    status: "Irrelevant to the topic",
    tone: "danger",
  },
  {
    title: "Tips for Modern Life",
    date: "Jul 26, 2025",
    total: "$10.00",
    status: "Waiting",
  },
  {
    title: "Ultimate Urban Survival Guide...",
    date: "Jul 27, 2025",
    total: "$10.00",
    status: "Activity incentive: $5.00",
  },
  {
    title: "Tips for Modern Life",
    date: "Jul 26, 2025",
    total: "$10.00",
    status: "Irrelevant to the topic",
    tone: "danger",
    link: true,
  },
];

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
      <nav class="top-nav" aria-label="Page actions">
        <button class="nav-back" type="button" aria-label="Back"></button>
        <div class="nav-actions">
          <button type="button">Share</button>
          <button type="button">Rules</button>
        </div>
      </nav>
    </div>
  `;
}

function renderShell(content) {
  return `
    <div class="page-shell template-${activeTemplate}" data-template="${activeTemplate}">
      <header class="kv" aria-label="Campaign hero">
        ${renderNavigation()}
      </header>
      <main class="slot">${content}</main>
      <footer class="bottom-cta">
        <button type="button">Post</button>
        <a href="#">Unauthorized Access</a>
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
  return `
    <section class="timeline" aria-label="Contest timeline">
      <div class="timeline-labels">
        <div class="is-active">
          <strong>Submission<br />Period</strong>
          <span>Nov. 19th - Dec. 24th</span>
        </div>
        <div>
          <strong>Winner<br />Selection</strong>
          <span>Dec. 25th - Jan. 27th</span>
        </div>
        <div>
          <strong>Winners<br />Showcase</strong>
          <span>Jan. 28th - Feb. 11th</span>
        </div>
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
  return `
    <article class="prize-card mini-prize${card.extra ? " is-extra-prize" : ""}">
      <div class="reward-art ${card.art}" aria-hidden="true"></div>
      <p><span>${card.rank}</span><strong>${card.prize}</strong></p>
    </article>
  `;
}

function renderPrizeSection() {
  const toggleId = `prize-toggle-${activeTemplate}`;
  return renderFloor(
    "Contest Prizes",
    `
      <div class="prizes-stack">
        <input class="prize-toggle" id="${toggleId}" type="checkbox" aria-label="Toggle more prizes" />
        <div class="prize-wrap" aria-label="Prize list">
          <article class="prize-card grand-prize">
            <div class="reward-art cash-large" aria-hidden="true"></div>
            <div>
              <span class="prize-rank">Top 1-3</span>
              <strong>$2,000</strong>
              <span>Cash prize</span>
            </div>
          </article>
          ${prizeCards.map(renderPrizeCard).join("")}
        </div>
        <label class="see-more prize-toggle-label" for="${toggleId}" role="button" tabindex="0">
          <span class="more-label">See more</span>
          <span class="less-label">See less</span>
          <i aria-hidden="true"></i>
        </label>
      </div>
    `,
    "prizes-floor"
  );
}

function renderRulesSection() {
  return renderFloor(
    "How to Enter the Contest",
    `
      <div class="panel rules-panel">
        ${rules
          .map((rule) => `<p><i aria-hidden="true"></i><span>${rule}</span></p>`)
          .join("")}
      </div>
    `,
    "rules-floor"
  );
}

function renderTinyPostButton() {
  return `<button class="tiny-post" type="button">Post</button>`;
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
      ${withButton ? renderTinyPostButton() : ""}
    </div>
  `;
}

function renderCampaignTasksSection() {
  const toggleId = `campaign-toggle-${activeTemplate}`;

  return renderFloor(
    "Post to Win Rewards",
    `
      <div class="campaign-shell">
        <input class="campaign-toggle" id="${toggleId}" type="checkbox" aria-label="Toggle more tasks" />
        <div class="chip-row" role="tablist" aria-label="Topics">
          <button type="button" role="tab" aria-selected="true">Basketball</button>
          <button type="button" role="tab" aria-selected="false">Baseball</button>
          <button type="button" role="tab" aria-selected="false">Volleyball</button>
          <button type="button" role="tab" aria-selected="false">Football</button>
          <button type="button" role="tab" aria-selected="false">Soccer</button>
          <button type="button" role="tab" aria-selected="false">Tennis</button>
          <button type="button" role="tab" aria-selected="false">Golf</button>
          <button type="button" role="tab" aria-selected="false">Rugby</button>
        </div>
        <div class="panel campaign-panel">
          <div class="campaign-note">
            <strong><i aria-hidden="true"></i><span>Topics for this campaign</span></strong>
            <p>Submit any topic and you can earn rewards</p>
          </div>
          <div class="reward-task-list">
            ${renderRewardTask("# Hot Comments on Basketball", "Explanation of the topic content, with reference to content direction")}
            ${renderRewardTask("# Basketball in One Minute", "Explanation of the topic content, with reference to content direction")}
            ${renderRewardTask("# Basketball Truth in One Minute", "Explanation of the topic content, with reference to content direction")}
            ${renderRewardTask("# Star Player Quote Challenge", "Explanation of the topic content, with reference to content direction", true, "", { showIcon: false })}
            ${renderRewardTask("# Star Player Quote Challenge", "Explanation of the topic content, with reference to content direction", true, "", { showIcon: false })}
            ${renderRewardTask("# Dunk Reaction Challenge", "Explanation of the topic content, with reference to content direction", true, "is-extra-task", { showIcon: false })}
            ${renderRewardTask("# Game Day Highlight", "Explanation of the topic content, with reference to content direction", true, "is-extra-task", { showIcon: false })}
          </div>
          <label class="see-more campaign-toggle-label" for="${toggleId}" role="button" tabindex="0">
            <span class="more-label">See more</span>
            <span class="less-label">See less</span>
            <i aria-hidden="true"></i>
          </label>
        </div>
      </div>
    `,
    "tasks-floor"
  );
}

function renderCollectCompactSection() {
  return renderFloor(
    "How to Collect Rewards",
    `
      <div class="collect-panel collect-panel-compact">
        <div class="collect-card collect-card-task">
          ${renderPanelCopy("Reward description text", true)}
          ${renderRewardTask("The reward name supports up to 2 lines", "Post a video with #Tag", true, "locked-reward-task")}
        </div>
        <div class="collect-card collect-card-ranking">
          <p class="collect-highlight-title">UP TO <span>$2000</span> USD PRIZES !</p>
          ${renderPanelCopy("Reward description text", true)}
          <div class="rank-rewards">
            <article><span>Top 1-3</span><i class="reward-art" aria-hidden="true"></i><strong>$2,000<br />Cash Prize</strong></article>
            <article><span>Top 4-10</span><i class="reward-art" aria-hidden="true"></i><strong>$1,000<br />Cash Prize</strong></article>
            <article><span>Top 11-30</span><i class="reward-art" aria-hidden="true"></i><strong>$450<br />Cash Prize</strong></article>
            <article><span>Top 31-50</span><i class="reward-art" aria-hidden="true"></i><strong>$200<br />Cash Prize</strong></article>
          </div>
          <div class="collect-divider"></div>
          ${renderRewardTask("Post a video with #Tag", `You posted 5 works, of which <span class="text-primary">1</span> is under review.`, true, "status-task", { showIcon: false })}
        </div>
      </div>
    `,
    "collect-floor"
  );
}

function renderCollectRichSection() {
  return renderFloor(
    "How to Collect Rewards",
    `
      <div class="panel collect-panel collect-panel-rich">
        <div class="crp-summary">
          <h3>Keep creating qualified posts to earn more double income</h3>
          <p><span>Eligible posts:</span><strong>12</strong></p>
          <p><span>Get doubled income:</span><strong>$120</strong></p>
        </div>
        <div class="crp-reward-hero" aria-label="Reward progress">
          <div class="crp-base-reward">
            <div class="crp-income">
              <div><small>$</small><strong>60</strong></div>
              <span>Base Rewards</span>
            </div>
            <img src="./assets/crp-reward-art.png" alt="" />
          </div>
          <div class="crp-double-reward">
            <div class="crp-double-placeholder" aria-hidden="true"></div>
            <div class="crp-income crp-income-double">
              <div><small>$</small><strong>120</strong></div>
              <span>Total Rewards</span>
            </div>
            <div class="crp-lock" aria-hidden="true">
              <img src="./assets/icon-lock-large-fill.svg" alt="" />
              <span>Locked</span>
            </div>
          </div>
          <div class="crp-x2" aria-hidden="true">
            <img src="./assets/crp-x2-badge.svg" alt="" />
          </div>
        </div>
        ${renderPanelCopy(`Rewards for today's posts are 0, and the amount will update the next day. <a href="#">View your reward details and collect your rewards.</a>`, false, "crp-copy")}
        <div class="collect-divider"></div>
        ${renderRewardTask("# MVP", "Explanation of the topic content, with reference to content direction", true, "crp-task topic-task")}
      </div>
    `,
    "collect-floor"
  );
}

function renderLockedRewardTile() {
  return `
    <article class="locked-reward-card">
      <div class="reward-art" aria-hidden="true"></div>
      <strong>Reward name</strong>
      <span class="lock-badge" aria-hidden="true"><img src="./assets/icon-lock-large-fill.svg" alt="" /></span>
    </article>
  `;
}

function renderHowItWorksSection() {
  const tasks = [
    { title: "Task 1", rewards: 3 },
    { title: "Task 2", rewards: 2 },
    { title: "Task 3", rewards: 1 },
  ];

  return renderFloor(
    "How it works",
    `
      <div class="how-works-stack">
        ${tasks
          .map(
            (task) => `
              <article class="panel how-work-card">
                <h3>${task.title}</h3>
                <p>Post a photo post with hashtag #BestOf2023 to get the profile frame. <strong>Learn more</strong></p>
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
        <img class="video-logo" src="./assets/video-logo.svg" alt="" aria-hidden="true" />
        <div class="video-metrics" aria-hidden="true">
          <img class="video-heart" src="./assets/video-heart.svg" alt="" aria-hidden="true" />
          <span>${card.likes}</span>
        </div>
      </div>
      <strong>${card.title}</strong>
      <span class="creator">${renderAvatar()}<span>Username</span></span>
    </article>
  `;
}

function renderVideoSection(title = "Post to Win Rewards") {
  return renderFloor(
    title,
    `
      <div class="panel examples-panel">
        ${renderPanelCopy("Check out the following creators making high-quality #Cartok content.")}
        <div class="video-grid">
          ${videoCards.map(renderVideoCard).join("")}
        </div>
        <button class="see-more" type="button" data-toggle-target="video-extra" aria-expanded="false">
          <span>See more</span>
          <i aria-hidden="true"></i>
        </button>
      </div>
    `,
    "examples-floor"
  );
}

function renderActivityAnchor() {
  return `
    <section class="activity-anchor" aria-label="Activity anchor setting">
      <div>
        <strong>Show Activity Anchor</strong>
        <p>Turning this on will place an activity anchor on your screen for most of your posts and could lead to more user engagement</p>
      </div>
      <button class="toggle is-on" type="button" aria-pressed="true" aria-label="Show Activity Anchor"></button>
    </section>
  `;
}

function renderInspirationSection() {
  return renderFloor(
    "Get inspired and create",
    `
      <div class="panel inspiration-panel">
        ${renderPanelCopy("Get inspired by these topics to start your creative journey, and don't forget to use the contest hashtags")}
        <div class="tag-cloud" aria-label="Suggested topics">
          <div class="tag-row">
            <span class="tag">Hidden Gem Cultural Sites</span>
            <span class="tag">Hidden Gem Date Spots</span>
          </div>
          <div class="tag-row tag-row-offset-left">
            <span class="tag">Favorite Hidden Gem Date Spots</span>
            <span class="tag">Favorite Hidden Gem Local Favorites</span>
          </div>
          <div class="tag-row tag-row-offset-right">
            <span class="tag">Favorite Hidden Gem Local Favorites</span>
            <span class="tag">Hidden Gem Cultural Sites</span>
          </div>
          <div class="tag-row">
            <span class="tag">Gem Hotels</span>
            <span class="tag">Hidden Gem Hotels</span>
          </div>
        </div>
      </div>
    `,
    "inspiration-floor"
  );
}

function renderOtherActivities() {
  return renderFloor(
    "Other Fun Activities",
    `
      <a class="activity-card" href="#" aria-label="Other fun activity"></a>
      <a class="activity-card" href="#" aria-label="Other fun activity"></a>
    `,
    "activities-floor"
  );
}

function renderWorkReviewSection() {
  const renderReviewItem = (item) => `
    <article class="review-item">
      <div class="review-thumb" aria-hidden="true"><span>0:48</span></div>
      <div class="review-body">
        <strong>${item.title}</strong>
        <span class="review-date">${item.date}</span>
        <p class="review-total">Total rewards: ${item.total}</p>
        <p class="review-status${item.tone === "danger" ? " is-danger" : ""}${item.link ? " has-link" : ""}">${item.status}</p>
      </div>
    </article>
  `;

  return renderFloor(
    "My Works Review",
    `
      <div class="panel review-panel">
        ${renderPanelCopy("Only posts that add the activity hashtag will be displayed here.")}
        <div class="review-notice-card">
          <p class="review-info"><i aria-hidden="true"></i><span>These videos meet the Activity Incentive criteria but won't get the rewards as the monthly maximum has been reached.</span></p>
          ${renderReviewItem(reviewItems[0])}
        </div>
        <div class="review-list">
          ${reviewItems.slice(1).map(renderReviewItem).join("")}
        </div>
        <button class="see-more static-see-more is-expanded" type="button">
          <span>See less</span>
          <i aria-hidden="true"></i>
        </button>
      </div>
    `,
    "review-floor"
  );
}

function renderMiniVideoThumb() {
  return `
    <div class="guide-video" aria-hidden="true">
      <div class="guide-video-meta">
        <strong>Video title<br />Supports up to two...</strong>
        <span>${renderAvatar()}Username</span>
        <em><img class="video-heart" src="./assets/video-heart.svg" alt="" />803</em>
      </div>
    </div>
  `;
}

function renderGuidanceSection() {
  const blocks = [
    ["Well-crafted", "This creator invests time and effort to produce quality content with great shots and editing."],
    ["Engaging", "Creators tackle big questions that capture viewers' attention and spark meaningful conversations."],
    ["Specialized", "Show off your niche expertise with tailored experiences and a unique perspective."],
  ];

  return renderFloor(
    "Guidance",
    `
      <div class="panel guidance-panel">
        ${blocks
          .map(
            ([title, copy]) => `
              <article class="guidance-block">
                <div class="guidance-title"><i aria-hidden="true"></i><strong>${title}</strong></div>
                <p>${copy}</p>
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
  return renderFloor(
    "Tips for You",
    `
      <div class="panel tips-panel">
        ${renderPanelCopy("Join the community for more trending info and learn to create quality videos.")}
        <article class="follower-card">
          <span class="follower-avatar" aria-hidden="true"></span>
          <div>
            <strong>Chat with other creators</strong>
            <p>Official Discord community</p>
          </div>
          ${renderTinyPostButton()}
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
    () => renderVideoSection("Examples & Inspiration"),
    renderInspirationSection,
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "4802": [
    renderTimeline,
    renderPrizeSection,
    renderRulesSection,
    renderCampaignTasksSection,
    () => renderVideoSection("Post to Win Rewards"),
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "5737": [
    renderTimeline,
    renderPrizeSection,
    renderRulesSection,
    renderCollectCompactSection,
    () => renderVideoSection("Post to Win Rewards"),
    renderActivityAnchor,
    renderOtherActivities,
  ],
  "6222": [
    renderTimeline,
    renderHowItWorksSection,
    renderRulesSection,
    () => renderVideoSection("Post to Win Rewards"),
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
      label.textContent = expanded ? "See less" : "See more";
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

function renderApp() {
  const sections = templateSections[activeTemplate].map((section) => section()).join("");
  app.innerHTML = renderShell(sections);
  document.documentElement.dataset.template = activeTemplate;
  window.AOC_TEMPLATE = activeTemplate;
  bindNavigationBar();
  bindVideoToggles();
  bindPrizeToggle();
  bindActivityToggle();
  bindCampaignTabs();

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
