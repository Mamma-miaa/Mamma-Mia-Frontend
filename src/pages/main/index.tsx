import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import SummaryCard from "./components/SummaryCard";
import SearchInput from "./components/SearchInput";
import MyLocationIcon from "./_assets/my_location.svg?react";
import LogoIcon from "@/assets/logo.svg?react";
import styled from "@emotion/styled";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";
import ChallengeIcon from "./_assets/challenge_restaurant.svg?react";
import Spacing from "@/@lib/components/Spacing";
import RankingIcon from "./_assets/ranking.svg?react";
import MyIcon from "./_assets/my.svg?react";
import ListIcon from "./_assets/list.svg?react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/virtual";

const MOCK_DATA = [
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

  useEffect(() => {
    if (!mapRef.current) return;

    var options = {
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
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data.latitude, data.longitude),
      });
      marker.setMap(kakaoMap.current);
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    kakaoMap.current?.setCenter(
      new kakao.maps.LatLng(myLocation.lat, myLocation.lng)
    );
  }, [myLocation.lat, myLocation.lng]);

  return (
    <div ref={mapRef} css={css({ width: "100dvw", height: "100dvh" })}>
      <ListChip
        css={css({
          position: "fixed",
          bottom: 124,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        })}
      >
        <ListIcon />
        <span>목록보기</span>
      </ListChip>

      <Swiper
        modules={[Virtual]}
        virtual
        slidesPerView={3}
        centeredSlides
        css={css({
          width: 957,
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        })}
      >
        {MOCK_DATA.map((data, index) => (
          <SwiperSlide key={data.id} virtualIndex={index}>
            <SummaryCard {...data} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        css={css({
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          padding: "0 20px",
          width: "100%",
        })}
      >
        <div
          css={css({
            display: "flex",
            alignItems: "center",
            gap: 4,
          })}
        >
          <LogoIcon />
          <SearchInput
            css={css({
              flex: 1,
            })}
          />
          <button
            css={css({
              width: 44,
              height: 44,
              borderRadius: 8,
              backgroundColor: "#191919",
              border: "none",
              cursor: "pointer",
              flex: "none",
            })}
          >
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
        <div
          css={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          })}
        >
          <Button>
            <ChallengeIcon /> 도전맛집
          </Button>
          <Button>
            <RankingIcon /> 랭킹
          </Button>
          <Button>
            <MyIcon /> MY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

const Button = styled("button")(
  {
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    border: "none",
    cursor: "pointer",
    flex: "none",
    color: THEME.COLORS.BACKGROUND.WHITE,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const ListChip = styled("button")(
  {
    height: 44,
    borderRadius: 1000,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: "8px 16px 8px 12px",
    boxShadow: THEME.SHADOWS.EMPHASIZED,
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);
