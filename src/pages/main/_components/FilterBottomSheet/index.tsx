import { css } from "@emotion/react";

import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ResetIcon from "./_assets/reset.svg?react";
import BottomSheet from "@/@lib/components/BottomSheet";

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: (param?: unknown) => void;
  onReset?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const FilterBottomSheet = ({
  isOpen,
  onClose,
  onReset,
  title,
  description,
  children,
}: FilterBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div css={headerStyle}>
        <div css={titleContainerStyle}>
          <h2 css={titleStyle}>{title}</h2>
        </div>
        <div css={descriptionStyle}>
          <p css={descriptionTextStyle}>{description}</p>
        </div>
      </div>

      {children}

      {/* Action Buttons */}
      <div css={actionButtonsStyle}>
        <div css={resetButtonGroupStyle}>
          <button css={resetButtonStyle} onClick={onReset}>
            <ResetIcon />
          </button>
          <div css={dividerStyle} />
        </div>

        <button css={css(closeButtonStyle)} onClick={onClose}>
          닫기
        </button>

        <button css={applyButtonStyle}>설정완료</button>
      </div>
    </BottomSheet>
  );
};

const headerStyle = css({
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
    color: THEME.COLORS.GRAYSCALE.STRONG,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const descriptionStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
});

const descriptionTextStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  textAlign: "center",
});

const actionButtonsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
});

const resetButtonGroupStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const resetButtonStyle = css({
  width: 44,
  height: 44,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: THEME.COLORS.GRAYSCALE.NORMAL,

  "&:hover": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },
});

const dividerStyle = css({
  width: 0,
  height: 16,
  borderLeft: `1px solid ${THEME.COLORS.LINE.NEUTRAL}`,
});

const closeButtonStyle = css(
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

    "&:hover": {
      backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

const applyButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    border: "none",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.DISABLE,

    "&:hover:not(:disabled)": {
      backgroundColor: THEME.COLORS.LINE.ALTERNATIVE,
    },

    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

export default FilterBottomSheet;
