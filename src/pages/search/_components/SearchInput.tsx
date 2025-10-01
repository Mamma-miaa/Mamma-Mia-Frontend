import { css } from "@emotion/react";
import { useState } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import SearchIcon from "@/@lib/assets/search.svg?react";
import cancelButtonImage from "../_assets/cancel.webp";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}

const SearchInput = ({
  placeholder = "매장명, 카테고리를 검색해 보세요.",
  value = "",
  onChange,
  onSearch,
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
        type="search"
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
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: THEME.COLORS.GRAYSCALE.NORMAL,

    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    },

    "&::-webkit-search-cancel-button": {
      appearance: "none",
      backgroundImage: `url(${cancelButtonImage})`,
      backgroundSize: "20px 20px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

export default SearchInput;
