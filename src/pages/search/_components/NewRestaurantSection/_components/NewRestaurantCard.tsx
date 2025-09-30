import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import MammaMiaBadge from "@/assets/mamma_mia_badge.svg?react";
import type { components } from "@/apis/schema";

const NewRestaurantCard = ({
  restaurant,
}: {
  restaurant: components["schemas"]["GetNearByResponse"] & {
    작성자이미지: string;
    작성자이름: string;
    코멘트: string;
  };
}) => {
  return (
    <div css={restaurantCardStyle}>
      <div css={restaurantCardHeaderStyle}>
        <div css={restaurantCardTitleSectionStyle}>
          <span css={restaurantCategoryStyle}>{restaurant.category}</span>
          <span css={restaurantNameStyle}>{restaurant.name}</span>
          <div css={restaurantBadgeContainerStyle}>
            <MammaMiaBadge />
            <div css={restaurantStatsStyle}>
              <div css={restaurantStatItemStyle}>
                <span css={restaurantStatLabelStyle}>이번주</span>
                <span css={restaurantStatValueStyle}>
                  {restaurant.ranks?.WEEKLY ?? 0}
                </span>
              </div>
              <span css={restaurantStatDividerStyle}>/</span>
              <div css={restaurantStatItemStyle}>
                <span css={restaurantStatLabelStyle}>이번달</span>
                <span css={restaurantStatValueStyle}>
                  {restaurant.ranks?.MONTHLY ?? 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={restaurantCardBodyStyle}>
        <div css={restaurantImageContainerStyle}>
          <img
            css={restaurantImageStyle}
            src={restaurant.imageUrl ?? "https://placehold.co/240x240"}
            alt={restaurant.name}
          />
        </div>
        <div css={restaurantCommentSectionStyle}>
          <span css={restaurantCommentLabelStyle}>작성자의 한마디</span>
          <div css={restaurantCommentContentStyle}>
            <img
              css={restaurantCommentAvatarStyle}
              src={restaurant.작성자이미지 ?? "https://placehold.co/28x28"}
              alt={restaurant.name}
            />
            <span css={restaurantCommentNameStyle}>
              {restaurant.작성자이름}
            </span>
            <p css={restaurantCommentTextStyle}>{restaurant.코멘트}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRestaurantCard;

// 맛집 카드 스타일
const restaurantCardStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  borderRadius: 16,
  overflow: "hidden",
  width: "100%",
});

const restaurantCardHeaderStyle = css({
  padding: "16px 12px",
});

const restaurantCardTitleSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const restaurantCategoryStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    opacity: 0.6,
  },
  TYPOGRAPHY.BODY["14R"]
);

const restaurantNameStyle = css({
  color: THEME.COLORS.BACKGROUND.WHITE,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

const restaurantBadgeContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const restaurantStatsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const restaurantStatItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

const restaurantStatLabelStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    opacity: 0.6,
  },
  TYPOGRAPHY.SUB["12R"]
);

const restaurantStatValueStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12B"]
);

const restaurantStatDividerStyle = css({
  color: THEME.COLORS.BACKGROUND.WHITE,
  opacity: 0.6,
  fontSize: 8,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

const restaurantCardBodyStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "0 12px 16px",
});

const restaurantImageContainerStyle = css({
  width: "100%",
  height: 240,
  borderRadius: 8,
  overflow: "hidden",
  backgroundColor: THEME.COLORS.LINE.ALTERNATIVE,
});

const restaurantImageStyle = css({
  width: "100%",
  height: "100%",
  backgroundColor: THEME.COLORS.LINE.ALTERNATIVE,
  backgroundImage:
    "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzM2IiBoZWlnaHQ9IjM4MiIgdmlld0JveD0iMCAwIDMzNiAzODIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMzYiIGhlaWdodD0iMzgyIiBmaWxsPSIjRjJGMkYyIi8+Cjwvc3ZnPgo=')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  objectFit: "cover",
});

const restaurantCommentSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const restaurantCommentLabelStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12B"]
);

const restaurantCommentContentStyle = css({
  display: "flex",
  gap: 6,
  alignItems: "flex-start",
});

const restaurantCommentAvatarStyle = css({
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: THEME.COLORS.LINE.NORMAL,
  border: `2px solid ${THEME.COLORS.BACKGROUND.WHITE}`,
  flexShrink: 0,
});

const restaurantCommentTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    margin: 0,
    lineHeight: 1.4,
    height: 34,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  TYPOGRAPHY.SUB["12R"]
);

const restaurantCommentNameStyle = css({
  color: THEME.COLORS.BACKGROUND.WHITE,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});
