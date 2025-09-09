import Spacing from "@/@lib/components/Spacing";
import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import NewIcon from "../_assets/new.svg?react";
import ResponsiveSummaryCard from "./ResponsiveSummaryCard";
import { useNavigate } from "react-router-dom";
import TYPOGRAPHY from "@/constants/typography";

const RestaurantListPopup = ({
  data,
}: {
  data: {
    id: string;
    restaurantName: string;
    category: string;
    address: string;
    latitude: number;
    longitude: number;
    restaurantImageUrl: string;
    distance: string;
  }[];
}) => {
  const navigate = useNavigate();

  return (
    <div css={popupContainerStyle}>
      <Spacing size={20} />
      {/* 필터 칩 컨테이너 */}
      <div css={filterContainerStyle}>
        <button css={css(filterChipStyle)}>
          <NewIcon />
        </button>
        <button css={css(filterChipStyle)}>영업중</button>
        <button css={css(filterChipStyle)}>카테고리</button>
        <button css={css(filterChipStyle)}>가격대</button>
      </div>
      <Spacing size={16} />
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
        })}
      >
        {data.map((restaurant) => (
          <ResponsiveSummaryCard
            {...restaurant}
            key={restaurant.id}
            onClick={() => navigate(`/restaurant?id=${restaurant.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const popupContainerStyle = css({
  width: "100dvw",
  height: "100dvh",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  zIndex: 1000,
});

const filterContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 20px",
  height: 44,
});

const filterChipStyle = css(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    height: 44,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 1000,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  TYPOGRAPHY.BODY["14R"]
);

export default RestaurantListPopup;
