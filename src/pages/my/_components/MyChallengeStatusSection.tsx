import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowRightIcon from "../_assets/arrow_right.svg?react";

const MyChallengeStatusSection = () => {
  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>내 도전맛집 현황</h2>

      <div css={listRowStyle}>
        <div css={cardStyle}>
          <div css={thumbnailStyle} />
          <div css={cardContentStyle}>
            <div css={statusBadgeStyle}>
              <span css={statusTextStyle}>검수 중</span>
            </div>
            <div css={cardTextsStyle}>
              <div css={categoryTextStyle}>국밥·탕/찌개</div>
              <div css={cardTitleTextStyle}>
                충무로의 김치찌개는 여기밖에없다
              </div>
            </div>
          </div>
        </div>

        <div css={cardStyle}>
          <div css={thumbnailStyle} />
          <div css={cardContentStyle}>
            <div css={statusBadgeStyleAlt}>
              <span css={statusTextStyle}>검수 중</span>
            </div>
            <div css={cardTextsStyle}>
              <div css={categoryTextStyle}>국밥·탕/찌개</div>
              <div css={cardTitleTextStyle}>
                충무로의 김치찌개는 여기밖에없다
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={ctaRowStyle}>
        <span css={ctaLeftTextStyle}>👉 도전맛집 검수 기준이 궁금하다면?</span>
        <button type="button" css={ctaButtonStyle}>
          <span css={ctaButtonTextStyle}>검수 기준 확인</span>
          <ArrowRightIcon width={20} height={20} />
        </button>
      </div>
    </section>
  );
};

export default MyChallengeStatusSection;

const sectionStyle = css({
  padding: "0 20px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.STRONG,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const listRowStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
});

const cardStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  padding: 12,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  width: 311,
  flex: "none",
});

const thumbnailStyle = css({
  width: 92,
  height: 92,
  borderRadius: 4,
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
  flex: "none",
});

const cardContentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  width: 183,
});

const statusBadgeStyle = css({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: 10,
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
  borderRadius: 4,
  width: 52,
  height: 20,
});

const statusBadgeStyleAlt = statusBadgeStyle;

const statusTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    flex: "none",
  },
  TYPOGRAPHY.SUB["12B"]
);

const cardTextsStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const categoryTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    flex: "none",
  },
  TYPOGRAPHY.SUB["12R"]
);

const cardTitleTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const ctaRowStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  borderRadius: 8,
  padding: 12,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ctaLeftTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

const ctaButtonStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

const ctaButtonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);
