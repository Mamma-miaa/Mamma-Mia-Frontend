import { css } from "@emotion/react";

const RestaurantDetailPage = () => {
  return (
    <div css={pageContainerStyle}>
      {/* 헤더 영역 - 배경 이미지와 그라데이션 마스크 */}
      <img
        src="https://d12zq4w4guyljn.cloudfront.net/20240928082830_photo1_f13518079202.webp"
        alt="레스토랑 이미지"
        css={restaurantImageStyle}
      />
    </div>
  );
};

// 페이지 컨테이너 스타일
const pageContainerStyle = css({
  width: "100%",
  height: 460,
  position: "relative",
  objectFit: "cover",
});

// 레스토랑 이미지 스타일
const restaurantImageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
});

export default RestaurantDetailPage;
