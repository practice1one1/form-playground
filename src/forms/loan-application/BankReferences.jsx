import React from "react";
import { PhoneInput } from "../../components/IntPhoneInput";
import { useCountryCode } from "./CountryCodeContext";

export const BankReferences = ({
  fields,
  register,
  control,
  append,
  remove,
  errors,
}) => {
  const { countryCode } = useCountryCode();
  return (
    <section aria-label="Referee Bank Information">
      <h2 className="h5 mt-3">Bank References</h2>

      {fields.map((field, index) => (
        <BankReference
          key={field.id}
          index={index}
          control={control}
          register={register}
          remove={remove}
          errors={errors}
          countryCode={countryCode}
        />
      ))}

      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() =>
          append({
            institution: "",
            savingsAccount: "",
            address: "",
            phone: "",
          })
        }
      >
        Add Referee Bank
      </button>
    </section>
  );
};

const BankReference = ({
  index,
  register,
  control,
  errors,
  remove,
  countryCode,
}) => {
  const errorFields = errors?.bankReferences?.[index];
  return (
    <div className="row align-items-start mb-3">
      <div className="col-md-3">
        <label
          htmlFor={`bankReferences.${index}.institution`}
          className="form-label"
        >
          Institution Name
        </label>
        <input
          id={`bankReferences.${index}.institution`}
          aria-invalid={!!errorFields?.institution}
          aria-describedby="institution-name-error"
          {...register(`bankReferences.${index}.institution`)}
          className={`form-control ${
            errorFields?.institution ? "is-invalid" : ""
          }`}
        />
        <div id="institution-name-error" className="invalid-feedback">
          {errorFields?.institution?.message}
        </div>
      </div>

      <div className="col-md-3">
        <label
          htmlFor={`bankReferences.${index}.savingsAccount`}
          className="form-label"
        >
          Savings Account Name
        </label>
        <input
          id={`bankReferences.${index}.savingsAccount`}
          aria-invalid={!!errorFields?.savingsAccount}
          aria-describedby="account-name-error"
          {...register(`bankReferences.${index}.savingsAccount`)}
          className={`form-control ${
            errorFields?.savingsAccount ? "is-invalid" : ""
          }`}
        />
        <div id="account-name-error" className="invalid-feedback">
          {errorFields?.savingsAccount?.message}
        </div>
      </div>

      <div className="col-md-3">
        <PhoneInput
          name={`bankReferences.${index}.phone`}
          control={control}
          errors={errorFields}
          countryCode={countryCode}
        />
      </div>

      <div className="col-md-2">
        <label
          htmlFor={`bankReferences.${index}.address`}
          className="form-label"
        >
          Address
        </label>
        <textarea
          id={`bankReferences.${index}.address`}
          aria-invalid={!!errorFields?.address}
          aria-describedby="bank-address-error"
          {...register(`bankReferences.${index}.address`)}
          className={`form-control ${errorFields?.address ? "is-invalid" : ""}`}
        />
        <div id="bank-address-error" className="invalid-feedback">
          {errorFields?.address?.message}
        </div>
      </div>

      <div className="col-md-1 d-flex align-items-center">
        <button
          type="button"
          className="btn btn-light"
          aria-label={`Remove referee bank ${index + 1}`}
          onClick={() => remove(index)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};
