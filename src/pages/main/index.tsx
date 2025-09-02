import { css } from "@emotion/react";
import { useEffect, useRef } from "react";
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

const sampleData = {
  category: "국밥·탕/찌개",
  restaurantName: "계림닭도리탕 충무로직영점",
  distance: "380m",
  restaurantImageUrl: "https://placehold.co/78x78",
};

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
  return (
    <div ref={mapRef} css={css({ width: "100dvw", height: "100dvh" })}>
      <SummaryCard
        {...sampleData}
        css={css({
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        })}
      />
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
            <MyLocationIcon />
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
    color: "#FFFFFF",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  TYPOGRAPHY.BODY["14SB"]
);
