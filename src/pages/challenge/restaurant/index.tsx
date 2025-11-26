import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import MammaMiaBadge from "@/assets/mamma_mia_badge.svg?react";
import ArrowIcon from "./_assets/arrow.svg?react";
import RestaurantLocationSection from "./_components/RestaurantLocationSection";
import { useSearchParams } from "react-router-dom";
import { useGetChallengeStoreDetailQuery } from "@/hooks/@server/store";
import toast from "@/utils/toast";
import RestaurantDetailHeader from "./_components/RestaurantDetailHeader";
import MammaMiaButton from "./_components/MammaMiaButton";
import RestaurantDetailImages from "./_components/RestaurantDetailImages";
import RestaurantFacilities from "./_components/RestaurantFacilities";
import RestaurantInformation from "./_components/RestaurantInformation";

const ChallengeRestaurantDetailPage = () => {
  const [searchParams] = useSearchParams();
  const { data: storeDetail } = useGetChallengeStoreDetailQuery(
    Number(searchParams.get("id"))
  );

  return (
    <div css={pageContainerStyle}>
      <RestaurantDetailHeader storeDetail={storeDetail} />
      <RestaurantDetailImages storeDetail={storeDetail} />

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
                <span css={votingNumberStyle}>
                  {/* {(storeDetail.ranks?.weekly ?? 0).toLocaleString()} */}
                </span>
              </div>
              <span css={separatorStyle}>/</span>
              <div css={votingItemStyle}>
                <span css={votingLabelStyle}>이번달</span>
                <span css={votingNumberStyle}>
                  {/* {(storeDetail.ranks?.monthly ?? 0).toLocaleString()} */}
                </span>
              </div>
            </div>
          </div>
        </div>

        {searchParams.get("status") === "APPROVED" && (
          <MammaMiaButton storeId={storeDetail.reviewStoreId} />
        )}

        {/* 매장 정보 */}
        <RestaurantInformation storeDetail={storeDetail} />

        {/* 메뉴 섹션 */}
        <div css={menuSectionStyle}>
          <h2 css={sectionTitleStyle}>메뉴</h2>
          <div css={menuListStyle}>
            {storeDetail.menus.map((menu) => (
              <div css={menuItemStyle} key={menu.name}>
                <div css={menuImageContainerStyle}>
                  <img
                    src={menu.imageUrl ?? "https://placehold.co/60x60"}
                    alt={menu.name}
                    css={menuImageStyle}
                  />
                </div>
                <div css={menuInfoStyle}>
                  <div css={menuTitleStyle}>
                    <span css={menuNameStyle}>{menu.name}</span>
                  </div>
                  <span css={menuPriceStyle}>
                    {menu.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 부가 정보 */}
        <RestaurantFacilities facilities={storeDetail.facilities} />

        {/* 매장 위치 */}
        <RestaurantLocationSection
          latitude={storeDetail.latitude}
          longitude={storeDetail.longitude}
          restaurantName={storeDetail.name}
        />

        {/* 제보 버튼 */}
        <div css={reportSectionStyle}>
          <button
            css={reportButtonStyle}
            type="button"
            onClick={() => {
              toast({ message: "개발이 필요한 기능입니다." });
            }}
          >
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
  gap: 4,
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
const restaurantNameStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.HEADERS["22B"]
);

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

// 섹션 제목
const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

// 메뉴 섹션
const menuSectionStyle = css({
  display: "flex",
  flexDirection: "column",
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

export default ChallengeRestaurantDetailPage;
