import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import RankingIcon from "../_assets/ranking.svg?react";
import MyIcon from "../_assets/my.svg?react";
import ChallengeIcon from "../_assets/challenge_restaurant.svg?react";

const TopNavigation = () => {
  return (
    <div css={buttonContainerStyle}>
      <Button>
        <ChallengeIcon /> 도전맛집
      </Button>
      <Button>
        <RankingIcon /> 랭킹
      </Button>
      <Button>
        <MyIcon /> MY
      </Button>
    </div>
  );
};

export default TopNavigation;

const Button = styled("button")(
  {
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    border: "none",
    cursor: "pointer",
    flex: "none",
    color: THEME.COLORS.BACKGROUND.WHITE,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const buttonContainerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
});
