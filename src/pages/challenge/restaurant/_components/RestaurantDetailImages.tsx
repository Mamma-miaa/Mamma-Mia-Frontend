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
    <>
      <img
        src={storeDetail?.images?.[0] ?? "https://placehold.co/375x460"}
        alt="레스토랑 배경 이미지"
        css={restaurantBackgroundImageStyle}
      />
      <div
        css={css({
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0 20px",
          width: "100%",
        })}
      >
        <img
          src={storeDetail?.images?.[0] ?? "https://placehold.co/375x460"}
          alt="레스토랑 이미지"
          css={restaurantImageStyle}
        />
      </div>
    </>
  );
};

export default RestaurantDetailBackGround;

const restaurantBackgroundImageStyle = css({
  width: "100%",
  aspectRatio: "375/460",
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
});

const restaurantImageStyle = css({
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: 12,
  objectFit: "cover",
});
