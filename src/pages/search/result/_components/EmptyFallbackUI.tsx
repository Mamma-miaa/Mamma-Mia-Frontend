import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import ArrowRightIcon from "../_assets/arrow_right.svg?react";
import EmptyIcon from "@/assets/empty_icon.svg?react";
import { useNavigate } from "react-router-dom";

const EmptyFallbackUI = () => {
  const navigate = useNavigate();

  const handleRegisterButtonClick = () => {
    navigate("/challenge/registration");
  };

  return (
    <div css={containerStyle}>
      <div css={emptyStateSectionStyle}>
        <div css={emptyStateContentStyle}>
          <div css={emptyStateIconStyle}>
            <EmptyIcon />
          </div>
          <div css={emptyStateTextStyle}>
            맘마 미아....(밥을 잃어버렸다는 뜻)
          </div>
        </div>
      </div>

      <div css={tipsSectionStyle}>
        <div css={tipsCardStyle}>
          <h3 css={tipsTitleStyle}>찾는 결과가 없다면 이렇게 검색해 보세요</h3>
          <ul css={tipsListStyle}>
            <li css={tipItemStyle}>
              키워드를 정확하게 입력하셨는지 확인해 보세요.
            </li>
            <li css={tipItemStyle}>
              음식명만 단독으로 입력해 보세요. (예 : 제육볶음)
            </li>
          </ul>
        </div>

        <button css={registerButtonStyle} onClick={handleRegisterButtonClick}>
          <span css={registerButtonSubTextStyle}>👉 찾는 맛집이 없다면</span>
          <div css={registerButtonMainContentStyle}>
            <span css={registerButtonMainTextStyle}>도전맛집 등록하기</span>
            <ArrowRightIcon />
          </div>
        </button>
      </div>
    </div>
  );
};
export default EmptyFallbackUI;

// ===== 메인 컨테이너 =====
const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 40,
});

// ===== 빈 상태 섹션 =====
const emptyStateSectionStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
});

const emptyStateContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
});

const emptyStateIconStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const emptyStateTextStyle = css(
  {
    textAlign: "center",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

// ===== 팁 섹션 =====
const tipsSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: "0 20px",
});

const tipsCardStyle = css({
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  gap: 12,
  padding: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  borderRadius: 8,
});

const tipsTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const tipsListStyle = css({
  display: "flex",
  flexDirection: "column",
  alignSelf: "stretch",
  gap: 6,
  listStyle: "inside",
  paddingLeft: 16,
});

const tipItemStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.STRONG,
    margin: 0,
  },
  TYPOGRAPHY.SUB["12R"]
);

// ===== 등록 버튼 =====
const registerButtonStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  padding: 12,
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
  },

  "&:active": {
    backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
    transform: "scale(0.98)",
  },
});

const registerButtonSubTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const registerButtonMainContentStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const registerButtonMainTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.BODY["14SB"]
);
