import { css } from "@emotion/react";
import FilterBottomSheet from "../_components/FilterBottomSheet";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { overlay } from "overlay-kit";

const use가격대_필터링_바텀시트 = () => {
  const open가격대_필터링_바텀시트 = () => {
    return overlay.openAsync(({ isOpen, close }) => {
      return <가격대_필터링_바텀시트 isOpen={isOpen} onClose={close} />;
    });
  };

  return {
    open가격대_필터링_바텀시트,
  };
};

export default use가격대_필터링_바텀시트;

const 가격대_필터링_바텀시트 = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (param: unknown) => void;
}) => {
  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="가격대"
      description="원하는 가격대를 설정해주세요."
    >
      {/* Slider Content */}
      <div css={sliderContainerStyle}>
        <div css={sliderTitleStyle}>
          <span css={sliderLabelStyle}>메뉴 가격대</span>
          <span css={priceRangeStyle}>100원 ~ 10000원</span>
        </div>

        <div css={sliderWrapperStyle}>
          <div css={sliderTrackStyle} />
          <div
            css={sliderRangeStyle}
            style={{
              left: `10%`,
              width: `80%`,
            }}
          />
          <div css={sliderHandleStyle} style={{ left: `10%` }} />
          <div css={sliderHandleStyle} style={{ left: `90%` }} />
        </div>
      </div>
    </FilterBottomSheet>
  );
};

const sliderContainerStyle = css({
  width: "100%",
  height: 91,
  borderRadius: 8,
});

const sliderTitleStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 1,
  marginBottom: 20,
});

const sliderLabelStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const priceRangeStyle = css({
  ...TYPOGRAPHY.HEADERS["18SB"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const sliderWrapperStyle = css({
  position: "relative",
  width: "100%",
  height: 20,
});

const sliderTrackStyle = css({
  position: "absolute",
  top: 8,
  left: 0,
  right: 0,
  height: 4,
  backgroundColor: THEME.COLORS.LINE.NORMAL,
  borderRadius: 12,
});

const sliderRangeStyle = css({
  position: "absolute",
  top: 8,
  height: 4,
  backgroundColor: THEME.COLORS.PRIMARY.RED,
  borderRadius: 12,
});

const sliderHandleStyle = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: 20,
  height: 20,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: "50%",
  boxShadow: THEME.SHADOWS.NORMAL,
  cursor: "pointer",
});
