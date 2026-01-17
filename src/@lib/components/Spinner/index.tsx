import { css, keyframes } from "@emotion/react"
import THEME from "@/constants/theme"

interface SpinnerProps {
  size?: "small" | "medium" | "large"
  color?: string
  className?: string
}

const Spinner = ({
  size = "medium",
  color = THEME.COLORS.PRIMARY.RED,
  className,
}: SpinnerProps) => {
  return (
    <div
      css={[spinnerStyle, sizeStyles[size], { borderTopColor: color }]}
      className={className}
    />
  )
}

// 회전 애니메이션 정의
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

// 기본 스피너 스타일
const spinnerStyle = css({
  border: `2px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderTop: `2px solid ${THEME.COLORS.PRIMARY.RED}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
  display: "inline-block",
})

// 크기별 스타일
const sizeStyles = {
  small: css({
    width: 16,
    height: 16,
    borderWidth: 2,
  }),
  medium: css({
    width: 24,
    height: 24,
    borderWidth: 2,
  }),
  large: css({
    width: 32,
    height: 32,
    borderWidth: 3,
  }),
}

export default Spinner
