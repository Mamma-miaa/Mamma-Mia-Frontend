import { overlay } from "overlay-kit";
import ConfirmModal from "..";

export const openLoginModal = () => {
  return overlay.openAsync<boolean>(({ isOpen, close }) => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={close}
      title="로그인 후 이용 가능한 기능입니다"
      description="로그인 페이지로 이동할까요?"
      cancelText="취소"
      confirmText="이동하기"
    />
  ));
};
