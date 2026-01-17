import { css } from "@emotion/react"
import MyLocationIcon from "../_assets/my_location.svg?react"

interface MoveToMyLocationButtonProps {
  kakaoMap: React.RefObject<kakao.maps.Map | null>
}

const MoveToMyLocationButton = ({ kakaoMap }: MoveToMyLocationButtonProps) => {
  return (
    <button css={locationButtonStyle}>
      <MyLocationIcon
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            kakaoMap.current?.setCenter(
              new kakao.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              )
            )
          })
        }}
      />
    </button>
  )
}

export default MoveToMyLocationButton

const locationButtonStyle = css({
  width: 44,
  height: 44,
  borderRadius: 8,
  backgroundColor: "#191919",
  border: "none",
  cursor: "pointer",
  flex: "none",
})
