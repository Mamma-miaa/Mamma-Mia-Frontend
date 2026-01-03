import THEME from "@/constants/theme";
import { css } from "@emotion/react";
import NewIcon from "@/pages/main/_assets/new.svg?react";
import { useSearchParams } from "react-router-dom";
import TYPOGRAPHY from "@/constants/typography";
import type { components } from "@/apis/schema";
import VIEWPORT from "@/constants/viewport";
import styled from "@emotion/styled";
import use필터링_바텀시트 from "./_hooks/use필터링_바텀시트";
import EmptyIcon from "@/assets/empty_icon.svg?react";
import { motion, usePresence } from "motion/react";
import { useEffect } from "react";
import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard";

const RestaurantListPopup = ({
  data,
}: {
  data: components["schemas"]["GetNearByResponse"][];
}) => {
  const { handleClickCategoryChip, getCategoryChipLabel } =
    use필터링_바텀시트();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPresent, safeToRemove] = usePresence();

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

  useEffect(() => {
    !isPresent && setTimeout(safeToRemove, 1000);
  }, [isPresent]);

  return (
    <motion.div
      css={popupContainerStyle}
      initial={{ opacity: 0, y: "50%", translateX: "-50%" }}
      animate={{ opacity: 1, y: 0, translateX: "-50%" }}
      exit={{ opacity: 0, y: "50%", translateX: "-50%" }}
      transition={{ type: "keyframes", duration: 0.3 }}
    >
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
          />
        ))}
      </div>
      {data.length === 0 && (
        <div css={emptyStateContainerStyle}>
          <div css={emptyStateContentStyle}>
            <div css={emptyStateIconStyle}>
              <EmptyIcon />
            </div>
            <div css={emptyStateTextStyle}>
              조건에 맞는 맛집이 없어요.
              <br />
              필터를 변경하거나 지도를 이동해 보세요.
            </div>
          </div>
        </div>
      )}
    </motion.div>
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

const emptyStateContainerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 200px)",
  padding: "40px 20px",
});

const emptyStateContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
});

const emptyStateIconStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const emptyStateTextStyle = css(
  {
    textAlign: "center",
    color: "rgba(55, 56, 60, 0.61)",
  },
  TYPOGRAPHY.BODY["14R"]
);

const FilterChip = styled.button(
  ({ isSelected }: { isSelected: boolean }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 12px",
    height: 32,
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
  TYPOGRAPHY.SUB["12R"]
);

export default RestaurantListPopup;
