import { css } from "@emotion/react";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { overlay } from "overlay-kit";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import useTextInput from "@/hooks/useTextInput";
import SearchIcon from "../_assets/search.svg?react";
import { useState, useEffect, useRef } from "react";

export interface RestaurantSearchResult {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  x: string; // longitude
  y: string; // latitude
}

export const openRestaurantSearchBottomSheet = () => {
  return overlay.openAsync<RestaurantSearchResult | null>(
    ({ isOpen, close }) => {
      return (
        <RestaurantSearchBottomSheet
          isOpen={isOpen}
          onClose={() => close(null)}
          onApply={(restaurant) => close(restaurant)}
        />
      );
    }
  );
};

const RestaurantSearchBottomSheet = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (restaurant: RestaurantSearchResult | null) => void;
}) => {
  const { value: keyword, handleChange: handleKeywordChange } = useTextInput();
  const [searchResults, setSearchResults] = useState<RestaurantSearchResult[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantSearchResult | null>(null);
  const placesServiceRef = useRef<kakao.maps.services.Places | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao?.maps?.services) {
      placesServiceRef.current = new kakao.maps.services.Places();
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.trim()) {
      return;
    }

    if (!placesServiceRef.current) {
      return;
    }

    setIsSearching(true);
    placesServiceRef.current.keywordSearch(keyword, (data, status) => {
      setIsSearching(false);

      if (status === kakao.maps.services.Status.OK) {
        const results: RestaurantSearchResult[] = data.map((place: any) => ({
          id: place.id,
          place_name: place.place_name,
          road_address_name: place.road_address_name || "",
          address_name: place.address_name || "",
          phone: place.phone || "",
          x: place.x,
          y: place.y,
        }));
        setSearchResults(results);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        setSearchResults([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        setSearchResults([]);
      }
    });
  };

  const handleRestaurantSelect = (restaurant: RestaurantSearchResult) => {
    setSelectedRestaurant(restaurant);
  };

  const handleApply = () => {
    onApply(selectedRestaurant);
  };

  const handleReset = () => {
    handleKeywordChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
    setSearchResults([]);
    setSelectedRestaurant(null);
  };

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onApply={handleApply}
      onReset={handleReset}
      title="맛집 검색"
      description="검색할 맛집 이름을 입력해주세요."
      isApplyButtonDisabled={!selectedRestaurant}
      ctaButtonText="선택 완료"
    >
      <div css={containerStyle}>
        {/* 검색 입력 */}
        <form css={searchInputContainerStyle} onSubmit={handleSearch}>
          <input
            type="text"
            css={searchInputStyle}
            placeholder="맛집 이름을 입력해주세요."
            value={keyword}
            onChange={handleKeywordChange}
          />
          <button type="submit" css={searchButtonStyle} disabled={isSearching}>
            <SearchIcon
              css={searchIconStyle}
              fill={THEME.COLORS.BACKGROUND.WHITE}
            />
          </button>
        </form>

        {/* 검색 결과 */}
        {(() => {
          if (isSearching) {
            return <div css={loadingStyle}>검색 중...</div>;
          }
          if (searchResults.length > 0) {
            return (
              <div css={resultsContainerStyle}>
                {searchResults.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    css={[
                      resultItemStyle,
                      selectedRestaurant?.id === restaurant.id &&
                        selectedResultItemStyle,
                    ]}
                    onClick={() => handleRestaurantSelect(restaurant)}
                  >
                    <div css={restaurantNameStyle}>{restaurant.place_name}</div>
                    {restaurant.road_address_name && (
                      <div css={addressStyle}>
                        {restaurant.road_address_name}
                      </div>
                    )}
                    {restaurant.address_name && (
                      <div css={addressStyle}>{restaurant.address_name}</div>
                    )}
                    {restaurant.phone && (
                      <div css={phoneStyle}>{restaurant.phone}</div>
                    )}
                  </div>
                ))}
              </div>
            );
          }
          return <div css={emptyStateStyle}>검색 결과가 없습니다.</div>;
        })()}
      </div>
    </FilterBottomSheet>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
  height: "calc(100vh - 220px)",
  maxHeight: "calc(100vh - 220px)",
  overflowY: "auto",
});

const searchInputContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  width: "100%",
});

const searchInputStyle = css(
  {
    flex: 1,
    height: 44,
    padding: "12px 16px",
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    outline: "none",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

const searchButtonStyle = css({
  width: 44,
  height: 44,
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: "none",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:disabled": {
    backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
    cursor: "not-allowed",
  },
});

const searchIconStyle = css({
  width: 20,
  height: 20,
  path: {
    fill: THEME.COLORS.BACKGROUND.WHITE,
    fillOpacity: 1,
  },
});

const resultsContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: 4,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: THEME.COLORS.LINE.NORMAL,
    borderRadius: 2,
  },
});

const resultItemStyle = css({
  padding: 16,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },
});

const selectedResultItemStyle = css({
  borderColor: THEME.COLORS.PRIMARY.RED,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

const restaurantNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    marginBottom: 4,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const addressStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    marginBottom: 2,
  },
  TYPOGRAPHY.SUB["12R"]
);

const phoneStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    marginTop: 4,
  },
  TYPOGRAPHY.SUB["12R"]
);

const loadingStyle = css(
  {
    padding: 40,
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

const emptyStateStyle = css(
  {
    padding: 40,
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

export default RestaurantSearchBottomSheet;
