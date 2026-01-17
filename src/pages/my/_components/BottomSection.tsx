import { css } from "@emotion/react"
import { useState } from "react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard"
import {
  useGetMyBookmarkStoreQuery,
  useGetMyMammaMiaStoreQuery,
} from "@/hooks/@server/member"

type TabType = "mamma-mia" | "bookmark"

const BottomSection = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("mamma-mia")
  const { data: mammaMiaData } = useGetMyMammaMiaStoreQuery()
  const { data: bookmarkData } = useGetMyBookmarkStoreQuery()

  return (
    <section css={containerStyle}>
      <div css={tabContainerStyle}>
        <button
          css={[
            tabButtonStyle,
            selectedTab === "mamma-mia" && selectedTabButtonStyle,
          ]}
          onClick={() => setSelectedTab("mamma-mia")}
        >
          <span
            css={[
              tabTextStyle,
              selectedTab === "mamma-mia" && selectedTabTextStyle,
            ]}
          >
            나의 맘마미아
          </span>
        </button>
        <button
          css={[
            tabButtonStyle,
            selectedTab === "bookmark" && selectedTabButtonStyle,
          ]}
          onClick={() => setSelectedTab("bookmark")}
        >
          <span
            css={[
              tabTextStyle,
              selectedTab === "bookmark" && selectedTabTextStyle,
            ]}
          >
            나의 북마크
          </span>
        </button>
      </div>

      <div css={listContainerStyle}>
        {(() => {
          switch (selectedTab) {
            case "mamma-mia":
              if (mammaMiaData.items.length === 0) {
                return (
                  <div css={emptyStateStyle}>
                    <span>아직 투표한 맛집이 없어요.</span>
                    <span>좋아하는 맛집에 ‘맘마미아’를 눌러보세요.</span>
                  </div>
                )
              }
              return mammaMiaData.items.map((restaurant) => (
                <ResponsiveSummaryCard
                  key={restaurant.storeId}
                  restaurant={{
                    storeId: restaurant.storeId,
                    name: restaurant.storeName,
                    category: restaurant.categoryName,
                    imageUrl: restaurant.imageUrl,
                    distanceMeters: restaurant.distanceToStationMeters,
                    totalLike: 0,
                  }}
                />
              ))
            case "bookmark":
              if (bookmarkData.items.length === 0) {
                return (
                  <div css={emptyStateStyle}>
                    <span>아직 북마크한 식당이 없어요.</span>
                    <span>좋아하는 맛집에 ‘북마크’를 눌러보세요</span>
                  </div>
                )
              }
              return bookmarkData.items.map((restaurant) => (
                <ResponsiveSummaryCard
                  key={restaurant.storeId}
                  restaurant={{
                    storeId: restaurant.storeId,
                    name: restaurant.storeName,
                    category: restaurant.categoryName,
                    imageUrl: restaurant.imageUrl,
                    distanceMeters: restaurant.distanceToStationMeters,
                    totalLike: 0,
                  }}
                />
              ))
          }
        })()}
      </div>
    </section>
  )
}

export default BottomSection

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
})

const tabContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignSelf: "stretch",
  padding: "0 20px",
})

const tabButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: "0 8px 12px",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
})

const selectedTabButtonStyle = css({
  borderBottom: `2px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
})

const tabTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const selectedTabTextStyle = css({
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

const listContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  padding: "16px 20px 40px",
  width: "100%",
})

const emptyStateStyle = css(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "80px 0",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
)
