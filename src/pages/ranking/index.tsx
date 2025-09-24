import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import BackIcon from "./_assets/back.svg?react";
import RankingCard from "./_components/RankingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import RankingText from "./_assets/ranking_text.svg?react";
import ToggleButton from "@/@lib/components/ToggleButton";

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
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
        <SwiperSlide>
          <RankingCard
            rank={1}
            period="monthly"
            category="고기구이"
            restaurantName="빠삼"
            weeklyVotes={4}
            monthlyVotes={128}
            imageUrl="https://placehold.co/260x335"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RankingPage;

// 페이지 컨테이너 스타일
const pageContainerStyle = css({
  width: "100%",
  minHeight: "100vh",
  position: "relative",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
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
  aspectRatio: "375/460",
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
  position: "fixed",
  top: 84,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
});
