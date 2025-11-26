import { css } from "@emotion/react";

import BackIcon from "../_assets/back.svg?react";
import ShareIcon from "../_assets/share.svg?react";
import TrashIcon from "../_assets/trash.svg?react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { components } from "@/apis/schema";
import toast from "@/utils/toast";

const RestaurantDetailHeader = ({
  storeDetail,
}: {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}) => {
  const [searchParams] = useSearchParams();
  const isApproved =
    !searchParams.get("status") || searchParams.get("status") === "APPROVED";
  const navigate = useNavigate();

  const handleShare = () => {
    window.navigator.share({
      title: storeDetail?.name,
      text: storeDetail?.name,
      url: window.location.href,
    });
  };

  const handleDelete = () => {
    // TODO: 삭제 기능 구현
    toast({ message: "아직 구현되지 않은 기능입니다." });
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
      <div
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 20, right: 20 })
        )}
      >
        {isApproved ? (
          <ShareIcon onClick={handleShare} />
        ) : (
          <TrashIcon onClick={handleDelete} />
        )}
      </div>
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
