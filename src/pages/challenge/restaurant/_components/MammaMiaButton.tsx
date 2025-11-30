import THEME from "@/constants/theme";
import ClickToVote from "../_assets/click_to_vote.svg?react";
import MammaMia from "../_assets/mamma_mia.svg?react";
import VotingCompleted from "../_assets/voting_completed.svg?react";
import {
  useGetMammaMiaQuery,
  usePostMammaMiaMutation,
} from "@/hooks/@server/store";
import { css } from "@emotion/react";
import toast from "@/utils/toast";
import { getIsLoggedIn } from "@/utils/sessionStorage";
import { openLoginModal } from "@/components/ConfirmModal/utils";
import { useNavigate } from "react-router-dom";

const MammaMiaButton = ({ storeId }: { storeId: number }) => {
  const { data: mammaMiaData, refetch: refetchMammaMia } = useGetMammaMiaQuery({
    storeId: storeId,
  });
  const { mutate: postMammaMia } = usePostMammaMiaMutation();
  const navigate = useNavigate();

  const handlePostMammaMia = async () => {
    if (!getIsLoggedIn()) {
      const isOk = await openLoginModal();
      if (isOk) {
        navigate("/login");
      }
      return;
    }

    postMammaMia(
      { storeId: storeId },
      {
        onSuccess: () => {
          toast({ message: "맘마미아 투표에 성공하였습니다." });
          refetchMammaMia();
        },
        onError: () => {
          toast({ message: "맘마미아 투표에 실패하였습니다." });
        },
      }
    );
  };

  return (
    <button
      css={votingButtonStyle}
      type="button"
      onClick={handlePostMammaMia}
      disabled={mammaMiaData?.isLike}
    >
      {mammaMiaData?.isLike ? (
        <VotingCompleted />
      ) : (
        <>
          <MammaMia />
          <ClickToVote
            css={css({
              position: "absolute",
              bottom: 7.5,
              left: "75%",
              transform: "translateX(-50%)",
            })}
          />
        </>
      )}
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
