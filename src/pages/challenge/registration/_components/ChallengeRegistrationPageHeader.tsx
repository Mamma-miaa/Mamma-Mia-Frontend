import { useNavigate } from "react-router-dom";
import ExitIcon from "../_assets/exit.svg?react";
import registrationTitle from "../_assets/registration.webp";
import Spacing from "@/@lib/components/Spacing";
import { css } from "@emotion/react";

const ChallengeRegistrationPageHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 헤더 */}
      <div css={css({ padding: "16px 20px" })}>
        <ExitIcon onClick={() => navigate(-1)} />
      </div>
      {/* 제목 */}
      <Spacing size={20} />
      <div
        css={css({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <img
          src={registrationTitle}
          alt="registration title"
          css={css({ width: 200, height: "auto" })}
        />
      </div>
    </>
  );
};

export default ChallengeRegistrationPageHeader;
