import React from "react";
import { PhoneInput } from "../../components/IntPhoneInput";

export const BankReferences = ({ fields, register, control }) => {
  return (
    <div className="col-md-12">
      {fields.map((field, index) => (
        <BankReference
          key={field.id}
          index={index}
          control={control}
          register={register}
        />
      ))}
    </div>
  );
};

const BankReference = ({ index, register, control, errors }) => {
  const errorFields = errors?.bankReferences?.[index];

  return (
    <div>
      <div className="col-md-3">
        <label>
          Institution Name
          <input {...register(`bankReferences.${index}.institution`)} />
        </label>
        <div className="invalid-feedback">
          {errorFields?.institution?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label>
          Savings Account Name
          <input {...register(`bankReferences.${index}.savingsAccount`)} />
        </label>
        <div className="invalid-feedback">
          {errorFields?.savingsAccount?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label>
          Address
          <input {...register(`bankReferences.${index}.address`)} />
        </label>
        <div className="invalid-feedback">{errorFields?.address?.message}</div>
      </div>
      <div className="col-md-3">
        <label>
          Contact
          <PhoneInput
            control={control}
            className={errorFields?.phone ? "is-invalid" : ""}
          />
        </label>
        <div className="invalid-feedback">
          {errorFields?.institution?.phone}
        </div>
      </div>
    </div>
  );
};
