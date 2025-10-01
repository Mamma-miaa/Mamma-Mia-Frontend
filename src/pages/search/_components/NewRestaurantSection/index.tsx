import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import ArrowLeftIcon from "./_assets/arrow_left.svg?react";
import ArrowRightIcon from "./_assets/arrow_right.svg?react";
import NewRestaurantCard from "./_components/NewRestaurantCard";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import VIEWPORT from "@/constants/viewport";
import { useRef } from "react";
import { Virtual } from "swiper/modules";

const RESTAURANTS = [
  {
    storeId: 101,
    name: "고녀석",
    address: "서울 중구 퇴계로36길 9 지하 1층, 1층",
    category: "한식/백반",
    latitude: 37.56081813,
    longitude: 126.9938475,
    distanceMeters: 79.06215514019009,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,

    작성자이미지: "https://placehold.co/28x28",
    코멘트: "맛있어요",
    작성자이름: "홍길동",
  },
  {
    storeId: 126,
    name: "온의미반",
    address: "서울 중구 퇴계로 210-27",
    category: "한식/백반",
    latitude: 37.56079927,
    longitude: 126.9951321,
    distanceMeters: 79.24109413026632,
    totalLike: 0,
    parking: false,
    takeout: true,
    delivery: true,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,

    작성자이미지: "https://placehold.co/28x28",
    코멘트: "맛있어요",
    작성자이름: "홍길동",
  },
  {
    storeId: 107,
    name: "로스트템플",
    address: "서울 중구 퇴계로39길 15",
    category: "아시안",
    latitude: 37.56208855,
    longitude: 126.9942141,
    distanceMeters: 90.591227004814,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_2",
    imageUrl: null,
    ranks: null,

    작성자이미지: "https://placehold.co/28x28",
    코멘트: "맛있어요",
    작성자이름: "홍길동",
  },
  {
    storeId: 112,
    name: "미분당",
    address: "서울 중구 퇴계로36길 29 1층 102호",
    category: "아시안",
    latitude: 37.56050104,
    longitude: 126.995071,
    distanceMeters: 102.6877203713715,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,

    작성자이미지: "https://placehold.co/28x28",
    코멘트: "맛있어요",
    작성자이름: "홍길동",
  },
];

const NewRestaurantSection = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div css={newRestaurantSectionStyle}>
      <div css={newRestaurantHeaderStyle}>
        <div css={newRestaurantTitleContainerStyle}>
          <h2 css={newRestaurantTitleStyle}>NEW</h2>
          <p css={newRestaurantSubtitleStyle}>새로 등록된 따끈따끈한 맛집!</p>
        </div>
        <div css={newRestaurantActionsStyle}>
          <ArrowLeftIcon
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          />
          <ArrowRightIcon
            onClick={() => swiperRef.current?.swiper.slideNext()}
          />
        </div>
      </div>

      {/* 맛집 리스트 아이템 */}

      <Swiper
        css={swiperStyle}
        loop
        centeredSlides
        ref={swiperRef}
        modules={[Virtual]}
        spaceBetween={20}
        virtual
      >
        {RESTAURANTS.map((restaurant, index) => (
          <SwiperSlide virtualIndex={index}>
            <NewRestaurantCard restaurant={restaurant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewRestaurantSection;

// 새로운 맛집 섹션 스타일
const newRestaurantSectionStyle = css({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

const newRestaurantHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 16,
});

const newRestaurantTitleContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

const newRestaurantTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const newRestaurantSubtitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    margin: 0,
  },
  TYPOGRAPHY.BODY["14R"]
);

const newRestaurantActionsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const swiperStyle = css({
  overflow: "visible",
  width: "100%",
  maxWidth: VIEWPORT.MAX_WIDTH,

  "& .swiper-slide": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
