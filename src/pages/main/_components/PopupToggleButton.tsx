import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import ListIcon from "../_assets/list.svg?react";
import MapIcon from "../_assets/map.svg?react";

const PopupToggleButton = ({
  isPopupOpen,
  onClick,
}: {
  isPopupOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} css={containerStyle(isPopupOpen)}>
      {isPopupOpen ? <MapIcon /> : <ListIcon />}
      <span>{isPopupOpen ? "지도보기" : "목록보기"}</span>
    </div>
  );
};

export default PopupToggleButton;

const containerStyle = (isPopupOpen: boolean) =>
  css(
    {
      height: 44,
      borderRadius: 1000,
      backgroundColor: isPopupOpen
        ? THEME.COLORS.GRAYSCALE.NORMAL
        : THEME.COLORS.BACKGROUND.WHITE,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      padding: "8px 16px 8px 12px",
      boxShadow: THEME.SHADOWS.EMPHASIZED,
      color: isPopupOpen
        ? THEME.COLORS.BACKGROUND.WHITE
        : THEME.COLORS.GRAYSCALE.NORMAL,
      userSelect: "none",
    },
    TYPOGRAPHY.BODY["14SB"]
  );
