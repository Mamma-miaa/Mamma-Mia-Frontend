import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import ArrowIcon from "../_assets/arrow_right.svg?react";

const ProfileSection = () => {
  return (
    <section css={css({ padding: "0 20px" })}>
      <div css={containerStyle}>
        <div css={profileRowStyle}>
          <div css={profileLeftStyle}>
            <div css={avatarStyle} />
            <div>
              <div css={nameStyle}>Nickname</div>
              <div css={joinedStyle}>2025.10.06 가입</div>
            </div>
          </div>
          <ArrowIcon width={24} height={24} />
        </div>

        <div css={statsRowStyle}>
          <div css={statColStyle}>
            <div css={statNumberStyle}>12</div>
            <div css={statLabelStyle}>Mamma-Mia!</div>
          </div>
          <div css={statColStyle}>
            <div css={statNumberStyle}>12</div>
            <div css={statLabelStyle}>Cheer-UP!</div>
          </div>
          <div css={statColStyle}>
            <div css={statNumberStyle}>12</div>
            <div css={statLabelStyle}>승인된 도전맛집 수</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;

const containerStyle = css({
  alignSelf: "center",
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  borderRadius: 12,
  padding: 12,
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

const profileRowStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  alignSelf: "stretch",
});

const profileLeftStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
});

const avatarStyle = css({
  width: 48,
  height: 48,
  borderRadius: 48,
  backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
});

const nameStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.HEADERS["22B"]
);

const joinedStyle = css(
  {
    color: "rgba(255, 255, 255, 0.6)",
  },
  TYPOGRAPHY.SUB["12R"]
);

const statsRowStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "stretch",
  gap: 16,
  alignSelf: "stretch",
});

const statColStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
});

const statNumberStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.HEADERS["22B"]
);

const statLabelStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12B"]
);
