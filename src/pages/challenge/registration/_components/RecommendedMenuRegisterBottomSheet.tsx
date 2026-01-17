import { css } from "@emotion/react"
import FilterBottomSheet from "@/components/FilterBottomSheet"
import { overlay } from "overlay-kit"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import useTextInput from "@/hooks/useTextInput"
import PlusIcon from "../_assets/plus.svg?react"
import { useRef, useState } from "react"
import useNumberInput from "@/hooks/useNumberInput"

export interface RecommendedMenuResult {
  id: string
  name: string
  price: string
  image?: {
    file: File
    preview: string
  }
}

export const openRecommendedMenuRegisterBottomSheet = () => {
  return overlay.openAsync<RecommendedMenuResult | null>(
    ({ isOpen, close }) => {
      return (
        <RecommendedMenuRegisterBottomSheet
          isOpen={isOpen}
          onClose={() => close(null)}
          onApply={(menu) => close(menu)}
        />
      )
    }
  )
}

interface PhotoFile {
  file: File
  preview: string
}

const RecommendedMenuRegisterBottomSheet = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean
  onClose: () => void
  onApply: (menu: RecommendedMenuResult | null) => void
}) => {
  const { value: menuName, handleChange: handleMenuNameChange } = useTextInput()
  const { value: menuPrice, handleChange: handleMenuPriceChange } =
    useNumberInput()
  const [photo, setPhoto] = useState<PhotoFile | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    setPhoto({
      file,
      preview: URL.createObjectURL(file),
    })

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePhotoRemove = () => {
    if (photo) {
      URL.revokeObjectURL(photo.preview)
      setPhoto(null)
    }
  }

  const handleApply = () => {
    if (!menuName.trim()) {
      return
    }
    const menu: RecommendedMenuResult = {
      id: Date.now().toString(),
      name: menuName,
      price: menuPrice.toString(),
      image: photo || undefined,
    }
    onApply(menu)
  }

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onApply={handleApply}
      title="추천 메뉴 등록"
      ctaButtonText="메뉴 등록"
      isApplyButtonDisabled={!menuName.trim() || !menuPrice || !photo}
    >
      <div css={containerStyle}>
        {/* 메뉴 제목 */}
        <h3 css={menuTitleStyle}>메뉴 1</h3>

        {/* 01: 메뉴 이름 */}
        <div css={sectionStyle}>
          <label css={labelStyle}>
            메뉴 이름<span css={requiredMarkStyle}>*</span>
          </label>
          <input
            type="text"
            css={inputStyle}
            placeholder="메뉴명을 입력해주세요."
            value={menuName}
            onChange={handleMenuNameChange}
          />
        </div>

        {/* 02: 메뉴 가격 */}
        <div css={sectionStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>메뉴 가격</label>
          <div css={priceInputContainerStyle}>
            <input
              type="text"
              css={inputStyle}
              placeholder="메뉴 가격을 입력해주세요."
              value={menuPrice}
              onChange={handleMenuPriceChange}
            />
            <span css={priceUnitStyle}>원</span>
          </div>
        </div>

        {/* 03: 사진 */}
        <div css={sectionStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>사진</label>
          {photo ? (
            <div css={photoContainerStyle}>
              <img src={photo.preview} alt="메뉴 사진" css={photoImageStyle} />
              <button css={photoRemoveButtonStyle} onClick={handlePhotoRemove}>
                ×
              </button>
            </div>
          ) : (
            <div
              css={photoUploadBoxStyle}
              onClick={handlePhotoSelect}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  handlePhotoSelect()
                }
              }}
            >
              <div css={photoUploadContentStyle}>
                <PlusIcon css={plusIconStyle} />
                <span css={photoUploadTextStyle}>등록하기</span>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            css={hiddenInputStyle}
          />
        </div>
      </div>
    </FilterBottomSheet>
  )
}

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  width: "100%",
})

const menuTitleStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
    width: "100%",
  },
  TYPOGRAPHY.BODY["14SB"]
)

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
})

const labelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
)

const requiredMarkStyle = css({
  color: THEME.COLORS.PRIMARY.RED,
  marginLeft: 4,
})

const labelRequiredStyle = css({
  ":after": {
    content: '"*"',
    color: THEME.COLORS.PRIMARY.RED,
    marginLeft: 4,
  },
})

const inputStyle = css(
  {
    width: "100%",
    height: 44,
    padding: 12,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    outline: "none",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    "&::placeholder": {
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    },
  },
  TYPOGRAPHY.BODY["14R"]
)

const priceInputContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  width: "100%",
})

const priceUnitStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

const photoUploadBoxStyle = css({
  width: 92,
  height: 92,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
})

const photoUploadContentStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
})

const plusIconStyle = css({
  width: 20,
  height: 20,
  fill: THEME.COLORS.BACKGROUND.WHITE,
})

const photoUploadTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.BODY["14R"]
)

const photoContainerStyle = css({
  position: "relative",
  width: 92,
  height: 92,
})

const photoImageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
})

const photoRemoveButtonStyle = css({
  position: "absolute",
  top: 4,
  right: 4,
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
  color: THEME.COLORS.BACKGROUND.WHITE,
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  lineHeight: 1,
})

const hiddenInputStyle = css({
  display: "none",
})

export default RecommendedMenuRegisterBottomSheet
