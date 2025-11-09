import React from "react";
import { Controller } from "react-hook-form";
import PhoneNumberInput from "react-phone-number-input/react-hook-form"; // Prefer using the pre-made component by react-phone-number-input especially for integrating wiht react-hook-form
import "react-phone-number-input/style.css";

export const PhoneInput = ({
  name,
  control,
  errors,
  className: otherClasses,
  onCountryChange,
  countryCode = "UG",
}) => {
  return (
    <div>
      <label className="form-label">Phone</label>
      <PhoneNumberInput
        name={name}
        control={control}
        international // to enforce international format (of including +... code prior to number)
        defaultCountry={countryCode}
        onCountryChange={onCountryChange}
        placeholder="Enter phone number of any country"
        className={`form-control ${
          errors?.phone ? "is-invalid" : ""
        } ${otherClasses}`}
        style={{ display: "flex" }} // to align the flag/country select & phone number input horizontally in a line
      />
      <div className="invalid-feedback">{errors?.phone?.message}</div>
    </div>
  );
};
