import BackIcon from "@/@lib/assets/back.svg?react";
import Spacing from "@/@lib/components/Spacing";
import { css } from "@emotion/react";
import myTitleImage from "./_assets/my_text.png";
import ProfileSection from "./_components/ProfileSection";
import MyChallengeStatusSection from "./_components/MyChallengeStatusSection";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div css={css({ width: "100%", height: "100dvh" })}>
      <Spacing size={20} />
      <BackIcon onClick={() => navigate(-1)} css={css({ marginLeft: 20 })} />
      <Spacing size={16} />
      <div css={css({ display: "flex", justifyContent: "center" })}>
        <img src={myTitleImage} alt="my title" width={58} height={43} />
      </div>
      <Spacing size={20} />
      <ProfileSection />
      <Spacing size={20} />
      <MyChallengeStatusSection />
    </div>
  );
};

export default MyPage;
