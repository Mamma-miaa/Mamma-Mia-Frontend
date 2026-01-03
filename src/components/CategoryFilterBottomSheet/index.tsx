import { css } from "@emotion/react";
import { useState } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

// Import category images
import 간식_길거리음식 from "@/assets/graphics/간식_길거리음식.webp";
import 국밥 from "@/assets/graphics/국밥.webp";
import 고기구이 from "@/assets/graphics/고기구이.webp";
import 분식 from "@/assets/graphics/분식.webp";
import 아시안 from "@/assets/graphics/아시안.webp";
import 양식 from "@/assets/graphics/양식.webp";
import 일식 from "@/assets/graphics/일식.webp";
import 족발_보쌈 from "@/assets/graphics/족발_보쌈.webp";
import 찜_탕_찌개 from "@/assets/graphics/찜_탕_찌개.webp";
import 중식 from "@/assets/graphics/중식.webp";
import 채식_건강식 from "@/assets/graphics/채식_건강식.webp";
import 치킨 from "@/assets/graphics/치킨.webp";
import 피자_패스트푸드 from "@/assets/graphics/피자_패스트푸드.webp";
import 한식_백반 from "@/assets/graphics/한식_백반.webp";
import 회_해산물 from "@/assets/graphics/회_해산물.webp";
import styled from "@emotion/styled";
import FilterBottomSheet from "@/components/FilterBottomSheet";

interface CategoryChipProps {
  id: string;
  label: string;
  image: string;
  isSelected: boolean;
  onClick: (id: string) => void;
  enableReset?: boolean;
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

const CategoryFilteringBottomSheet = ({
  isOpen,
  onClose,
  initialSelectedCategories,
  description,
  isSingleSelect,
  enableReset = true,
}: {
  isOpen: boolean;
  onClose: (param: string[] | null) => void;
  initialSelectedCategories: string[];
  description: string;
  isSingleSelect?: boolean;
  enableReset?: boolean;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialSelectedCategories
  );

  const categories = [
    { id: "한식/백반", label: "한식/백반", image: 한식_백반 },
    { id: "국밥", label: "국밥", image: 국밥 },
    { id: "찜·탕/찌개", label: "찜·탕/찌개", image: 찜_탕_찌개 },
    { id: "고기구이", label: "고기구이", image: 고기구이 },
    { id: "치킨", label: "치킨", image: 치킨 },
    { id: "피자·패스트푸드", label: "피자·패스트푸드", image: 피자_패스트푸드 },
    { id: "족발·보쌈", label: "족발·보쌈", image: 족발_보쌈 },
    { id: "회·해산물", label: "회·해산물", image: 회_해산물 },
    { id: "일식", label: "일식", image: 일식 },
    { id: "중식", label: "중식", image: 중식 },
    { id: "양식", label: "양식", image: 양식 },
    { id: "아시안", label: "아시안", image: 아시안 },
    { id: "분식", label: "분식", image: 분식 },
    { id: "채식·건강식", label: "채식·건강식", image: 채식_건강식 },
    { id: "간식/길거리음식", label: "간식/길거리음식", image: 간식_길거리음식 },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (isSingleSelect) {
      setSelectedCategories([categoryId]);
      return;
    }

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

  const isApplyButtonDisabled =
    selectedCategories.sort().join(",") ===
    initialSelectedCategories.sort().join(",");

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={() => onClose(null)}
      onApply={handleApply}
      title="카테고리"
      description={description}
      onReset={enableReset ? handleReset : undefined}
      isApplyButtonDisabled={isApplyButtonDisabled}
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
  color: THEME.COLORS.GRAYSCALE.NORMAL,

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

export default CategoryFilteringBottomSheet;
