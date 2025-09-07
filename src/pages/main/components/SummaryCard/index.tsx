import { css } from "@emotion/react";
import LocationIcon from "./_assets/location.svg?react";
import type { ComponentProps } from "react";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";

// Import Swiper styles
interface SummaryCardProps extends ComponentProps<"div"> {
  category: string;
  restaurantName: string;
  distance: string;
  restaurantImageUrl: string;
}

const SummaryCard = ({
  category,
  restaurantName,
  distance,
  restaurantImageUrl,
  ...props
}: SummaryCardProps) => {
  return (
    <div css={containerStyle} {...props}>
      <div css={imageContainerStyle}>
        <img
          src={restaurantImageUrl}
          alt={restaurantName}
          css={restaurantImageStyle}
        />
      </div>
      <div css={contentContainerStyle}>
        <div css={titleSectionStyle}>
          <span css={categoryStyle}>{category}</span>
          <h3 css={restaurantNameStyle}>{restaurantName}</h3>
        </div>
        <div css={locationSectionStyle}>
          <LocationIcon />
          <span css={locationTextStyle}>내 위치로부터</span>
          <span css={distanceStyle}>{distance}</span>
        </div>
      </div>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 6,
  padding: 12,
  width: 311,
  background: "#FFFFFF",
  borderRadius: 8,
  boxShadow: THEME.SHADOWS.EMPHASIZED,
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

export default SummaryCard;
