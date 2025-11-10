import { css } from "@emotion/react";
import LocationIcon from "@/components/ResponsiveSummaryCard/_assets/location.svg?react";
import CheerIcon from "../_assets/cheer.svg?react";
import type { ComponentProps } from "react";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";
import type { components } from "@/apis/schema";
import { useNavigate } from "react-router-dom";

interface ChallengeSummaryCardProps extends ComponentProps<"div"> {
  restaurant: components["schemas"]["GetStoreRankingResponse"];
}

const ChallengeSummaryCard = ({
  restaurant,
  ...props
}: ChallengeSummaryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      css={containerStyle}
      onClick={() => navigate(`/restaurant?id=${restaurant.storeId}`)}
      {...props}
    >
      <img
        src={restaurant.mainImage ?? "https://placehold.co/92x92"}
        alt={restaurant.name}
        width={92}
        height={92}
        css={restaurantImageStyle}
      />
      <div css={contentContainerStyle}>
        <div css={titleSectionStyle}>
          <span css={categoryStyle}>{restaurant.category}</span>
          <h3 css={restaurantNameStyle}>{restaurant.name}</h3>
        </div>
        <div css={locationSectionStyle}>
          <div css={locationInfoStyle}>
            <LocationIcon />
            <span css={locationTextStyle}>내 위치로부터</span>
          </div>
        </div>
        <div css={cheerSectionStyle}>
          <CheerIcon />
          <div css={cheerInfoStyle}>
            <span css={cheerCountStyle}>{restaurant.likes}</span>
            <span css={cheerTextStyle}>명이 응원했어요</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  padding: "12px 12px 12px 3px",
  background: THEME.COLORS.BACKGROUND.WHITE,
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
  cursor: "pointer",
});

const restaurantImageStyle = css({
  objectFit: "cover",
  borderRadius: 4,
  flexShrink: 0,
});

const contentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
});

const titleSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  alignSelf: "stretch",
});

const categoryStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const restaurantNameStyle = css(
  {
    textAlign: "left",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const locationSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "stretch",
  gap: 2,
});

const locationInfoStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
});

const locationTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

const cheerSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "stretch",
  gap: 2,
});

const cheerInfoStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 2,
});

const cheerCountStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12B"]
);

const cheerTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

export default ChallengeSummaryCard;
