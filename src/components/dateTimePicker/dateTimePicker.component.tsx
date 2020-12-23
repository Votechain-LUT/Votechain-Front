import React from "react";
import DatePicker from "react-datepicker";
import "./dateTimePicker.styles.scss";

type Props = {
  showTime?: boolean;
  shouldCloseOnSelect?: boolean;
  timeCaption?: string;
  selected: Date;
  minDate?: Date;
  locale: string;
  label?: string;
  dateFormat?: string;
  onChange(date: Date | [Date, Date] | null): void;
};

const DateTimePicker: React.FC<Props> = ({
  showTime,
  shouldCloseOnSelect,
  timeCaption,
  selected,
  locale,
  minDate,
  label,
  dateFormat,
  onChange,
}) => {
  return (
    <div className={"dateTimePickerWrapper"}>
      {label && <label>{label}</label>}
      <DatePicker
        onChange={(date) => onChange(date)}
        selected={selected}
        locale={locale}
        minDate={minDate}
        dateFormat={dateFormat}
        timeCaption={timeCaption}
        shouldCloseOnSelect={shouldCloseOnSelect}
        showTimeSelect={showTime}
      />
    </div>
  );
};

export default DateTimePicker;
