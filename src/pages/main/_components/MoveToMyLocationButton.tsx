import { css } from "@emotion/react"
import MyLocationIcon from "../_assets/my_location.svg?react"

interface MoveToMyLocationButtonProps {
  kakaoMap: React.RefObject<kakao.maps.Map | null>
  onLocationUpdate?: (latitude: number, longitude: number) => void
}

const MoveToMyLocationButton = ({
  kakaoMap,
  onLocationUpdate,
}: MoveToMyLocationButtonProps) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        kakaoMap.current?.setCenter(
          new kakao.maps.LatLng(latitude, longitude)
        )
        onLocationUpdate?.(latitude, longitude)
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다:", error)
      }
    )
  }

  return (
    <button css={locationButtonStyle} onClick={handleClick}>
      <MyLocationIcon />
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
