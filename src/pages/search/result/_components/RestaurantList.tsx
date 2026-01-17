import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import { useGetSearchedStoresQuery } from "@/hooks/@server/store"
import { css } from "@emotion/react"
import { useSearchParams } from "react-router-dom"
import EmptyFallbackUI from "./EmptyFallbackUI"

const RestaurantList = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query") || ""
  const {
    data: { stores },
  } = useGetSearchedStoresQuery({ keyword: query })

  // 검색 결과가 없는 경우 EmptyFallbackUI 표시
  if (stores.length === 0) {
    return <EmptyFallbackUI />
  }

  return (
    <div css={listContainerStyle}>
      <div css={resultHeaderStyle}>
        <span css={resultCountStyle}>전체</span>
        <span css={resultNumberStyle}>{stores.length}</span>
      </div>
      <div css={listStyle}>
        {stores.map((store) => (
          <ResponsiveSummaryCard key={store.storeId} restaurant={store} />
        ))}
      </div>
    </div>
  )
}

export default RestaurantList

const listStyle = css({
  display: "flex",
  flexDirection: "column",
  padding: "0 20px",
  width: "100%",
  flex: 1,
})

const listContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
})

const resultHeaderStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 2,
  padding: "0 20px 4px",
  width: "100%",
})

const resultCountStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const resultNumberStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)
