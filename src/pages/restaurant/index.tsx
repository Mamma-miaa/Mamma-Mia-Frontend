import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import MammaMiaBadge from "./_assets/mamma_mia_badge.svg?react";
import MammaMiaVoteButton from "./_assets/mamma_mia_vote_button.svg?react";
import ClickToVoteButton from "./_assets/click_to_vote.svg?react";
import locationImg from "@/assets/emoji/location.webp";
import ClipBoardIcon from "./_assets/clipboard.svg?react";
import TranslateIcon from "./_assets/translate.svg?react";
import timeImg from "@/assets/emoji/time.webp";
import carImg from "@/assets/emoji/car.webp";
import deliveryImg from "@/assets/emoji/delivery.webp";
import takeoutImg from "@/assets/emoji/takeout.webp";
import ArrowIcon from "./_assets/arrow.svg?react";
import BackIcon from "./_assets/back.svg?react";
import ShareIcon from "./_assets/share.svg?react";
import RestaurantLocationSection from "./_components/RestaurantLocationSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import BookmarkIcon from "./_assets/bookmark.svg?react";
import { useGetStoreDetailQuery } from "@/hooks/@server/store";
import toast from "@/utils/toast";

const DAY_OF_WEEK: Record<string, { ko: string; en: string }> = {
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

const RestaurantDetailPage = () => {
  const navigate = useNavigate();
  const [isTimeAccordionOpen, setIsTimeAccordionOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const { data: storeDetail } = useGetStoreDetailQuery(
    Number(searchParams.get("id"))
  );

  const businessHours = storeDetail?.businessHours.map((businessHour) => {
    return {
      ...businessHour,
      isToday: businessHour.dayOfWeek === TODAY_DAY_OF_WEEK.en,
    };
  });

  return (
    <div css={pageContainerStyle}>
      {/* 뒤로가기 버튼 */}
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 3, left: 20 })
        )}
        onClick={() => navigate(-1)}
      >
        <BackIcon />
      </button>
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 3, right: 20 })
        )}
      >
        <ShareIcon />
      </button>
      <button
        css={css(
          floatingButtonStyle,
          css({ position: "absolute", top: 3, right: 76 })
        )}
      >
        <BookmarkIcon />
      </button>

      {/* 헤더 영역 - 배경 이미지와 그라데이션 마스크 */}
      <img
        src={storeDetail?.images?.[0] ?? "https://placehold.co/375x460"}
        alt="레스토랑 배경 이미지"
        css={restaurantBackgroundImageStyle}
      />
      <div
        css={css({
          position: "absolute",
          top: 80,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0 20px",
          width: "100%",
        })}
      >
        <img
          src={storeDetail?.images?.[0] ?? "https://placehold.co/375x460"}
          alt="레스토랑 이미지"
          css={restaurantImageStyle}
        />
      </div>

      {/* 레스토랑 정보 카드 */}
      <div css={infoCardStyle}>
        {/* 레스토랑 기본 정보 */}
        <div css={restaurantInfoSectionStyle}>
          <div css={titleSectionStyle}>
            <span css={categoryStyle}>{storeDetail.category}</span>
            <h1 css={restaurantNameStyle}>{storeDetail.name}</h1>
          </div>

          <div css={mammaMiaSectionStyle}>
            <MammaMiaBadge />
            <div css={votingInfoStyle}>
              <div css={votingItemStyle}>
                <span css={votingLabelStyle}>이번주</span>
                <span css={votingNumberStyle}>4</span>
              </div>
              <span css={separatorStyle}>/</span>
              <div css={votingItemStyle}>
                <span css={votingLabelStyle}>이번달</span>
                <span css={votingNumberStyle}>128</span>
              </div>
            </div>
          </div>
        </div>

        {/* 투표 완료 버튼 */}
        <button css={votingButtonStyle}>
          <MammaMiaVoteButton />
          <ClickToVoteButton
            css={css({
              position: "absolute",
              bottom: 7.5,
              left: "75%",
              transform: "translateX(-50%)",
            })}
          />
        </button>

        {/* 매장 정보 */}
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
                    {Math.round(storeDetail.station?.distanceMeters ?? 0)}m
                  </span>
                  <TranslateIcon />
                </div>
              </div>
            </div>

            <div css={timeInfoStyle}>
              <div css={infoItemStyle}>
                <img src={timeImg} css={emojiIconStyle} />
                <div css={timeContentStyle}>
                  <button
                    css={timeRowButtonStyle}
                    onClick={() => setIsTimeAccordionOpen(!isTimeAccordionOpen)}
                  >
                    <span css={timeTextStyle}>
                      {TODAY_DAY_OF_WEEK.ko}{" "}
                      {
                        businessHours?.find(
                          (businessHour) => businessHour.isToday
                        )?.openTime
                      }{" "}
                      ~{" "}
                      {
                        businessHours?.find(
                          (businessHour) => businessHour.isToday
                        )?.closeTime
                      }
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
                            {DAY_OF_WEEK[businessHour.dayOfWeek].ko}{" "}
                            {businessHour.openTime} ~ {businessHour.closeTime}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 메뉴 섹션 */}
        <div css={menuSectionStyle}>
          <h2 css={sectionTitleStyle}>메뉴</h2>
          <div css={menuListStyle}>
            {storeDetail.menus.map((menu) => (
              <div css={menuItemStyle} key={menu.name}>
                <div css={menuImageContainerStyle}>
                  <img
                    src={menu.imageUrl ?? "https://placehold.co/60x60"}
                    alt="빠다 숙성 삼겹 세트"
                    css={menuImageStyle}
                  />
                </div>
                <div css={menuInfoStyle}>
                  <div css={menuTitleStyle}>
                    <span css={menuNameStyle}>{menu.name}</span>
                  </div>
                  <span css={menuPriceStyle}>{menu.price}원</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 부가 정보 */}
        {[storeDetail.parking, storeDetail.delivery, storeDetail.takeout].some(
          Boolean
        ) && (
          <div css={additionalInfoSectionStyle}>
            <h2 css={sectionTitleStyle}>부가 정보</h2>
            <div css={additionalInfoGridStyle}>
              {storeDetail.parking && (
                <div css={additionalInfoItemStyle}>
                  <img css={additionalEmojiStyle} src={carImg} />
                  <span css={additionalTextStyle}>주차 가능</span>
                </div>
              )}
              {storeDetail.delivery && (
                <div css={additionalInfoItemStyle}>
                  <img css={additionalEmojiStyle} src={deliveryImg} />
                  <span css={additionalTextStyle}>배달 가능</span>
                </div>
              )}
              {storeDetail.takeout && (
                <div css={additionalInfoItemStyle}>
                  <img css={additionalEmojiStyle} src={takeoutImg} />
                  <span css={additionalTextStyle}>포장 가능</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 매장 위치 */}
        <RestaurantLocationSection
          latitude={storeDetail.latitude}
          longitude={storeDetail.longitude}
          restaurantName={storeDetail.name}
        />

        {/* 제보 버튼 */}
        <div css={reportSectionStyle}>
          <button css={reportButtonStyle}>
            <span css={reportTextStyle}>잘못된 정보 제보하기</span>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// 페이지 컨테이너 스타일
const pageContainerStyle = css({
  width: "100%",
  minHeight: "100vh",
  position: "relative",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

// 레스토랑 배경 이미지 스타일
const restaurantBackgroundImageStyle = css({
  width: "100%",
  aspectRatio: "375/460",
  objectFit: "cover",
  filter: "blur(140px)",
  mask: "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
  WebkitMask:
    "linear-gradient(180deg, rgba(217, 217, 217, 1) 73%, rgba(115, 115, 115, 0) 100%)",
});

// 레스토랑 이미지 스타일
const restaurantImageStyle = css({
  width: "100%",
  aspectRatio: "1/1",
  borderRadius: 12,
  objectFit: "cover",
});

// 정보 카드 스타일
const infoCardStyle = css({
  position: "relative",
  top: -33,
  left: 0,
  margin: "0 20px",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  border: "1px solid #FFFFFF",
  borderRadius: 12,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  gap: 24,
  boxShadow:
    "0px 0px 6px 0px rgba(0, 0, 0, 0.05), 1px 1px 1px 0px rgba(0, 0, 0, 0.01), 1px 1px 1px 0px rgba(0, 0, 0, 0.01), inset -2px 2px 4px 0px rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(4px)",
});

// 레스토랑 정보 섹션
const restaurantInfoSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 6,
});

// 제목 섹션
const titleSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

// 카테고리 스타일
const categoryStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

// 레스토랑 이름 스타일
const restaurantNameStyle = css({
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

// 맘마미아 섹션
const mammaMiaSectionStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

// 투표 정보
const votingInfoStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

// 투표 아이템
const votingItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

// 투표 라벨
const votingLabelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

// 투표 숫자
const votingNumberStyle = css(
  {
    color: THEME.COLORS.PRIMARY.RED,
  },
  TYPOGRAPHY.BODY["14SB"]
);

// 구분자
const separatorStyle = css({
  color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  opacity: 0.6,
  fontSize: 8,
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: "-2%",
});

// 투표 버튼
const votingButtonStyle = css({
  height: 56,
  position: "relative",
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  borderRadius: 8,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 11,
  "&:disabled": {
    backgroundColor: THEME.COLORS.GRAYSCALE.DISABLE,
  },
});

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

// 메뉴 섹션
const menuSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

// 메뉴 리스트
const menuListStyle = css({
  display: "flex",
  flexDirection: "column",
});

// 메뉴 아이템
const menuItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 0",
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
  "&:last-child": {
    borderBottom: "none",
  },
});

// 메뉴 정보
const menuInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  flex: 1,
});

// 메뉴 제목
const menuTitleStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "stretch",
  gap: 2,
});

// 메뉴 이름
const menuNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

// 메뉴 가격
const menuPriceStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

// 메뉴 이미지 컨테이너
const menuImageContainerStyle = css({
  width: 60,
  height: 60,
  borderRadius: 3.33,
  overflow: "hidden",
});

// 메뉴 이미지
const menuImageStyle = css({
  width: 65,
  height: 65,
  objectFit: "cover",
  margin: "-2.5px",
});

// 부가 정보 섹션
const additionalInfoSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

// 부가 정보 그리드
const additionalInfoGridStyle = css({
  display: "flex",
  justifyContent: "stretch",
  alignItems: "stretch",
  gap: 24,
});

// 부가 정보 아이템
const additionalInfoItemStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  flex: 1,
});

// 부가 정보 이모지
const additionalEmojiStyle = css({
  width: 24,
  height: 24,
});

// 부가 정보 텍스트
const additionalTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  TYPOGRAPHY.BODY["14R"]
);

// 제보 섹션
const reportSectionStyle = css({
  padding: "12px 0 0",
  borderTop: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
});

// 제보 버튼
const reportButtonStyle = css({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
});

// 제보 텍스트
const reportTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12R"]
);

// 뒤로가기 버튼 스타일
const floatingButtonStyle = css({
  width: 44,
  height: 44,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  borderRadius: 28,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  boxShadow:
    "0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)",

  "&:hover": {
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});

export default RestaurantDetailPage;
