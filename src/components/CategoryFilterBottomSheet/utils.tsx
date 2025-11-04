import { overlay } from "overlay-kit";
import CategoryFilteringBottomSheet from ".";
import type { ComponentProps } from "react";

type OpenCategoryFilteringBottomSheetProps = Pick<
  ComponentProps<typeof CategoryFilteringBottomSheet>,
  "initialSelectedCategories" | "description"
>;

export const openCategoryFilteringBottomSheet = ({
  initialSelectedCategories,
  description,
}: OpenCategoryFilteringBottomSheetProps) => {
  return overlay.openAsync<string[] | null>(({ isOpen, close }) => {
    return (
      <CategoryFilteringBottomSheet
        isOpen={isOpen}
        onClose={close}
        initialSelectedCategories={initialSelectedCategories}
        description={description}
      />
    );
  });
};
