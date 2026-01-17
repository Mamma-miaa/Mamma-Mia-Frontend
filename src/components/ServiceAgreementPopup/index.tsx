import { css } from "@emotion/react"
import { useState } from "react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import ModalContainer from "@/components/ModalContainer"
import CheckboxOffIcon from "./_assets/checkbox_off.svg?react"
import CheckboxOnIcon from "./_assets/checkbox_on.svg?react"
import ArrowRightIcon from "./_assets/arrow_right.svg?react"
import TermsOfService from "@/view/TermsOfService"
import { openPopup } from "@/@lib/components/Popup"
import PrivacyPolicy from "@/view/PrivacyPolicy"
import LocationInformationUseTerms from "@/view/LocationInformationUseTerms"

interface ServiceAgreementPopupProps {
  isOpen: boolean
  onClose: (result: boolean) => void
}

const ServiceAgreementPopup = ({
  isOpen,
  onClose,
}: ServiceAgreementPopupProps) => {
  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    location: false,
    privacy: false,
  })

  const handleAllCheck = () => {
    const newValue = !agreements.all
    setAgreements({
      all: newValue,
      terms: newValue,
      location: newValue,
      privacy: newValue,
    })
  }

  const handleIndividualCheck = (key: "terms" | "location" | "privacy") => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    }

    // 모든 개별 항목이 체크되면 전체 동의도 체크
    const allChecked =
      newAgreements.terms && newAgreements.location && newAgreements.privacy
    newAgreements.all = allChecked

    setAgreements(newAgreements)
  }

  const isAllRequired =
    agreements.terms && agreements.location && agreements.privacy

  const handleConfirm = () => {
    if (isAllRequired) {
      onClose(true)
    }
  }

  const handleOpenTerms = (type: "terms" | "location" | "privacy") => {
    switch (type) {
      case "terms":
        openPopup(<TermsOfService />)
        break
      case "location":
        openPopup(<LocationInformationUseTerms />)
        break
      case "privacy":
        openPopup(<PrivacyPolicy />)
        break
    }
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={() => onClose(false)}
      containerWidth={280}
    >
      {/* Content */}
      <div css={contentStyle}>
        {/* Title */}
        <div css={titleContainerStyle}>
          <h2 css={titleStyle}>
            서비스 이용을 위해 이용약관
            <br />
            동의가 필요합니다.
          </h2>
        </div>

        {/* Agreements */}
        <div css={agreementsContainerStyle}>
          {/* All Agreement */}
          <button
            type="button"
            css={allAgreementButtonStyle}
            onClick={handleAllCheck}
          >
            {agreements.all ? (
              <CheckboxOnIcon css={checkboxStyle} />
            ) : (
              <CheckboxOffIcon css={checkboxStyle} />
            )}
            <span css={allAgreementTextStyle}>약관 전체동의</span>
          </button>

          {/* Individual Agreements */}
          <div css={individualAgreementsContainerStyle}>
            {/* Terms of Service */}
            <div css={agreementItemStyle}>
              <button
                type="button"
                css={agreementItemButtonStyle}
                onClick={() => handleIndividualCheck("terms")}
              >
                {agreements.terms ? (
                  <CheckboxOnIcon css={checkboxStyle} />
                ) : (
                  <CheckboxOffIcon css={checkboxStyle} />
                )}
                <span css={agreementItemTextStyle}>
                  (필수) 서비스 이용 약관
                </span>
              </button>
              <button
                type="button"
                css={arrowButtonStyle}
                onClick={() => handleOpenTerms("terms")}
              >
                <ArrowRightIcon css={arrowIconStyle} />
              </button>
            </div>

            {/* Location Agreement */}
            <div css={agreementItemStyle}>
              <button
                type="button"
                css={agreementItemButtonStyle}
                onClick={() => handleIndividualCheck("location")}
              >
                {agreements.location ? (
                  <CheckboxOnIcon css={checkboxStyle} />
                ) : (
                  <CheckboxOffIcon css={checkboxStyle} />
                )}
                <span css={agreementItemTextStyle}>
                  (필수) 위치정보 이용 약관
                </span>
              </button>
              <button
                type="button"
                css={arrowButtonStyle}
                onClick={() => handleOpenTerms("location")}
              >
                <ArrowRightIcon css={arrowIconStyle} />
              </button>
            </div>

            {/* Privacy Policy */}
            <div css={agreementItemStyle}>
              <button
                type="button"
                css={agreementItemButtonStyle}
                onClick={() => handleIndividualCheck("privacy")}
              >
                {agreements.privacy ? (
                  <CheckboxOnIcon css={checkboxStyle} />
                ) : (
                  <CheckboxOffIcon css={checkboxStyle} />
                )}
                <span css={agreementItemTextStyle}>
                  (필수) 개인정보 처리 방침
                </span>
              </button>
              <button
                type="button"
                css={arrowButtonStyle}
                onClick={() => handleOpenTerms("privacy")}
              >
                <ArrowRightIcon css={arrowIconStyle} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div css={buttonsStyle}>
        <button
          type="button"
          css={cancelButtonStyle}
          onClick={() => onClose(false)}
        >
          취소
        </button>
        <button
          type="button"
          css={css(
            confirmButtonStyle,
            isAllRequired
              ? confirmButtonEnabledStyle
              : confirmButtonDisabledStyle
          )}
          onClick={handleConfirm}
          disabled={!isAllRequired}
        >
          동의하기
        </button>
      </div>
    </ModalContainer>
  )
}

export default ServiceAgreementPopup

// Content
const contentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  width: "100%",
})

// Title
const titleContainerStyle = css({
  display: "flex",
  justifyContent: "center",
  width: "100%",
})

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

// Agreements Container
const agreementsContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
})

// All Agreement
const allAgreementButtonStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 4px",
  width: "100%",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  borderRadius: 8,
  border: "none",
  cursor: "pointer",

  "&:hover": {
    opacity: 0.8,
  },
})

const allAgreementTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
)

// Individual Agreements
const individualAgreementsContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
})

const agreementItemStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 4,
  padding: "6px 4px",
  width: "100%",
})

const agreementItemButtonStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",

  "&:hover": {
    opacity: 0.8,
  },
})

const agreementItemTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

const arrowButtonStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",

  "&:hover": {
    opacity: 0.8,
  },
})

const checkboxStyle = css({
  width: 24,
  height: 24,
  flexShrink: 0,
})

const arrowIconStyle = css({
  width: 20,
  height: 20,
})

// Buttons
const buttonsStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
})

const cancelButtonStyle = css(
  {
    flex: 1,
    height: 44,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    padding: "8px 12px",

    "&:hover": {
      backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
)

const confirmButtonStyle = css(
  {
    flex: 1,
    height: 44,
    borderRadius: 6,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "8px 12px",
  },
  TYPOGRAPHY.BODY["14SB"]
)

const confirmButtonEnabledStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  color: THEME.COLORS.BACKGROUND.WHITE,

  "&:hover": {
    backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
  },
})

const confirmButtonDisabledStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
  color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  cursor: "not-allowed",
})
