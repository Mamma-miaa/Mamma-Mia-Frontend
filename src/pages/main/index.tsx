import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const MainPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
  }, []);
  return <div ref={mapRef} css={css({ width: "100dvw", height: "100dvh" })} />;
};

export default MainPage;
