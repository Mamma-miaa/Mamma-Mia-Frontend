import { useNavigate } from "react-router-dom";
import ExitIcon from "../_assets/exit.svg?react";
import BackIcon from "../_assets/back.svg?react";
import registrationTitle from "../_assets/registration.webp";
import Spacing from "@/@lib/components/Spacing";
import { css } from "@emotion/react";
import { openConfirmModal } from "@/components/ConfirmModal/utils";

interface ChallengeRegistrationPageHeaderProps {
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
}

const ChallengeRegistrationPageHeader = ({
  step,
  setStep,
}: ChallengeRegistrationPageHeaderProps) => {
  const navigate = useNavigate();

  const handleExit = async () => {
    const isOk = await openConfirmModal({
      title: "등록을 중단하시겠습니까?",
      description: "등록을 중단하면 작성한 내용이 모두 사라집니다.",
      cancelText: "나가기",
      confirmText: "계속 등록하기",
    });
    if (!isOk) navigate(-1);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      {/* 헤더 */}
      <div css={css({ padding: "16px 20px" })}>
        {(() => {
          switch (step) {
            case 1:
              return <ExitIcon onClick={handleExit} />;
            case 2:
              return <BackIcon onClick={handleBack} />;
          }
        })()}
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
