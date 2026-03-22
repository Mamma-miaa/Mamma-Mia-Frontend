import { css } from "@emotion/react"
import type { StoreListItem } from "./types"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import SectionCard from "./SectionCard"
import Spacing from "@/@lib/components/Spacing"

interface StoreListPanelProps {
  keyword: string
  size: string
  storeIdInput: string
  selectedStoreId: number | null
  isLoading: boolean
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
  selectedStoreId,
  isLoading,
  stores,
  onKeywordChange,
  onSizeChange,
  onLoadList,
  onSelectStore,
}: StoreListPanelProps) => {
  return (
    <SectionCard title="가게 목록" gap={12}>
      <div css={gridStyle}>
        <div css={rowStyle}>
          <label css={labelStyle}>검색 키워드</label>
          <input
            css={inputStyle}
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="가게 이름"
          />
        </div>
        <div css={rowStyle}>
          <label css={labelStyle}>페이지 크기</label>
          <input
            css={inputStyle}
            value={size}
            onChange={(event) => onSizeChange(event.target.value)}
          />
        </div>
        <button css={primaryButtonStyle} onClick={onLoadList}>
          검색
        </button>
      </div>
      <Spacing size={12} />
      {isLoading && <span css={statusTextStyle}>목록 조회 중...</span>}

      <div css={listStyle} role="list" aria-label="가게 목록">
        {stores?.map((store) => {
          const isActive = selectedStoreId === store.storeId
          return (
            <div
              key={store.storeId}
              role="listitem"
              aria-selected={isActive}
              css={[itemStyle, isActive && itemActiveStyle]}
              onClick={() => onSelectStore(store.storeId)}
            >
              <div css={rowBetweenStyle}>
                <div css={itemInfoStyle}>
                  <strong
                    css={[itemTitleStyle, isActive && itemTitleActiveStyle]}
                  >
                    {store.name}
                  </strong>
                  <span
                    css={[
                      itemDescriptionStyle,
                      isActive && itemDescriptionActiveStyle,
                    ]}
                  >
                    #{store.storeId} · {store.category}
                  </span>
                </div>
                {isActive && <span css={activeBadgeStyle}>선택됨</span>}
              </div>
            </div>
          )
        })}
        {!stores?.length && <span css={statusTextStyle}>검색 결과 없음</span>}
      </div>
    </SectionCard>
  )
}

const gridStyle = css({
  display: "flex",
  gap: 12,
  alignItems: "end",
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
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 12,
  padding: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  cursor: "pointer",
  transition:
    "border-color 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease",
  "&:hover": {
    borderColor: THEME.COLORS.GRAYSCALE.ASSISTIVE,
    backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
  },
})

const itemActiveStyle = css({
  borderColor: THEME.COLORS.PRIMARY.RED,
  backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  boxShadow: THEME.SHADOWS.EMPHASIZED,
  "&:hover": {
    borderColor: THEME.COLORS.PRIMARY.RED,
    backgroundColor: THEME.COLORS.BACKGROUND.ALTERNATIVE,
  },
})

const itemTitleActiveStyle = css({
  color: THEME.COLORS.PRIMARY.RED,
})

const itemDescriptionActiveStyle = css({
  color: THEME.COLORS.GRAYSCALE.NEUTRAL,
})

const activeBadgeStyle = css([
  TYPOGRAPHY.CAPTION["11B"],
  {
    flexShrink: 0,
    alignSelf: "flex-start",
    padding: "4px 8px",
    borderRadius: 6,
    backgroundColor: THEME.COLORS.PRIMARY.RED,
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
])

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

const itemTitleStyle = css([
  TYPOGRAPHY.BODY["14SB"],
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
])

const itemDescriptionStyle = css([
  TYPOGRAPHY.SUB["12R"],
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
])

const labelStyle = css([
  TYPOGRAPHY.SUB["12R"],
  {
    display: "block",
    marginBottom: 6,
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
])

const inputStyle = css([
  TYPOGRAPHY.BODY["14R"],
  {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
])

const statusTextStyle = css([
  TYPOGRAPHY.SUB["12R"],
  {
    color: THEME.COLORS.GRAYSCALE.ALTERNATIVE,
  },
])

const primaryButtonStyle = css([
  TYPOGRAPHY.BODY["14SB"],
  {
    border: "none",
    flex: "none",
    height: 44,
    backgroundColor: THEME.COLORS.PRIMARY.RED,
    color: THEME.COLORS.BACKGROUND.WHITE,
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
])

const ghostButtonStyle = css([
  TYPOGRAPHY.BODY["14SB"],
  {
    border: `1px solid ${THEME.COLORS.PRIMARY.RED}`,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    color: THEME.COLORS.PRIMARY.RED,
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
])

export default StoreListPanel
