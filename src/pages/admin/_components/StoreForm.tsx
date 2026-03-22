import { css } from "@emotion/react"
import THEME from "@/constants/theme"
import TYPOGRAPHY from "@/constants/typography"
import SectionCard from "./SectionCard"
import {
  DAY_ORDER,
  type BasicFormState,
  type BusinessHourState,
  type FacilitiesState,
  type MenuState,
} from "./types"

interface StoreFormProps {
  basicFormState: BasicFormState
  storeImageUrls: string[]
  businessHours: BusinessHourState[]
  facilities: FacilitiesState
  menus: MenuState[]
  storeImageFiles: File[]
  isSaving: boolean
  saveStatusText: string
  onBasicChange: (field: keyof BasicFormState, value: string) => void
  onStoreImageUrlChange: (index: number, value: string) => void
  onAddStoreImageUrl: () => void
  onStoreImageFilesChange: (files: File[]) => void
  onBusinessHourChange: (
    index: number,
    field: keyof BusinessHourState,
    value: string | boolean
  ) => void
  onFacilityChange: (field: keyof FacilitiesState, value: boolean) => void
  onMenuChange: (
    id: string,
    field: keyof MenuState,
    value: string | File | null
  ) => void
  onAddMenu: () => void
  onSave: () => void
  onReset: () => void
}

const StoreForm = ({
  basicFormState,
  storeImageUrls,
  businessHours,
  facilities,
  menus,
  isSaving,
  saveStatusText,
  onBasicChange,
  onStoreImageUrlChange,
  onAddStoreImageUrl,
  onStoreImageFilesChange,
  onBusinessHourChange,
  onFacilityChange,
  onMenuChange,
  onAddMenu,
  onSave,
  onReset,
}: StoreFormProps) => {
  return (
    <div css={formStackStyle}>
      <SectionCard title="기본 정보">
        <div css={gridStyle}>
          <InputField
            label="가게 이름"
            value={basicFormState.name}
            onChange={(value) => onBasicChange("name", value)}
          />
          <SelectField
            label="상태"
            value={basicFormState.status}
            options={[
              { label: "NORMAL", value: "NORMAL" },
              { label: "CHALLENGE", value: "CHALLENGE" },
            ]}
            onChange={(value) => onBasicChange("status", value)}
          />
          <InputField
            label="카테고리"
            value={basicFormState.category}
            onChange={(value) => onBasicChange("category", value)}
          />
          <InputField
            label="가까운 역 이름"
            value={basicFormState.stationName}
            onChange={(value) => onBasicChange("stationName", value)}
          />
          <InputField
            label="주소"
            value={basicFormState.address}
            onChange={(value) => onBasicChange("address", value)}
          />
          <InputField
            label="위도"
            value={basicFormState.latitude}
            onChange={(value) => onBasicChange("latitude", value)}
            placeholder="예: 37.5665"
          />
          <InputField
            label="경도"
            value={basicFormState.longitude}
            onChange={(value) => onBasicChange("longitude", value)}
            placeholder="예: 126.9780"
          />
        </div>
        <div>
          <Label>코멘트</Label>
          <textarea
            css={textAreaStyle}
            value={basicFormState.comment}
            onChange={(event) => onBasicChange("comment", event.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="가게 이미지">
        <div css={listStyle}>
          {storeImageUrls.map((storeImageUrl, index) => (
            <div key={`${index}-${storeImageUrl}`} css={itemStyle}>
              <Label>이미지 URL</Label>
              <input
                css={inputStyle}
                value={storeImageUrl}
                onChange={(event) =>
                  onStoreImageUrlChange(index, event.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div css={rowStyle}>
          <button css={ghostButtonStyle} onClick={onAddStoreImageUrl}>
            URL 추가
          </button>
        </div>
        <div>
          <Label>새 이미지 업로드 (기존 URL 무시)</Label>
          <input
            css={inputStyle}
            type="file"
            accept="image/*"
            multiple
            onChange={(event) =>
              onStoreImageFilesChange(Array.from(event.target.files || []))
            }
          />
        </div>
      </SectionCard>

      <SectionCard title="영업 시간">
        <div css={listStyle}>
          {businessHours.map((businessHour, index) => (
            <div key={businessHour.dayOfWeek} css={itemStyle}>
              <div css={hourGridStyle}>
                <strong css={itemTitleStyle}>
                  {DAY_ORDER.find((day) => day.code === businessHour.dayOfWeek)
                    ?.label || businessHour.dayOfWeek}
                </strong>
                <input
                  css={inputStyle}
                  type="time"
                  value={businessHour.openTime}
                  onChange={(event) =>
                    onBusinessHourChange(index, "openTime", event.target.value)
                  }
                />
                <input
                  css={inputStyle}
                  type="time"
                  value={businessHour.closeTime}
                  onChange={(event) =>
                    onBusinessHourChange(index, "closeTime", event.target.value)
                  }
                />
                <input
                  css={inputStyle}
                  type="time"
                  value={businessHour.breakStart}
                  onChange={(event) =>
                    onBusinessHourChange(index, "breakStart", event.target.value)
                  }
                />
                <input
                  css={inputStyle}
                  type="time"
                  value={businessHour.breakEnd}
                  onChange={(event) =>
                    onBusinessHourChange(index, "breakEnd", event.target.value)
                  }
                />
                <input
                  css={inputStyle}
                  type="time"
                  value={businessHour.lastOrder}
                  onChange={(event) =>
                    onBusinessHourChange(index, "lastOrder", event.target.value)
                  }
                />
                <label css={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    checked={businessHour.closed}
                    onChange={(event) =>
                      onBusinessHourChange(index, "closed", event.target.checked)
                    }
                  />
                  휴무
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="편의시설">
        <div css={gridStyle}>
          {([
            ["parking", "주차"],
            ["takeout", "포장"],
            ["delivery", "배달"],
            ["indoorRestroom", "내부 화장실"],
            ["outdoorRestroom", "외부 화장실"],
            ["groupSeating", "단체석"],
          ] as const).map(([field, label]) => (
            <label key={field} css={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={facilities[field]}
                onChange={(event) => onFacilityChange(field, event.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="메뉴">
        <div css={listStyle}>
          {menus.map((menu) => (
            <div key={menu.id} css={itemStyle}>
              <div css={gridStyle}>
                <InputField
                  label="메뉴 이름"
                  value={menu.name}
                  onChange={(value) => onMenuChange(menu.id, "name", value)}
                />
                <InputField
                  label="가격"
                  value={menu.price}
                  onChange={(value) => onMenuChange(menu.id, "price", value)}
                />
                <InputField
                  label="이미지 URL"
                  value={menu.imageUrl}
                  onChange={(value) => onMenuChange(menu.id, "imageUrl", value)}
                />
              </div>
              <div>
                <Label>새 이미지 업로드 (있으면 URL 무시)</Label>
                <input
                  css={inputStyle}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onMenuChange(
                      menu.id,
                      "imageFile",
                      event.target.files?.[0] || null
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div css={rowStyle}>
          <button css={ghostButtonStyle} onClick={onAddMenu}>
            메뉴 추가
          </button>
        </div>
      </SectionCard>

      <SectionCard title="저장" actions={<span css={statusTextStyle}>{isSaving ? "저장 중..." : saveStatusText}</span>}>
        <div css={actionsStyle}>
          <button css={primaryButtonStyle} disabled={isSaving} onClick={onSave}>
            저장하기
          </button>
          <button css={ghostButtonStyle} onClick={onReset}>
            폼 초기화
          </button>
        </div>
      </SectionCard>
    </div>
  )
}

const formStackStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
})

const gridStyle = css({
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
})

const listStyle = css({
  display: "grid",
  gap: 12,
})

const rowStyle = css({
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
})

const actionsStyle = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 10,
  flexWrap: "wrap",
})

const itemStyle = css({
  border: `1px dashed ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 12,
  padding: 12,
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
  display: "flex",
  flexDirection: "column",
  gap: 8,
})

const itemTitleStyle = css({
  ...TYPOGRAPHY.BODY["14SB"],
  color: THEME.COLORS.GRAYSCALE.NORMAL,
})

const hourGridStyle = css({
  display: "grid",
  gap: 8,
  gridTemplateColumns: "90px repeat(5, minmax(90px, 1fr)) 100px",
  alignItems: "center",
  "@media (max-width: 820px)": {
    gridTemplateColumns: "repeat(2, minmax(120px, 1fr))",
  },
})

const labelBaseStyle = css({
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

const textAreaStyle = css({
  ...inputStyle,
  minHeight: 90,
  resize: "vertical",
})

const checkboxLabelStyle = css({
  ...TYPOGRAPHY.BODY["14R"],
  display: "flex",
  alignItems: "center",
  gap: 6,
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

const Label = ({ children }: { children: string }) => (
  <label css={labelBaseStyle}>{children}</label>
)

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) => (
  <div>
    <Label>{label}</Label>
    <input
      css={inputStyle}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  </div>
)

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { label: string; value: string }[]
  onChange: (value: string) => void
}) => (
  <div>
    <Label>{label}</Label>
    <select
      css={inputStyle}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default StoreForm
