const COLORS = {
  PRIMARY: {
    RED: "#FB3F11",
  },

  GRAYSCALE: {
    NORMAL: "#191919",
    STRONG: "#000000",
    NEUTRAL: "rgba(46, 47, 51, 0.88)", // #2E2F33 @ 88%
    ALTERNATIVE: "rgba(55, 56, 60, 0.61)", // #37383C @ 61%
    ASSISTIVE: "rgba(55, 56, 60, 0.28)", // #37383C with 28%
    DISABLE: "rgba(55, 56, 60, 0.16)", // #37383C with 16%
  },

  BACKGROUND: {
    WHITE: "#FFFFFF",
    ALTERNATIVE: "#F7F7F8",
  },

  LINE: {
    NORMAL: "rgba(112, 115, 124, 0.22)", // #70737C with 22%
    NEUTRAL: "rgba(112, 115, 124, 0.16)", // #70737C with 16%
    ALTERNATIVE: "rgba(112, 115, 124, 0.08)", // #70737C with 8%
  },
} as const;

const SHADOWS = {
  HEAVY:
    "0px 0px 8px 0px rgba(0, 0, 0, 0.08), 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 16px 20px 0px rgba(0, 0, 0, 0.12)",
  STRONG:
    "0px 0px 4px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 6px 12px 0px rgba(0, 0, 0, 0.12)",
  EMPHASIZED:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)",
  NORMAL:
    "0px 0px 6px 0px rgba(0, 0, 0, 0.05), 1px 1px 1px 0px rgba(0, 0, 0, 0.01), 1px 1px 1px 1px rgba(0, 0, 0, 0.01)",
};

const THEME = {
  COLORS,
  SHADOWS,
};

export default THEME;
