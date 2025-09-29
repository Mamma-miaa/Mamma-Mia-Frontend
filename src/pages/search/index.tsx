import { css } from "@emotion/react";
import BackIcon from "./_assets/back.svg?react";
import SearchInput from "./_components/SearchInput";
import { useNavigate } from "react-router-dom";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import RemoveIcon from "./_assets/remove.svg?react";
import ArrowDownIcon from "./_assets/arrow_down.svg?react";

const SearchPage = () => {
  const navigate = useNavigate();

  return (
    <div css={css({ width: "100%", height: "100dvh" })}>
      <div
        css={css({
          padding: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
        })}
      >
        <BackIcon onClick={() => navigate(-1)} />
        <SearchInput />
      </div>

      {/* 최근 검색어 섹션 */}
      <div css={recentSearchSectionStyle}>
        <div css={recentSearchHeaderStyle}>
          <h2 css={recentSearchTitleStyle}>최근 검색어</h2>
          <button css={deleteAllButtonStyle}>전체삭제</button>
        </div>

        <div css={recentSearchListStyle}>
          <div css={recentSearchItemStyle}>
            <span css={recentSearchTextStyle}>검색1</span>
            <RemoveIcon />
          </div>
          <div css={recentSearchItemStyle}>
            <span css={recentSearchTextStyle}>검색1</span>
            <RemoveIcon />
          </div>
          <div css={recentSearchItemStyle}>
            <span css={recentSearchTextStyle}>검색1</span>
            <RemoveIcon />
          </div>

          <div css={showMoreStyle}>
            <span css={showMoreTextStyle}>최근 검색어 더보기</span>
            <ArrowDownIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const recentSearchSectionStyle = css({
  padding: "0 20px 40px",
  display: "flex",
  flexDirection: "column",
  gap: 0,
});

const recentSearchHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 0,
});

const recentSearchTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    margin: 0,
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const deleteAllButtonStyle = css(
  {
    padding: "8px 4px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    borderRadius: 4,
    width: 60,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);

const recentSearchListStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const recentSearchItemStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "12px 0",
  borderBottom: `1px solid ${THEME.COLORS.LINE.ALTERNATIVE}`,
});

const recentSearchTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const deleteButtonStyle = css({
  width: 20,
  height: 20,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const showMoreStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "12px 0 0",
  gap: 4,
});

const showMoreTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
  TYPOGRAPHY.BODY["14R"]
);

const arrowIconStyle = css({
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  fontSize: 12,
});

export default SearchPage;
