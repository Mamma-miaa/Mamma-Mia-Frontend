import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import type { PropsWithChildren } from "react";
import VIEWPORT from "@/constants/viewport";
import { AnimatePresence, motion } from "motion/react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<BottomSheetProps>) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          css={overlayStyle}
          onClick={onClose}
          initial={{ opacity: 0, translateX: "-50%" }}
          animate={{ opacity: 1, translateX: "-50%" }}
          exit={{ opacity: 0, translateX: "-50%" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            css={containerStyle}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "keyframes" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
  maxWidth: VIEWPORT.MAX_WIDTH,
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

  maxWidth: VIEWPORT.MAX_WIDTH,
});

export default BottomSheet;
