import THEME from "@/constants/theme";
import { css } from "@emotion/react";

import BackIcon from "../_assets/back.svg?react";
import ShareIcon from "../_assets/share.svg?react";
import BookmarkIcon from "../_assets/bookmark.svg?react";
import { useNavigate } from "react-router-dom";
import {
  usePostBookmarkMutation,
  useDeleteBookmarkMutation,
} from "@/hooks/@server/store";
import toast from "@/utils/toast";
import type { components } from "@/apis/schema";

const RestaurantDetailHeader = ({
  storeDetail,
}: {
  storeDetail: components["schemas"]["GetStoreDetailResponse"];
}) => {
  const navigate = useNavigate();
  const { mutate: postBookmark } = usePostBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  // TODO 응답에 맘마미아 상태 포함시키는 작업 완료되면 맘마미아 토글기능 작업
  const handlePostBookmark = () => {
    postBookmark(
      { id: storeDetail?.storeId },
      {
        onSuccess: () => {
          toast({ message: "북마크에 추가되었습니다." });
        },
      }
    );
  };

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
          css({ position: "absolute", top: 20, right: 76 })
        )}
        type="button"
        onClick={handlePostBookmark}
      >
        <BookmarkIcon />
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
  width: 44,
  height: 44,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderRadius: 28,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)",

  "&:hover": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});
