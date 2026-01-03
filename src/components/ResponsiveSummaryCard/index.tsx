import { css } from "@emotion/react";
import LocationIcon from "./_assets/location.svg?react";
import type { ComponentProps } from "react";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";
import type { components } from "@/apis/schema";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
interface SummaryCardProps extends ComponentProps<"div"> {
  restaurant:
    | components["schemas"]["GetNearByResponse"]
    | components["schemas"]["GetSearchResultResponse"]["stores"][number];
}

const ResponsiveSummaryCard = ({ restaurant, ...props }: SummaryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      css={containerStyle}
      onClick={() => navigate(`/restaurant?id=${restaurant.storeId}`)}
      {...props}
    >
      <img
        src={restaurant.imageUrl ?? "https://placehold.co/78x78"}
        alt={restaurant.name}
        width={92}
        height={92}
        css={restaurantImageStyle}
      />
      <div css={contentContainerStyle}>
        <div css={badgeSectionStyle}>
          {restaurant.isNew && (
            <div css={newBadgeStyle}>
              <span css={newBadgeTextStyle}>New</span>
            </div>
          )}
        </div>
        <div css={titleSectionStyle}>
          <span css={categoryStyle}>{restaurant.category}</span>
          <h3 css={restaurantNameStyle}>{restaurant.name}</h3>
        </div>
        <div css={locationSectionStyle}>
          <div css={locationInfoStyle}>
            <LocationIcon />
            <span css={locationTextStyle}>충무로 역으로부터</span>
          </div>
          {"distanceMeters" in restaurant && (
            <span css={distanceStyle}>
              {Math.round(restaurant.distanceMeters).toLocaleString()}m
            </span>
          )}
          {"isOpen" in restaurant && restaurant.isOpen && (
            <>
              <div css={statusDotStyle} />
              <span css={statusTextStyle}>영업중</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  padding: "12px 0",
  background: "#FFFFFF",
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
});

const restaurantImageStyle = css({
  objectFit: "cover",
  borderRadius: 4,
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

const badgeSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
});

const newBadgeStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 20,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: 4,
});

const newBadgeTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    textAlign: "center",
  },
  TYPOGRAPHY.SUB["12B"]
);

const locationSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
});

const locationInfoStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
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

const statusDotStyle = css({
  width: 3,
  height: 3,
  backgroundColor: "#D9D9D9",
  borderRadius: "50%",
});

const statusTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.SUB["12B"]
);

export default ResponsiveSummaryCard;
