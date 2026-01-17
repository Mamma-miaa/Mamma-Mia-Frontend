import Toast from "@/@lib/components/Toast"
import { overlay } from "overlay-kit"

const toast = ({ message }: { message: string }) => {
  overlay.open(({ isOpen, close }) => (
    <Toast isOpen={isOpen} onClose={close} message={message} />
  ))
}

export default toast
