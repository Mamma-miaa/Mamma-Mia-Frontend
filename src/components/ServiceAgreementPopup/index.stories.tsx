import type { Meta, StoryObj } from "@storybook/react";
import ServiceAgreementPopup from "./index";

const meta = {
  title: "Components/ServiceAgreementPopup",
  component: ServiceAgreementPopup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ServiceAgreementPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("Close"),
    onConfirm: () => console.log("Confirm"),
  },
};

