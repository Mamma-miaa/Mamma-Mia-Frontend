import { css } from "@emotion/react";

const TYPOGRAPHY = {
  HEADERS: {
    "16SB": css({
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
    "18SB": css({
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
    "22B": css({
      fontSize: 22,
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
  },
  BODY: {
    "14R": css({
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
    "14SB": css({
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
  },
  SUB: {
    "12R": css({
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
    "12B": css({
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
  },
  CAPTION: {
    "11B": css({
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: "-2%",
    }),
  },
};

export default TYPOGRAPHY;
