import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";

const ReviewStatusBadge = ({ status }: { status: string }) => {
  return (
    <div css={getStatusBadgeStyle(status)}>
      <span css={getStatusTextStyle(status)}>
        {(() => {
          switch (status) {
            case "PENDING":
              return "검수 중";
            case "REVISION_REQUIRED":
              return "보완 요청";
            case "REJECTED":
              return "반려";
            case "APPROVED":
              return "승인";
          }
        })()}
      </span>
    </div>
  );
};

export default ReviewStatusBadge;

const getStatusBadgeStyle = (status: string) => {
  const baseStyle = {
    display: "inline-flex" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    gap: 10,
    padding: 10,
    borderRadius: 4,
    width: 52,
    height: 20,
  };

  switch (status) {
    case "PENDING":
      return css({ ...baseStyle, backgroundColor: "#F4F4F5" });
    case "REVISION_REQUIRED":
      return css({ ...baseStyle, backgroundColor: "#FAF6DB" });
    case "REJECTED":
      return css({ ...baseStyle, backgroundColor: "#FBEFEF" });
    case "APPROVED":
      return css({ ...baseStyle, backgroundColor: "#E5F3FE" });
    default:
      return css({ ...baseStyle, backgroundColor: "#F4F4F5" });
  }
};

const getStatusTextStyle = (status: string) => {
  const baseStyleObj = {
    flex: "none",
  };

  switch (status) {
    case "PENDING":
      return css(
        { ...baseStyleObj, color: "rgba(55, 56, 60, 0.61)" },
        TYPOGRAPHY.SUB["12B"]
      );
    case "REVISION_REQUIRED":
      return css({ ...baseStyleObj, color: "#FFA825" }, TYPOGRAPHY.SUB["12B"]);
    case "REJECTED":
      return css({ ...baseStyleObj, color: "#FB3F11" }, TYPOGRAPHY.SUB["12B"]);
    case "APPROVED":
      return css({ ...baseStyleObj, color: "#1F96F5" }, TYPOGRAPHY.SUB["12B"]);
    default:
      return css(
        { ...baseStyleObj, color: "rgba(55, 56, 60, 0.61)" },
        TYPOGRAPHY.SUB["12B"]
      );
  }
};
