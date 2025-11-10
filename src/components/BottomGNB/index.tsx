import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import VIEWPORT from "@/constants/viewport";
import HomeIcon from "./_assets/home.svg?react";
import RankingIcon from "./_assets/ranking.svg?react";
import ChallengeFillIcon from "./_assets/challenge_fill.svg?react";
import MyIcon from "./_assets/my.svg?react";

const BottomGNB = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav css={bottomNavContainerStyle}>
      <div css={bottomNavContentStyle}>
        <button
          type="button"
          css={css(navItemStyle, isActive("/") && navItemActiveStyle)}
          onClick={() => navigate("/")}
        >
          <HomeIcon css={navIconStyle} />
          <span css={navTextStyle}>메인</span>
        </button>
        <button
          type="button"
          css={css(navItemStyle, isActive("/ranking") && navItemActiveStyle)}
          onClick={() => navigate("/ranking")}
        >
          <RankingIcon css={navIconStyle} />
          <span css={navTextStyle}>랭킹</span>
        </button>
        <button
          type="button"
          css={css(navItemStyle, isActive("/challenge") && navItemActiveStyle)}
          onClick={() => navigate("/challenge")}
        >
          <ChallengeFillIcon css={navIconStyle} />
          <span css={navTextStyle}>도전맛집</span>
        </button>
        <button
          type="button"
          css={css(navItemStyle, isActive("/my") && navItemActiveStyle)}
          onClick={() => navigate("/my")}
        >
          <MyIcon css={navIconStyle} />
          <span css={navTextStyle}>마이</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomGNB;

const bottomNavContainerStyle = css({
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "100%",
  maxWidth: VIEWPORT.MAX_WIDTH,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderTop: `1px solid ${THEME.COLORS.LINE.NEUTRAL}`,
  zIndex: 1000,
});

const bottomNavContentStyle = css({
  display: "flex",
  justifyContent: "stretch",
  alignItems: "stretch",
  gap: 9,
  height: 57,
  padding: "0 20px",
});

const navItemStyle = css({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  padding: 0,
});

const navItemActiveStyle = css({
  // 활성화 상태 스타일 (필요시 추가)
});

const navIconStyle = css({
  width: 24,
  height: 24,
  fill: THEME.COLORS.GRAYSCALE.NORMAL,
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const navTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.SUB["12R"]
);
