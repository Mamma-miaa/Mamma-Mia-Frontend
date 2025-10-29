import THEME from "@/constants/theme";
import MammaMiaVoteButton from "../_assets/mamma_mia_vote_button.svg?react";
import ClickToVoteButton from "../_assets/click_to_vote.svg?react";
import { usePostMammaMiaMutation } from "@/hooks/@server/store";
import { css } from "@emotion/react";
import toast from "@/utils/toast";

const MammaMiaButton = ({ storeId }: { storeId: number }) => {
  const { mutate: postMammaMia } = usePostMammaMiaMutation();

  const handlePostMammaMia = () => {
    postMammaMia(
      { storeId: storeId },
      {
        onSuccess: () => {
          toast({ message: "맘마미아 투표에 성공하였습니다." });
        },
        onError: () => {
          toast({ message: "맘마미아 투표에 실패하였습니다." });
        },
      }
    );
  };

  return (
    <button css={votingButtonStyle} type="button" onClick={handlePostMammaMia}>
      <MammaMiaVoteButton />
      <ClickToVoteButton
        css={css({
          position: "absolute",
          bottom: 7.5,
          left: "75%",
          transform: "translateX(-50%)",
        })}
      />
    </button>
  );
};

export default MammaMiaButton;

// 투표 버튼
const votingButtonStyle = css({
  height: 56,
  position: "relative",
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  borderRadius: 8,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 11,
  "&:disabled": {
    backgroundColor: THEME.COLORS.GRAYSCALE.DISABLE,
  },
});
