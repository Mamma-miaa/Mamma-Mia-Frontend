import { css } from "@emotion/react"
import MyLocationIcon from "../_assets/my_location.svg?react"
import { getIsLoggedIn } from "@/utils/sessionStorage"
import { openLoginModal } from "@/components/ConfirmModal/utils"

interface MoveToMyLocationButtonProps {
  kakaoMap: React.RefObject<kakao.maps.Map | null>
  onLocationUpdate?: (latitude: number, longitude: number) => void
}

const MoveToMyLocationButton = ({
  kakaoMap,
  onLocationUpdate,
}: MoveToMyLocationButtonProps) => {
  const handleClick = async () => {
    // 로그인 상태 확인
    if (!getIsLoggedIn()) {
      await openLoginModal()
      return
    }

    // 로그인 상태일 때만 위치 정보 가져오기
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
