import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ConfirmModal from "./index";
import { css } from "@emotion/react";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";

const meta: Meta<typeof ConfirmModal> = {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달 열림/닫힘 상태",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 콜백",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "모달 설명",
    },
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

// 기본 스토리 (로그인 안내)
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          모달 열기
        </button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// 커스텀 텍스트 스토리
export const CustomText: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          커스텀 텍스트 모달 열기
        </button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="정말 삭제하시겠습니까?"
          description="삭제된 데이터는 복구할 수 없습니다."
          cancelText="아니오"
          confirmText="삭제하기"
        />
      </div>
    );
  },
};

// 긴 텍스트 스토리
export const LongText: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          긴 텍스트 모달 열기
        </button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="이 기능은 로그인 후 이용 가능한 기능입니다. 계속 진행하시려면 로그인해주세요."
          description="로그인 페이지로 이동하여 계정에 로그인한 후 다시 시도해주세요. 로그인하지 않으면 이 기능을 사용할 수 없습니다."
        />
      </div>
    );
  },
};

// 경고 스타일 스토리
export const WarningStyle: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          경고 모달 열기
        </button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="경고"
          description="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
          cancelText="취소"
          confirmText="계속하기"
        />
      </div>
    );
  },
};

// 정보 안내 스토리
export const InfoStyle: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div css={storyContainerStyle}>
        <button css={triggerButtonStyle} onClick={() => setIsOpen(true)}>
          정보 모달 열기
        </button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="알림"
          description="새로운 기능이 추가되었습니다. 확인하시겠습니까?"
          cancelText="나중에"
          confirmText="확인하기"
        />
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

    "&:hover": {
      backgroundColor: THEME.COLORS.GRAYSCALE.STRONG,
    },
  },
  TYPOGRAPHY.BODY["14SB"]
);
