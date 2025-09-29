import { css } from "@emotion/react";
import BackIcon from "./_assets/back.svg?react";
import SearchInput from "./_components/SearchInput";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default SearchPage;
