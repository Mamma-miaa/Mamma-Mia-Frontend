import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ReviewStatusBadge from "@/components/ReviewStatusBadge";
import type { components } from "@/apis/schema";
import { useSearchParams } from "react-router-dom";

interface ReviewStatusSectionProps {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}

const ReviewStatusSection = ({ storeDetail }: ReviewStatusSectionProps) => {
  const [searchParams] = useSearchParams();
  // 검수 중 상태가 아닌 경우 표시하지 않음
  const reviewStatus =
    "reviewStatus" in storeDetail ? storeDetail.reviewStatus : undefined;

  if (!reviewStatus || reviewStatus === "APPROVED") {
    return null;
  }

  return (
    <div css={containerStyle(reviewStatus)}>
      <ReviewStatusBadge status={reviewStatus} />
      <p css={messageStyle}>{searchParams.get("status")}</p>
      <div css={innerShadowStyle} />
    </div>
  );
};

export default ReviewStatusSection;

const containerStyle = (status: string) =>
  css({
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 12,
    backgroundColor: (() => {
      switch (status) {
        case "PENDING":
          return "rgba(244, 244, 245, 0.6)";
        case "REVISION_REQUIRED":
          return "rgba(250, 246, 219, 0.6)";
        case "REJECTED":
          return "rgba(251, 239, 239, 0.6)";
      }
    })(),
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
