import ReactDOMServer from "react-dom/server";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import SummaryCard from "./_components/SummaryCard";
import SearchInput from "./_components/SearchInput";
import MyLocationIcon from "./_assets/my_location.svg?react";
import logoImg from "@/assets/logo.png";
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
import { useGetNearbyStoreQuery } from "@/hooks/@server/store";
import VIEWPORT from "@/constants/viewport";
import PopupToggleButton from "./_components/PopupToggleButton";
import { 충무로역_좌표, 딤_영역, 서비스_영역 } from "./_constants";

const MainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMap = useRef<kakao.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  }>(충무로역_좌표);
  const [isRestaurantListPopupOpen, setIsRestaurantListPopupOpen] =
    useState(false);
  const customOverlays = useRef<kakao.maps.CustomOverlay[]>([]);

  const [지도_모서리, set지도_모서리] = useState<{
    minLatitude: number;
    maxLatitude: number;
    minLongitude: number;
    maxLongitude: number;
  }>({
    minLatitude: 0,
    maxLatitude: 0,
    minLongitude: 0,
    maxLongitude: 0,
  });

  const { data: nearbyStore } = useGetNearbyStoreQuery({
    userLatitude: 충무로역_좌표.lat,
    userLongitude: 충무로역_좌표.lng,
    minLatitude: 지도_모서리.minLatitude,
    maxLatitude: 지도_모서리.maxLatitude,
    minLongitude: 지도_모서리.minLongitude,
    maxLongitude: 지도_모서리.maxLongitude,
    size: 10,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(myLocation.lat, myLocation.lng), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    kakaoMap.current = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

    set지도_모서리({
      minLatitude: kakaoMap.current?.getBounds().getSouthWest().getLat() || 0,
      maxLatitude: kakaoMap.current?.getBounds().getNorthEast().getLat() || 0,
      minLongitude: kakaoMap.current?.getBounds().getSouthWest().getLng() || 0,
      maxLongitude: kakaoMap.current?.getBounds().getNorthEast().getLng() || 0,
    });

    const polygon = new kakao.maps.Polygon({
      path: [딤_영역, 서비스_영역],
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: THEME.COLORS.PRIMARY.RED, // 선의 색깔입니다
      strokeStyle: "solid", // 선의 스타일 입니다
      fillColor: "#000000", // 채우기 색깔입니다
      fillOpacity: 0.3, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    polygon.setMap(kakaoMap.current);

    kakao.maps.event.addListener(kakaoMap.current, "idle", () => {
      setMyLocation({
        lat: kakaoMap.current?.getCenter().getLat() || 0,
        lng: kakaoMap.current?.getCenter().getLng() || 0,
      });
      set지도_모서리({
        minLatitude: kakaoMap.current?.getBounds().getSouthWest().getLat() || 0,
        maxLatitude: kakaoMap.current?.getBounds().getNorthEast().getLat() || 0,
        minLongitude:
          kakaoMap.current?.getBounds().getSouthWest().getLng() || 0,
        maxLongitude:
          kakaoMap.current?.getBounds().getNorthEast().getLng() || 0,
      });
    });
  }, []);

  useEffect(() => {
    if (!kakaoMap.current) return;
    if (!nearbyStore?.items) return;

    customOverlays.current = nearbyStore.items.map((restaurant) => {
      // 커스텀 오버레이 생성
      return new kakao.maps.CustomOverlay({
        map: kakaoMap.current!,
        position: new kakao.maps.LatLng(
          restaurant.latitude,
          restaurant.longitude
        ),
        content: `<div id='overlay-mark${restaurant.storeId}'>${ReactDOMServer.renderToString(
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
  }, [
    nearbyStore?.items,
    지도_모서리.minLatitude,
    지도_모서리.maxLatitude,
    지도_모서리.minLongitude,
    지도_모서리.maxLongitude,
  ]);

  useEffect(() => {
    if (!mapRef.current) return;
    kakaoMap.current?.setCenter(
      new kakao.maps.LatLng(myLocation.lat, myLocation.lng)
    );
  }, [myLocation.lat, myLocation.lng]);

  return (
    <>
      <div ref={mapRef} css={css({ width: "100%", height: "100dvh" })}>
        {isRestaurantListPopupOpen ? (
          <PopupToggleButton.지도보기
            onClick={() => {
              setIsRestaurantListPopupOpen(false);
            }}
          />
        ) : (
          <PopupToggleButton.목록보기
            onClick={() => {
              setIsRestaurantListPopupOpen(true);
            }}
          />
        )}

        <Swiper
          modules={[Virtual]}
          virtual
          slidesPerView={1}
          spaceBetween={-210}
          centeredSlides
          css={swiperStyle}
        >
          {nearbyStore?.items?.map((data, index) => (
            <SwiperSlide key={data.storeId} virtualIndex={index}>
              <SummaryCard
                restaurant={data}
                onClick={() => navigate(`/restaurant?id=${data.storeId}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div css={topContainerStyle}>
          <div css={searchContainerStyle}>
            <img src={logoImg} alt="logo" width={95} height={40} />
            <SearchInput css={searchInputStyle} type="button" />
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
      {isRestaurantListPopupOpen && (
        <RestaurantListPopup data={nearbyStore?.items || []} />
      )}
    </>
  );
};

export default MainPage;

const swiperStyle = css({
  width: VIEWPORT.MAX_WIDTH,
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,

  overflow: "hidden",
  maxWidth: VIEWPORT.MAX_WIDTH,

  "& .swiper-slide": {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const topContainerStyle = css({
  maxWidth: VIEWPORT.MAX_WIDTH,

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
