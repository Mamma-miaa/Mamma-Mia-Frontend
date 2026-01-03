import { overlay } from "overlay-kit";
import 가격대_필터링_바텀시트 from "./_components/가격대_필터링_바텀시트";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { openCategoryFilteringBottomSheet } from "@/components/CategoryFilterBottomSheet/utils";

const open가격대_필터링_바텀시트 = ({
  initialMinPrice,
  initialMaxPrice,
}: {
  initialMinPrice?: number;
  initialMaxPrice?: number;
}) => {
  return overlay.openAsync(({ isOpen, close }) => {
    return (
      <가격대_필터링_바텀시트
        isOpen={isOpen}
        onClose={close}
        initialMinPrice={initialMinPrice}
        initialMaxPrice={initialMaxPrice}
      />
    );
  });
};

const use필터링_바텀시트 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useState(false);

  const open카테고리_필터링_바텀시트 = async () => {
    return await openCategoryFilteringBottomSheet({
      initialSelectedCategories:
        searchParams.get("categories")?.split(",") || [],
      description: "먹고 싶은 음식 카테고리를 골라주세요.",
    });
  };

  const handleClickPriceRangeChip = async () => {
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    const priceRange = (await open가격대_필터링_바텀시트({
      initialMinPrice: minPrice,
      initialMaxPrice: maxPrice,
    })) as {
      minPrice: number;
      maxPrice: number;
    } | null;

    if (!priceRange) return;

    setSearchParams(
      (prev) => {
        prev.set("minPrice", priceRange.minPrice.toString());
        prev.set("maxPrice", priceRange.maxPrice.toString());
        return prev;
      },
      { replace: true }
    );
  };
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

  const getPriceRangeChipLabel = () => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (minPrice !== null && maxPrice !== null) {
      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (min === 0 && max === 50000) return "가격대";

      const format = (p: number) => {
        if (p >= 50000) return "50,000원+";
        return `${p.toLocaleString()}원`;
      };

      return `${format(min)} ~ ${format(max)}`;
    }
    return "가격대";
  };

  return {
    handleClickPriceRangeChip,
    handleClickCategoryChip,
    getCategoryChipLabel,
    getPriceRangeChipLabel,
  };
};

export default use필터링_바텀시트;
