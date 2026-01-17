import { css } from "@emotion/react"
import { AnimatePresence, motion } from "motion/react"

interface ModalContainerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  containerWidth?: number | string
}

const ModalContainer = ({
  isOpen,
  onClose,
  children,
  containerWidth,
}: ModalContainerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          css={overlayStyle}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            css={css(
              containerStyle,
              containerWidth && { width: containerWidth }
            )}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalContainer

const overlayStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
})

const containerStyle = css({
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  width: "100%",
  maxWidth: 320,
})
