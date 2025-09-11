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
import PopupToggleButton from "./_components/PopupToggleButton";
import { useGetNearbyStoreQuery } from "@/hooks/@server/store";

const 충무로역_좌표 = {
  lat: 37.561306,
  lng: 126.9945,
};

const MainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMap = useRef<kakao.maps.Map | null>(null);
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  }>(충무로역_좌표);
  const [isRestaurantListPopupOpen, setIsRestaurantListPopupOpen] =
    useState(false);

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
    userLatitude: myLocation.lat,
    userLongitude: myLocation.lng,
    minLatitude: 지도_모서리.minLatitude,
    maxLatitude: 지도_모서리.maxLatitude,
    minLongitude: 지도_모서리.minLongitude,
    maxLongitude: 지도_모서리.maxLongitude,
    size: 10,
  });

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

    set지도_모서리({
      minLatitude: kakaoMap.current?.getBounds().getSouthWest().getLat() || 0,
      maxLatitude: kakaoMap.current?.getBounds().getNorthEast().getLat() || 0,
      minLongitude: kakaoMap.current?.getBounds().getSouthWest().getLng() || 0,
      maxLongitude: kakaoMap.current?.getBounds().getNorthEast().getLng() || 0,
    });

    const path = [
      new kakao.maps.LatLng(0.0, 200.0), // 남서쪽 (대한민국 최남서)
      new kakao.maps.LatLng(200.0, 0.0), // 남동쪽 (대한민국 최남동)
      new kakao.maps.LatLng(200.0, 200.0), // 북동쪽 (대한민국 최북동)
      new kakao.maps.LatLng(0.0, 0.0), // 북서쪽 (대한민국 최북서)
    ];

    const hole = [
      new kakao.maps.LatLng(37.570294707575194, 126.99218948837137),
      new kakao.maps.LatLng(37.57052912439423, 126.99513256445218),
      new kakao.maps.LatLng(37.570979706332714, 127.00194698594886),
      new kakao.maps.LatLng(37.56878127856788, 127.00187901260531),
      new kakao.maps.LatLng(37.566889180958036, 127.0022524942787),
      new kakao.maps.LatLng(37.56639350683301, 127.00590851367807),
      new kakao.maps.LatLng(37.565996955862914, 127.007844019678),
      new kakao.maps.LatLng(37.56417698194663, 127.0072439400642),
      new kakao.maps.LatLng(37.562203840054615, 127.00655332918932),
      new kakao.maps.LatLng(37.5601946640645, 127.00564770890021),
      new kakao.maps.LatLng(37.55900534365135, 127.00573816212346),
      new kakao.maps.LatLng(37.55650062164743, 127.00458358554847),
      new kakao.maps.LatLng(37.5552302409573, 127.00385920034324),
      new kakao.maps.LatLng(37.55363550947771, 127.00259160717565),
      new kakao.maps.LatLng(37.552241228434575, 127.0018842557036),
      new kakao.maps.LatLng(37.55011038203629, 126.99967182066207),
      new kakao.maps.LatLng(37.54909225340014, 127.00041870587384),
      new kakao.maps.LatLng(37.54717760419666, 127.00255177728496),
      new kakao.maps.LatLng(37.54596575992392, 127.00258002573237),
      new kakao.maps.LatLng(37.54380336989664, 127.00217259049397),
      new kakao.maps.LatLng(37.54095170602315, 126.99782749225348),
      new kakao.maps.LatLng(37.54258235939297, 126.99355022716232),
      new kakao.maps.LatLng(37.54285252268164, 126.99140592957117),
      new kakao.maps.LatLng(37.544478800614904, 126.99105495688413),
      new kakao.maps.LatLng(37.54619053557534, 126.98910841131594),
      new kakao.maps.LatLng(37.546064245515495, 126.98758643883173),
      new kakao.maps.LatLng(37.554713321954125, 126.9834429000457),
      new kakao.maps.LatLng(37.557704609695236, 126.9832724730448),
      new kakao.maps.LatLng(37.56033534503654, 126.98207216896988),
      new kakao.maps.LatLng(37.56197503611494, 126.98127949345901),
      new kakao.maps.LatLng(37.566047751895546, 126.98267070383284),
      new kakao.maps.LatLng(37.566165502609785, 126.98760574186248),
      new kakao.maps.LatLng(37.57026504120442, 126.98768429960681),
    ];

    const polygon = new kakao.maps.Polygon({
      path: [path, hole],
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
    nearbyStore?.items?.forEach((restaurant) => {
      // 커스텀 오버레이 생성
      new kakao.maps.CustomOverlay({
        map: kakaoMap.current || undefined,
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
      {isRestaurantListPopupOpen && (
        <RestaurantListPopup data={nearbyStore?.items || []} />
      )}
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
