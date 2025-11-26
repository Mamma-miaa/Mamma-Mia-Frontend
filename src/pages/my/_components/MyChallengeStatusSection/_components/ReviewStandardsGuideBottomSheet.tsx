import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import BottomSheet from "@/@lib/components/BottomSheet";

interface ReviewStandardsGuideBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewStandardsGuideBottomSheet = ({
  isOpen,
  onClose,
}: ReviewStandardsGuideBottomSheetProps) => {
  const standards = [
    {
      title: "📍 위치 정보",
      description: "정확한 주소와 위치가 등록되어 있어야 해요.",
    },
    {
      title: "📷 사진",
      description: "최소 3장 이상의 명확한 매장 또는 음식 사진이 필요해요.",
    },
    {
      title: "📝 정보",
      description: "매장명, 메뉴, 영업시간 등 기본 정보가 정확해야 해요.",
    },
    {
      title: "✨ 특별함",
      description: "다른 사람들에게 추천할 만한 특별한 이유가 있어야 해요.",
    },
    {
      title: "🚫 금지 사항",
      description: "허위 정보, 광고성 글, 타인 비하 등은 반려될 수 있어요.",
    },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div css={contentStyle}>
        <h3 css={titleStyle}>도전맛집 검수 기준</h3>
        <p css={descriptionStyle}>
          맘마미아는 진짜 맛집만을 추천하기 위해
          <br />
          아래 기준에 따라 도전맛집을 검수하고 있어요.
        </p>

        <div css={standardsListStyle}>
          {standards.map((standard, index) => (
            <div key={index} css={standardItemStyle}>
              <div css={standardTitleStyle}>{standard.title}</div>
              <div css={standardDescriptionStyle}>{standard.description}</div>
            </div>
          ))}
        </div>

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
  gap: 20,
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.STRONG,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["18SB"]
);

const descriptionStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);

const standardsListStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: "20px 0",
});

const standardItemStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const standardTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const standardDescriptionStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const confirmButtonStyle = css(
  {
    width: "100%",
    height: 52,
    backgroundColor: THEME.COLORS.PRIMARY.RED,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 8,
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
