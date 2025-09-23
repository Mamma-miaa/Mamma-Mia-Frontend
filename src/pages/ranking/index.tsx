import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import BackIcon from "./_assets/back.svg?react";
import RankingCard from "./_components/RankingCard";

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

      {/* 헤더 영역 - 배경 이미지와 그라데이션 마스크 */}
      <img
        src={"https://placehold.co/375x460"}
        alt="레스토랑 배경 이미지"
        css={restaurantBackgroundImageStyle}
      />

      {/* 랭킹 카드 섹션 */}
      <div css={rankingSectionStyle}>
        <RankingCard
          rank={1}
          period="monthly"
          category="고기구이"
          restaurantName="빠삼"
          weeklyVotes={4}
          monthlyVotes={128}
          imageUrl="https://placehold.co/260x335"
        />
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
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
});
