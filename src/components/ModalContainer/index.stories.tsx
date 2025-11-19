import type { Meta, StoryObj } from "@storybook/react";
import { css } from "@emotion/react";
import ModalContainer from "./index";
import TYPOGRAPHY from "@/constants/typography";
import THEME from "@/constants/theme";

const meta = {
  title: "Components/ModalContainer",
  component: ModalContainer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleContent = () => (
  <>
    <div css={titleStyle}>모달 타이틀</div>
    <div css={descriptionStyle}>모달 본문 내용입니다.</div>
    <button css={buttonStyle}>확인</button>
  </>
);

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Close"),
    children: <ExampleContent />,
  },
};

export const CustomWidth: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Close"),
    containerWidth: 400,
    children: <ExampleContent />,
  },
};

// Example Styles
const titleStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    textAlign: "center",
  },
  TYPOGRAPHY.HEADERS["16SB"]
);

const descriptionStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
    textAlign: "center",
  },
  TYPOGRAPHY.BODY["14R"]
);

const buttonStyle = css(
  {
    width: "100%",
    height: 44,
    backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
    color: THEME.COLORS.BACKGROUND.WHITE,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);

