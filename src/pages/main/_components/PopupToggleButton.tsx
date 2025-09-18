import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import ListIcon from "../_assets/list.svg?react";
import MapIcon from "../_assets/map.svg?react";

const 지도보기 = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={css(floatingButtonStyle, {
        bottom: 32,
        backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
        color: THEME.COLORS.BACKGROUND.WHITE,
      })}
      onClick={onClick}
    >
      <MapIcon />
      <span>지도보기</span>
    </div>
  );
};

const 목록보기 = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={css(floatingButtonStyle, {
        bottom: 148,
        backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
        color: THEME.COLORS.GRAYSCALE.NORMAL,
      })}
      onClick={onClick}
    >
      <ListIcon />
      <span>목록보기</span>
    </div>
  );
};

const PopupToggleButton = {
  지도보기,
  목록보기,
};

export default PopupToggleButton;

const floatingButtonStyle = css(
  {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    height: 44,
    borderRadius: 1000,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: "8px 16px 8px 12px",
    boxShadow: THEME.SHADOWS.EMPHASIZED,
    userSelect: "none",
  },
  TYPOGRAPHY.BODY["14SB"]
);
