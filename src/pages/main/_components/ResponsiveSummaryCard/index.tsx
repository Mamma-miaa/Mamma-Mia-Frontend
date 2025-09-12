import { css } from "@emotion/react";
import LocationIcon from "./_assets/location.svg?react";
import type { ComponentProps } from "react";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";
import type { components } from "@/apis/schema";

// Import Swiper styles
interface SummaryCardProps extends ComponentProps<"div"> {
  restaurant: components["schemas"]["GetNearByResponse"];
}

const ResponsiveSummaryCard = ({ restaurant, ...props }: SummaryCardProps) => {
  return (
    <div css={containerStyle} {...props}>
      <div css={imageContainerStyle}>
        <img
          src={restaurant.imageUrl ?? "https://placehold.co/78x78"}
          alt={restaurant.name}
          css={restaurantImageStyle}
        />
      </div>
      <div css={contentContainerStyle}>
        <div css={titleSectionStyle}>
          <span css={categoryStyle}>{restaurant.category}</span>
          <h3 css={restaurantNameStyle}>{restaurant.name}</h3>
        </div>
        <div css={locationSectionStyle}>
          <LocationIcon />
          <span css={locationTextStyle}>충무로 역로부터</span>
          <span css={distanceStyle}>
            {Math.round(restaurant.distanceMeters)}m
          </span>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 6,
  padding: "12px 0",
  background: "#FFFFFF",
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
});

const imageContainerStyle = css({
  width: 72,
  height: 72,
  borderRadius: 4,
  overflow: "hidden",
});

const restaurantImageStyle = css({
  width: 78,
  height: 78,
  objectFit: "cover",
  margin: -3,
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
    width: 210,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const locationSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
});

const locationTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

const distanceStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.SUB["12B"]
);

export default ResponsiveSummaryCard;
