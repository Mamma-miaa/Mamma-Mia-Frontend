import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import type { components } from "@/apis/schema";

interface ReviewStatusSectionProps {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}

const ReviewStatusSection = ({ storeDetail }: ReviewStatusSectionProps) => {
  // 검수 중 상태가 아닌 경우 표시하지 않음
  const reviewStatus =
    "reviewStatus" in storeDetail ? storeDetail.reviewStatus : undefined;

  if (!reviewStatus || reviewStatus === "APPROVED") {
    return null;
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "PENDING":
        return "등록하신 맛집을 검수하고 있습니다. ";
      case "REVISION_REQUIRED":
        return "소개는 간단하고 사실 위주로 작성해 주세요.";
      case "REJECTED":
        return "이미 맘마픽에 등록된 맛집입니다.\n자세한 정보를 확인해 보세요.";
    }
  };

  return (
    <div css={containerStyle}>
      <ReviewStatusBadge status={reviewStatus} />
      <p css={messageStyle}>{getStatusMessage(reviewStatus)}</p>
      <div css={innerShadowStyle} />
    </div>
  );
};

export default ReviewStatusSection;

const containerStyle = css({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: 12,
  backgroundColor: "rgba(244, 244, 245, 0.6)",
  backdropFilter: "blur(2px)",
  border: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
  borderRadius: 8,
  boxSizing: "border-box",
});

const messageStyle = css(
  {
    flex: 1,
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    whiteSpace: "pre-wrap",
    minWidth: 0,
  },
  TYPOGRAPHY.BODY["14R"]
);

const innerShadowStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
  boxShadow: "inset -2px 2px 4px 0px rgba(255, 255, 255, 0.2)",
  borderRadius: 8,
});
