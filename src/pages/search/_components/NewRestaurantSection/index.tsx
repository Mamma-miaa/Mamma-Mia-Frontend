import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import { css } from "@emotion/react"
import ArrowLeftIcon from "./_assets/arrow_left.svg?react"
import ArrowRightIcon from "./_assets/arrow_right.svg?react"
import NewRestaurantCard from "./_components/NewRestaurantCard"
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react"
import VIEWPORT from "@/constants/viewport"
import { useRef } from "react"
import { Virtual } from "swiper/modules"
import { 충무로역_좌표 } from "@/pages/main/_constants"
import { useGetNearbyStoreQuery } from "@/hooks/@server/store"

const NewRestaurantSection = () => {
  const { data } = useGetNearbyStoreQuery({
    minLatitude: 33.0,
    maxLatitude: 38.7,
    minLongitude: 124.5,
    maxLongitude: 131.9,
    userLatitude: 충무로역_좌표.lat,
    userLongitude: 충무로역_좌표.lng,
    size: 6,
    lastDistance: 0,
    lastStoreId: 0,
    isNew: true,
  })
  const swiperRef = useRef<SwiperRef>(null)

  return (
    <div css={newRestaurantSectionStyle}>
      <div css={newRestaurantHeaderStyle}>
        <div css={newRestaurantTitleContainerStyle}>
          <h2 css={newRestaurantTitleStyle}>NEW</h2>
          <p css={newRestaurantSubtitleStyle}>새로 등록된 따끈따끈한 맛집!</p>
        </div>
        <div css={newRestaurantActionsStyle}>
          <ArrowLeftIcon
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          />
          <ArrowRightIcon
            onClick={() => swiperRef.current?.swiper.slideNext()}
          />
        </div>
      </div>

      {/* 맛집 리스트 아이템 */}

      <Swiper
        ref={swiperRef}
        css={swiperStyle}
        loop
        centeredSlides
        spaceBetween={20}
      >
        {data?.items.map((restaurant) => (
          <SwiperSlide key={restaurant.storeId}>
            <NewRestaurantCard restaurant={restaurant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NewRestaurantSection

// 새로운 맛집 섹션 스타일
const newRestaurantSectionStyle = css({
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
})

const newRestaurantHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 16,
})

const newRestaurantTitleContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
})

const newRestaurantTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const newRestaurantSubtitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    margin: 0,
  },
  TYPOGRAPHY.BODY["14R"]
)

const newRestaurantActionsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
})

const swiperStyle = css({
  overflow: "visible",
  width: "100%",
  maxWidth: VIEWPORT.MAX_WIDTH,

  "& .swiper-slide": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
})
