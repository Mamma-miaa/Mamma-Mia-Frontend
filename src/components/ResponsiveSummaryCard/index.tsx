import { css } from "@emotion/react"
import LocationIcon from "./_assets/location.svg?react"
import type { ComponentProps } from "react"
import TYPOGRAPHY from "@/constants/typography"
import THEME from "@/constants/theme"
import type { components } from "@/apis/schema"
import { useNavigate } from "react-router-dom"

import ranking_1st_weekly from "./_assets/badge_ranking_w1.webp"
import ranking_2nd_weekly from "./_assets/badge_ranking_w2.webp"
import ranking_3rd_weekly from "./_assets/badge_ranking_w3.webp"
import ranking_1st_monthly from "./_assets/badge_ranking_m1.webp"
import ranking_2nd_monthly from "./_assets/badge_ranking_m2.webp"
import ranking_3rd_monthly from "./_assets/badge_ranking_m3.webp"

// Import Swiper styles
interface SummaryCardProps extends ComponentProps<"div"> {
  restaurant:
    | components["schemas"]["GetNearByResponse"]
    | components["schemas"]["GetSearchResultResponse"]["stores"][number]
    | components["schemas"]["GetStoreRankingResponse"]
  rankingType?: "WEEKLY" | "MONTHLY"
}

const getRankingBadge = (
  rank: number,
  type: "WEEKLY" | "MONTHLY" = "WEEKLY"
) => {
  if (type === "WEEKLY") {
    switch (rank) {
      case 1:
        return ranking_1st_weekly
      case 2:
        return ranking_2nd_weekly
      case 3:
        return ranking_3rd_weekly
    }
  }
  switch (rank) {
    case 1:
      return ranking_1st_monthly
    case 2:
      return ranking_2nd_monthly
    case 3:
      return ranking_3rd_monthly
  }
  return ""
}

const ResponsiveSummaryCard = ({
  restaurant,
  rankingType: propsRankingType,
  ...props
}: SummaryCardProps) => {
  const navigate = useNavigate()

  // 랭킹 정보 추출 로직
  const getRankInfo = () => {
    // ranks 객체가 있는 경우 (GetNearByResponse, Store 등)
    if ("ranks" in restaurant && restaurant.ranks) {
      const ranks = restaurant.ranks as Record<string, number>

      // 전달받은 rankingType이 있으면 우선 사용
      if (propsRankingType && ranks[propsRankingType]) {
        return { rank: ranks[propsRankingType], type: propsRankingType }
      }

      // 없으면 WEEKLY -> MONTHLY 순으로 확인
      if (ranks.WEEKLY) return { rank: ranks.WEEKLY, type: "WEEKLY" as const }
      if (ranks.MONTHLY)
        return { rank: ranks.MONTHLY, type: "MONTHLY" as const }
    }

    return { rank: undefined, type: undefined }
  }

  const { rank, type: effectiveRankingType } = getRankInfo()
  const isRanked = rank !== undefined && rank >= 1 && rank <= 3

  const imageUrl =
    "imageUrl" in restaurant
      ? (restaurant as any).imageUrl
      : "mainImage" in restaurant
        ? (restaurant as any).mainImage
        : undefined

  const isNew = "isNew" in restaurant ? (restaurant as any).isNew : false

  return (
    <div
      css={containerStyle}
      onClick={() => navigate(`/restaurant?id=${restaurant.storeId}`)}
      {...props}
    >
      <div css={imageContainerStyle(isRanked)}>
        <img
          src={imageUrl ?? "https://placehold.co/78x78"}
          alt={restaurant.name}
          width={isRanked ? 86 : 92}
          height={isRanked ? 86 : 92}
          css={restaurantImageStyle}
        />
        {isRanked && (
          <img
            src={getRankingBadge(rank, effectiveRankingType)}
            alt={`${rank}위 배지`}
            width={90}
            height={36}
            css={rankingBadgeStyle}
          />
        )}
      </div>
      <div css={contentContainerStyle}>
        <div css={badgeSectionStyle}>
          {isNew && (
            <div css={newBadgeStyle}>
              <span css={newBadgeTextStyle}>New</span>
            </div>
          )}
        </div>
        <div css={titleSectionStyle}>
          <span css={categoryStyle}>{restaurant.category}</span>
          <h3 css={restaurantNameStyle}>{restaurant.name}</h3>
        </div>
        <div css={locationSectionStyle}>
          <div css={locationInfoStyle}>
            <LocationIcon />
            <span css={locationTextStyle}>충무로 역으로부터</span>
          </div>
          {"distanceMeters" in restaurant && (
            <span css={distanceStyle}>
              {Math.round(restaurant.distanceMeters).toLocaleString()}m
            </span>
          )}
          {"isOpen" in restaurant && restaurant.isOpen && (
            <>
              <div css={statusDotStyle} />
              <span css={statusTextStyle}>영업중</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const containerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 12,
  padding: "12px 0",
  background: "#FFFFFF",
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
})

const restaurantImageStyle = css({
  objectFit: "cover",
  width: "100%",
  height: "100%",
})

const imageContainerStyle = (isRanked: boolean) =>
  css({
    position: "relative",
    width: 92,
    height: 92,
    flexShrink: 0,
    borderRadius: 4,

    ...(isRanked && {
      border: `3px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
      boxSizing: "border-box",
    }),
  })

const rankingBadgeStyle = css({
  position: "relative",
  bottom: 30,
  left: 0,

  pointerEvents: "none",
})

const contentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
})

const titleSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 2,
  alignSelf: "stretch",
})

const categoryStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
)

const restaurantNameStyle = css(
  {
    textAlign: "left",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
    width: 210,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const badgeSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
})

const newBadgeStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 20,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: 4,
})

const newBadgeTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
    textAlign: "center",
  },
  TYPOGRAPHY.SUB["12B"]
)

const locationSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
})

const locationInfoStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
})

const locationTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.SUB["12R"]
)

const distanceStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.SUB["12B"]
)

const statusDotStyle = css({
  width: 3,
  height: 3,
  backgroundColor: "#D9D9D9",
  borderRadius: "50%",
})

const statusTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.SUB["12B"]
)

export default ResponsiveSummaryCard
