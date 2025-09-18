import { overlay } from "overlay-kit";
import 가격대_필터링_바텀시트 from "./_components/가격대_필터링_바텀시트";
import 카테고리_필터링_바텀시트 from "./_components/카테고리_필터링_바텀시트";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const use필터링_바텀시트 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCategoryChipSelected, setIsCategoryChipSelected] = useState(false);
  const [isPriceRangeChipSelected, setIsPriceRangeChipSelected] =
    useState(false);
  const open가격대_필터링_바텀시트 = () => {
    return overlay.openAsync(({ isOpen, close }) => {
      return <가격대_필터링_바텀시트 isOpen={isOpen} onClose={close} />;
    });
  };

  const open카테고리_필터링_바텀시트 = () => {
    return overlay.openAsync<string[] | null>(({ isOpen, close }) => {
      return (
        <카테고리_필터링_바텀시트
          isOpen={isOpen}
          onClose={close}
          initialSelectedCategories={
            searchParams.get("categories")?.split(",") || []
          }
        />
      );
    });
  };

  const handleClickPriceRangeChip = async () => {};

  const handleClickCategoryChip = async () => {
    const categories = await open카테고리_필터링_바텀시트();
    if (!categories) return;
    setIsCategoryChipSelected(true);
    setSearchParams({ categories: categories.join(",") });
  };

  const getCategoryChipLabel = () => {
    if (searchParams.has("categories")) {
      const categories = searchParams.get("categories")?.split(",") || [];

      if (categories.length === 1) {
        return categories[0];
      }

      return `${categories[0]} 외 ${categories.length - 1}개`;
    }
    return "카테고리";
  };

  return {
    isPriceRangeChipSelected,
    isCategoryChipSelected,
    handleClickPriceRangeChip,
    handleClickCategoryChip,
    getCategoryChipLabel,
  };
};

export default use필터링_바텀시트;
