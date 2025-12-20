import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "./_assets/back.svg?react";
import RankingCard from "./_components/RankingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import rankingText from "./_assets/ranking_text.webp";
import ToggleButton from "@/@lib/components/ToggleButton";
import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard";
import { useGetRankingQuery } from "@/hooks/@server/store";
import BottomGNB from "@/components/BottomGNB";

const PERIOD_TYPE = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
} as const;

type PeriodType = (typeof PERIOD_TYPE)[keyof typeof PERIOD_TYPE];

const RankingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const period = searchParams.has("period")
    ? (searchParams.get("period") as PeriodType)
    : PERIOD_TYPE.WEEKLY;
  const {
    data: { stores },
  } = useGetRankingQuery({ status: "NORMAL", type: period });
  return (
    <>
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
            firstItem={{ label: "주간", value: PERIOD_TYPE.WEEKLY }}
            secondItem={{ label: "월간", value: PERIOD_TYPE.MONTHLY }}
          />
        </div>

        {/* 헤더 영역 - 배경 이미지와 그라데이션 마스크 */}
        <img
          src={"https://placehold.co/375x460"}
          alt="레스토랑 배경 이미지"
          css={restaurantBackgroundImageStyle}
        />

        <img
          src={rankingText}
          alt="ranking text"
          width={135}
          css={rankingTextStyle}
        />
        {/* 랭킹 카드 섹션 */}
        <Swiper
          css={rankingSectionStyle}
          loop
          slidesPerView={3}
          spaceBetween={-210}
          centeredSlides
        >
          {stores.slice(0, 6).map((restaurant) => (
            <SwiperSlide key={restaurant.storeId}>
              <RankingCard restaurant={restaurant} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div css={css({ padding: "0 20px", marginTop: 96 })}>
          {stores.map((restaurant) => (
            <ResponsiveSummaryCard
              restaurant={restaurant}
              key={restaurant.storeId}
            />
          ))}
        </div>
      </div>
      <BottomGNB />
    </>
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
  height: 460,
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
  top: 163,
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
