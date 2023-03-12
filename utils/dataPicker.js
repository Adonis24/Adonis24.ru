import { useState, useEffect } from "react";
import Container from "react";
import DatePicker, { registerLocale } from "react-datepicker";
//import Container from "@material-ui/core/Container";
import { useFormikContext, useField, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export default function ReactDatePicker({
  name,
  name2,
  dateFormat = "yyyy-MM-dd",
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name: name, value: startDate });
  const [field2] = useField({ name: name2, value: endDate });
  useEffect(() => {
    setStartDate(startDate);
    setFieldValue(field.name, startDate);
    setStartDate(endDate);
    setFieldValue(field.name2, endDate);
  }, [endDate, field.name, field.name2, setFieldValue, startDate]);
  return (
    <div style={{ display: "inline-flex", marginBottom: "10px" }}>
      <div className="form-group">
        <label htmlFor={field.name}>Начало проекта</label>
        <DatePicker
          locale={ru}
          {...field}
          selected={(field.value && new Date(field.value) ) || null}
          onChange={(val) => {
            setStartDate(val);
            setFieldValue(field.name, val);
          }}
          
          showYearDropdown
          dateFormatCalendar="MMMM"
          yearDropdownItemNumber={5}
          scrollableYearDropdown
          peekNextMonth
          dateFormat={dateFormat}
          selectsStart
          minDate="2014-01-17"
        />
      </div>
      <div className="form-group">
        <label htmlFor={field2.name}>Окончание проекта</label>
        <DatePicker
          locale={ru}
          {...field2}
          selected={(field2.value && new Date(field2.value)) || null}
          onChange={(val) => {
            setEndDate(val);
            setFieldValue(field2.name, val);
          }}
          showYearDropdown
          scrollableYearDropdown
          dateFormatCalendar="MMMM" 
          yearDropdownItemNumber={5} 
          dateFormat={dateFormat}
          selectsEnd
          minDate="2014-01-17"
        />
      </div>
    </div>
  );
}
