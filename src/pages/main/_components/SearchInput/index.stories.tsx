import type { Meta, StoryObj } from "@storybook/react"
import SearchInput from "./index"

const meta: Meta<typeof SearchInput> = {
  title: "Main/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "입력 필드 플레이스홀더",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "맛집을 검색해보세요",
  },
}
