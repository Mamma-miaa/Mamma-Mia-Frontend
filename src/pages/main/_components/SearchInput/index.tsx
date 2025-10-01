import { css } from "@emotion/react";
import SearchIcon from "./_assets/search.svg?react";
import type { ComponentProps } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const SearchInput = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div css={css(containerStyle)} {...props}>
      <SearchIcon />
      <div css={inputStyle}>맛집 검색</div>
    </div>
  );
};

const containerStyle = css({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  padding: "0 12px",
  height: 44,
  width: "100%",
  background: "#FFFFFF",
  borderRadius: 8,
  boxShadow: THEME.SHADOWS.EMPHASIZED,
});

const inputStyle = css(
  {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    "&::placeholder": {
      color: "rgba(55, 56, 60, 0.28)",
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

export default SearchInput;
