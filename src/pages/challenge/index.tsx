import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import challengeText from "./_assets/challenge_text.webp";
import TopIcon from "./_assets/top.svg?react";
import WriteIcon from "./_assets/write.svg?react";
import ChallengeSummaryCard from "./_components/ChallengeSummaryCard";
import { useGetRankingQuery } from "@/hooks/@server/store";
import Spacing from "@/@lib/components/Spacing";
import VIEWPORT from "@/constants/viewport";
import BottomGNB from "@/components/BottomGNB";
import { getIsLoggedIn } from "@/utils/sessionStorage";

const PERIOD_TYPE = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
} as const;

type PeriodType = (typeof PERIOD_TYPE)[keyof typeof PERIOD_TYPE];

const ChallengePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const period = searchParams.has("period")
    ? (searchParams.get("period") as PeriodType)
    : PERIOD_TYPE.WEEKLY;
  const {
    data: { stores },
  } = useGetRankingQuery({ status: "CHALLENGE", type: period });
  return (
    <>
      <div css={pageContainerStyle}>
        <div
          css={css({
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          })}
        >
          <img src={challengeText} alt="challenge text" width={164} />
        </div>

        <div css={listHeaderContainerStyle}>
          <div css={listHeaderTitleWrapperStyle}>
            <span css={listHeaderLabelStyle}>전체</span>
            <span css={listHeaderCountStyle}>{stores.length}</span>
          </div>

          {/* TODO 정렬 기능 */}
          {/* <button type="button" css={orderButtonStyle}>
          <span css={orderButtonTextStyle}>최신순</span>
          <ArrowDownIcon css={orderButtonIconStyle} />
        </button> */}
        </div>
        <Spacing size={12} />

        {/* TODO Empty 케이스 추가 */}
        <div css={css({ padding: "0 20px" })}>
          {stores.map((restaurant) => (
            <ChallengeSummaryCard
              restaurant={restaurant}
              key={restaurant.storeId}
            />
          ))}
        </div>

        <div css={floatingButtonsContainerStyle}>
          <button
            type="button"
            css={css(floatingButtonBaseStyle, floatingButtonTopStyle)}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <TopIcon css={floatingButtonIconStyle} />
          </button>
          {getIsLoggedIn() && (
            <button
              type="button"
              css={css(floatingButtonBaseStyle, floatingButtonWriteStyle)}
              onClick={() => navigate("/challenge/registration")}
            >
              <WriteIcon css={floatingButtonIconStyle} />
            </button>
          )}
        </div>
        <Spacing size={64} />
      </div>
      <BottomGNB />
    </>
  );
};

export default ChallengePage;

// 페이지 컨테이너 스타일
const pageContainerStyle = css({
  width: "100%",
  minHeight: "100vh",
  position: "relative",
});

// 뒤로가기 버튼 스타일
const floatingButtonStyle = css({
  width: 44,
  height: 44,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderRadius: 28,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)",

  "&:hover": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});

const listHeaderContainerStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px 4px",
});

const listHeaderTitleWrapperStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const listHeaderLabelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const listHeaderCountStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const floatingButtonsContainerStyle = css({
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 81,

  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  padding: "0 20px",
  gap: 12,

  maxWidth: VIEWPORT.MAX_WIDTH,
  width: "100%",
  zIndex: 10,
});

const floatingButtonBaseStyle = css({
  width: 44,
  height: 44,
  borderRadius: 28,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: THEME.SHADOWS.EMPHASIZED,

  "&:hover": {
    opacity: 0.9,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});

const floatingButtonTopStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});

const floatingButtonWriteStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
});

const floatingButtonIconStyle = css({
  width: 24,
  height: 24,
});
