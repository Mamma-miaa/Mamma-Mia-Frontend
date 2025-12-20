import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const PrivacyPolicy = () => {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>개인정보 처리 방침</h1>
      <p css={effectiveDateStyle}>시행일자: 2025.11.11</p>
      <p css={introStyle}>
        본 약관은 '맘마미아' 서비스(이하 "서비스")를 운영하는 서비스 제공자
        (이하 "운영자")가 제공하는 서비스의 이용조건, 절차, 권리·의무 및 기타
        필요한 사항을 규정함을 목적으로 합니다.
      </p>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제1조 (수집하는 개인정보 항목 및 방법)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>운영자는 다음의 개인정보를 수집합니다.</p>
          <ul css={listStyle}>
            <li css={listItemStyle}>
              <span>필수: 로그인 계정 ID</span>
            </li>
            <li css={listItemStyle}>
              <span>선택: 이메일, 휴대전화번호</span>
            </li>
            <li css={listItemStyle}>
              <span>
                자동 수집: 접속 로그, IP 주소, 기기 정보, 위치정보(동의 시)
                <br />
                수집 방법은 회원가입 시 또는 서비스 이용 과정에서 자동
                수집됩니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제2조 (개인정보의 이용 목적)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            운영자는 수집한 개인정보를 다음의 목적으로 이용합니다.
          </p>
          <ol css={orderedListStyle}>
            <li css={listItemStyle}>
              <span>회원 식별 및 서비스 이용 관리</span>
            </li>
            <li css={listItemStyle}>
              <span>맞춤형 맛집 추천 등 개인화 서비스 제공</span>
            </li>
            <li css={listItemStyle}>
              <span>통계 및 서비스 개선 분석</span>
            </li>
            <li css={listItemStyle}>
              <span>고객 문의 응대 및 공지 전달</span>
            </li>
          </ol>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제3조 (개인정보의 보유 및 이용 기간)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>회원 탈퇴 시 즉시 파기합니다.</span>
          </li>
          <li css={listItemStyle}>
            <span>
              단, 법령에 따라 다음 항목은 일정 기간 보관할 수 있습니다.
            </span>
            <ul css={nestedListStyle}>
              <li css={nestedListItemStyle}>
                <span>접속 로그: 3개월 (통신비밀보호법)</span>
              </li>
              <li css={nestedListItemStyle}>
                <span>분쟁 처리 관련 자료: 3년 (전자상거래법)</span>
              </li>
            </ul>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제4조 (개인정보의 제3자 제공 및 위탁)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              운영자는 이용자의 동의 없이 개인정보를 제3자에게 제공하지
              않습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              필요 시 위탁업체명, 위탁 업무 내용, 기간 등을 사전에 공지합니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제5조 (개인정보의 파기 절차 및 방법)</h2>
        <p css={paragraphStyle}>
          수집 목적이 달성되면 즉시 파기하며, 전자 파일은 복구 불가능한 기술적
          방법으로 삭제하고
          <br />
          종이 문서는 분쇄 또는 소각 방식으로 파기합니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제6조 (이용자의 권리)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              이용자는 자신의 개인정보를 조회·수정·삭제할 수 있습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>동의 철회 및 회원 탈퇴 시 개인정보는 즉시 파기됩니다.</span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제7조 (쿠키의 사용)</h2>
        <p css={paragraphStyle}>
          운영자는 로그인 유지 및 개인화 서비스를 위해 쿠키를 사용할 수
          있습니다.
          <br />
          이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제8조 (개인정보 보호책임자)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>성명: 이동환</p>
          <p css={paragraphStyle}>이메일: mammamia251101@gmail.com</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;

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

const listStyle = css(
  {
    listStyle: "disc",
    paddingLeft: 21,
    margin: 0,
    whiteSpace: "pre-wrap",
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
