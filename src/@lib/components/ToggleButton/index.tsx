import { css } from "@emotion/react";
import { useState } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

interface ToggleButtonProps {
  value?: "weekly" | "monthly";
  onChange?: (value: "weekly" | "monthly") => void;
  disabled?: boolean;
}

const ToggleButton = ({
  value = "weekly",
  onChange,
  disabled = false,
}: ToggleButtonProps) => {
  const [internalValue, setInternalValue] = useState<"weekly" | "monthly">(
    value
  );
  const currentValue = onChange ? value : internalValue;

  const handleOptionClick = (option: "weekly" | "monthly") => {
    if (disabled) return;

    if (onChange) {
      onChange(option);
    } else {
      setInternalValue(option);
    }
  };

  return (
    <div css={containerStyle}>
      <button
        css={[optionStyle, currentValue === "weekly" && activeOptionStyle]}
        onClick={() => handleOptionClick("weekly")}
        disabled={disabled}
        type="button"
      >
        <span css={[textStyle, currentValue === "weekly" && activeTextStyle]}>
          주간
        </span>
      </button>
      <button
        css={[optionStyle, currentValue === "monthly" && activeOptionStyle]}
        onClick={() => handleOptionClick("monthly")}
        disabled={disabled}
        type="button"
      >
        <span css={[textStyle, currentValue === "monthly" && activeTextStyle]}>
          월간
        </span>
      </button>
    </div>
  );
};

// Styles
const containerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 2,
  padding: 2,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 28,
  width: "fit-content",
});

const optionStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: 28,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  outline: "none",

  "&:focus-visible": {
    boxShadow: `0 0 0 2px ${THEME.COLORS.PRIMARY.RED}20`,
  },

  "&:hover:not(:disabled)": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

const activeOptionStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
});

const textStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    userSelect: "none",
  },
  TYPOGRAPHY.BODY["14SB"]
);

const activeTextStyle = css({
  color: THEME.COLORS.BACKGROUND.WHITE,
});

export default ToggleButton;
