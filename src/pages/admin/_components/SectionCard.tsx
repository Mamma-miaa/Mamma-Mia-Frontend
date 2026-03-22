import { css } from "@emotion/react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import type { ReactNode } from "react"

interface SectionCardProps {
  title?: string
  children: ReactNode
  gap?: number
}

const SectionCard = ({
  title,
  children,
  gap = 12,
}: SectionCardProps) => {
  return (
    <section css={[cardStyle, css({ gap })]}>
      <header css={headerStyle}>
        {title && <h2 css={titleStyle}>{title}</h2>}
      </header>
      <div>{children}</div>
    </section>
  )
}

const cardStyle = css({
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 16,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  boxShadow: THEME.SHADOWS.NORMAL,
})

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 8,
})

const titleStyle = css({
  ...TYPOGRAPHY.HEADERS["18SB"],
  margin: 0,
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

export default SectionCard
