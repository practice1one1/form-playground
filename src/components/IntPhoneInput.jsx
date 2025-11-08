import React from "react";
import { Controller } from "react-hook-form";
import PhoneNumberInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const PhoneInput = ({ name, control, className: otherClasses }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="form-label">Phone</label>
            <PhoneNumberInput
              {...field}
              international // to enforce international format (of including +... code prior to number)
              defaultCountry="UG"
              placeholder="Enter phone number of any country"
              className={`form-control ${
                fieldState.error ? "is-invalid" : ""
              } ${otherClasses}`}
              style={{ display: "flex" }} // to align the flag/country select & phone number input horizontally in a line
            />
            <div className="invalid-feedback">{fieldState.error?.message}</div>
          </div>
        )}
      />
    </div>
  );
};
