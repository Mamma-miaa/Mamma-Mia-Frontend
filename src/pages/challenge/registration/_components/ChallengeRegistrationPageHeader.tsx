import { useNavigate } from "react-router-dom";
import ExitIcon from "../_assets/exit.svg?react";
import registrationTitle from "../_assets/registration.webp";
import Spacing from "@/@lib/components/Spacing";
import { css } from "@emotion/react";
import { openConfirmModal } from "@/components/ConfirmModal/utils";

const ChallengeRegistrationPageHeader = () => {
  const navigate = useNavigate();

  const handleExit = async () => {
    const isOk = await openConfirmModal({
      title: "등록을 중단하시겠습니까?",
      description: "등록을 중단하면 작성한 내용이 모두 사라집니다.",
      cancelText: "나가기",
      confirmText: "계속 등록하기",
    });
    if (isOk) {
      navigate(-1);
    }
  };

  return (
    <>
      {/* 헤더 */}
      <div css={css({ padding: "16px 20px" })}>
        <ExitIcon onClick={handleExit} />
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
