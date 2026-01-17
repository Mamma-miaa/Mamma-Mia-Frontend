import { css } from "@emotion/react"
import { type ComponentProps } from "react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import SearchIcon from "@/@lib/assets/search.svg?react"
import cancelButtonImage from "../_assets/cancel.webp"

interface SearchInputProps extends ComponentProps<"input"> {
  placeholder?: string
  onSearch?: (query: string) => void
  onSubmit: () => void
}

const SearchInput = ({
  placeholder = "매장명, 카테고리를 검색해 보세요.",
  value = "",
  onChange,
  onSubmit,
}: SearchInputProps) => {
  return (
    <form
      css={searchFieldStyle}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <button type="submit" css={searchIconButtonStyle}>
        <SearchIcon width={24} height={24} />
      </button>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        css={inputStyle}
      />
    </form>
  )
}

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
})

const searchIconButtonStyle = css({
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  width: "fit-content",
  height: "fit-content",
  padding: 0,
  margin: 0,
})

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
)

export default SearchInput
