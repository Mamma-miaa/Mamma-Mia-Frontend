import { css } from "@emotion/react";
import ExitIcon from "@/@lib/assets/exit.svg?react";
import type { PropsWithChildren } from "react";
import { overlay } from "overlay-kit";
import THEME from "@/constants/theme";

export const openPopup = (children: React.ReactNode) => {
  return overlay.open(({ isOpen, close }) => (
    <Popup isOpen={isOpen} onClose={close}>
      {children}
    </Popup>
  ));
};

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}
const Popup = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<PopupProps>) => {
  return (
    isOpen && (
      <div css={popupContainerStyle}>
        <div css={popupHeaderStyle}>
          <ExitIcon onClick={onClose} />
        </div>
        {children}
      </div>
    )
  );
};

export default Popup;

const popupContainerStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  zIndex: 99999,

  overflow: "scroll",
});

const popupHeaderStyle = css({
  display: "flex",
  alignItems: "center",
  padding: "16px 20px",
});
