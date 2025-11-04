import { css } from "@emotion/react";
import { AnimatePresence, motion } from "motion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: (param: boolean) => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText,
  confirmText,
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          css={overlayStyle}
          onClick={() => onClose(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            css={containerStyle}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Content */}
            <div css={contentStyle}>
              <div css={titleContainerStyle}>
                <h2 css={titleStyle}>{title}</h2>
              </div>
              <div css={descriptionContainerStyle}>
                <p css={descriptionStyle}>{description}</p>
              </div>
            </div>

            {/* Buttons */}
            <div css={buttonsStyle}>
              <button css={cancelButtonStyle} onClick={() => onClose(false)}>
                {cancelText}
              </button>
              <button css={confirmButtonStyle} onClick={() => onClose(true)}>
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const overlayStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
});

const containerStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  width: "100%",
  maxWidth: 320,
});

const contentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  width: "100%",
});

const titleContainerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 10px",
  width: "100%",
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const descriptionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
});

const descriptionStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);

const buttonsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
});

const cancelButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    padding: "8px 12px",

    "&:hover": {
      backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

const confirmButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    border: "none",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.BACKGROUND.WHITE,
    padding: "8px 12px",

    "&:hover": {
      backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

export default ConfirmModal;
