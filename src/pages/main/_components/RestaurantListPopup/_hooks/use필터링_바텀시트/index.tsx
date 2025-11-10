import { overlay } from "overlay-kit";
import 가격대_필터링_바텀시트 from "./_components/가격대_필터링_바텀시트";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { openCategoryFilteringBottomSheet } from "@/components/CategoryFilterBottomSheet/utils";

const use필터링_바텀시트 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useState(false);
  const open가격대_필터링_바텀시트 = () => {
    return overlay.openAsync(({ isOpen, close }) => {
      return <가격대_필터링_바텀시트 isOpen={isOpen} onClose={close} />;
    });
  };

  const open카테고리_필터링_바텀시트 = async () => {
    return await openCategoryFilteringBottomSheet({
      initialSelectedCategories:
        searchParams.get("categories")?.split(",") || [],
      description: "먹고싶은 음식의 카테고리를 설정해주세요.",
    });
  };

  const handleClickPriceRangeChip = async () => {};

  const handleClickCategoryChip = async () => {
    const categories = await open카테고리_필터링_바텀시트();

    // 카테고리 필터링 바텀시트가 닫혔을 때
    if (!categories) return;

    // 카테고리 필터링 바텀시트가 닫혔을 때 카테고리가 선택되지 않았을 때
    if (categories.length === 0) {
      setSearchParams(
        (prev) => {
          prev.delete("categories");
          return prev;
        },
        { replace: true }
      );
      return;
    }
    setSearchParams(
      (prev) => {
        prev.set("categories", categories.join(","));
        return prev;
      },
      { replace: true }
    );
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
    handleClickPriceRangeChip,
    handleClickCategoryChip,
    getCategoryChipLabel,
  };
};

export default use필터링_바텀시트;
