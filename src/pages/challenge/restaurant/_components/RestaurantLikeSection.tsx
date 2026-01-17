import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import { useGetStoreDetailQuery } from "@/hooks/@server/store"
import { css } from "@emotion/react"
import { useSearchParams } from "react-router-dom"

const RestaurantLikeSection = () => {
  const [searchParams] = useSearchParams()
  const { data: storeDetail } = useGetStoreDetailQuery(
    Number(searchParams.get("id"))
  )

  return (
    <div css={votingInfoStyle}>
      <div css={votingItemStyle}>
        <span css={votingLabelStyle}>이번주</span>
        <span css={votingNumberStyle}>
          {(storeDetail.ranks?.weekly ?? 0).toLocaleString()}
        </span>
      </div>
      <span css={separatorStyle}>/</span>
      <div css={votingItemStyle}>
        <span css={votingLabelStyle}>이번달</span>
        <span css={votingNumberStyle}>
          {(storeDetail.ranks?.monthly ?? 0).toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default RestaurantLikeSection

// 투표 정보
const votingInfoStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
})

// 투표 아이템
const votingItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
})

// 투표 라벨
const votingLabelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

// 투표 숫자
const votingNumberStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.BODY["14SB"]
)

// 구분자
const separatorStyle = css({
  color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  opacity: 0.6,
  fontSize: 8,
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: "-2%",
})
