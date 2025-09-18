import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import NewIcon from "../_assets/new.svg?react";
import ResponsiveSummaryCard from "./ResponsiveSummaryCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import TYPOGRAPHY from "@/constants/typography";
import type { components } from "@/apis/schema";
import VIEWPORT from "@/constants/viewport";
import styled from "@emotion/styled";
import use필터링_바텀시트 from "../_hooks/use필터링_바텀시트";

const RestaurantListPopup = ({
  data,
}: {
  data: components["schemas"]["GetNearByResponse"][];
}) => {
  const { handleClickCategoryChip, getCategoryChipLabel } =
    use필터링_바텀시트();
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleNewChip = () => {
    setSearchParams(
      (prev) => {
        if (prev.has("isNew")) {
          prev.delete("isNew");
        } else {
          prev.set("isNew", "true");
        }
        return prev;
      },
      { replace: true }
    );
  };

  const toggleIsOpenChip = () => {
    setSearchParams(
      (prev) => {
        if (prev.has("isOpen")) {
          prev.delete("isOpen");
        } else {
          prev.set("isOpen", "true");
        }
        return prev;
      },
      { replace: true }
    );
  };

  const navigate = useNavigate();

  return (
    <div css={popupContainerStyle}>
      <div css={filterContainerStyle}>
        <FilterChip
          isSelected={searchParams.has("isNew")}
          onClick={toggleNewChip}
        >
          <NewIcon />
        </FilterChip>
        <FilterChip
          isSelected={searchParams.has("isOpen")}
          onClick={toggleIsOpenChip}
        >
          영업중
        </FilterChip>
        <FilterChip
          isSelected={searchParams.has("categories")}
          onClick={handleClickCategoryChip}
        >
          {getCategoryChipLabel()}
        </FilterChip>
        {/* <FilterChip isSelected={false} onClick={handleClickPriceRangeChip}>
          가격대
        </FilterChip> */}
      </div>
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
  overflow: "scroll",
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  zIndex: 1000,
});

const filterContainerStyle = css({
  position: "sticky",
  top: 0,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  padding: "20px 20px 16px 20px",
  display: "flex",
  alignItems: "center",
  gap: 8,
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
