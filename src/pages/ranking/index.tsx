import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import BackIcon from "./_assets/back.svg?react";
import RankingCard from "./_components/RankingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import RankingText from "./_assets/ranking_text.svg?react";
import ToggleButton from "@/@lib/components/ToggleButton";
import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard";
import type { components } from "@/apis/schema";

const restaurants: components["schemas"]["GetNearByResponse"][] = [
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
  },
  {
    storeId: 150,
    name: "희희카츠",
    address: "서울 중구 퇴계로36길 36 1층",
    category: "일식",
    latitude: 37.56030642,
    longitude: 126.9951853,
    distanceMeters: 126.50210646794007,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,
  },
  {
    storeId: 138,
    name: "충무물갈비",
    address: "서울 중구 퇴계로37길 26",
    category: "고기구이",
    latitude: 37.56231197,
    longitude: 126.9936617,
    distanceMeters: 134.06063328160067,
    totalLike: 0,
    parking: false,
    takeout: true,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,
  },
  {
    storeId: 137,
    name: "충무로칼국수",
    address: "서울 중구 충무로2길 14 1층",
    category: "한식/백반",
    latitude: 37.56245434,
    longitude: 126.9939039,
    distanceMeters: 138.07729685729254,
    totalLike: 0,
    parking: false,
    takeout: true,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,
  },
  {
    storeId: 146,
    name: "한사리감자탕",
    address: "서울 중구 퇴계로 220 2층",
    category: "찜·탕/찌개",
    latitude: 37.5615192,
    longitude: 126.9962435,
    distanceMeters: 155.49728262747246,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,
  },
  {
    storeId: 1,
    name: "한식집",
    address: "서울특별시 중구 필동 37",
    category: "한식",
    latitude: 37.56074434744199,
    longitude: 126.99624237849612,
    distanceMeters: 165.79394582663795,
    totalLike: 300,
    parking: true,
    takeout: true,
    delivery: true,
    priceRange: "WON_1",
    imageUrl:
      "https://dev-mamma-mia-store-image-s3.s3.ap-northeast-2.amazonaws.com/1/jeremy.jpg",
    ranks: {
      MONTHLY: 1,
    },
  },
  {
    storeId: 144,
    name: "필동카츠",
    address: "서울 중구 필동로 7-3 1층",
    category: "일식",
    latitude: 37.56087049,
    longitude: 126.9963159,
    distanceMeters: 167.22716652164547,
    totalLike: 0,
    parking: false,
    takeout: false,
    delivery: false,
    priceRange: "WON_1",
    imageUrl: null,
    ranks: null,
  },
];

const RankingPage = () => {
  const navigate = useNavigate();

  return (
    <div css={pageContainerStyle}>
      {/* 뒤로가기 버튼 */}
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
        css={css({ position: "absolute", top: 20, right: 20, zIndex: 1000 })}
      >
        <ToggleButton
          paramKey="period"
          firstItem={{ label: "주간", value: "weekly" }}
          secondItem={{ label: "월간", value: "monthly" }}
        />
      </div>

      {/* 헤더 영역 - 배경 이미지와 그라데이션 마스크 */}
      <img
        src={"https://placehold.co/375x460"}
        alt="레스토랑 배경 이미지"
        css={restaurantBackgroundImageStyle}
      />

      <RankingText css={rankingTextStyle} />
      {/* 랭킹 카드 섹션 */}
      <Swiper
        css={rankingSectionStyle}
        loop
        slidesPerView={3}
        spaceBetween={-210}
        centeredSlides
      >
        {restaurants.slice(0, 6).map((restaurant) => (
          <SwiperSlide key={restaurant.storeId}>
            <RankingCard restaurant={restaurant} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div css={css({ padding: "0 20px", marginTop: 96 })}>
        {restaurants.map((restaurant) => (
          <ResponsiveSummaryCard
            restaurant={restaurant}
            key={restaurant.storeId}
            onClick={() => navigate(`/restaurant?id=${restaurant.storeId}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;

// 페이지 컨테이너 스타일
const pageContainerStyle = css({
  width: "100%",
  minHeight: "100vh",
  position: "relative",
});

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

// 레스토랑 배경 이미지 스타일
const restaurantBackgroundImageStyle = css({
  width: "100%",
  aspectRatio: 460,
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
});

// 랭킹 섹션 스타일
const rankingSectionStyle = css({
  width: 1100,
  position: "absolute",
  top: 158,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  overflow: "visible",

  "& .swiper-slide": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    transition: "transform 0.3s ease-in-out",
  },

  "& .swiper-slide-active": {
    transform: "scale(1.109)", // 335/302 ≈ 1.109
    transition: "transform 0.3s ease-in-out",
  },
});

// 랭킹 텍스트 스타일
const rankingTextStyle = css({
  position: "absolute",
  top: 84,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
});
