import { css } from "@emotion/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "@/@lib/assets/back.svg?react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { Suspense, useState } from "react";
import SearchInput from "../_components/SearchInput";
import useSearchInput from "../_hooks/useSearchInput";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import RestaurantList from "./_components/RestaurantList";
import Spacing from "@/@lib/components/Spacing";
import Spinner from "@/@lib/components/Spinner";

const SearchResultPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pick" | "challenge">("pick");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { inputValue, handleChange } = useSearchInput({ initialValue: query });

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <BackIcon onClick={() => navigate(-1)} />
        <SearchInput
          value={inputValue}
          onChange={handleChange}
          onSubmit={() => {
            navigate(`/search/result?query=${inputValue}`, { replace: true });
          }}
        />
      </div>
      <Spacing size={14} />
      {/* 탭 네비게이션 */}
      <div css={tabContainerStyle}>
        <div css={tabWrapperStyle}>
          <button
            css={[tabButtonStyle, activeTab === "pick" && activeTabStyle]}
            onClick={() => setActiveTab("pick")}
          >
            맘마 Pick!
          </button>
          <button
            css={[tabButtonStyle, activeTab === "challenge" && activeTabStyle]}
            onClick={() => setActiveTab("challenge")}
          >
            도전 맛집
          </button>
        </div>
      </div>
      <Spacing size={16} />
      {/* 검색 결과 리스트 */}
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div onClick={resetErrorBoundary}>다시 시도</div>
            )}
          >
            <Suspense
              fallback={
                <div
                  css={css({
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  })}
                >
                  <Spinner size="large" />
                </div>
              }
            >
              <RestaurantList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
};

// 스타일 정의
const containerStyle = css({
  width: "100%",
  height: "100dvh",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: 20,
  height: 56,
});

const tabContainerStyle = css({
  padding: "0 20px",
});

const tabWrapperStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const tabButtonStyle = css(
  {
    padding: "0 8px 12px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    borderBottom: "2px solid transparent",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const activeTabStyle = css({
  color: THEME.COLORS.GRAYSCALE.NORMAL,
  borderBottomColor: THEME.COLORS.GRAYSCALE.NORMAL,
});

export default SearchResultPage;
