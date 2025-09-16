import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import type { PropsWithChildren } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<BottomSheetProps>) => {
  if (!isOpen) return null;

  return (
    <div css={overlayStyle} onClick={onClose}>
      <div css={containerStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

// Styles
const overlayStyle = css({
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 9999,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",

  width: "100%",
  maxWidth: 540,
});

const containerStyle = css({
  width: "100%",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: "34px 16px 24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,

  maxWidth: 540,
});

export default BottomSheet;
