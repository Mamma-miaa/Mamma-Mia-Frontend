import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import { usePostSocialLoginMutation } from "@/hooks/@server/auth";

const LoginRedirectPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: postSocialLogin } = usePostSocialLoginMutation();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      postSocialLogin({
        socialType: "KAKAO",
        idToken: code,
      });
    }
  }, [searchParams]);

  return <div css={containerStyle}>로그인 중입니다...</div>;
};

export default LoginRedirectPage;

const containerStyle = css({
  width: "100%",
  height: "100vh",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});
