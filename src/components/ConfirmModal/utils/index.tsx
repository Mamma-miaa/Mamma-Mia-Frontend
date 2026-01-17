import { overlay } from "overlay-kit"
import ConfirmModal from ".."

export const openLoginModal = () => {
  return overlay.openAsync<boolean>(({ isOpen, close }) => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={close}
      title="로그인이 필요한 기능입니다."
      description="로그인 페이지로 이동할까요?"
      cancelText="취소"
      confirmText="이동하기"
    />
  ))
}

export const openConfirmModal = ({
  title,
  description,
  cancelText,
  confirmText,
}: {
  title: string
  description: string
  cancelText: string
  confirmText: string
}) => {
  return overlay.openAsync<boolean>(({ isOpen, close }) => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={close}
      title={title}
      description={description}
      cancelText={cancelText}
      confirmText={confirmText}
    />
  ))
}
