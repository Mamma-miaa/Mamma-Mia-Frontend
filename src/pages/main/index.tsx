import ReactDOMServer from "react-dom/server";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import SummaryCard from "./_components/SummaryCard";
import SearchInput from "./_components/SearchInput";
import MyLocationIcon from "./_assets/my_location.svg?react";
import LogoIcon from "@/assets/logo.svg?react";

import THEME from "@/constants/theme";
import Spacing from "@/@lib/components/Spacing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/virtual";
import 아시안_이미지 from "@/assets/graphics/아시안.webp";
import OverlayMarker from "@/@lib/components/OverlayMarker";
import { useNavigate } from "react-router-dom";
import RestaurantListPopup from "./_components/RestaurantListPopup";
import TopNavigation from "./_components/TopNavigation";
import PopupToggleButton from "./_components/PopupToggleButton";

const MOCK_DATA: {
  id: string;
  restaurantName: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
  restaurantImageUrl: string;
  distance: string;
}[] = [
  {
    id: "1",
    restaurantName: "사랑방칼국수",
    category: "korean",
    address: "서울 중구 퇴계로27길 46 (충무로3가)",
    latitude: 37.5623,
    longitude: 126.9918,
    restaurantImageUrl: "https://placehold.co/78x78",
    distance: "380m",
  },
  {
    id: "2",
    restaurantName: "필동함박",
    category: "world",
    address: "서울 중구 필동로 7-1 (필동3가)",
    latitude: 37.5617,
    longitude: 126.9935,
    restaurantImageUrl: "https://placehold.co/78x78",
    distance: "380m",
  },
  {
    id: "3",
    restaurantName: "충무로쭈꾸미불고기",
    category: "korean",
    address: "서울 중구 퇴계로31길 11",
    latitude: 37.5628,
    longitude: 126.9942,
    restaurantImageUrl: "https://placehold.co/78x78",
    distance: "380m",
  },
];

const 충무로_좌표 = {
  lat: 37.561306,
  lng: 126.9945,
};

const MainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMap = useRef<kakao.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  }>(충무로_좌표);
  const [isRestaurantListPopupOpen, setIsRestaurantListPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const toggleRestaurantListPopup = () => {
    setIsRestaurantListPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    kakaoMap.current = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(충무로_좌표.lat, 충무로_좌표.lng), // 원의 중심좌표 입니다
      radius: 1000, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: THEME.COLORS.PRIMARY.RED, // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일 입니다
      fillColor: "#FB3F11", // 채우기 색깔입니다
      fillOpacity: 0.1, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(kakaoMap.current);

    MOCK_DATA.forEach((data) => {
      // 커스텀 오버레이 생성
      new kakao.maps.CustomOverlay({
        map: kakaoMap.current || undefined,
        position: new kakao.maps.LatLng(data.latitude, data.longitude),
        content: `<div id='overlay-mark${data.id}'>${ReactDOMServer.renderToString(
          <OverlayMarker>
            <img
              src={아시안_이미지}
              style={{
                width: "20px",
                height: "20px",
                objectFit: "cover",
              }}
            />
          </OverlayMarker>
        )}</div>`,
        yAnchor: 1,
        xAnchor: 0.5,
      });
    });

    MOCK_DATA.forEach((data) => {
      document.getElementById(`overlay-mark${data.id}`);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    kakaoMap.current?.setCenter(
      new kakao.maps.LatLng(myLocation.lat, myLocation.lng)
    );
  }, [myLocation.lat, myLocation.lng]);

  return (
    <>
      <div ref={mapRef} css={css({ width: "100dvw", height: "100dvh" })}>
        <div css={listChipPositionStyle}>
          <PopupToggleButton
            isPopupOpen={isRestaurantListPopupOpen}
            onClick={toggleRestaurantListPopup}
          />
        </div>

        <Swiper
          modules={[Virtual]}
          virtual
          slidesPerView={3}
          centeredSlides
          css={swiperStyle}
        >
          {MOCK_DATA.map((data, index) => (
            <SwiperSlide key={data.id} virtualIndex={index}>
              <SummaryCard
                {...data}
                onClick={() => navigate(`/restaurant?id=${data.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div css={topContainerStyle}>
          <div css={searchContainerStyle}>
            <LogoIcon />
            <SearchInput css={searchInputStyle} />
            <button css={locationButtonStyle}>
              <MyLocationIcon
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((position) => {
                    setMyLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  });
                }}
              />
            </button>
          </div>
          <Spacing size={12} />
          <TopNavigation />
        </div>
      </div>
      {isRestaurantListPopupOpen && <RestaurantListPopup data={MOCK_DATA} />}
    </>
  );
};

export default MainPage;

const swiperStyle = css({
  width: 957,
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
});

const topContainerStyle = css({
  position: "fixed",
  top: 16,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
  padding: "0 20px",
  width: "100%",
});

const searchContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const searchInputStyle = css({
  flex: 1,
});

const locationButtonStyle = css({
  width: 44,
  height: 44,
  borderRadius: 8,
  backgroundColor: "#191919",
  border: "none",
  cursor: "pointer",
  flex: "none",
});

const listChipPositionStyle = css({
  position: "fixed",
  bottom: 124,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
});
