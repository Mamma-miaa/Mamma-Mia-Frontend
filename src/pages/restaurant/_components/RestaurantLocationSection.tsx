import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import kakaoMapImg from "../_assets/kakaomap_basic_1.webp";
import { useEffect, useRef } from "react";

const RestaurantLocationSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMap = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.5617, 126.9935), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    kakaoMap.current = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
    kakaoMap.current.setDraggable(false);
    kakaoMap.current.setZoomable(false);

    new kakao.maps.Marker({
      map: kakaoMap.current,
      position: new kakao.maps.LatLng(37.5617, 126.9935),
    });
  }, []);

  return (
    <div css={locationSectionStyle}>
      <h2 css={sectionTitleStyle}>매장 위치</h2>
      <div css={mapContainerStyle}>
        <div css={mapImageStyle} ref={mapRef} />
        <button css={mapButtonStyle}>
          <img src={kakaoMapImg} alt="카카오맵" width={20} height={20} />
          <span css={mapButtonTextStyle}>카카오 맵으로 길찾기</span>
        </button>
      </div>
    </div>
  );
};

export default RestaurantLocationSection;

// 섹션 제목
const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

// 위치 섹션
const locationSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
});

// 지도 컨테이너
const mapContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

// 지도 이미지
const mapImageStyle = css({
  width: "100%",
  height: 150,
  borderRadius: "8px 8px 0 0",
  objectFit: "cover",
  position: "relative",
});

// 지도 버튼
const mapButtonStyle = css({
  width: "100%",
  height: 40,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  border: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
  borderRadius: "0 0 8px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  padding: "8px 4px",
});

// 지도 버튼 텍스트
const mapButtonTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
  },
  TYPOGRAPHY.SUB["12R"]
);
