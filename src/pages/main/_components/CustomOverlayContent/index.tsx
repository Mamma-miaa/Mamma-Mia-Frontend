import type { components } from "@/apis/schema"
import { 카테고리_이미지 } from "../../_constants"
import OverlayMarker from "@/@lib/components/OverlayMarker"
import THEME from "@/constants/theme"
import monthly_1_on from "./_assets/monthly_1_on.webp"
import monthly_2_on from "./_assets/monthly_2_on.webp"
import monthly_3_on from "./_assets/monthly_3_on.webp"
import weekly_1_on from "./_assets/weekly_1_on.webp"
import weekly_2_on from "./_assets/weekly_2_on.webp"
import weekly_3_on from "./_assets/weekly_3_on.webp"

function isCategoryKey(key: string): key is keyof typeof 카테고리_이미지 {
  return key in 카테고리_이미지
}

const CustomOverlayContent = ({
  restaurant,
}: {
  restaurant: components["schemas"]["GetNearByResponse"]
}) => {
  if ("WEEKLY" in restaurant.ranks) {
    switch (restaurant.ranks.WEEKLY) {
      case 1:
      case 2:
      case 3:
        return (
          <OverlayMarker>
            <img
              src={(() => {
                switch (restaurant.ranks.WEEKLY) {
                  case 1:
                    return weekly_1_on
                  case 2:
                    return weekly_2_on
                  case 3:
                    return weekly_3_on
                }
              })()}
              alt="주간 랭킹"
              width={55}
              height={28}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1000,
              }}
            />
            <img
              width={40}
              height={40}
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: 4,
                border: `2px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
                backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
                // Figma 디자인에 맞는 3단계 드롭 섀도우
                filter: `
          drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
        `,
              }}
              src={restaurant.imageUrl ?? "https://placehold.co/20x20"}
              alt={restaurant.name}
            />
          </OverlayMarker>
        )
    }
  }

  if ("MONTHLY" in restaurant.ranks) {
    switch (restaurant.ranks.MONTHLY) {
      case 1:
      case 2:
      case 3:
        return (
          <OverlayMarker>
            <img
              src={(() => {
                switch (restaurant.ranks.MONTHLY) {
                  case 1:
                    return monthly_1_on
                  case 2:
                    return monthly_2_on
                  case 3:
                    return monthly_3_on
                }
              })()}
              width={55}
              height={28}
              style={{
                position: "absolute",
                top: -15,
                left: -17,
                zIndex: 1000,
              }}
              alt="월간 랭킹"
            />
            <img
              width={40}
              height={40}
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: 4,
                border: `2px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
                backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
                // Figma 디자인에 맞는 3단계 드롭 섀도우
                filter: `
          drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))
          drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
        `,
              }}
              src={restaurant.imageUrl ?? "https://placehold.co/20x20"}
              alt={restaurant.name}
            />
          </OverlayMarker>
        )
    }
  }

  return (
    <OverlayMarker>
      <img
        src={
          isCategoryKey(restaurant.category)
            ? 카테고리_이미지[restaurant.category]
            : 카테고리_이미지["한식/백반"]
        }
        style={{
          width: "20px",
          height: "20px",
          objectFit: "cover",
        }}
        alt={restaurant.category}
      />
    </OverlayMarker>
  )
}

export default CustomOverlayContent
