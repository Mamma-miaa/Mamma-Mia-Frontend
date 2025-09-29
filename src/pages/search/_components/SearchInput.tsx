import { css } from "@emotion/react";
import { useState } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import SearchIcon from "@/@lib/assets/search.svg?react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchInput = ({
  placeholder = "매장명, 카테고리를 검색해 보세요.",
  value = "",
  onChange,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div css={searchFieldStyle}>
      <SearchIcon css={searchIconStyle} />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        css={inputStyle}
      />
    </div>
  );
};

const searchFieldStyle = css({
  flex: 1,
  height: 44,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "0 12px",
});

const searchIconStyle = css({
  width: 24,
  height: 24,
  flexShrink: 0,
});

const inputStyle = css(
  {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: THEME.COLORS.GRAYSCALE.NORMAL,

    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

export default SearchInput;
