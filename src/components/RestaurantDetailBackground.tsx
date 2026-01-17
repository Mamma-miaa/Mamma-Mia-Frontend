import { css } from "@emotion/react"

const RestaurantDetailBackground = ({ imgUrl }: { imgUrl: string }) => {
  return (
    <img
      src={imgUrl}
      alt="레스토랑 배경 이미지"
      css={restaurantBackgroundImageStyle}
    />
  )
}

export default RestaurantDetailBackground

const restaurantBackgroundImageStyle = css({
  width: "100%",
  aspectRatio: "375/460",
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
})
