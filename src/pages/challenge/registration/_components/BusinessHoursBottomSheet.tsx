import { css } from "@emotion/react";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { overlay } from "overlay-kit";
import THEME from "@/constants/theme";
import TYPOGRAPHY from "@/constants/typography";
import { useState } from "react";

export interface BusinessHoursData {
  selectedDays: string[];
  options: {
    isClosed: boolean;
    is24Hours: boolean;
    hasBreakTime: boolean;
    hasLastOrder: boolean;
  };
}

export const openBusinessHoursBottomSheet = () => {
  return overlay.openAsync<BusinessHoursData | null>(({ isOpen, close }) => {
    return (
      <BusinessHoursBottomSheet
        isOpen={isOpen}
        onClose={() => close(null)}
        onApply={(data) => close(data)}
      />
    );
  });
};

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

const BusinessHoursBottomSheet = ({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: BusinessHoursData | null) => void;
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [options, setOptions] = useState({
    isClosed: false,
    is24Hours: false,
    hasBreakTime: false,
    hasLastOrder: false,
  });

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleOptionToggle = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleApply = () => {
    onApply({
      selectedDays,
      options,
    });
  };

  return (
    <FilterBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onApply={handleApply}
      title="영업 시간 정보 등록"
      description="등록할 요일을 선택해 영업시간 정보를 입력해 주세요."
      ctaButtonText="영업시간 등록"
    >
      <div css={containerStyle}>
        {/* 요일 선택 */}
        <div css={daysContainerStyle}>
          {DAYS.map((day) => (
            <button
              key={day}
              css={[
                dayButtonStyle,
                selectedDays.includes(day) && dayButtonActiveStyle,
              ]}
              onClick={() => handleDayToggle(day)}
              type="button"
            >
              <span css={dayTextStyle}>{day}</span>
            </button>
          ))}
        </div>

        {/* 옵션 선택 */}
        <div css={optionsContainerStyle}>
          <button
            css={optionButtonStyle}
            onClick={() => handleOptionToggle("isClosed")}
            type="button"
          >
            <div css={[checkboxStyle, options.isClosed && checkboxActiveStyle]}>
              {options.isClosed && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span css={optionTextStyle}>휴무</span>
          </button>
          <button
            css={optionButtonStyle}
            onClick={() => handleOptionToggle("is24Hours")}
            type="button"
          >
            <div
              css={[checkboxStyle, options.is24Hours && checkboxActiveStyle]}
            >
              {options.is24Hours && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span css={optionTextStyle}>24시 영업</span>
          </button>
          <button
            css={optionButtonStyle}
            onClick={() => handleOptionToggle("hasBreakTime")}
            type="button"
          >
            <div
              css={[checkboxStyle, options.hasBreakTime && checkboxActiveStyle]}
            >
              {options.hasBreakTime && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span css={optionTextStyle}>브레이크 타임 있음</span>
          </button>
          <button
            css={optionButtonStyle}
            onClick={() => handleOptionToggle("hasLastOrder")}
            type="button"
          >
            <div
              css={[checkboxStyle, options.hasLastOrder && checkboxActiveStyle]}
            >
              {options.hasLastOrder && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 5L7.50004 14.1667L3.33337 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span css={optionTextStyle}>라스트오더</span>
          </button>
        </div>
      </div>
    </FilterBottomSheet>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

const daysContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  width: "100%",
});

const dayButtonStyle = css(
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 40,
    height: 40,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    cursor: "pointer",
  },
  TYPOGRAPHY.BODY["14R"]
);

const dayButtonActiveStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: `1px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
  "& span": {
    color: THEME.COLORS.BACKGROUND.WHITE,
  },
});

const dayTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const optionsContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 12,
  width: "100%",
});

const optionButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
});

const checkboxStyle = css({
  width: 24,
  height: 24,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});

const checkboxActiveStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: `1px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
});

const optionTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

export default BusinessHoursBottomSheet;
