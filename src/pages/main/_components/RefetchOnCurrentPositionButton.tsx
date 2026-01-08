import TYPOGRAPHY from "@/constants/typography";
import ResetIcon from "../_assets/reset.svg?react";
import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import { useQueryClient } from "@tanstack/react-query";

const RefetchOnCurrentPositionButton = () => {
  const queryClient = useQueryClient();

  const refetchNearbyStore = () => {
    queryClient.invalidateQueries({ queryKey: ["getNearbyStore"] });
  };

  return (
    <button css={searchInAreaButtonStyle} onClick={refetchNearbyStore}>
      <ResetIcon />
      <span
        css={[
          TYPOGRAPHY.BODY["14SB"],
          { color: THEME.COLORS.GRAYSCALE.NORMAL },
        ]}
      >
        현재 지도에서 찾기
      </span>
    </button>
  );
};

export default RefetchOnCurrentPositionButton;

const searchInAreaButtonStyle = css({
  height: 40,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: "none",
  borderRadius: 24,
  padding: "0 16px",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  margin: "0 auto",

  boxShadow: THEME.SHADOWS.EMPHASIZED,
});
