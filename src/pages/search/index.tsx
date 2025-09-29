import { css } from "@emotion/react";
import BackIcon from "./_assets/back.svg?react";
import SearchInput from "./_components/SearchInput";

const SearchPage = () => {
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
        <BackIcon />
        <SearchInput />
      </div>
    </div>
  );
};

export default SearchPage;
