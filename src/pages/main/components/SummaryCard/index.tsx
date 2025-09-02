import { css } from "@emotion/react";
import LocationIcon from "./_assets/location.svg?react";

interface SummaryCardProps {
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
}: SummaryCardProps) => {
  return (
    <div css={containerStyle}>
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
  boxShadow:
    "0px 0px 4px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 6px 12px 0px rgba(0, 0, 0, 0.12)",
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

const categoryStyle = css({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  color: "rgba(55, 56, 60, 0.61)",
});

const restaurantNameStyle = css({
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  textAlign: "left",
  color: "#191919",
  margin: 0,
  width: 210,
});

const locationSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
});

const locationTextStyle = css({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  textAlign: "center",
  color: "#191919",
});

const distanceStyle = css({
  fontWeight: 700,
  fontSize: 12,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  textAlign: "center",
  color: "#FB3F11",
});

export default SummaryCard;
