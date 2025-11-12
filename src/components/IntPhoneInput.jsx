import React from "react";
import { Controller } from "react-hook-form";
import PhoneNumberInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import { useCountryCode } from "../forms/loan-application/CountryCodeContext";

export const PhoneInput = ({
  name,
  control,
  errors,
  className: otherClasses,
}) => {
  const { countryCode, setCountryCode } = useCountryCode();
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="form-label">
        Phone
      </label>

      <PhoneNumberInput
        id={name}
        name={name}
        control={control}
        international
        defaultCountry={countryCode}
        onCountryChange={setCountryCode}
        placeholder="Enter phone number of any country"
        className={`form-control ${
          errors?.phone ? "is-invalid" : ""
        } ${otherClasses}`}
        style={{ display: "flex" }}
        aria-label="Phone number input with country selector"
        aria-invalid={!!errors?.phone}
        aria-describedby={errors?.phone ? errorId : undefined}
      />

      <div id={errorId} className="invalid-feedback">
        {errors?.phone?.message}
      </div>
    </div>
  );
};
