# 맘마미아 (Mamma Mia) Frontend

맘마미아는 사용자들이 맛집을 발견하고 투표할 수 있는 위치 기반 충무로 맛집 추천 서비스입니다.

## 🚀 주요 기능

### 🗺️ 지도 기반 맛집 탐색

- 카카오맵을 활용한 인터랙티브 지도
- 현재 위치 기반 맛집 검색
- 충무로 반경 1km 내 맛집 표시

### 🏪 맛집 정보

- 상세한 맛집 정보 (주소, 영업시간, 가격대 등)
- 맛집 카테고리별 분류
- 실시간 투표 시스템

### 📱 반응형 UI/UX

- 모바일 최적화된 인터페이스
- 직관적인 네비게이션
- 부드러운 애니메이션과 전환 효과

## 🛠️ 기술 스택

### Frontend

- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Vite** - 빠른 개발 환경
- **Emotion** - CSS-in-JS 스타일링
- **React Router DOM** - 클라이언트 사이드 라우팅

### 지도 & UI

- **Kakao Maps API** - 지도 서비스
- **Swiper** - 터치 슬라이더
- **Overlay Kit** - 오버레이 관리

### 개발 도구

- **Storybook** - 컴포넌트 개발 및 문서화
- **ESLint** - 코드 품질 관리
- **OpenAPI TypeScript** - API 타입 자동 생성

## 📁 프로젝트 구조

```
src/
├── @lib/                    # 공통 라이브러리
│   └── components/          # 재사용 가능한 컴포넌트
├── apis/                    # API 관련
│   ├── index.ts            # API 클라이언트
│   ├── schema.d.ts         # API 타입 정의
│   └── store/              # 상태 관리
├── assets/                  # 정적 자산
│   ├── emoji/              # 이모지 이미지
│   ├── graphics/           # 카테고리 그래픽
│   └── rank/               # 순위 배지
├── constants/               # 상수 정의
│   ├── theme.ts            # 디자인 토큰
│   └── typography.ts       # 타이포그래피
├── hooks/                   # 커스텀 훅
├── pages/                   # 페이지 컴포넌트
│   ├── main/               # 메인 페이지
│   └── restaurant/         # 맛집 상세 페이지
├── styles/                  # 글로벌 스타일
└── App.tsx                  # 루트 컴포넌트
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary Red**: `#FB3F11` - 브랜드 메인 컬러
- **Grayscale**: 다양한 투명도의 회색 톤
- **Background**: `#FFFFFF`, `#F7F7F8`

### 타이포그래피

- **Font Family**: Pretendard (기본값)
- **Headers**: 16px, 600 weight
- **Body**: 14px, 400/600 weight
- **Sub**: 12px, 400/600 weight
- **Caption**: 11px, 700 weight

### 스타일링 규칙

- Emotion Object Styles 패턴 사용
- THEME 상수를 통한 일관된 색상 관리
- TYPOGRAPHY 상수를 통한 일관된 폰트 스타일
- 컴포넌트별 스타일 분리

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- Yarn 또는 npm

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 빌드
yarn build

# Storybook 실행
yarn storybook

# 린트 검사
yarn lint
```

### 환경 설정

1. **카카오맵 API 키 설정**
   - [카카오 개발자 콘솔](https://developers.kakao.com/)에서 API 키 발급
   - `index.html`에 카카오맵 스크립트 추가

2. **API 타입 생성**
   ```bash
   yarn generate-types
   ```

## 📱 주요 페이지

### 메인 페이지 (`/`)

- 지도 기반 맛집 탐색
- 현재 위치 설정
- 맛집 카드 슬라이더
- 검색 및 필터링

### 맛집 상세 페이지 (`/restaurant`)

- 맛집 상세 정보
- 투표 시스템
- 매장 정보 (주소, 영업시간, 가격대)
- 위치 정보 및 지도

## 🧩 컴포넌트

### 재사용 가능한 컴포넌트

- `SummaryCard` - 맛집 요약 카드
- `SearchInput` - 검색 입력 필드
- `OverlayMarker` - 지도 마커
- `Spacing` - 간격 조정

### 페이지별 컴포넌트

- `TopNavigation` - 상단 네비게이션
- `RestaurantListPopup` - 맛집 목록 팝업
- `RestaurantLocationSection` - 맛집 위치 섹션

## 🔧 개발 가이드

### 스타일링 규칙

1. Emotion Object Styles 패턴 사용
2. THEME 상수로 색상 관리
3. TYPOGRAPHY 상수로 폰트 스타일 관리
4. 컴포넌트 외부에 스타일 정의
5. `Style` 접미사로 스타일 변수 명명

### 컴포넌트 구조

```typescript
import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const Component = () => {
  return <div css={containerStyle}>...</div>;
};

const containerStyle = css({
  padding: 20,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  ...TYPOGRAPHY.BODY["14R"],
});
```

### API 연동

- OpenAPI 스키마 기반 타입 자동 생성
- React Query를 통한 서버 상태 관리
- Axios를 통한 HTTP 클라이언트

## 📚 추가 문서

- [컴포넌트 스타일링 규칙](.cursor/rules/component-styling.mdc)
- [Emotion Object Styles 가이드](.cursor/rules/emotion-object-styles.mdc)
- [Storybook 컴포넌트 문서](http://localhost:6006)
