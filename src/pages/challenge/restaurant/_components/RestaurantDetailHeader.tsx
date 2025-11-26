import { css } from "@emotion/react";

import BackIcon from "../_assets/back.svg?react";
import ShareIcon from "../_assets/share.svg?react";
import { useNavigate } from "react-router-dom";
import type { components } from "@/apis/schema";

const RestaurantDetailHeader = ({
  storeDetail,
}: {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}) => {
  const navigate = useNavigate();

  const handleShare = () => {
    window.navigator.share({
      title: storeDetail?.name,
      text: storeDetail?.name,
      url: window.location.href,
    });
  };

  return (
    <>
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 20, left: 20 })
        )}
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 20, right: 20 })
        )}
        type="button"
        onClick={handleShare}
      >
        <ShareIcon />
      </button>
    </>
  );
};

export default RestaurantDetailHeader;

// 뒤로가기 버튼 스타일
const floatingButtonStyle = css({
  width: 24,
  height: 24,
  border: "none",
  background: "transparent",
  zIndex: 10,
});
