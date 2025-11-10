import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "./_assets/back.svg?react";
import challengeText from "./_assets/challenge_text.webp";
import ArrowDownIcon from "./registration/_assets/arrow_down.svg?react";
import ToggleButton from "@/@lib/components/ToggleButton";
import ChallengeSummaryCard from "./_components/ChallengeSummaryCard";
import { useGetRankingQuery } from "@/hooks/@server/store";
import Spacing from "@/@lib/components/Spacing";

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
    <div css={pageContainerStyle}>
      {/* 뒤로가기 버튼 */}
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 20, left: 20 })
        )}
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>
      <div
        css={css({ position: "absolute", top: 20, right: 20, zIndex: 1000 })}
      >
        <ToggleButton
          paramKey="period"
          firstItem={{ label: "주간", value: PERIOD_TYPE.WEEKLY }}
          secondItem={{ label: "월간", value: PERIOD_TYPE.MONTHLY }}
        />
      </div>

      <Spacing size={56} />
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
        })}
      >
        <img src={challengeText} alt="challenge text" width={164} />
      </div>
      <Spacing size={20} />

      <div css={listHeaderContainerStyle}>
        <div css={listHeaderTitleWrapperStyle}>
          <span css={listHeaderLabelStyle}>전체</span>
          <span css={listHeaderCountStyle}>{stores.length}</span>
        </div>
        {/* <button type="button" css={orderButtonStyle}>
          <span css={orderButtonTextStyle}>최신순</span>
          <ArrowDownIcon css={orderButtonIconStyle} />
        </button> */}
      </div>
      <Spacing size={12} />

      {/* 전체 // 나열 */}
      <div css={css({ padding: "0 20px" })}>
        {stores.map((restaurant) => (
          <ChallengeSummaryCard
            restaurant={restaurant}
            key={restaurant.storeId}
          />
        ))}
      </div>
    </div>
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

const orderButtonStyle = css({
  height: 28,
  padding: "8px 2px 8px 6px",
  display: "flex",
  alignItems: "center",
  gap: 2,
  borderRadius: 4,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  cursor: "pointer",
});

const orderButtonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

const orderButtonIconStyle = css({
  width: 20,
  height: 20,
});
