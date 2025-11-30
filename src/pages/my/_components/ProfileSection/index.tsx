import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import WriteIcon from "../../_assets/write.svg?react";
import LogoutIcon from "../../_assets/logout.svg?react";
import { openProfileUpdateBottomSheet } from "./_components/ProfileUpdateBottomSheet";

const ProfileSection = () => {
  const handleProfileEdit = () => {
    openProfileUpdateBottomSheet({
      currentNickname: "Nickname",
    });
  };

  return (
    <section css={css({ padding: "0 20px" })}>
      <div css={containerStyle}>
        <div css={topSectionStyle}>
          <div css={profileRowStyle}>
            <div css={avatarStyle} />
            <div css={profileInfoStyle}>
              <div css={nameStyle}>Nickname</div>
              <div css={joinedStyle}>2025.10.06 가입</div>
            </div>
          </div>
        </div>

        <div css={bottomSectionStyle}>
          <button css={actionButtonStyle} onClick={handleProfileEdit}>
            <WriteIcon width={20} height={20} />
            <span css={buttonTextStyle}>프로필 편집</span>
          </button>
          <button css={[actionButtonStyle, logoutButtonStyle]}>
            <LogoutIcon width={20} height={20} />
            <span css={buttonTextStyle}>로그아웃</span>
          </button>
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
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const topSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignSelf: "stretch",
  gap: 16,
  padding: "20px 12px",
});

const profileRowStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
});

const avatarStyle = css({
  width: 48,
  height: 48,
  borderRadius: 48,
  backgroundColor: "#D9D9D9",
});

const profileInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
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

const bottomSectionStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "stretch",
  alignItems: "stretch",
  alignSelf: "stretch",
});

const actionButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 2,
  padding: 12,
  flex: 1,
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: "none",
  borderTop: "1px solid rgba(112, 115, 124, 0.22)",
  cursor: "pointer",
});

const logoutButtonStyle = css({
  borderLeft: "1px solid rgba(112, 115, 124, 0.22)",
});

const buttonTextStyle = css(
  {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
  TYPOGRAPHY.SUB["12R"]
);
