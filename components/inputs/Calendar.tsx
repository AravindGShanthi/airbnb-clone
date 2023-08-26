"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/theme/default.css";
import "react-date-range/dist/styles.css";

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      minDate={new Date()}
      onChange={onChange}
      showDateDisplay={false}
      direction="vertical"
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
