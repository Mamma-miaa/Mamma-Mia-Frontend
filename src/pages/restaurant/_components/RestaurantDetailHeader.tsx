import { css } from "@emotion/react";

import BackIcon from "../_assets/back.svg?react";
import ShareIcon from "../_assets/share.svg?react";
import BookmarkEmptyIcon from "../_assets/bookmark_empty.svg?react";
import BookmarkFilledIcon from "../_assets/bookmark_filled.svg?react";
import { useNavigate } from "react-router-dom";
import {
  usePostBookmarkMutation,
  useDeleteBookmarkMutation,
  useGetBookmarkQuery,
} from "@/hooks/@server/store";
import toast from "@/utils/toast";
import type { components } from "@/apis/schema";

const RestaurantDetailHeader = ({
  storeDetail,
}: {
  storeDetail: components["schemas"]["GetStoreDetailResponse"];
}) => {
  const navigate = useNavigate();
  const { data: bookmarkData, refetch: refetchBookmark } = useGetBookmarkQuery({
    storeId: storeDetail?.storeId,
  });
  const { mutate: postBookmark } = usePostBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();

  // TODO 응답에 맘마미아 상태 포함시키는 작업 완료되면 맘마미아 토글기능 작업
  const handlePostBookmark = () => {
    postBookmark(
      { storeId: storeDetail?.storeId },
      {
        onSuccess: () => {
          toast({ message: "북마크에 추가되었습니다." });
          refetchBookmark();
        },
      }
    );
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(
      { storeId: storeDetail?.storeId },
      {
        onSuccess: () => {
          toast({ message: "북마크에서 제거되었습니다." });
          refetchBookmark();
        },
      }
    );
  };

  const toggleBookmark = () => {
    if (bookmarkData.isBookmark) {
      handleDeleteBookmark();
    } else {
      handlePostBookmark();
    }
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
          css({ position: "absolute", top: 20, right: 58 })
        )}
        type="button"
        onClick={toggleBookmark}
      >
        {bookmarkData.isBookmark ? (
          <BookmarkFilledIcon />
        ) : (
          <BookmarkEmptyIcon />
        )}
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
