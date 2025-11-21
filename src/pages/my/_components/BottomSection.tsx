import { css } from "@emotion/react";
import { useState } from "react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ResponsiveSummaryCard from "@/components/ResponsiveSummaryCard";
import type { components } from "@/apis/schema";

type TabType = "mamma-mia" | "bookmark";

const BottomSection = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("mamma-mia");

  // TODO: API 연동 후 실제 데이터로 교체
  const mockRestaurants: components["schemas"]["GetNearByResponse"][] = [];

  return (
    <section css={containerStyle}>
      <div css={tabContainerStyle}>
        <button
          css={[
            tabButtonStyle,
            selectedTab === "mamma-mia" && selectedTabButtonStyle,
          ]}
          onClick={() => setSelectedTab("mamma-mia")}
        >
          <span
            css={[
              tabTextStyle,
              selectedTab === "mamma-mia" && selectedTabTextStyle,
            ]}
          >
            나의 맘마미아
          </span>
        </button>
        <button
          css={[
            tabButtonStyle,
            selectedTab === "bookmark" && selectedTabButtonStyle,
          ]}
          onClick={() => setSelectedTab("bookmark")}
        >
          <span
            css={[
              tabTextStyle,
              selectedTab === "bookmark" && selectedTabTextStyle,
            ]}
          >
            나의 북마크
          </span>
        </button>
      </div>

      <div css={listContainerStyle}>
        {mockRestaurants.length === 0 ? (
          <div css={emptyStateStyle}>
            {selectedTab === "mamma-mia" ? (
              <>
                아직 투표한 맛집이 없어요.
                <br />
                좋아하는 맛집에 ‘맘마미아’를 눌러보세요
              </>
            ) : (
              <>
                아직 북마크한 식당이 없어요.
                <br />
                좋아하는 맛집에 ‘북마크’를 눌러보세요
              </>
            )}
          </div>
        ) : (
          mockRestaurants.map((restaurant) => (
            <ResponsiveSummaryCard
              key={restaurant.storeId}
              restaurant={restaurant}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default BottomSection;

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const tabContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignSelf: "stretch",
  padding: "0 20px",
});

const tabButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  padding: "0 8px 12px",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "2px solid transparent",
  cursor: "pointer",
});

const selectedTabButtonStyle = css({
  borderBottom: `2px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
});

const tabTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const selectedTabTextStyle = css({
  color: THEME.COLORS.GRAYSCALE.NORMAL,
});

const listContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  padding: "16px 20px 40px",
  width: "100%",
});

const emptyStateStyle = css(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 0",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);
