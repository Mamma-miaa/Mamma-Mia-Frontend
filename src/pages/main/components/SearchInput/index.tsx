import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import SearchIcon from "./_assets/search.svg?react";
import type { ComponentProps } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

interface SearchInputProps extends ComponentProps<"input"> {
  placeholder?: string;
  css?: SerializedStyles;
}

const SearchInput = ({
  placeholder = "Text",
  css: containerCss,
  ...props
}: SearchInputProps) => {
  return (
    <div css={css(containerStyle, containerCss)}>
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        css={inputStyle}
        {...props}
      />
    </div>
  );
};

const containerStyle = css({
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
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    "&::placeholder": {
      color: "rgba(55, 56, 60, 0.28)",
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

export default SearchInput;
