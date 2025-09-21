import type { Meta, StoryObj } from "@storybook/react";
import OverlayMarker from ".";
import 아시안_이미지 from "@/assets/graphics/아시안.webp";
import 삼겹살_이미지 from "@/assets/graphics/고기구이.webp";
import 치킨_이미지 from "@/assets/graphics/치킨.webp";

const meta: Meta<typeof OverlayMarker> = {
  title: "Components/OverlayMarker",
  component: OverlayMarker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "마커 내부에 표시할 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 마커
export const Default: Story = {
  args: {},
};

// 아시안 음식 이미지가 있는 마커
export const WithAsianFood: Story = {
  args: {
    children: (
      <img
        src={아시안_이미지}
        alt="아시안 음식"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
};

// 삼겹살 이미지가 있는 마커
export const WithPorkBelly: Story = {
  args: {
    children: (
      <img
        src={삼겹살_이미지}
        alt="삼겹살"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
};

// 치킨 이미지가 있는 마커
export const WithChicken: Story = {
  args: {
    children: (
      <img
        src={치킨_이미지}
        alt="치킨"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    ),
  },
};

// 텍스트가 있는 마커
export const WithText: Story = {
  args: {
    children: (
      <span
        style={{
          color: "white",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        A
      </span>
    ),
  },
};

// 이모지가 있는 마커
export const WithEmoji: Story = {
  args: {
    children: <span style={{ fontSize: "16px" }}>🍜</span>,
  },
};

// 여러 마커 비교
export const MultipleMarkers: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <OverlayMarker />
        <p style={{ marginTop: "8px", fontSize: "12px" }}>기본</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <OverlayMarker>
          <img
            src={아시안_이미지}
            alt="아시안"
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </OverlayMarker>
        <p style={{ marginTop: "8px", fontSize: "12px" }}>아시안</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <OverlayMarker>
          <img
            src={삼겹살_이미지}
            alt="삼겹살"
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </OverlayMarker>
        <p style={{ marginTop: "8px", fontSize: "12px" }}>삼겹살</p>
      </div>

      <div style={{ textAlign: "center" }}>
        <OverlayMarker>
          <span
            style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}
          >
            A
          </span>
        </OverlayMarker>
        <p style={{ marginTop: "8px", fontSize: "12px" }}>텍스트</p>
      </div>
    </div>
  ),
};
