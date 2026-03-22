import { css } from "@emotion/react"
import type { StoreListItem } from "./types"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import SectionCard from "./SectionCard"

interface StoreListPanelProps {
  keyword: string
  size: string
  storeIdInput: string
  isLoading: boolean
  statusText: string
  stores?: StoreListItem[]
  onKeywordChange: (value: string) => void
  onSizeChange: (value: string) => void
  onStoreIdChange: (value: string) => void
  onLoadList: () => void
  onLoadStore: () => void
  onSelectStore: (storeId: number) => void
}

const StoreListPanel = ({
  keyword,
  size,
  storeIdInput,
  isLoading,
  statusText,
  stores,
  onKeywordChange,
  onSizeChange,
  onStoreIdChange,
  onLoadList,
  onLoadStore,
  onSelectStore,
}: StoreListPanelProps) => {
  return (
    <SectionCard title="가게 목록" gap={12}>
      <div css={gridStyle}>
        <div>
          <label css={labelStyle}>검색 키워드</label>
          <input
            css={inputStyle}
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="가게 이름"
          />
        </div>
        <div>
          <label css={labelStyle}>페이지 크기</label>
          <input
            css={inputStyle}
            value={size}
            onChange={(event) => onSizeChange(event.target.value)}
          />
        </div>
        <div>
          <label css={labelStyle}>Store ID (직접 입력)</label>
          <input
            css={inputStyle}
            value={storeIdInput}
            onChange={(event) => onStoreIdChange(event.target.value)}
            placeholder="예: 12"
          />
        </div>
      </div>

      <div css={rowStyle}>
        <button css={primaryButtonStyle} onClick={onLoadList}>
          목록 불러오기
        </button>
        <button css={ghostButtonStyle} onClick={onLoadStore}>
          선택 ID 불러오기
        </button>
      </div>
      <span css={statusTextStyle}>
        {isLoading ? "목록 조회 중..." : statusText}
      </span>

      <div css={listStyle}>
        {stores?.map((store) => (
          <div
            key={store.storeId}
            css={itemStyle}
            onClick={() => onSelectStore(store.storeId)}
          >
            <div css={rowBetweenStyle}>
              <div css={itemInfoStyle}>
                <strong css={itemTitleStyle}>{store.name}</strong>
                <span css={itemDescriptionStyle}>
                  #{store.storeId} · {store.category}
                </span>
              </div>
            </div>
          </div>
        ))}
        {!stores?.length && <span css={statusTextStyle}>검색 결과 없음</span>}
      </div>
    </SectionCard>
  )
}

const gridStyle = css({
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
})

const rowStyle = css({
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
})

const listStyle = css({
  display: "grid",
  gap: 12,
})

const itemStyle = css({
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 12,
  padding: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  cursor: "pointer",
})

const rowBetweenStyle = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 10,
  flexWrap: "wrap",
})

const itemInfoStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 4,
})

const itemTitleStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

const itemDescriptionStyle = css({
  ...TYPOGRAPHY.SUB["12R"],
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
})

const labelStyle = css({
  ...TYPOGRAPHY.SUB["12R"],
  display: "block",
  marginBottom: 6,
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
})

const inputStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

const statusTextStyle = css({
  ...TYPOGRAPHY.SUB["12R"],
  color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
})

const primaryButtonStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  border: "none",
  backgroundColor: THEME.COLORS.PRIMARY.RED,
  color: THEME.COLORS.BACKGROUND.WHITE,
  padding: "10px 14px",
  borderRadius: 10,
  cursor: "pointer",
})

const ghostButtonStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  border: `1px solid ${THEME.COLORS.PRIMARY.RED}`,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  color: THEME.COLORS.PRIMARY.RED,
  padding: "10px 14px",
  borderRadius: 10,
  cursor: "pointer",
})

export default StoreListPanel
