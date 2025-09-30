import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import ArrowLeftIcon from "./_assets/arrow_left.svg?react";
import ArrowRightIcon from "./_assets/arrow_right.svg?react";
import NewRestaurantCard from "./_components/NewRestaurantCard";

const NewRestaurantSection = () => {
  return (
    <div css={newRestaurantSectionStyle}>
      <div css={newRestaurantHeaderStyle}>
        <div css={newRestaurantTitleContainerStyle}>
          <h2 css={newRestaurantTitleStyle}>NEW</h2>
          <p css={newRestaurantSubtitleStyle}>새로 등록된 따끈따끈한 맛집!</p>
        </div>
        <div css={newRestaurantActionsStyle}>
          <ArrowLeftIcon />
          <ArrowRightIcon />
        </div>
      </div>

      {/* 맛집 리스트 아이템 */}
      <NewRestaurantCard />
    </div>
  );
};

export default NewRestaurantSection;

// 새로운 맛집 섹션 스타일
const newRestaurantSectionStyle = css({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

const newRestaurantHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 16,
});

const newRestaurantTitleContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

const newRestaurantTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const newRestaurantSubtitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    margin: 0,
  },
  TYPOGRAPHY.BODY["14R"]
);

const newRestaurantActionsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
});
