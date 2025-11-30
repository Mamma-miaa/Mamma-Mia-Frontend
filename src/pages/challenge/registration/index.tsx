import { css } from "@emotion/react";
import Spacing from "@/@lib/components/Spacing";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowDownIcon from "./_assets/arrow_down.svg?react";
import SearchIcon from "./_assets/search.svg?react";
import PlusIcon from "./_assets/plus.svg?react";
import ArrowRightIcon from "@/pages/search/result/_assets/arrow_right.svg?react";
import { useState, useRef, useEffect } from "react";
import carImg from "@/assets/emoji/car.webp";
import deliveryImg from "@/assets/emoji/delivery.webp";
import takeoutImg from "@/assets/emoji/takeout.webp";
import indoorToiletImg from "@/assets/emoji/indoor_toilet.webp";
import outdoorToiletImg from "@/assets/emoji/outdoor_toilet.webp";
import groupingImg from "@/assets/emoji/grouping.webp";
import ChallengeRegistrationPageHeader from "./_components/ChallengeRegistrationPageHeader";
import VIEWPORT from "@/constants/viewport";
import { openCategoryFilteringBottomSheet } from "@/components/CategoryFilterBottomSheet/utils";
import PhotoRemoveIcon from "./_assets/photo_remove.svg?react";
import useTextInput from "@/hooks/useTextInput";
import {
  openRecommendedMenuRegisterBottomSheet,
  type RecommendedMenuResult,
} from "./_components/RecommendedMenuRegisterBottomSheet";
import { openRestaurantSearchBottomSheet } from "./_components/RestaurantSearchBottomSheet";
import type { RestaurantSearchResult } from "./_components/RestaurantSearchBottomSheet";
import {
  openBusinessHoursBottomSheet,
  type BusinessHoursData,
} from "./_components/BusinessHoursBottomSheet";
import { usePostChallengeApplicationMutation } from "@/hooks/@server/store";
import { useNavigate } from "react-router-dom";

const DAYS_MAP = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
} as const;

interface PhotoFile {
  file: File;
  preview: string;
}

const ChallengeRegistrationPage = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { value: comment, handleChange: handleCommentChange } = useTextInput();
  const [recommendedMenus, setRecommendedMenus] = useState<
    RecommendedMenuResult[]
  >([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantSearchResult | null>(null);
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);
  const [businessHoursData, setBusinessHoursData] = useState<
    BusinessHoursData[]
  >([]);
  const { mutate: postChallengeApplication } =
    usePostChallengeApplicationMutation();
  const navigate = useNavigate();

  const handleCategorySelect = async () => {
    const categories = await openCategoryFilteringBottomSheet({
      initialSelectedCategories: [],
      description: "등록할 음식점의 음식 카테고리를 설정해주세요.",
      isSingleSelect: true,
    });
    if (categories) {
      setSelectedCategories(categories);
    }
  };

  const handlePhotoSelect = () => {
    if (photos.length >= 3) {
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 3 - photos.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newPhotos: PhotoFile[] = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePhotoRemove = (index: number) => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      // 이전 URL 해제
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos.splice(index, 1);
      return newPhotos;
    });
  };

  const handleRecommendedMenuRegister = async () => {
    const result = await openRecommendedMenuRegisterBottomSheet();
    if (result) {
      setRecommendedMenus((prev) => [...prev, result]);
    }
  };

  const handleMenuEdit = (menuId: string) => {
    // TODO: 메뉴 수정 기능 구현
    console.log("Edit menu:", menuId);
  };

  const handleRestaurantSearch = async () => {
    const restaurant = await openRestaurantSearchBottomSheet();
    if (restaurant) {
      setSelectedRestaurant(restaurant);
    }
  };

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, [photos]);

  //   모든 필드가 채워졌는지 확인
  //   const isAllFieldsFilled =
  //     selectedCategories.length > 0 &&
  //     selectedRestaurant !== null &&
  //     photos.length > 0 &&
  //     comment.trim().length > 0 &&
  //     recommendedMenus.length > 0;
  const isAllFieldsFilled = true;

  const handleNextStep = () => {
    if (isAllFieldsFilled && step === 1) {
      setStep(2);
    }
  };

  const handleAdditionalOptionToggle = (option: string) => {
    setAdditionalOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleBusinessHoursAdd = async () => {
    const result = await openBusinessHoursBottomSheet();
    if (result) {
      setBusinessHoursData((prev) => [...prev, result]);
    }
  };

  const handleBusinessHoursEdit = async () => {
    const result = await openBusinessHoursBottomSheet();
    if (result) {
      setBusinessHoursData((prev) => [...prev, result]);
    }
  };

  const handleChallengeApplication = () => {
    const formData = new FormData();
    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            facilities: {
              parking: additionalOptions.includes("parking"),
              takeout: additionalOptions.includes("takeout"),
              delivery: additionalOptions.includes("delivery"),
              indoorRestroom: additionalOptions.includes("indoor_toilet"),
              outdoorRestroom: additionalOptions.includes("outdoor_toilet"),
              groupSeating: additionalOptions.includes("group_seating"),
            },
            name: selectedRestaurant?.place_name ?? "",
            latitude: Number(selectedRestaurant?.y),
            longitude: Number(selectedRestaurant?.x),
            registerChallengeStoreBusinessHours:
              businessHoursData.length > 0
                ? businessHoursData.map((data) => ({
                    /** @description 영업 모드(CLOSED/OPEN_24H/OPEN_RANGE) */
                    mode: (() => {
                      switch (true) {
                        case data.options.isClosed:
                          return "CLOSED";
                        case data.options.is24Hours:
                          return "OPEN_24H";
                        case data.options.hasBreakTime:
                          return "OPEN_RANGE";
                      }
                    })(),
                    breakStart: data.breakTime?.startTime ?? null,
                    closeTime: data.breakTime?.endTime ?? null,
                    hasBreak: data.options.hasBreakTime ?? false,
                    dayOfWeek: DAYS_MAP[data.selectedDay],
                    closesNextDay: false,
                    openTime: data.businessHours?.startTime ?? null,
                    lastOrder: data.options.hasLastOrder
                      ? data.lastOrder ?? null
                      : null,
                    breakEnd: data.breakTime?.endTime ?? null,
                  }))
                : undefined,
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
    );
    photos.forEach((photo) => {
      formData.append("storeImages", photo.file);
    });
    recommendedMenus.forEach((menu) => {
      if (menu.image?.file) {
        formData.append("menuImages", menu.image.file);
      }
    });
    postChallengeApplication(formData, {
      onSuccess: (data) => {
        // TODO 도전 맛집 등록 성공 시 처리
        navigate("/", { replace: true });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div css={css({ width: "100%", minHeight: "100vh" })}>
      <ChallengeRegistrationPageHeader step={step} setStep={setStep} />
      <Spacing size={20} />
      {/* 내용 */}
      <div css={contentContainerStyle}>
        {/* Step 배지 */}
        <div css={stepContainerStyle}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <>
                    <div css={stepBadgeActiveStyle}>
                      <span css={stepNumberStyle}>1</span>
                    </div>
                    <div css={stepBadgeDisabledStyle}>
                      <span css={stepNumberDisabledStyle}>2</span>
                    </div>
                  </>
                );
              case 2:
                return (
                  <>
                    <div css={stepBadgeDisabledStyle}>
                      <span css={stepNumberDisabledStyle}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.74386 8L0 4.37559L0.984211 3.39906L3.74386 6.08451L10.0158 0L11 0.957747L3.74386 8Z"
                            fill="#37383C"
                            fill-opacity="0.28"
                          />
                        </svg>
                      </span>
                    </div>
                    <div css={stepBadgeActiveStyle}>
                      <span css={stepNumberStyle}>2</span>
                    </div>
                  </>
                );
            }
          })()}
        </div>

        {step === 1 ? (
          <>
            {/* 01: 음식 카테고리 선택 */}
            <div css={sectionContainerStyle}>
              <label css={[labelStyle, labelRequiredStyle]}>
                음식 카테고리 선택
              </label>
              <div css={selectBoxStyle} onClick={handleCategorySelect}>
                {selectedCategories.length > 0 ? (
                  <span css={selectTextStyle}>
                    {selectedCategories.join(", ")}
                  </span>
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
                <div
                  css={restaurantInfoBoxStyle}
                  onClick={handleRestaurantSearch}
                >
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
                        e.preventDefault();
                        handlePhotoSelect();
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
                  placeholder="이 매장을 맛집으로 추천하는 이유가 무엇인가요? 자유로운 의견을 남겨주세요."
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
                onClick={handleNextStep}
              >
                다음
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 안내 메시지 */}
            <div css={infoBoxStyle}>
              <span css={infoTextStyle}>
                선택정보를 입력하지 않고 바로 도전맛집에 등록할수 있지만,
                추가하면 다른 맘마 미아에게 많은 도움이 될 수 있어요! 👍
              </span>
            </div>

            {/* 01: 영업 시간 정보 */}
            <div css={sectionContainerStyle}>
              <label css={labelStyle}>영업 시간 정보</label>
              {businessHoursData.length > 0 && (
                <div css={businessHoursListStyle}>
                  {businessHoursData.map((data, index) => {
                    return (
                      <div css={businessHoursItemStyle}>
                        <div css={businessHoursItemContentStyle}>
                          <span css={businessHoursDayStyle}>
                            {data.selectedDay}
                          </span>
                          <div css={businessHoursInfoStyle}>
                            {data.options.isClosed ? (
                              <span css={businessHoursTextStyle}>
                                정기 휴무(매주 {data.selectedDay}요일)
                              </span>
                            ) : data.options.is24Hours ? (
                              <span css={businessHoursTextStyle}>
                                24시 영업
                              </span>
                            ) : data.businessHours ? (
                              <>
                                <span css={businessHoursTextStyle}>
                                  {data.businessHours.startTime} ~{" "}
                                  {data.businessHours.endTime}
                                </span>
                                {data.options.hasBreakTime &&
                                  data.breakTime && (
                                    <span css={businessHoursTextStyle}>
                                      {data.breakTime.startTime} ~{" "}
                                      {data.breakTime.endTime} 브레이크 타임
                                    </span>
                                  )}
                                {data.lastOrder && (
                                  <span css={businessHoursTextStyle}>
                                    라스트오더 {data.lastOrder}
                                  </span>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                        <button
                          css={businessHoursEditButtonStyle}
                          onClick={handleBusinessHoursEdit}
                          type="button"
                        >
                          수정
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
              {businessHoursData.length < 7 && (
                <button css={buttonStyle} onClick={handleBusinessHoursAdd}>
                  <PlusIcon css={iconStyle} />
                  <span css={buttonTextStyle}>영업시간 정보 등록하기</span>
                </button>
              )}
            </div>

            {/* 02: 부가 정보 */}
            <div css={sectionContainerStyle}>
              <div css={additionalInfoHeaderStyle}>
                <label css={labelStyle}>부가 정보</label>
                <span css={additionalInfoSubTextStyle}>
                  해당 매장이 제공하는 옵션이 있다면 선택해주세요.
                </span>
              </div>
              <div css={additionalOptionsGridStyle}>
                {[
                  { id: "parking", label: "주차 가능", icon: carImg },
                  { id: "delivery", label: "배달 가능", icon: deliveryImg },
                  { id: "takeout", label: "포장 가능", icon: takeoutImg },
                  {
                    id: "indoor_toilet",
                    label: "내부 화장실",
                    icon: indoorToiletImg,
                  },
                  {
                    id: "outdoor_toilet",
                    label: "외부 화장실",
                    icon: outdoorToiletImg,
                  },
                  {
                    id: "group_seating",
                    label: "단체석 가능",
                    icon: groupingImg,
                  },
                ].map((option) => (
                  <button
                    key={option.id}
                    css={[
                      additionalOptionButtonStyle,
                      additionalOptions.includes(option.id) &&
                        additionalOptionButtonActiveStyle,
                    ]}
                    onClick={() => handleAdditionalOptionToggle(option.id)}
                    type="button"
                  >
                    <img
                      src={option.icon}
                      alt={option.label}
                      css={additionalOptionIconStyle}
                    />
                    <span css={additionalOptionTextStyle}>{option.label}</span>
                  </button>
                ))}
              </div>
              <span css={additionalInfoNoteStyle}>
                *단체석은 10인이상 수용가능할 경우 선택해주세요.
              </span>
            </div>

            <Spacing size={100} />

            <div css={ctaButtonContainerStyle}>
              <button
                css={CTAButtonActiveStyle}
                onClick={handleChallengeApplication}
              >
                도전맛집 등록하기
              </button>
            </div>
          </>
        )}
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
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const selectTextPlaceHolderStyle = css(
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
});

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

const photoListContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
});

const photoItemStyle = css({
  position: "relative",
  flexShrink: 0,
  width: 92,
  height: 92,
});

const photoImageStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
});

const photoRemoveButtonStyle = css({
  position: "absolute",
  top: 4,
  right: 4,
  borderRadius: "50%",
});

const hiddenInputStyle = css({
  display: "none",
});

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
});

const restaurantInfoContentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flex: 1,
});

const restaurantInfoRowStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: 198,
});

const restaurantNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const restaurantAddressStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const restaurantAddressDetailStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const menuListContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "100%",
});

const menuItemStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  width: "100%",
});

const menuImageContainerStyle = css({
  width: 60,
  height: 60,
  flexShrink: 0,
});

const menuImageStyle = css({
  width: "100%",
  height: "100%",
  borderRadius: 4,
  objectFit: "cover",
});

const menuImagePlaceholderStyle = css({
  width: "100%",
  height: "100%",
  borderRadius: 4,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

const menuInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
});

const menuTitleContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const menuNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const menuPriceStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

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
    cursor: "not-allowed",
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

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
);

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
});

const infoBoxStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  borderRadius: 8,
  width: "100%",
});

const infoTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const additionalInfoHeaderStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const additionalInfoSubTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const additionalOptionsGridStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "stretch",
  alignItems: "stretch",
  flexWrap: "wrap",
  gap: 8,
  width: "100%",
});

const additionalOptionButtonStyle = css(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    padding: 12,
    width: "100%",
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
    borderRadius: 8,
    cursor: "pointer",
    flex: "1 1 calc(33.333% - 6px)",
    minWidth: 0,
  },
  TYPOGRAPHY.BODY["14R"]
);

const additionalOptionButtonActiveStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: `1px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
  "& span": {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
});

const additionalOptionIconStyle = css({
  width: 24,
  height: 24,
});

const additionalOptionTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const additionalInfoNoteStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
  },
  TYPOGRAPHY.SUB["12R"]
);

const businessHoursListStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  width: "100%",
  marginBottom: 12,
});

const businessHoursItemStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  width: "100%",
});

const businessHoursItemContentStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 4,
  flex: 1,
});

const businessHoursDayStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const businessHoursInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

const businessHoursTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const businessHoursEditButtonStyle = css(
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
);

export default ChallengeRegistrationPage;
