import type { Meta, StoryObj } from "@storybook/react"
import SummaryCard from "./index"

const meta: Meta<typeof SummaryCard> = {
  title: "Main/SummaryCard",
  component: SummaryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    category: {
      control: "text",
      description: "음식 카테고리",
    },
    restaurantName: {
      control: "text",
      description: "레스토랑 이름",
    },
    distance: {
      control: "text",
      description: "거리 정보",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: "국밥·탕/찌개",
    restaurantName: "계림닭도리탕 충무로직영점",
    distance: "380m",
    restaurantImageUrl: "https://placehold.co/78x78",
  },
}

export const LongName: Story = {
  args: {
    category: "한식",
    restaurantName: "매우 긴 레스토랑 이름을 가진 맛집입니다",
    distance: "1.2km",
    restaurantImageUrl: "https://placehold.co/78x78",
  },
}

export const ShortDistance: Story = {
  args: {
    category: "카페",
    restaurantName: "스타벅스",
    distance: "50m",
    restaurantImageUrl: "https://placehold.co/78x78",
  },
}
