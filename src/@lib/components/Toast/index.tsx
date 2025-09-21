import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Toast = ({ message, isOpen, onClose }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(onClose, 2000);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          css={toastContainerStyle}
          initial={{ opacity: 0, y: 100, translateX: "-50%" }}
          animate={{ opacity: 1, y: 0, translateX: "-50%" }}
          exit={{ opacity: 0, y: 100, translateX: "-50%" }}
          transition={{ type: "keyframes", duration: 0.3 }}
        >
          <span css={toastMessageStyle}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const toastContainerStyle = css({
  position: "fixed",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
  backgroundColor: THEME.COLORS.GRAYSCALE.NEUTRAL,
  borderRadius: 28,
  padding: "12px 16px",
  boxShadow: THEME.SHADOWS.HEAVY,
  maxWidth: "calc(100vw - 32px)",
});

const toastMessageStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  TYPOGRAPHY.BODY["14R"]
);

export default Toast;
