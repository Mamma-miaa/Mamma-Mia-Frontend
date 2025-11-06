import { css } from "@emotion/react";
import Spacing from "@/@lib/components/Spacing";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowDownIcon from "./_assets/arrow_down.svg?react";
import SearchIcon from "./_assets/search.svg?react";
import PlusIcon from "./_assets/plus.svg?react";
import { useState, useRef, useEffect } from "react";
import ChallengeRegistrationPageHeader from "./_components/ChallengeRegistrationPageHeader";
import VIEWPORT from "@/constants/viewport";
import { openCategoryFilteringBottomSheet } from "@/components/CategoryFilterBottomSheet/utils";
import PhotoRemoveIcon from "./_assets/photo_remove.svg?react";

interface PhotoFile {
  file: File;
  preview: string;
}

const ChallengeRegistrationPage = () => {
  const [comment, setComment] = useState("");
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        URL.revokeObjectURL(photo.preview);
      });
    };
  }, [photos]);

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
          <button css={buttonStyle}>
            <SearchIcon css={iconStyle} />
            <span css={buttonTextStyle}>맛집 검색하기</span>
          </button>
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

        <Spacing size={100} />

        <div css={ctaButtonContainerStyle}>
          <button css={CTAButtonStyle}>다음</button>
        </div>
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

export default ChallengeRegistrationPage;
