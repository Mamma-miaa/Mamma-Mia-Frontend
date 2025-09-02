import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";
import SearchIcon from "./_assets/search.svg?react";
import type { ComponentProps } from "react";

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
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)",
});

const inputStyle = css({
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: 14,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  color: "#191919",
  "&::placeholder": {
    color: "rgba(55, 56, 60, 0.28)",
  },
});

export default SearchInput;
