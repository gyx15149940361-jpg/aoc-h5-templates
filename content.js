window.AOC_CONTENT = {
  timeline: {
    periods: [
      { labelKey: "timeline.submissionPeriod", dateRange: "Nov. 19th - Dec. 24th", active: true },
      { labelKey: "timeline.winnerSelection", dateRange: "Dec. 25th - Jan. 27th" },
      { labelKey: "timeline.winnersShowcase", dateRange: "Jan. 28th - Feb. 11th" },
    ],
  },
  rules: {
    items: [
      "You must click to join and accept the terms and conditions in order to participate.",
      "Create and post videos with #MVP! High-quality and topic-related posts could get the reward!",
      "Accounts must be registered in the US to participate.",
      "All qualifying videos must include the contest hashtags #MVP and in the video caption",
      "Hashtags like #HASHTAG will be auto-highlighted in this rules panel.",
    ],
  },
  prize: {
    grandPrize: {
      rank: "Top 1-3",
      amount: "$2,000",
      label: "Cash prize",
    },
    cards: [
      { rank: "Top 4-11", prize: "$1,500 Cash Reward", art: "cash-small" },
      { rank: "Top 14-30", prize: "$500 Cash Reward", art: "cash-small" },
      { rank: "Top 20 Rising Creators", prize: "$150 Cash Reward", art: "coins" },
      { rank: "Top 50 posts by views from TikTok Studio App", prize: "$5 Cash Reward", art: "coins-flat" },
      { rank: "Top 100-500 posts by views from TikTok Studio App", prize: "$1 Cash Reward", art: "" },
      { rank: "Reach 1000 VV", prize: "Profile Frame", art: "", upload: true },
      { rank: "Top 200 posts by views from TikTok Studio App", prize: "TikTok Swag", art: "", extra: true },
      { rank: "Selected high-quality creators", prize: "Bonus Reward", art: "", extra: true },
      { rank: "Lucky participating creators", prize: "Surprise Reward", art: "", extra: true },
    ],
  },
  video: {
    cards: Array.from({ length: 6 }, (_, index) => ({
      title: "Video title supports up to 2 lines of displ...",
      likes: index < 4 ? "783.8K" : "702.1K",
      creator: "Username",
      extra: index >= 4,
    })),
  },
  review: {
    items: [
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
    ],
  },
  crp: {
    tooltipCopy: {
      beforeThreshold:
        "The double reward amount is the maximum estimated value, but is not guaranteed. The reward amount displayed after meeting the threshold is final. Only the rewards generated within 30 days after publication are eligible for double rewards.",
      afterThreshold:
        "Only the rewards generated within 30 days after publication are eligible for double rewards.",
    },
    detailsText: "Rewards for today's posts are 0, and the amount will update the next day.",
    detailsLink: "View your reward details and collect your rewards",
    states: {
      "not-joined": {
        title: "Join the Creator Rewards Program now to enjoy double earnings!",
        eligibleLabel: "Qualified posts:",
        eligibleValue: "0",
        doubledIncome: "$0",
        baseReward: "0",
        totalReward: "0",
        locked: true,
        cta: "Check Eligible to join",
      },
      "joined-locked": {
        title: "Post 7 more videos to unlock double income",
        eligibleValue: '<span class="text-primary">3</span>/10',
        doubledIncome: "$15",
        baseReward: "15",
        totalReward: "30",
        locked: true,
        showDetails: true,
        showTask: true,
        tooltipVariant: "beforeThreshold",
      },
      "joined-tooltip": {
        title: "Post 7 more videos to unlock double income",
        eligibleValue: '<span class="text-primary">3</span>/10',
        doubledIncome: "$15",
        baseReward: "15",
        totalReward: "30",
        locked: true,
        showDetails: true,
        showTask: true,
        tooltipVariant: "beforeThreshold",
        tooltipOpen: true,
      },
      earning: {
        title: "Keep creating qualified posts to earn more double income",
        eligibleValue: "12",
        doubledIncome: "$120",
        baseReward: "60",
        totalReward: "120",
        showDetails: true,
        showTask: true,
        tooltipVariant: "afterThreshold",
      },
      "earning-collected": {
        title: "Keep creating qualified posts to earn more double income",
        eligibleValue: "12",
        doubledIncome: "$120",
        baseReward: "60",
        totalReward: "120",
        showDetails: true,
        showTask: true,
        linkPeriodInside: true,
        tooltipVariant: "afterThreshold",
        tooltipOpen: true,
      },
      capped: {
        title: "Income cap reached, no more double earnings for next posts",
        eligibleValue: "1,031",
        doubledIncome: "$10,000",
        baseReward: "500",
        totalReward: "1000",
        showDetails: true,
        showTask: true,
        linkPeriodInside: true,
        tooltipVariant: "afterThreshold",
      },
    },
    topicTask: {
      title: "# MVP",
      copy: "Explanation of the topic content, with reference to content direction",
      buttonLabel: "Post",
    },
  },
  campaign: {
    tabs: ["Basketball", "Baseball", "Volleyball", "Football", "Soccer", "Tennis", "Golf", "Rugby"],
    noteTitle: "Topics for this campaign",
    noteCopy: "Submit any topic and you can earn rewards",
    tasks: [
      { title: "# Hot Comments on Basketball", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: true },
      { title: "# Basketball in One Minute", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: true },
      { title: "# Basketball Truth in One Minute", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: true },
      { title: "# Star Player Quote Challenge", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: false },
      { title: "# Star Player Quote Challenge", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: false },
      { title: "# Dunk Reaction Challenge", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: false, extraClass: "is-extra-task" },
      { title: "# Game Day Highlight", copy: "Explanation of the topic content, with reference to content direction", buttonLabel: "Post", showIcon: false, extraClass: "is-extra-task" },
    ],
  },
  collect: {
    compact: {
      highlightAmount: "$2000",
      rankRewards: [
        { rank: "Top 1-3", amount: "$2,000", label: "Cash Prize", level: 1 },
        { rank: "Top 4-10", amount: "$1,000", label: "Cash Prize", level: 2 },
        { rank: "Top 11-30", amount: "$450", label: "Cash Prize", level: 3 },
        { rank: "Top 31-50", amount: "$200", label: "Cash Prize", level: 4 },
      ],
      lockedRewardTask: {
        title: "Profile Frame",
        copy: "Post a video with #Tag",
        buttonLabel: "Post",
      },
      statusTask: {
        title: "Post a video with #Tag",
        copy: 'You posted 5 works, of which <span class="text-primary">1</span> is under review.',
        buttonLabel: "Post",
      },
    },
    taskList: {
      tasks: [
        {
          kind: "image",
          title: "The reward name supports up to 2 lines",
          copy: 'Post 3 videos with #Tag (<span class="text-primary">0</span>/3)',
          buttonLabel: "Post",
        },
        {
          kind: "image",
          title: "The reward name supports up to 2 lines",
          copy: "Post a video with #Tag",
          buttonLabel: "Post",
        },
        {
          kind: "progress",
          title: "$50 promote coupon",
          copy: "Post 15 videos with #Tag",
          progress: { value: 3, total: 15 },
          buttonLabel: "Post",
        },
        {
          kind: "progress",
          title: "$500 cash",
          copy: "Post a video with #Tag to get 999 views",
          progress: { value: 199, total: 999 },
          buttonLabel: "Post",
        },
        {
          kind: "done",
          title: "The reward name supports up to 2 lines",
          copy: "Post a video with #Tag",
          buttonLabel: "Done",
        },
      ],
    },
    singleReward: {
      cardTitle: "Profile frame",
      cardMeta: "Learn more about rewards",
      sectionTitle: "Complete 5 tasks for rewards",
      tasks: [
        { title: "Post a video with #Tag", buttonLabel: "Post" },
        { title: 'Post 3 videos with #Tag (<span class="text-primary">1</span>/3)', buttonLabel: "Post" },
        {
          title: 'Follow 5 influencers (<span class="text-primary">0</span>/5)',
          copy: "Only video creators with the #Eatventure hashtag",
          buttonLabel: "Follow",
        },
        {
          title: "Like others' videos 999 times",
          progress: { value: 184, total: 999 },
          buttonLabel: "Like",
        },
        {
          title: "Post a video with #Tag to get 999 views",
          progress: { value: 198, total: 9999 },
          buttonLabel: "Post",
        },
      ],
    },
    tierReward: {
      highlightAmount: "$2000",
      tiers: [
        { label: "Profile\nframe", art: "./assets/profile-frame-78-3305-682e06.png" },
        { label: "TikTok\nSwag", art: "./assets/reward_pic/other%20type/Swag_01.png" },
        { label: "$50\nCash Prize", art: "./assets/reward_pic/cash/USD/Level%201.png" },
        { label: "Reward\nname", art: "./assets/reward_pic/other%20type/Trophy.png" },
      ],
      milestones: [
        { text: "500vv", state: "done" },
        { text: "1,000vv", state: "locked" },
        { text: "10,000vv", state: "locked" },
        { text: "Awarding rules", state: "locked" },
      ],
      reachedMilestoneIndex: 0,
      statusTask: {
        title: "Continue post quality works",
        copy: 'You posted 5 works, of which <span class="text-primary">1</span> is under review.',
        buttonLabel: "Post",
      },
    },
  },
  howItWorks: {
    tasks: [
      { title: "Task 1", rewards: 3 },
      { title: "Task 2", rewards: 2 },
      { title: "Task 3", rewards: 1 },
    ],
    cardCopy: "Post a photo post with hashtag #BestOf2023 to get the profile frame.",
    rewardName: "Reward name",
  },
  inspiration: {
    tags: [
      ["Hidden Gem Cultural Sites", "Hidden Gem Date Spots"],
      ["Favorite Hidden Gem Date Spots", "Favorite Hidden Gem Local Favorites"],
      ["Favorite Hidden Gem Local Favorites", "Hidden Gem Cultural Sites"],
      ["Gem Hotels", "Hidden Gem Hotels"],
    ],
  },
  otherActivities: {
    banners: [
      { href: "#", ariaLabel: "Other fun activity" },
      { href: "#", ariaLabel: "Other fun activity" },
    ],
  },
  guidance: {
    blocks: [
      {
        key: "well-crafted",
        title: "Well-crafted",
        copy: "This creator invests time and effort to produce quality content with great shots and editing.",
      },
      {
        key: "engaging",
        title: "Engaging",
        copy: "Creators tackle big questions that capture viewers' attention. Engaging content entertains and fosters meaningful connections, sparking conversations beyond TikTok!",
      },
      {
        key: "specialized",
        title: "Specialized",
        copy: "Notice how this creator shows off his expertise in his niche with tailored experiences? Show off your niche expertise and use your unique, authentic perspective to create content that's valuable for your viewers!",
      },
    ],
    videoTemplate: {
      titleHtml: "Video title<br />Supports up to two...",
      user: "Username",
      likes: "803",
    },
  },
  tips: {
    cardTitle: "Chat with other creators",
    cardCopy: "Official Discord community",
    buttonLabel: "Join",
  },
};
