import Spacing from "@/@lib/components/Spacing";
import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import NewIcon from "../_assets/new.svg?react";
import ResponsiveSummaryCard from "./ResponsiveSummaryCard";
import { useNavigate } from "react-router-dom";
import TYPOGRAPHY from "@/constants/typography";
import type { components } from "@/apis/schema";
import use가격대_필터링_바텀시트 from "../_hooks/use필터링_바텀시트";
import VIEWPORT from "@/constants/viewport";
import styled from "@emotion/styled";
import { useState } from "react";

const RestaurantListPopup = ({
  data,
}: {
  data: components["schemas"]["GetNearByResponse"][];
}) => {
  const [isNewChipSelected, setIsNewChipSelected] = useState(false);
  const [isOpenChipSelected, setIsOpenChipSelected] = useState(false);
  const [isCategoryChipSelected, setIsCategoryChipSelected] = useState(false);
  const [isPriceRangeChipSelected, setIsPriceRangeChipSelected] =
    useState(false);

  const toggleNewChip = () => {
    setIsNewChipSelected(!isNewChipSelected);
  };

  const navigate = useNavigate();
  const { open가격대_필터링_바텀시트, open카테고리_필터링_바텀시트 } =
    use가격대_필터링_바텀시트();

  return (
    <div css={popupContainerStyle}>
      <Spacing size={20} />
      {/* 필터 칩 컨테이너 */}
      <div css={filterContainerStyle}>
        <FilterChip isSelected={isNewChipSelected} onClick={toggleNewChip}>
          <NewIcon />
        </FilterChip>
        <FilterChip isSelected={isOpenChipSelected}>영업중</FilterChip>
        <FilterChip
          isSelected={isCategoryChipSelected}
          onClick={open카테고리_필터링_바텀시트}
        >
          카테고리
        </FilterChip>
        <FilterChip
          isSelected={isPriceRangeChipSelected}
          onClick={open가격대_필터링_바텀시트}
        >
          가격대
        </FilterChip>
      </div>
      <Spacing size={16} />
      <div
        css={css({
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
        })}
      >
        {data.map((restaurant: components["schemas"]["GetNearByResponse"]) => (
          <ResponsiveSummaryCard
            restaurant={restaurant}
            key={restaurant.storeId}
            onClick={() => navigate(`/restaurant?id=${restaurant.storeId}`)}
          />
        ))}
      </div>
    </div>
  );
};

const popupContainerStyle = css({
  maxWidth: VIEWPORT.MAX_WIDTH,
  width: "100%",
  height: "100dvh",
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
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

const FilterChip = styled.button(
  ({ isSelected }: { isSelected: boolean }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 16px",
    height: 44,
    backgroundColor: isSelected
      ? THEME.COLORS.GRAYSCALE.NORMAL
      : THEME.COLORS.BACKGROUND.WHITE,
    color: isSelected
      ? THEME.COLORS.BACKGROUND.WHITE
      : THEME.COLORS.GRAYSCALE.NORMAL,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 1000,
    cursor: "pointer",
    transition: "all 0.2s ease",
    path: isSelected && {
      fill: THEME.COLORS.BACKGROUND.WHITE,
    },
  }),
  TYPOGRAPHY.BODY["14R"]
);

export default RestaurantListPopup;
