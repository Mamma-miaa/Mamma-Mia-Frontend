import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { css } from "@emotion/react"
import THEME from "@/constants/theme"
import {
  usePostSocialLoginMutation,
  usePostSocialLoginWithAgreementsMutation,
} from "@/hooks/@server/auth"
import toast from "@/utils/toast"
import { openServiceAgreementPopup } from "@/components/ServiceAgreementPopup/utils"
import type { components } from "@/apis/schema"

const LoginRedirectPage = () => {
  const [searchParams] = useSearchParams()
  const { mutate: postSocialLogin } = usePostSocialLoginMutation()
  const { mutate: postSocialLoginWithAgreements } =
    usePostSocialLoginWithAgreementsMutation()
  const navigate = useNavigate()

  const login = (code: string) => {
    postSocialLogin(
      {
        socialType: "KAKAO",
        code,
      },
      {
        onSuccess: async (data) => {
          if (data.needAdditionalAgreements) {
            const result = await openServiceAgreementPopup()
            if (result) {
              loginWithAgreements(data)
            }
            return
          }
          sessionStorage.setItem("accessToken", data.accessToken)
          sessionStorage.setItem("refreshToken", data.refreshToken)
          toast({ message: "로그인에 성공하였습니다." })
          navigate("/")
        },
      }
    )
  }

  const loginWithAgreements = (
    data: components["schemas"]["JoinSocialLoginResponse"]
  ) => {
    postSocialLoginWithAgreements(
      {
        memberId: data.memberId,
        agreements: [
          {
            type: "TERMS_OF_SERVICE",
            isAgreed: true,
          },
          {
            type: "PRIVACY_POLICY",
            isAgreed: true,
          },
          {
            type: "LOCATION_SERVICE",
            isAgreed: true,
          },
        ],
      },
      {
        onSuccess: (data) => {
          sessionStorage.setItem("accessToken", data.accessToken)
          sessionStorage.setItem("refreshToken", data.refreshToken)
          toast({ message: "로그인에 성공하였습니다." })
          navigate("/")
        },
      }
    )
  }

  useEffect(() => {
    const code = searchParams.get("code")

    if (!code) return
    login(code)
  }, [searchParams])

  return <div css={containerStyle}></div>
}

export default LoginRedirectPage

const containerStyle = css({
  width: "100%",
  height: "100vh",
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
})
