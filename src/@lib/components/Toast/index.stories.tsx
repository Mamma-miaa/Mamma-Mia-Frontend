import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./index";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    message: {
      control: "text",
      description: "Toast에 표시될 메시지",
    },
    isOpen: {
      control: "boolean",
      description: "Toast 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: "주소 복사가 완료되었습니다.",
    isOpen: true,
  },
};

export const LongMessage: Story = {
  args: {
    message:
      "매우 긴 메시지입니다. 이 메시지는 Toast 컴포넌트의 텍스트 오버플로우 처리를 테스트하기 위한 메시지입니다.",
    isOpen: true,
  },
};

export const ShortMessage: Story = {
  args: {
    message: "완료",
    isOpen: true,
  },
};

export const Hidden: Story = {
  args: {
    message: "이 메시지는 보이지 않습니다.",
    isOpen: false,
  },
};

export const SuccessMessage: Story = {
  args: {
    message: "저장이 완료되었습니다.",
    isOpen: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    message: "오류가 발생했습니다. 다시 시도해주세요.",
    isOpen: true,
  },
};

export const InfoMessage: Story = {
  args: {
    message: "새로운 업데이트가 있습니다.",
    isOpen: true,
  },
};
