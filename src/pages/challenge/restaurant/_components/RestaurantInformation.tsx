import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import toast from "@/utils/toast";
import { css } from "@emotion/react";
import RestaurantBusinessHour from "./RestaurantBusinessHour";
import locationImg from "@/assets/emoji/location.webp";
import ClipBoardIcon from "../_assets/clipboard.svg?react";
import TranslateIcon from "../_assets/translate.svg?react";
import timeImg from "@/assets/emoji/time.webp";
import { useState } from "react";
import type { components } from "@/apis/schema";
import ArrowIcon from "../_assets/arrow.svg?react";

export const DAY_OF_WEEK: Record<
  string,
  {
    ko: string;
    en: components["schemas"]["GetStoreDetailResponseBusinessHour"]["dayOfWeek"];
  }
> = {
  SUNDAY: { ko: "일", en: "SUNDAY" },
  MONDAY: { ko: "월", en: "MONDAY" },
  TUESDAY: { ko: "화", en: "TUESDAY" },
  WEDNESDAY: { ko: "수", en: "WEDNESDAY" },
  THURSDAY: { ko: "목", en: "THURSDAY" },
  FRIDAY: { ko: "금", en: "FRIDAY" },
  SATURDAY: { ko: "토", en: "SATURDAY" },
};

const TODAY = new Date().getDay();
const TODAY_DAY_OF_WEEK = [...Object.values(DAY_OF_WEEK)][TODAY];

type RestaurantInformationProps = {
  storeDetail:
    | components["schemas"]["GetStoreDetailResponse"]
    | components["schemas"]["GetUnderReviewChallengeStoreDetailResponse"];
};

const RestaurantInformation = ({ storeDetail }: RestaurantInformationProps) => {
  const [isTimeAccordionOpen, setIsTimeAccordionOpen] = useState(false);

  const businessHours = storeDetail?.businessHours.map((businessHour) => {
    return {
      ...businessHour,
      isToday: businessHour.dayOfWeek === TODAY_DAY_OF_WEEK.en,
    };
  });

  return (
    <div css={storeInfoSectionStyle}>
      <h2 css={sectionTitleStyle}>매장 정보</h2>

      <div css={locationInfoStyle}>
        <div css={infoItemStyle}>
          <img src={locationImg} css={emojiIconStyle} />
          <div css={infoContentStyle}>
            <div css={infoRowStyle}>
              <span css={infoTextStyle}>{storeDetail.address}</span>
              <ClipBoardIcon
                onClick={() => {
                  navigator.clipboard.writeText(storeDetail.address);
                  toast({ message: "주소가 복사가 완료되었습니다." });
                }}
              />
            </div>
            <div css={distanceRowStyle}>
              <span css={distanceTextStyle}>충무로 역으로부터</span>
              <span css={distanceValueStyle}>
                {Math.round(
                  storeDetail.station?.distanceMeters ?? 0
                ).toLocaleString()}
                m
              </span>
            </div>
          </div>
        </div>

        {!!businessHours.length && (
          <div css={timeInfoStyle}>
            <div css={infoItemStyle}>
              <img src={timeImg} css={emojiIconStyle} />
              <div css={timeContentStyle}>
                <button
                  css={timeRowButtonStyle}
                  onClick={() => setIsTimeAccordionOpen(!isTimeAccordionOpen)}
                >
                  <span css={timeTextStyle}>
                    <RestaurantBusinessHour
                      businessHour={businessHours?.find(
                        ({ isToday }) => isToday
                      )}
                    />
                  </span>
                  <ArrowIcon
                    css={css({
                      transform: isTimeAccordionOpen
                        ? "rotate(270deg)"
                        : "rotate(90deg)",
                      transition: "transform 0.2s ease",
                    })}
                  />
                </button>
                {isTimeAccordionOpen && (
                  <ul css={timeListStyle}>
                    {businessHours
                      .filter((businessHour) => !businessHour.isToday)
                      .map((businessHour) => (
                        <li key={businessHour.dayOfWeek}>
                          <RestaurantBusinessHour businessHour={businessHour} />
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantInformation;

// 매장 정보 섹션
const storeInfoSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

// 섹션 제목
const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

// 위치 정보
const locationInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

// 정보 아이템
const infoItemStyle = css({
  display: "flex",
  gap: 6,
});

// 이모지 아이콘
const emojiIconStyle = css({
  width: 24,
  height: 24,
});

// 정보 콘텐츠
const infoContentStyle = css({
  display: "flex",
  flexDirection: "column",
});

// 정보 행
const infoRowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
  height: 24,
});

// 정보 텍스트
const infoTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

// 거리 행
const distanceRowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

// 거리 텍스트
const distanceTextStyle = css({
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

// 거리 값
const distanceValueStyle = css({
  color: THEME.COLORS.PRIMARY.RED,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

// 시간 정보
const timeInfoStyle = css({
  display: "flex",
  flexDirection: "column",
});

// 시간 콘텐츠
const timeContentStyle = css({
  display: "flex",
  flexDirection: "column",
});

// 시간 행 버튼
const timeRowButtonStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
  height: 24,
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  cursor: "pointer",
  width: "100%",
  justifyContent: "space-between",
});

// 시간 텍스트
const timeTextStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.BODY["14SB"]
);

// 시간 리스트
const timeListStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.BODY["14R"]
);
