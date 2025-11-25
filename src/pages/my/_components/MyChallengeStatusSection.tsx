import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowRightIcon from "../_assets/arrow_right.svg?react";
import WriteIcon from "../_assets/write_icon.svg?react";
import { useGetMyChallengeStoreQuery } from "@/hooks/@server/member";
import { useNavigate } from "react-router-dom";

const MyChallengeStatusSection = () => {
  const { data: challengeStoreData } = useGetMyChallengeStoreQuery();
  const navigate = useNavigate();

  return (
    <section css={sectionStyle}>
      <h2 css={titleStyle}>내 도전맛집 현황</h2>

      {challengeStoreData.length === 0 ? (
        <div css={emptyStateContainerStyle}>
          <p css={emptyStateTextStyle}>
            아직 도전한 맛집이 없어요.
            <br />
            주변의 숨은 맛집을 알려주세요!
          </p>
          <button type="button" css={emptyStateButtonStyle}>
            <WriteIcon width={20} height={20} />
            <span css={emptyStateButtonTextStyle}>도전맛집 등록하기</span>
          </button>
        </div>
      ) : (
        <>
          <div css={listRowStyle}>
            {challengeStoreData.map((item) => (
              <div
                css={cardStyle}
                key={item.storeId}
                onClick={() => navigate(`/restaurant?id=${item.storeId}`)}
              >
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
            ))}
          </div>

          <div css={ctaRowStyle}>
            <span css={ctaLeftTextStyle}>
              👉 도전맛집 검수 기준이 궁금하다면?
            </span>
            <button type="button" css={ctaButtonStyle}>
              <span css={ctaButtonTextStyle}>검수 기준 확인</span>
              <ArrowRightIcon width={20} height={20} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default MyChallengeStatusSection;

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const titleStyle = css(
  {
    padding: "0 20px",
    color: THEME.COLORS.GRAYSCALE.STRONG,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const listRowStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  overflowX: "scroll",
  padding: "0 20px",
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
  margin: "0 20px",
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

const emptyStateContainerStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  minHeight: 116,
  margin: "0 20px",
});

const emptyStateTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    textAlign: "center",
  },
  TYPOGRAPHY.SUB["12R"]
);

const emptyStateButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  background: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

const emptyStateButtonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);
