import { css } from "@emotion/react"
import { EMPTY_IMAGE_URL } from "@/constants/setting"

const RestaurantDetailImages = ({ imgUrls }: { imgUrls: string[] }) => {
  return (
    <img
      src={imgUrls[0] ?? EMPTY_IMAGE_URL}
      alt="레스토랑 이미지"
      css={restaurantImageStyle}
    />
  )
}

export default RestaurantDetailImages

const restaurantImageStyle = css({
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: 12,
  objectFit: "cover",
})
