import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import MammaMiaIcon from "./_assets/mamma_mia.svg?react";
import ranking_1st_badge from "@/assets/rank/type_detail_date_monthly_number_1.webp";

interface RankingCardProps {
  rank: number;
  period: "weekly" | "monthly";
  category: string;
  restaurantName: string;
  weeklyVotes: number;
  monthlyVotes: number;
  imageUrl: string;
}

const RankingCard = ({
  rank,
  period,
  category,
  restaurantName,
  weeklyVotes,
  monthlyVotes,
  imageUrl,
}: RankingCardProps) => {
  return (
    <div css={cardContainerStyle}>
      {/* 배경 이미지 */}
      <img src={imageUrl} alt={restaurantName} css={backgroundImageStyle} />

      {/* 랭킹 배지 */}
      <img
        src={ranking_1st_badge}
        alt="랭킹 배지"
        css={css({
          position: "absolute",
          top: 0,
          left: 0,
          width: 115,
          height: 35,
        })}
      />

      {/* 그라데이션 오버레이 */}
      <div css={gradientOverlayStyle} />

      {/* 콘텐츠 컨테이너 */}
      <div css={contentContainerStyle}>
        <div css={categoryStyle}>{category}</div>
        <div css={restaurantNameStyle}>{restaurantName}</div>

        {/* Mamma-Mia! 섹션 */}
        <div css={mammaMiaContainerStyle}>
          <MammaMiaIcon />
          <div css={votesContainerStyle}>
            <div css={voteItemStyle}>
              <span css={voteLabelStyle}>이번주</span>
              <span css={voteNumberStyle}>{weeklyVotes}</span>
            </div>
            <span css={separatorStyle}>/</span>
            <div css={voteItemStyle}>
              <span css={voteLabelStyle}>이번달</span>
              <span css={voteNumberStyle}>{monthlyVotes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;

const cardContainerStyle = css({
  position: "relative",
  width: 260,
  height: 335,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  borderRadius: 12,
  boxShadow: THEME.SHADOWS.NORMAL,
  overflow: "hidden",

  color: THEME.COLORS.BACKGROUND.WHITE,
});

const backgroundImageStyle = css({
  position: "absolute",
  top: -7,
  left: -23,
  width: 307,
  height: 349,
  objectFit: "cover",
});

const gradientOverlayStyle = css({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 111,
  background:
    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 66%)",
});

const contentContainerStyle = css({
  position: "absolute",
  bottom: 16,
  left: 16,
  right: 16,
  display: "flex",
  flexDirection: "column",
  gap: 2,
});

const categoryStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  color: THEME.COLORS.BACKGROUND.WHITE,
  textShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
});

const restaurantNameStyle = css({
  ...TYPOGRAPHY.HEADERS["22B"],
  color: THEME.COLORS.BACKGROUND.WHITE,
  textShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
});

const mammaMiaContainerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  alignSelf: "stretch",
});

const votesContainerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 6,
});

const voteItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const voteLabelStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  color: THEME.COLORS.BACKGROUND.WHITE,
  textShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
});

const voteNumberStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  color: THEME.COLORS.BACKGROUND.WHITE,
  textShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
});

const separatorStyle = css({
  fontSize: 8,
  fontWeight: 400,
  lineHeight: 1.4,
  letterSpacing: "-2%",
  color: THEME.COLORS.BACKGROUND.WHITE,
  opacity: 0.6,
  textAlign: "center",
  textShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
});
