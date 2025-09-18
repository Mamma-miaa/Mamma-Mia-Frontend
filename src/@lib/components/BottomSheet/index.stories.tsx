import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BottomSheet from "./index";
import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "바텀시트 열림/닫힘 상태",
    },
    onClose: {
      action: "closed",
      description: "바텀시트 닫기 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          바텀시트 열기
        </button>
        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div css={contentStyle}>
            <h2 css={titleStyle}>바텀시트 제목</h2>
            <p css={descriptionStyle}>
              이것은 바텀시트의 기본 콘텐츠입니다. 사용자가 원하는 내용을 여기에
              추가할 수 있습니다.
            </p>
            <button css={closeButtonStyle} onClick={() => setIsOpen(false)}>
              닫기
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 긴 콘텐츠가 있는 스토리
export const LongContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          긴 콘텐츠 바텀시트 열기
        </button>
        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div css={contentStyle}>
            <h2 css={titleStyle}>긴 콘텐츠 바텀시트</h2>
            <div css={longContentStyle}>
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i} css={descriptionStyle}>
                  이것은 {i + 1}번째 문단입니다. 바텀시트가 긴 콘텐츠를 어떻게
                  처리하는지 확인할 수 있습니다.
                </p>
              ))}
            </div>
            <button css={closeButtonStyle} onClick={() => setIsOpen(false)}>
              닫기
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 필터 바텀시트 스타일 스토리
export const FilterStyle: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          필터 바텀시트 열기
        </button>
        <BottomSheet {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div css={filterContentStyle}>
            <div css={filterHeaderStyle}>
              <h2 css={titleStyle}>필터</h2>
              <button css={resetButtonStyle}>초기화</button>
            </div>
            <div css={filterSectionStyle}>
              <h3 css={sectionTitleStyle}>카테고리</h3>
              <div css={filterOptionsStyle}>
                {["한식", "중식", "일식", "양식", "분식"].map((category) => (
                  <button key={category} css={filterOptionStyle}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div css={filterSectionStyle}>
              <h3 css={sectionTitleStyle}>가격대</h3>
              <div css={filterOptionsStyle}>
                {["1만원 이하", "1-2만원", "2-3만원", "3만원 이상"].map(
                  (price) => (
                    <button key={price} css={filterOptionStyle}>
                      {price}
                    </button>
                  )
                )}
              </div>
            </div>
            <button css={applyButtonStyle} onClick={() => setIsOpen(false)}>
              적용하기
            </button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

// 스타일 정의
const storyContainerStyle = css({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
});

const triggerButtonStyle = css(
  {
    padding: "12px 24px",
    backgroundColor: THEME.COLORS.PRIMARY.RED,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  TYPOGRAPHY.BODY["14SB"]
);

const contentStyle = css({
  width: "100%",
  textAlign: "center",
});

const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    marginBottom: 16,
  },
  TYPOGRAPHY.HEADERS["18SB"]
);

const descriptionStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    marginBottom: 16,
    lineHeight: 1.5,
  },
  TYPOGRAPHY.BODY["14R"]
);

const closeButtonStyle = css(
  {
    padding: "12px 24px",
    backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  TYPOGRAPHY.BODY["14SB"]
);

const longContentStyle = css({
  maxHeight: 300,
  overflowY: "auto",
  marginBottom: 16,
});

const filterContentStyle = css({
  width: "100%",
});

const filterHeaderStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 24,
});

const resetButtonStyle = css(
  {
    backgroundColor: "transparent",
    border: "none",
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    cursor: "pointer",
    textDecoration: "underline",
  },
  TYPOGRAPHY.BODY["14R"]
);

const filterSectionStyle = css({
  marginBottom: 24,
});

const sectionTitleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    marginBottom: 12,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const filterOptionsStyle = css({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
});

const filterOptionStyle = css(
  {
    padding: "8px 16px",
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 20,
    cursor: "pointer",
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const applyButtonStyle = css(
  {
    width: "100%",
    padding: "16px",
    backgroundColor: THEME.COLORS.PRIMARY.RED,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 24,
  },
  TYPOGRAPHY.BODY["14SB"]
);
