import { css } from "@emotion/react"
import Spacing from "@/@lib/components/Spacing"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import ArrowDownIcon from "./_assets/arrow_down.svg?react"
import SearchIcon from "./_assets/search.svg?react"
import PlusIcon from "./_assets/plus.svg?react"
import ArrowRightIcon from "@/pages/search/result/_assets/arrow_right.svg?react"
import { useState, useRef, useEffect } from "react"
import registrationTitle from "./_assets/registration.webp"
import ExitIcon from "./_assets/exit.svg?react"
import VIEWPORT from "@/constants/viewport"
import { openCategoryFilteringBottomSheet } from "@/components/CategoryFilterBottomSheet/utils"
import PhotoRemoveIcon from "./_assets/photo_remove.svg?react"
import useTextInput from "@/hooks/useTextInput"
import {
  openRecommendedMenuRegisterBottomSheet,
  type RecommendedMenuResult,
} from "./_components/RecommendedMenuRegisterBottomSheet"
import { openRestaurantSearchBottomSheet } from "./_components/RestaurantSearchBottomSheet"
import type { RestaurantSearchResult } from "./_components/RestaurantSearchBottomSheet"
import { usePostChallengeApplicationMutation } from "@/hooks/@server/store"
import { useNavigate } from "react-router-dom"
import { openConfirmModal } from "@/components/ConfirmModal/utils"
import toast from "@/utils/toast"

interface PhotoFile {
  file: File
  preview: string
}

const ChallengeRegistrationPage = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { value: comment, handleChange: handleCommentChange } = useTextInput()
  const [recommendedMenus, setRecommendedMenus] = useState<
    RecommendedMenuResult[]
  >([])
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantSearchResult | null>(null)
  const { mutate: postChallengeApplication } =
    usePostChallengeApplicationMutation()
  const navigate = useNavigate()

  const handleCategorySelect = async () => {
    const categories = await openCategoryFilteringBottomSheet({
      initialSelectedCategories: [],
      description: "등록할 음식점의 음식 카테고리를 설정해주세요.",
      isSingleSelect: true,
      enableReset: false,
    })
    if (categories) {
      setSelectedCategories(categories)
    }
  }

  const handlePhotoSelect = () => {
    if (photos.length >= 3) {
      return
    }
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const remainingSlots = 3 - photos.length
    const filesToAdd = Array.from(files).slice(0, remainingSlots)

    const newPhotos: PhotoFile[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setPhotos((prev) => [...prev, ...newPhotos])

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePhotoRemove = (index: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev]
      // 이전 URL 해제
      URL.revokeObjectURL(newPhotos[index].preview)
      newPhotos.splice(index, 1)
      return newPhotos
    })
  }

  const handleRecommendedMenuRegister = async () => {
    const result = await openRecommendedMenuRegisterBottomSheet()
    if (result) {
      setRecommendedMenus((prev) => [...prev, result])
    }
  }

  const handleMenuEdit = (menuId: string) => {
    // TODO: 메뉴 수정 기능 구현
    console.log("Edit menu:", menuId)
  }

  const handleRestaurantSearch = async () => {
    const restaurant = await openRestaurantSearchBottomSheet()
    if (restaurant) {
      setSelectedRestaurant(restaurant)
    }
  }

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.preview)
      })
    }
  }, [photos])

  const isAllFieldsFilled =
    selectedCategories.length > 0 &&
    selectedRestaurant !== null &&
    photos.length > 0 &&
    comment.trim().length > 0 &&
    recommendedMenus.length > 0

  const handleChallengeApplication = () => {
    const formData = new FormData()
    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            facilities: {
              parking: false,
              takeout: false,
              delivery: false,
              indoorRestroom: false,
              outdoorRestroom: false,
              groupSeating: false,
            },
            name: selectedRestaurant?.place_name ?? "",
            latitude: Number(selectedRestaurant?.y),
            longitude: Number(selectedRestaurant?.x),
            registerChallengeStoreBusinessHours: undefined,
            address: selectedRestaurant?.address_name ?? "",
            category: selectedCategories[0],
            comment,
            registerChallengeStoreMenus: recommendedMenus.map((menu) => ({
              name: menu.name,
              price: Number(menu.price),
            })),
          }),
        ],
        {
          type: "application/json",
        }
      )
    )
    photos.forEach((photo) => {
      formData.append("storeImages", photo.file)
    })
    recommendedMenus.forEach((menu) => {
      if (menu.image?.file) {
        formData.append("menuImages", menu.image.file)
      }
    })
    postChallengeApplication(formData, {
      onSuccess: () => {
        // TODO 도전 맛집 등록 성공 시 처리
        navigate("/", { replace: true })
        toast({ message: "도전 맛집 등록이 완료되었습니다." })
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  const handleExit = async () => {
    const isOk = await openConfirmModal({
      title: "등록을 중단하시겠습니까?",
      description: `아직 등록이 완료되지 않았고,\n작성한 내용이 사라질 수 있습니다.\n계속 등록을 진행하시겠습니까?`,
      cancelText: "나가기",
      confirmText: "계속 등록하기",
    })
    if (!isOk) navigate(-1)
  }

  return (
    <div css={css({ width: "100%", minHeight: "100vh" })}>
      {/* 헤더 */}
      <div
        css={css({
          padding: "16px 20px",
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <ExitIcon onClick={handleExit} />
      </div>
      {/* 제목 */}
      <Spacing size={20} />
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <img
          src={registrationTitle}
          alt="registration title"
          css={css({ width: 200, height: "auto" })}
        />
      </div>
      <Spacing size={20} />
      {/* 내용 */}
      <div css={contentContainerStyle}>
        {/* 01: 음식 카테고리 선택 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>
            음식 카테고리 선택
          </label>
          <div css={selectBoxStyle} onClick={handleCategorySelect}>
            {selectedCategories.length > 0 ? (
              <span css={selectTextStyle}>{selectedCategories.join(", ")}</span>
            ) : (
              <span css={selectTextPlaceHolderStyle}>
                카테고리를 선택해주세요.
              </span>
            )}
            <ArrowDownIcon css={iconStyle} />
          </div>
        </div>

        {/* 02: 맛집 등록 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>맛집 등록</label>
          {selectedRestaurant ? (
            <div css={restaurantInfoBoxStyle} onClick={handleRestaurantSearch}>
              <div css={restaurantInfoContentStyle}>
                <div css={restaurantInfoRowStyle}>
                  <span css={restaurantNameStyle}>
                    {selectedRestaurant.place_name}
                  </span>
                </div>
                <div css={restaurantInfoRowStyle}>
                  <span css={restaurantAddressStyle}>
                    {selectedRestaurant.road_address_name}
                  </span>
                  <span css={restaurantAddressDetailStyle}>
                    {selectedRestaurant.address_name}
                  </span>
                </div>
              </div>
              <ArrowRightIcon css={iconStyle} />
            </div>
          ) : (
            <button css={buttonStyle} onClick={handleRestaurantSearch}>
              <SearchIcon css={iconStyle} />
              <span css={buttonTextStyle}>맛집 검색하기</span>
            </button>
          )}
        </div>

        {/* 03: 사진 */}
        <div css={photoSectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>사진</label>
          <div css={photoListContainerStyle}>
            {photos.map((photo, index) => (
              <div key={index} css={photoItemStyle}>
                <img
                  src={photo.preview}
                  alt={`사진 ${index + 1}`}
                  css={photoImageStyle}
                />
                <PhotoRemoveIcon
                  width={28}
                  height={28}
                  css={photoRemoveButtonStyle}
                  onClick={() => handlePhotoRemove(index)}
                />
              </div>
            ))}
            {photos.length < 3 && (
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
                  <PlusIcon css={iconStyle} />
                  <span css={photoCountStyle}>({photos.length}/3)</span>
                </div>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            css={hiddenInputStyle}
          />
        </div>

        {/* 04: 코멘트 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>코멘트</label>
          <div css={commentContainerStyle}>
            <textarea
              css={textareaStyle}
              placeholder={`이 매장을 추천하는 이유를 10자 이상 작성해주세요.\n특별한 메뉴, 공간에 대한 설명을 적어보세요.`}
              value={comment}
              onChange={handleCommentChange}
              maxLength={300}
            />
            <div css={commentCountStyle}>{comment.length}/300</div>
          </div>
        </div>

        {/* 05: 추천 메뉴 */}
        <div css={sectionContainerStyle}>
          <label css={[labelStyle, labelRequiredStyle]}>추천 메뉴</label>
          {recommendedMenus.length > 0 && (
            <div css={menuListContainerStyle}>
              {recommendedMenus.map((menu) => (
                <div key={menu.id} css={menuItemStyle}>
                  <div css={menuImageContainerStyle}>
                    {menu.image ? (
                      <img
                        src={menu.image.preview}
                        alt={menu.name}
                        css={menuImageStyle}
                      />
                    ) : (
                      <div css={menuImagePlaceholderStyle} />
                    )}
                  </div>
                  <div css={menuInfoStyle}>
                    <div css={menuTitleContainerStyle}>
                      <span css={menuNameStyle}>{menu.name}</span>
                    </div>
                    <span css={menuPriceStyle}>
                      {Number(menu.price).toLocaleString()}원
                    </span>
                  </div>
                  <button
                    css={menuEditButtonStyle}
                    onClick={() => handleMenuEdit(menu.id)}
                    type="button"
                  >
                    수정
                  </button>
                </div>
              ))}
            </div>
          )}
          <button css={buttonStyle} onClick={handleRecommendedMenuRegister}>
            <PlusIcon css={iconStyle} />
            <span css={buttonTextStyle}>메뉴 등록하기</span>
          </button>
        </div>

        <Spacing size={100} />

        <div css={ctaButtonContainerStyle}>
          <button
            css={isAllFieldsFilled ? CTAButtonActiveStyle : CTAButtonStyle}
            disabled={!isAllFieldsFilled}
            onClick={handleChallengeApplication}
          >
            도전맛집 등록하기
          </button>
        </div>
      </div>
    </div>
  )
}

const contentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: "0 20px",
})

const sectionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

const labelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
)

const labelRequiredStyle = css({
  ":after": {
    content: '"*"',
    color: THEME.COLORS.PRIMARY.RED,
    marginLeft: 4,
  },
})

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
})

const selectTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

const selectTextPlaceHolderStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
)

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
})

const buttonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.BODY["14R"]
)

const iconStyle = css({
  width: 20,
  height: 20,
})

const photoSectionContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

const photoUploadBoxStyle = css({
  width: 92,
  height: 92,
  flexShrink: 0,
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

const photoCountStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.BODY["14R"]
)

const photoListContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
})

const photoItemStyle = css({
  position: "relative",
  flexShrink: 0,
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
  borderRadius: "50%",
})

const hiddenInputStyle = css({
  display: "none",
})

const restaurantInfoBoxStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 12,
  width: "100%",
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 8,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  cursor: "pointer",
})

const restaurantInfoContentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flex: 1,
})

const restaurantInfoRowStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: 198,
})

const restaurantNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const restaurantAddressStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

const restaurantAddressDetailStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
)

const menuListContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "100%",
})

const menuItemStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  width: "100%",
})

const menuImageContainerStyle = css({
  width: 60,
  height: 60,
  flexShrink: 0,
})

const menuImageStyle = css({
  width: "100%",
  height: "100%",
  borderRadius: 4,
  objectFit: "cover",
})

const menuImagePlaceholderStyle = css({
  width: "100%",
  height: "100%",
  borderRadius: 4,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
})

const menuInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
})

const menuTitleContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
})

const menuNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const menuPriceStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
)

const menuEditButtonStyle = css(
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    padding: "8px 4px",
    width: 44,
    height: 28,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 4,
    cursor: "pointer",
    flexShrink: 0,
  },
  TYPOGRAPHY.SUB["12B"]
)

const commentContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
})

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
)

const commentCountStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "right",
  },
  TYPOGRAPHY.SUB["12R"]
)

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
    cursor: "not-allowed",
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const CTAButtonActiveStyle = css(
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: "12px 0",
    width: "100%",
    height: 56,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const ctaButtonContainerStyle = css({
  maxWidth: VIEWPORT.MAX_WIDTH,
  width: "100%",
  position: "fixed",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  padding: "20px 20px 24px 20px",
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 19%)",
})

export default ChallengeRegistrationPage
