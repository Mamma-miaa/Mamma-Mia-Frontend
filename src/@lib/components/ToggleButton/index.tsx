import { css } from "@emotion/react";
import { motion } from "motion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { useSearchParams } from "react-router-dom";

type Item = {
  label: string;
  value: string;
};

const ToggleButton = ({
  firstItem,
  secondItem,
  paramKey,
}: {
  paramKey: string;
  firstItem: Item;
  secondItem: Item;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstItemActive =
    searchParams.get(paramKey) === firstItem.value ||
    !searchParams.has(paramKey);
  const isSecondItemActive = searchParams.get(paramKey) === secondItem.value;

  return (
    <div
      onClick={() =>
        setSearchParams(
          (prev) => {
            if (prev.get(paramKey) === secondItem.value) {
              prev.delete(paramKey);
            } else {
              prev.set(paramKey, secondItem.value);
            }
            return prev;
          },
          { replace: true }
        )
      }
      css={[
        containerStyle,
        isSecondItemActive && { justifyContent: "flex-end" },
      ]}
    >
      <motion.button
        css={[optionStyle]}
        type="button"
        layout
        transition={{
          type: "keyFrames",
          duration: 0.3,
        }}
      ></motion.button>

      <span
        css={[
          textStyle,
          css({
            position: "absolute",
            left: 14,
            top: 10,
            color: isFirstItemActive
              ? THEME.COLORS.BACKGROUND.WHITE
              : THEME.COLORS.GRAYSCALE.ASSISTIVE,
          }),
        ]}
      >
        {firstItem.label}
      </span>
      <span
        css={[
          textStyle,
          css({
            position: "absolute",
            right: 14,
            top: 10,
            color: isSecondItemActive
              ? THEME.COLORS.BACKGROUND.WHITE
              : THEME.COLORS.GRAYSCALE.ASSISTIVE,
          }),
        ]}
      >
        {secondItem.label}
      </span>
    </div>
  );
};

// Styles
const containerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 2,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 28,
  width: 102,
  height: 40,
  cursor: "pointer",
});

const optionStyle = css({
  width: 48,
  height: 36,
  borderRadius: 28,
  border: "none",
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  cursor: "pointer",
  outline: "none",
  position: "relative",
  overflow: "hidden",
});

const textStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    userSelect: "none",
    position: "relative",
    zIndex: 1,
  },
  TYPOGRAPHY.BODY["14SB"]
);

export default ToggleButton;
