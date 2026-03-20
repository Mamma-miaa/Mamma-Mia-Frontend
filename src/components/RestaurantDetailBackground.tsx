import { css } from "@emotion/react"
import THEME from "@/constants/theme"

const RestaurantDetailBackground = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <div css={restaurantBackgroundWrapperStyle}>
      <img
        src={imgUrl}
        alt="레스토랑 배경 이미지"
        css={restaurantBackgroundImageStyle}
      />
      <div css={restaurantBackgroundDimStyle} />
    </div>
  )
}

export default RestaurantDetailBackground

const restaurantBackgroundImageStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  aspectRatio: "375/460",
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
})

const restaurantBackgroundWrapperStyle = css({
  position: "relative",
  width: "100%",
  aspectRatio: "375/460",
})

const restaurantBackgroundDimStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
  opacity: 0.2,
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
})
