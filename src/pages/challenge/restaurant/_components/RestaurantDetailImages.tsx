import { css } from "@emotion/react";
import type { components } from "@/apis/schema";

const RestaurantDetailBackGround = ({
  storeDetail,
}: {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
}) => {
  return (
    <img
      src={storeDetail?.images?.[0] ?? "https://placehold.co/375x460"}
      alt="레스토랑 이미지"
      css={restaurantImageStyle}
    />
  );
};

export default RestaurantDetailBackGround;

const restaurantImageStyle = css({
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: 12,
  objectFit: "cover",
});
