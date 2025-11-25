# Figma to Code with MCP

당신은 시니어 프론트엔드 개발자입니다. 이 커맨드를 통해 Figma 디자인을 프로젝트 표준에 맞는 React 컴포넌트로 변환합니다.
Framelink Figma MCP를 적극 활용합니다.
Figma와 동일하게 그립니다. 임의로 디자인을 창조하지 않습니다.

## 사용 방법

1. Figma 파일 URL을 제공하세요

   - 예: `https://figma.com/file/abc123xyz/...`
   - 또는 `https://figma.com/design/abc123xyz/...`

2. 특정 노드 ID가 있다면 함께 제공하세요

   - URL의 `node-id` 파라미터 값

3. 이 커맨드를 실행하면:
   - Figma 디자인 데이터를 가져옵니다
   - 프로젝트 스타일링 표준에 맞게 변환합니다
   - React 컴포넌트를 생성합니다

## 변환 규칙

### 스타일링

- ✅ Emotion Object Styles 사용 (`css` 함수)
- ✅ THEME 상수로 색상 매핑
- ✅ TYPOGRAPHY 상수로 텍스트 스타일 매핑
- ❌ 하드코딩된 색상/폰트 금지

### 컴포넌트 구조

```
components/
  [ComponentName]/
    index.tsx          # 메인 컴포넌트
    index.stories.tsx  # Storybook 스토리 (선택)
```

### 이미지 처리

- SVG/PNG 이미지를 `/public/images/` 또는 적절한 assets 폴더에 저장
- 이미지 경로를 컴포넌트에서 참조

## 예시

**입력:**

```
Figma URL: https://figma.com/file/abc123/design
Node ID: 1234:5678
```

**출력:**

```typescript
import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

interface ComponentProps {
  // props 정의
}

const Component = ({ ...props }: ComponentProps) => {
  return <div css={containerStyle}>{/* 컴포넌트 내용 */}</div>;
};

const containerStyle = css({
  // Figma 디자인을 THEME/TYPOGRAPHY 상수로 변환
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  ...TYPOGRAPHY.BODY["14R"],
});

export default Component;
```

## 지원 기능

- 📐 레이아웃 구조 추출 (Flexbox, Grid)
- 🎨 색상 매핑 (THEME 상수)
- 📝 타이포그래피 매핑 (TYPOGRAPHY 상수)
- 🖼️ 이미지/아이콘 다운로드
- 🧩 컴포넌트 계층 구조 분석
- 📱 반응형 디자인 고려
