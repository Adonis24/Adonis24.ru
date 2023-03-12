import React from "react";
import { useState, useEffect } from "react";

import ReactDOM from "react-dom";
import { useFormikContext, setFieldValue,useField, Field } from "formik";
import CssBaseline from '@material-ui/core/CssBaseline';
// --- Formik  imports --- //
import { Form } from "formik";

// --- Material Ui Picker Imports --- //
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ru from "date-fns/locale/ru";
//registerLocale("ru", ru);

import DateFnsUtils from "@date-io/date-fns";
export default function DataPickerMui({name, name2,dateStart,dateEnd,setFieldValue}) {
    const { formikProps } = useFormikContext();
  // const [field] = useField({ name: name, value: startDate });
  // const [field2] = useField({ name: name2, value: endDate });
  const [startDate, setStartDate] = useState(dateStart);
  const [endDate, setEndDate] = useState(dateEnd);
  // const [field] = useField({ name: name, value: dateStart });
  // const [field2] = useField({ name: name2, value: dateEnd });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
        <CssBaseline/>
    <div style={{ display: "inline-flex", marginBottom: "10px" }}>
      <div className="form-group">
        <KeyboardDatePicker
          id="date-picker-dialog-start"
          label="Начало проекта"
          inputVariant="outlined"
          format="dd-MM-yyyy"
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          value={dateStart}
          onChange={(value) => {
            setFieldValue("dateStart", value);
            //setStartDate(value);
          }}
          KeyboardButtonProps={{
            "aria-label": "Задать дату",
          }}
        />
      </div>
      <div className="form-group">
       
        <KeyboardDatePicker
          id="date-picker-dialog-end"
          label="Окончание проекта"
          inputVariant="outlined"
          format="dd-MM-yyyy"
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          value={dateEnd}
          onChange={(value) => {
            setFieldValue("dateEnd", value);
           // setEndDate(value);
          }}
          KeyboardButtonProps={{
            "aria-label": "Задать дату",
          }}
        />
      </div>
    </div>
    </MuiPickersUtilsProvider>
  );
}
