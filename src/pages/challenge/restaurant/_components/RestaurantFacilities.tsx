import type { components } from "@/apis/schema"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import { css } from "@emotion/react"
import carImg from "@/assets/emoji/car.webp"
import deliveryImg from "@/assets/emoji/delivery.webp"
import takeoutImg from "@/assets/emoji/takeout.webp"

type RestaurantFacilitiesProps = {
  facilities: components["schemas"]["GetStoreDetailResponseFacility"]
}

const RestaurantFacilities = ({ facilities }: RestaurantFacilitiesProps) => {
  const hasFacilities = [
    facilities.parking,
    facilities.delivery,
    facilities.takeout,
  ].some(Boolean)

  return (
    hasFacilities && (
      <div css={additionalInfoSectionStyle}>
        <h2 css={sectionTitleStyle}>부가 정보</h2>
        <div css={additionalInfoGridStyle}>
          {facilities.parking && (
            <div css={additionalInfoItemStyle}>
              <img css={additionalEmojiStyle} src={carImg} />
              <span css={additionalTextStyle}>주차 가능</span>
            </div>
          )}
          {facilities.delivery && (
            <div css={additionalInfoItemStyle}>
              <img css={additionalEmojiStyle} src={deliveryImg} />
              <span css={additionalTextStyle}>배달 가능</span>
            </div>
          )}
          {facilities.takeout && (
            <div css={additionalInfoItemStyle}>
              <img css={additionalEmojiStyle} src={takeoutImg} />
              <span css={additionalTextStyle}>포장 가능</span>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default RestaurantFacilities

// 섹션 제목
const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

// 부가 정보 섹션
const additionalInfoSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

// 부가 정보 그리드
const additionalInfoGridStyle = css({
  display: "flex",
  alignItems: "stretch",
  gap: 24,
})

// 부가 정보 아이템
const additionalInfoItemStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  flex: 1 / 3,
})

// 부가 정보 이모지
const additionalEmojiStyle = css({
  width: 24,
  height: 24,
})

// 부가 정보 텍스트
const additionalTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  TYPOGRAPHY.BODY["14R"]
)
