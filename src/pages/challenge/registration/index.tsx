import { css } from "@emotion/react";
import Spacing from "@/@lib/components/Spacing";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowDownIcon from "./_assets/arrow_down.svg?react";
import SearchIcon from "./_assets/search.svg?react";
import PlusIcon from "./_assets/plus.svg?react";
import { useState } from "react";
import ChallengeRegistrationPageHeader from "./_components/ChallengeRegistrationPageHeader";

const ChallengeRegistrationPage = () => {
  const [comment, setComment] = useState("");
  const [photoCount] = useState(0);

  return (
    <div css={css({ width: "100%", minHeight: "100vh" })}>
      <ChallengeRegistrationPageHeader />
      <Spacing size={20} />
      {/* 내용 */}
      <div css={contentContainerStyle}>
        {/* Step 배지 */}
        <div css={stepContainerStyle}>
          <div css={stepBadgeActiveStyle}>
            <span css={stepNumberStyle}>1</span>
          </div>
          <div css={stepBadgeDisabledStyle}>
            <span css={stepNumberDisabledStyle}>2</span>
          </div>
        </div>

        {/* 01: 음식 카테고리 선택 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>
            음식 카테고리 선택
          </label>
          <div css={selectBoxStyle}>
            <span css={selectTextStyle}>카테고리를 선택해주세요.</span>
            <ArrowDownIcon css={iconStyle} />
          </div>
        </div>

        {/* 02: 맛집 등록 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>맛집 등록</label>
          <button css={buttonStyle}>
            <SearchIcon css={iconStyle} />
            <span css={buttonTextStyle}>맛집 검색하기</span>
          </button>
        </div>

        {/* 03: 사진 */}
        <div css={photoSectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>사진</label>
          <div css={photoUploadBoxStyle}>
            <div css={photoUploadContentStyle}>
              <PlusIcon css={iconStyle} />
              <span css={photoCountStyle}>({photoCount}/3)</span>
            </div>
          </div>
        </div>

        {/* 04: 코멘트 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>코멘트</label>
          <div css={commentContainerStyle}>
            <textarea
              css={textareaStyle}
              placeholder="이 매장을 맛집으로 추천하는 이유가 무엇인가요? 자유로운 의견을 남겨주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={300}
            />
            <div css={commentCountStyle}>{comment.length}/300</div>
          </div>
        </div>

        {/* 05: 추천 메뉴 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>추천 메뉴</label>
          <button css={buttonStyle}>
            <PlusIcon css={iconStyle} />
            <span css={buttonTextStyle}>메뉴 등록하기</span>
          </button>
        </div>

        <button css={CTAButtonStyle}>다음</button>
      </div>
    </div>
  );
};

const contentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: "0 20px",
});

const stepContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 6,
});

const stepBadgeActiveStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  height: 20,
  borderRadius: 40,
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
});

const stepBadgeDisabledStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 20,
  height: 20,
  borderRadius: 40,
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
});

const stepNumberStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12B"]
);

const stepNumberDisabledStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.SUB["12B"]
);

const sectionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const labelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const labelRequiredStyle = css({
  ":after": {
    content: '"*"',
    color: THEME.COLORS.PRIMARY.RED,
    marginLeft: 4,
  },
});

const selectBoxStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  width: "100%",
  height: 44,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});

const selectTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);

const buttonStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 6,
  padding: "12px 0",
  width: "100%",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  cursor: "pointer",
});

const buttonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

const iconStyle = css({
  width: 20,
  height: 20,
});

const photoSectionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: 92,
});

const photoUploadBoxStyle = css({
  width: "100%",
  height: 92,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

const photoUploadContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
});

const photoCountStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

const commentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const textareaStyle = css(
  {
    width: "100%",
    height: 164,
    padding: 12,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    resize: "none",
    outline: "none",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

const commentCountStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "right",
  },
  TYPOGRAPHY.SUB["12R"]
);

const CTAButtonStyle = css(
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: "12px 0",
    width: "100%",
    height: 56,
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

export default ChallengeRegistrationPage;
