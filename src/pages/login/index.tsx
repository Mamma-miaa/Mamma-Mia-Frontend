import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import logoImg from "./_assets/graphic_mamma_mia.webp";
import naverLogoImg from "./_assets/naver_logo.webp";
import kakaoLogoImg from "./_assets/kakao_logo.webp";
import googleLogoImg from "./_assets/google_logo.webp";
import ExitIcon from "./_assets/exit.svg?react";
import { useNavigate } from "react-router-dom";
import toast from "@/utils/toast";
import VIEWPORT from "@/constants/viewport";
import { usePostSocialLoginMutation } from "@/hooks/@server/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutate: postSocialLogin } = usePostSocialLoginMutation();

  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/login/oauth`,
    });
  };

  return (
    <div css={containerStyle}>
      {/* 닫기 버튼 */}
      <button css={closeButtonStyle} onClick={() => navigate(-1)}>
        <ExitIcon />
      </button>

      {/* 로고 섹션 */}
      <div css={logoSectionStyle}>
        <img src={logoImg} alt="logo" width={"100%"} />
      </div>

      {/* 소셜 로그인 버튼들 */}
      <div css={buttonsContainerStyle}>
        {/* 네이버 로그인 */}
        {/* <button
          css={naverButtonStyle}
          onClick={() => {
            toast({ message: "개발이 필요한 기능입니다." });
          }}
        >
          <img src={naverLogoImg} alt="naver" width={16} height={16} />
          <span css={buttonTextStyle}>네이버 로그인</span>
        </button> */}

        {/* 카카오 로그인 */}
        <button css={kakaoButtonStyle} onClick={handleKakaoLogin}>
          <img src={kakaoLogoImg} alt="kakao" width={18} height={18} />
          <span css={kakaoButtonTextStyle}>카카오 로그인</span>
        </button>

        {/* 구글 로그인 */}
        {/* <button
          css={googleButtonStyle}
          onClick={() => {
            toast({ message: "개발이 필요한 기능입니다." });
          }}
        >
          <img src={googleLogoImg} alt="google" width={16} height={16} />
          <span css={googleButtonTextStyle}>Google 로그인</span>
        </button> */}
      </div>
    </div>
  );
};

// 스타일 정의
const containerStyle = css({
  height: "100dvh",
  backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "50%",
});

const closeButtonStyle = css({
  position: "absolute",
  top: 20,
  right: 20,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});

const logoSectionStyle = css({
  width: "66.66%",
  aspectRatio: "233/104",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const buttonsContainerStyle = css({
  position: "absolute",
  bottom: 80,
  padding: 20,
  maxWidth: VIEWPORT.MAX_WIDTH,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

const naverButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "0 35px",
  height: 48,
  backgroundColor: "#03C75A",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  color: THEME.COLORS.BACKGROUND.WHITE,
});

const kakaoButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "0 14px",
  height: 48,
  backgroundColor: "#FEE500",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const googleButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "0 14px",
  height: 48,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const buttonTextStyle = css({
  ...TYPOGRAPHY.HEADERS["16SB"],
  color: THEME.COLORS.BACKGROUND.WHITE,
});

const kakaoButtonTextStyle = css({
  ...TYPOGRAPHY.HEADERS["16SB"],
  color: "rgba(0, 0, 0, 0.85)",
});

const googleButtonTextStyle = css({
  ...TYPOGRAPHY.HEADERS["16SB"],
  color: "#1F1F1F",
});

export default LoginPage;
