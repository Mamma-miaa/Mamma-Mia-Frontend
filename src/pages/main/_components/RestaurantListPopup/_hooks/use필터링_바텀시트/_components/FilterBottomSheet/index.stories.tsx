import type { Meta, StoryObj } from "@storybook/react";
import FilterBottomSheet from "./index";

const meta: Meta<typeof FilterBottomSheet> = {
  title: "Components/FilterBottomSheet",
  component: FilterBottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "BottomSheet 열림/닫힘 상태",
    },
    onClose: {
      action: "closed",
      description: "BottomSheet 닫기 콜백",
    },
    onReset: {
      action: "applied",
      description: "가격대 설정 완료 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBottomSheet>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("FilterBottomSheet closed"),
    onReset: () => console.log("Price range applied:"),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log("FilterBottomSheet closed"),
    onReset: () => console.log("Price range applied:"),
  },
};
