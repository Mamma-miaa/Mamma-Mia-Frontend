import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const LocationInformationUseTerms = () => {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>위치정보 이용 약관</h1>
      <p css={effectiveDateStyle}>시행일자: 2025.11.11</p>
      <p css={introStyle}>
        본 약관은 '맘마미아' 서비스(이하 "서비스")를 운영하는 서비스 제공자
        (이하 "운영자")가 제공하는 위치기반 서비스의 이용과 관련하여 운영자와
        이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
      </p>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제1조 (목적)</h2>
        <p css={paragraphStyle}>
          본 약관은 위치정보의 보호 및 이용 등에 관한 법률(이하 "위치정보법")에
          따라 위치기반 서비스를 제공함에 있어 운영자와 이용자 간의 권리, 의무
          및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제2조 (위치기반 서비스의 내용)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            운영자가 제공하는 위치기반 서비스는 다음과 같습니다.
          </p>
          <ol css={orderedListStyle}>
            <li css={listItemStyle}>
              <span>현재 위치 기반 맛집 검색 및 추천 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>주변 맛집 정보 제공 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>위치 기반 맛집 탐색 및 내비게이션 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>기타 운영자가 정하는 위치기반 서비스</span>
            </li>
          </ol>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제3조 (위치정보의 수집 및 이용)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            운영자는 위치기반 서비스 제공을 위해 다음의 위치정보를 수집 및
            이용합니다.
          </p>
          <ol css={orderedListStyle}>
            <li css={listItemStyle}>
              <span>
                수집 항목: 현재 위치 정보(GPS 좌표, 위도, 경도), 이동 경로 정보
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                수집 방법: 이용자의 스마트폰 등 기기의 위치정보 수집 기능을 통한
                자동 수집
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                이용 목적: 위치 기반 맛집 검색, 추천, 내비게이션 서비스 제공
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                보유 및 이용 기간: 서비스 이용 기간 동안 보유 및 이용하며, 회원
                탈퇴 시 즉시 파기
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제4조 (위치정보의 제3자 제공)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              운영자는 이용자의 동의 없이 위치정보를 제3자에게 제공하지
              않습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              다만, 다음의 경우에는 이용자의 동의 없이 위치정보를 제공할 수
              있습니다.
            </span>
            <ul css={nestedListStyle}>
              <li css={nestedListItemStyle}>
                <span>법령에 특별한 규정이 있는 경우</span>
              </li>
              <li css={nestedListItemStyle}>
                <span>생명이나 신체의 안전을 위해 긴급히 필요한 경우</span>
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제5조 (위치정보의 파기)</h2>
        <p css={paragraphStyle}>
          운영자는 위치정보의 수집 목적이 달성되거나 이용자가 위치정보 수집
          동의를 철회한 경우, 또는 회원 탈퇴 시 수집한 위치정보를 즉시
          파기합니다.
          <br />
          단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 기간 동안
          보관 후 파기합니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제6조 (이용자의 권리)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              이용자는 언제든지 위치정보 수집 및 이용에 대한 동의를 철회할 수
              있습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              이용자는 자신의 위치정보에 대한 열람, 정정, 삭제를 요청할 수
              있습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              이용자는 위치정보 수집 및 이용 동의를 거부할 수 있으며, 이 경우
              위치기반 서비스 이용이 제한될 수 있습니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제7조 (위치정보 보호책임자)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            운영자는 위치정보를 보호하고 이용자의 권리를 보장하기 위해 다음의
            책임자를 지정합니다.
          </p>
          <div css={contactInfoStyle}>
            <p css={paragraphStyle}>성명: 이동환</p>
            <p css={paragraphStyle}>이메일: mammamia251101@gmail.com</p>
          </div>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제8조 (손해배상)</h2>
        <p css={paragraphStyle}>
          운영자는 위치정보법 제15조 내지 제26조의 규정을 위반한 행위로 인하여
          이용자에게 손해가 발생한 경우 이용자에게 손해배상을 청구할 수
          있습니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제9조 (분쟁의 조정)</h2>
        <p css={paragraphStyle}>
          운영자와 이용자 간에 발생한 분쟁에 관한 소송은 운영자의 본사 소재지를
          관할하는 법원의 관할로 합니다.
        </p>
      </section>
    </div>
  );
};

export default LocationInformationUseTerms;

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "12px 20px 20px",
  width: "100%",
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.STRONG,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["22B"]
);

const effectiveDateStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const introStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
);

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
});

const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const sectionContentStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const paragraphStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    whiteSpace: "pre-wrap",
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
);

const orderedListStyle = css(
  {
    listStyle: "decimal",
    paddingLeft: 21,
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
);

const listItemStyle = css(
  {
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
);

const nestedListStyle = css(
  {
    listStyle: "disc",
    paddingLeft: 21,
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
);

const nestedListItemStyle = css(
  {
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
);

const contactInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
