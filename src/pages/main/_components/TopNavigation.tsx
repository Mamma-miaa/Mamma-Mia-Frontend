import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import challengeImg from "@/assets/emoji/challenge.webp";
import medalImg from "@/assets/emoji/medal.webp";
import personImg from "@/assets/emoji/person.webp";

const TopNavigation = () => {
  return (
    <div css={buttonContainerStyle}>
      <Button>
        <img src={challengeImg} alt="도전맛집" width={20} height={20} />
        도전맛집
      </Button>
      <Button>
        <img src={medalImg} alt="랭킹" width={20} height={20} /> 랭킹
      </Button>
      <Button>
        <img src={personImg} alt="MY" width={20} height={20} /> MY
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
