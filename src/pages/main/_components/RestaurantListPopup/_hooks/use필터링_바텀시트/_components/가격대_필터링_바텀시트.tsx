import { css } from "@emotion/react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import FilterBottomSheet from "@/components/FilterBottomSheet"
import { useState, useCallback } from "react"

const MIN_LIMIT = 0
const MAX_LIMIT = 50000
const STEP = 1000

const 가격대_필터링_바텀시트 = ({
  isOpen,
  onClose,
  initialMinPrice = MIN_LIMIT,
  initialMaxPrice = MAX_LIMIT,
}: {
  isOpen: boolean
  onClose: (param: unknown) => void
  initialMinPrice?: number
  initialMaxPrice?: number
}) => {
  const [minPrice, setMinPrice] = useState(initialMinPrice)
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - STEP)
    setMinPrice(value)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + STEP)
    setMaxPrice(value)
  }

  const handleReset = useCallback(() => {
    setMinPrice(MIN_LIMIT)
    setMaxPrice(MAX_LIMIT)
  }, [])

  const handleApply = useCallback(() => {
    onClose({ minPrice, maxPrice })
  }, [minPrice, maxPrice, onClose])

  const formatPrice = (price: number) => {
    if (price >= MAX_LIMIT) return "50,000원+"
    return `${price.toLocaleString()}원`
  }

  const minPercent = (minPrice / MAX_LIMIT) * 100
  const maxPercent = (maxPrice / MAX_LIMIT) * 100

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onApply={handleApply}
      onReset={handleReset}
      title="가격대"
      description="원하는 가격대를 설정해주세요."
    >
      <div css={sliderContainerStyle}>
        <div css={sliderTitleStyle}>
          <span css={sliderLabelStyle}>메뉴 가격대</span>
          <span css={priceRangeStyle}>
            {formatPrice(minPrice)} ~ {formatPrice(maxPrice)}
          </span>
        </div>

        <div css={sliderWrapperStyle}>
          {/* Base Track */}
          <div css={sliderTrackStyle} />

          {/* Active Range (Colored Bar) */}
          <div
            css={sliderRangeStyle}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Native Range Inputs */}
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={minPrice}
            onChange={handleMinChange}
            css={rangeInputStyle}
          />
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={maxPrice}
            onChange={handleMaxChange}
            css={rangeInputStyle}
          />

          {/* Custom Handles for UI */}
          <div css={sliderHandleStyle} style={{ left: `${minPercent}%` }} />
          <div css={sliderHandleStyle} style={{ left: `${maxPercent}%` }} />
        </div>
      </div>
    </FilterBottomSheet>
  )
}

const sliderContainerStyle = css({
  width: "100%",
  padding: "20px 0 40px",
})

const sliderTitleStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginBottom: 24,
})

const sliderLabelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
)

const priceRangeStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["18SB"]
)

const sliderWrapperStyle = css({
  position: "relative",
  width: "100%",
  height: 20,
  display: "flex",
  alignItems: "center",
})

const sliderTrackStyle = css({
  position: "absolute",
  width: "100%",
  height: 4,
  backgroundColor: THEME.COLORS.LINE.NORMAL,
  borderRadius: 12,
})

const sliderRangeStyle = css({
  position: "absolute",
  height: 4,
  backgroundColor: THEME.COLORS.PRIMARY.RED,
  borderRadius: 12,
  zIndex: 1,
})

const rangeInputStyle = css({
  position: "absolute",
  width: "100%",
  height: 4,
  appearance: "none",
  background: "none",
  pointerEvents: "none",
  zIndex: 2,
  margin: 0,
  padding: 0,

  "&::-webkit-slider-thumb": {
    appearance: "none",
    pointerEvents: "auto",
    width: 20,
    height: 20,
    borderRadius: "50%",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&::-moz-range-thumb": {
    appearance: "none",
    pointerEvents: "auto",
    width: 20,
    height: 20,
    border: "none",
    borderRadius: "50%",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
})

const sliderHandleStyle = css({
  position: "absolute",
  width: 20,
  height: 20,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: "50%",
  boxShadow: THEME.SHADOWS.NORMAL,
  transform: "translateX(-50%)",
  zIndex: 1,
  pointerEvents: "none", // input이 이벤트를 받도록 설정
})

export default 가격대_필터링_바텀시트
