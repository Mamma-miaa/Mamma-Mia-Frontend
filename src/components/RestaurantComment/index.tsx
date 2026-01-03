import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import type { components } from "@/apis/schema";

const RestaurantComment = ({
  storeDetail,
}: {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}) => {
  if (!storeDetail?.comment) {
    return null;
  }
  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <div css={avatarStyle}>
          {storeDetail.images?.[0] ? (
            <img
              src={storeDetail.images?.[0]}
              alt={storeDetail.name}
              css={avatarImageStyle}
            />
          ) : (
            <div css={avatarPlaceholderStyle} />
          )}
        </div>
        <p css={nicknameStyle}>
          {storeDetail.commentAuthor?.nickname}님의 Comment
        </p>
      </div>
      <p css={commentStyle}>{storeDetail.comment}</p>
      <div css={innerShadowStyle} />
    </div>
  );
};

export default RestaurantComment;

const containerStyle = css({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 16,
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(2px)",
  border: `1px solid ${THEME.COLORS.BACKGROUND.WHITE}`,
  borderRadius: 12,
  boxSizing: "border-box",
});

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
  width: "100%",
});

const avatarStyle = css({
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: "#cecece",
  border: `2px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
  flexShrink: 0,
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const avatarImageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const avatarPlaceholderStyle = css({
  width: "100%",
  height: "100%",
  backgroundColor: "#cecece",
});

const nicknameStyle = css({
  ...TYPOGRAPHY.HEADERS["16SB"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  flexShrink: 0,
});

const commentStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  width: "100%",
});

const innerShadowStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  boxShadow: "inset -2px 2px 4px 0px rgba(255, 255, 255, 0.2)",
  borderRadius: 12,
});
