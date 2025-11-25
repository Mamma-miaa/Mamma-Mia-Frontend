import { overlay } from "overlay-kit";
import ServiceAgreementPopup from ".";

export const openServiceAgreementPopup = () => {
  return overlay.openAsync<boolean>(({ isOpen, close }) => (
    <ServiceAgreementPopup isOpen={isOpen} onClose={close} />
  ));
};
