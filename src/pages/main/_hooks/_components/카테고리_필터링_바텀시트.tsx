import { css } from "@emotion/react";
import { useState } from "react";
import FilterBottomSheet from "../../_components/FilterBottomSheet";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

// Import category images
import 한식_백반 from "@/assets/graphics/한식_백반.webp";
import 국밥_탕_찌개 from "@/assets/graphics/귝밥_탕_찌개.webp";
import 삼겹살 from "@/assets/graphics/삼겹살.webp";
import 치킨 from "@/assets/graphics/치킨.webp";
import 피자_패푸 from "@/assets/graphics/피자_패푸.webp";
import 족발_보쌈 from "@/assets/graphics/족발_보쌈.webp";
import 회_초밥_해산물 from "@/assets/graphics/회_초밥_해산물.webp";
import 일식 from "@/assets/graphics/일식.webp";
import 중식 from "@/assets/graphics/중식.webp";
import 양식 from "@/assets/graphics/양식.webp";
import 아시안 from "@/assets/graphics/아시안.webp";
import 분식 from "@/assets/graphics/분식.webp";
import 채식_건강식 from "@/assets/graphics/채식_건강식.webp";
import 간식_길거리음식 from "@/assets/graphics/간식_길거리음식.webp";
import styled from "@emotion/styled";

interface CategoryChipProps {
  id: string;
  label: string;
  image: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const CategoryChip = ({
  id,
  label,
  image,
  isSelected,
  onClick,
}: CategoryChipProps) => {
  return (
    <Chip isSelected={isSelected} onClick={() => onClick(id)}>
      <img width={20} height={20} src={image} alt={label} css={imageStyle} />
      <span css={TYPOGRAPHY.SUB["12R"]}>{label}</span>
    </Chip>
  );
};

const 카테고리_필터링_바텀시트 = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (param: unknown) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: "korean", label: "한식/백반", image: 한식_백반 },
    { id: "soup", label: "국밥·탕/찌개", image: 국밥_탕_찌개 },
    { id: "meat", label: "고기구이", image: 삼겹살 },
    { id: "chicken", label: "치킨", image: 치킨 },
    { id: "pizza", label: "피자·패스트푸드", image: 피자_패푸 },
    { id: "pork", label: "족발·보쌈", image: 족발_보쌈 },
    { id: "seafood", label: "회·초밥/해산물", image: 회_초밥_해산물 },
    { id: "japanese", label: "일식(라멘·돈까스)", image: 일식 },
    { id: "chinese", label: "중식", image: 중식 },
    { id: "western", label: "양식", image: 양식 },
    { id: "asian", label: "아시안", image: 아시안 },
    { id: "snack", label: "분식", image: 분식 },
    { id: "vegetarian", label: "채식·건강식", image: 채식_건강식 },
    { id: "street", label: "간식/길거리음식", image: 간식_길거리음식 },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
  };

  const handleApply = () => {
    onClose(selectedCategories);
  };

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onApply={handleApply}
      title="카테고리"
      description="먹고싶은 음식의 카테고리를 설정해주세요."
      onReset={handleReset}
      isApplyButtonDisabled={selectedCategories.length === 0}
    >
      <div css={categoriesContainerStyle}>
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            id={category.id}
            label={category.label}
            image={category.image}
            isSelected={selectedCategories.includes(category.id)}
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </FilterBottomSheet>
  );
};

const categoriesContainerStyle = css({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
});

const Chip = styled.button(({ isSelected }: { isSelected: boolean }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "8px 12px 8px 8px",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 1000,
  cursor: "pointer",
  transition: "all 0.2s ease",

  ...(isSelected && {
    borderColor: THEME.COLORS.GRAYSCALE.NORMAL,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    color: THEME.COLORS.BACKGROUND.WHITE,
  }),
}));

const imageStyle = css({
  objectFit: "cover",
  borderRadius: 2,
});

export default 카테고리_필터링_바텀시트;
