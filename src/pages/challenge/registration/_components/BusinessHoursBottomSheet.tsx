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
  businessHours?: {
    startTime: string;
    endTime: string;
  };
  breakTime?: {
    startTime: string;
    endTime: string;
  };
  lastOrder?: string;
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

// 시간 옵션 생성 (00:00 ~ 23:30, 30분 단위)
const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, "0");
      const minuteStr = minute.toString().padStart(2, "0");
      times.push(`${hourStr}:${minuteStr}`);
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

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
  const [businessHours, setBusinessHours] = useState({
    startTime: "",
    endTime: "",
  });
  const [breakTime, setBreakTime] = useState({
    startTime: "",
    endTime: "",
  });
  const [lastOrder, setLastOrder] = useState("");

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
      businessHours:
        businessHours.startTime && businessHours.endTime
          ? businessHours
          : undefined,
      breakTime:
        options.hasBreakTime && breakTime.startTime && breakTime.endTime
          ? breakTime
          : undefined,
      lastOrder: options.hasLastOrder && lastOrder ? lastOrder : undefined,
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

        {/* 영업 시간 섹션 */}
        <div css={hoursContainerStyle}>
          {/* 영업 시간 */}
          <div css={timeSectionStyle}>
            <div css={timeLabelRowStyle}>
              <label css={timeLabelStyle}>영업 시간*</label>
              <div css={timeOptionsStyle}>
                <button
                  css={timeOptionButtonStyle}
                  onClick={() => handleOptionToggle("is24Hours")}
                  type="button"
                >
                  <div
                    css={[
                      checkboxIconStyle,
                      options.is24Hours && checkboxIconActiveStyle,
                    ]}
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
                  <span css={timeOptionTextStyle}>24시 영업</span>
                </button>
                <button
                  css={timeOptionButtonStyle}
                  onClick={() => handleOptionToggle("isClosed")}
                  type="button"
                >
                  <div
                    css={[
                      checkboxIconStyle,
                      options.isClosed && checkboxIconActiveStyle,
                    ]}
                  >
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
                  <span css={timeOptionTextStyle}>휴무</span>
                </button>
              </div>
            </div>
            <div css={timeSelectContainerStyle}>
              <select
                css={[
                  timeSelectStyle,
                  !businessHours.startTime && timeSelectPlaceholderStyle,
                ]}
                value={businessHours.startTime}
                onChange={(e) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                disabled={options.is24Hours || options.isClosed}
              >
                <option value="">선택</option>
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span css={timeSeparatorStyle}>~</span>
              <select
                css={[
                  timeSelectStyle,
                  !businessHours.endTime && timeSelectPlaceholderStyle,
                ]}
                value={businessHours.endTime}
                onChange={(e) =>
                  setBusinessHours((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                disabled={options.is24Hours || options.isClosed}
              >
                <option value="">선택</option>
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 브레이크 타임 */}
          <div css={timeSectionStyle}>
            <label css={timeLabelStyle}>브레이크 타임</label>
            <div css={timeSelectContainerStyle}>
              <select
                css={[
                  timeSelectStyle,
                  !breakTime.startTime && timeSelectPlaceholderStyle,
                ]}
                value={breakTime.startTime}
                onChange={(e) =>
                  setBreakTime((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              >
                <option value="">선택</option>
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <span css={timeSeparatorStyle}>~</span>
              <select
                css={[
                  timeSelectStyle,
                  !breakTime.endTime && timeSelectPlaceholderStyle,
                ]}
                value={breakTime.endTime}
                onChange={(e) =>
                  setBreakTime((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              >
                <option value="">선택</option>
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 라스트오더 */}
          <div css={timeSectionStyle}>
            <label css={timeLabelStyle}>라스트오더</label>
            <div css={timeSelectContainerStyle}>
              <select
                css={[
                  timeSelectStyle,
                  !lastOrder && timeSelectPlaceholderStyle,
                ]}
                value={lastOrder}
                onChange={(e) => setLastOrder(e.target.value)}
              >
                <option value="">선택</option>
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
    flex: 1,
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

const hoursContainerStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

const timeSectionStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
});

const timeLabelRowStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 12,
  width: "100%",
});

const timeLabelStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14SB"]
);

const timeOptionsStyle = css({
  display: "flex",
  flexDirection: "row",
  gap: 12,
});

const timeOptionButtonStyle = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
  background: "none",
  border: "none",
  padding: 0,
});

const checkboxIconStyle = css({
  width: 24,
  height: 24,
  border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
});

const checkboxIconActiveStyle = css({
  backgroundColor: THEME.COLORS.GRAYSCALE.NORMAL,
  border: `1px solid ${THEME.COLORS.GRAYSCALE.NORMAL}`,
});

const timeOptionTextStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

const timeSelectContainerStyle = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  width: "100%",
  "& > select": {
    flex: 1,
  },
});

const timeSelectStyle = css(
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    flex: 1,
    height: 44,
    border: `1px solid ${THEME.COLORS.LINE.NORMAL}`,
    borderRadius: 8,
    backgroundColor: THEME.COLORS.BACKGROUND.WHITE,
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23191919' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: 40,
    color: THEME.COLORS.GRAYSCALE.NORMAL,
    cursor: "pointer",
    "&:disabled": {
      backgroundColor: THEME.COLORS.BACKGROUND.DISABLE,
      color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
      cursor: "not-allowed",
    },
  },
  TYPOGRAPHY.BODY["14R"]
);

const timeSelectPlaceholderStyle = css({
  color: THEME.COLORS.GRAYSCALE.ASSISTIVE,
});

const timeSeparatorStyle = css(
  {
    color: THEME.COLORS.GRAYSCALE.NORMAL,
  },
  TYPOGRAPHY.BODY["14R"]
);

export default BusinessHoursBottomSheet;
