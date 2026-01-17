import { css } from "@emotion/react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"

const TermsOfService = () => {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>서비스 이용 약관</h1>
      <p css={effectiveDateStyle}>시행일자: 2025.11.11</p>
      <p css={introStyle}>
        본 약관은 '맘마미아' 서비스(이하 "서비스")를 운영하는 서비스 제공자
        (이하 "운영자")가 제공하는 서비스의 이용조건, 절차, 권리·의무 및 기타
        필요한 사항을 규정함을 목적으로 합니다.
      </p>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제1조 (목적)</h2>
        <p css={paragraphStyle}>
          본 약관은 운영자가 제공하는 서비스의 이용과 관련하여 운영자와 이용자
          간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
          합니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제2조 (용어의 정의)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          </p>
          <ol css={orderedListStyle}>
            <li css={listItemStyle}>
              <span>
                "서비스"란 운영자가 제공하는 맛집 정보 제공 및 추천 서비스를
                의미합니다.
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                "이용자"란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을
                의미합니다.
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                "회원"이란 서비스에 회원등록을 하고 서비스를 이용하는 자를
                의미합니다.
              </span>
            </li>
            <li css={listItemStyle}>
              <span>
                "콘텐츠"란 서비스를 통해 제공되는 정보, 텍스트, 이미지 등을
                의미합니다.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제3조 (약관의 효력 및 변경)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그 효력을
              발생합니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              운영자는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을
              변경할 수 있습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              약관이 변경되는 경우 운영자는 변경 사항을 서비스 내 공지사항을
              통해 공지합니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제4조 (서비스의 제공 및 변경)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>운영자는 다음과 같은 서비스를 제공합니다.</p>
          <ol css={orderedListStyle}>
            <li css={listItemStyle}>
              <span>맛집 정보 제공 및 검색 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>맛집 추천 및 랭킹 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>위치 기반 맛집 탐색 서비스</span>
            </li>
            <li css={listItemStyle}>
              <span>기타 운영자가 정하는 서비스</span>
            </li>
          </ol>
          <p css={paragraphStyle}>
            운영자는 서비스의 내용을 변경할 수 있으며, 변경 시 사전에
            공지합니다.
          </p>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제5조 (서비스의 이용)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              이용자는 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 안
              됩니다.
            </span>
            <ul css={nestedListStyle}>
              <li css={nestedListItemStyle}>
                <span>타인의 정보를 도용하는 행위</span>
              </li>
              <li css={nestedListItemStyle}>
                <span>서비스의 안정적 운영을 방해하는 행위</span>
              </li>
              <li css={nestedListItemStyle}>
                <span>법령 및 본 약관에 위반되는 행위</span>
              </li>
            </ul>
          </li>
          <li css={listItemStyle}>
            <span>
              이용자가 위 각 호의 행위를 한 경우 운영자는 사전 통지 없이 서비스
              이용을 제한하거나 회원 자격을 박탈할 수 있습니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제6조 (이용자의 의무)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              이용자는 서비스 이용 시 정확한 정보를 제공하여야 합니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>이용자는 서비스 이용 중 발생한 모든 책임을 부담합니다.</span>
          </li>
          <li css={listItemStyle}>
            <span>
              이용자는 서비스의 이용권한을 타인에게 양도하거나 대여할 수
              없습니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제7조 (운영자의 의무)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              운영자는 지속적이고 안정적인 서비스 제공을 위하여 노력합니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              운영자는 이용자의 개인정보를 보호하기 위하여 노력합니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              운영자는 서비스 이용과 관련하여 발생한 이용자의 불만사항을
              처리합니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제8조 (지적재산권)</h2>
        <p css={paragraphStyle}>
          서비스에 게재된 모든 콘텐츠의 저작권은 운영자에게 있습니다.
          <br />
          이용자는 운영자의 사전 동의 없이 콘텐츠를 복제, 전송, 출판, 배포, 방송
          기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는
          안 됩니다.
        </p>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제9조 (면책조항)</h2>
        <ol css={orderedListStyle}>
          <li css={listItemStyle}>
            <span>
              운영자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
              제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              운영자는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는
              책임을 지지 않습니다.
            </span>
          </li>
          <li css={listItemStyle}>
            <span>
              운영자는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에
              대하여 책임을 지지 않습니다.
            </span>
          </li>
        </ol>
      </section>

      <section css={sectionStyle}>
        <h2 css={sectionTitleStyle}>제10조 (분쟁의 해결)</h2>
        <div css={sectionContentStyle}>
          <p css={paragraphStyle}>
            운영자와 이용자 간에 발생한 분쟁에 관한 소송은 운영자의 본사
            소재지를 관할하는 법원의 관할로 합니다.
          </p>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: "12px 20px 20px",
  width: "100%",
})

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.STRONG,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["22B"]
)

const effectiveDateStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const introStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
)

const sectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
})

const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    width: "100%",
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.HEADERS["16SB"]
)

const sectionContentStyle = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
})

const paragraphStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NEUTRAL,
    whiteSpace: "pre-wrap",
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
)

const orderedListStyle = css(
  {
    listStyle: "decimal",
    paddingLeft: 21,
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
)

const listItemStyle = css(
  {
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
)

const nestedListStyle = css(
  {
    listStyle: "disc",
    paddingLeft: 21,
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  TYPOGRAPHY.BODY["14R"]
)

const nestedListItemStyle = css(
  {
    marginBottom: 0,
    lineHeight: 1.4,
  },
  TYPOGRAPHY.BODY["14R"]
)
