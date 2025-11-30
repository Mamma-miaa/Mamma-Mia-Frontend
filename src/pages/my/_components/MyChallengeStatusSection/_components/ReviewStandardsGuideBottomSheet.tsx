import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import BottomSheet from "@/@lib/components/BottomSheet";
import { overlay } from "overlay-kit";

interface ReviewStandardsGuideBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const openReviewStandardsGuideBottomSheet = () => {
  overlay.open(({ isOpen, close }) => (
    <ReviewStandardsGuideBottomSheet isOpen={isOpen} onClose={close} />
  ));
};

const ReviewStandardsGuideBottomSheet = ({
  isOpen,
  onClose,
}: ReviewStandardsGuideBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div css={contentStyle}>
        <h3 css={titleStyle}>검수 기준</h3>

        <ul css={standardsListStyle}>
          {[
            <>맛집 주소 및 사진이 정확해야 해요.</>,
            <>
              이미 등록된 맛집은{" "}
              <strong css={boldTextStyle}>중복 등록이 불가능</strong>
              해요.
            </>,
            <>
              부적절한 표현이나 광고성 문구는{" "}
              <strong css={boldTextStyle}>반려</strong>
              됩니다.
            </>,
            <>
              도전맛집 승인은{" "}
              <strong css={boldTextStyle}>등록일 기준 최소 7일 정도</strong>{" "}
              소요됩니다.
            </>,
          ].map((standard, index) => (
            <li key={index} css={standardItemStyle}>
              {standard}
            </li>
          ))}
        </ul>

        <button type="button" css={confirmButtonStyle} onClick={onClose}>
          확인
        </button>
      </div>
    </BottomSheet>
  );
};

export default ReviewStandardsGuideBottomSheet;

// Styles
const contentStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const standardsListStyle = css({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 6,

  listStyle: "numeric",
  paddingLeft: 16,
});

const standardItemStyle = css(
  {
    width: "100%",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const boldTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const confirmButtonStyle = css(
  {
    width: "100%",
    height: 44,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "&:active": {
      opacity: 0.8,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);
