import React from "react";
import { PhoneInput } from "../../components/IntPhoneInput";

export const BankReferences = ({
  fields,
  register,
  control,
  append,
  remove,
}) => {
  return (
    <div className="col-md-12">
      {fields.map((field, index) => (
        <BankReference
          key={field.id}
          index={index}
          control={control}
          register={register}
          remove={remove}
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
    </div>
  );
};

const BankReference = ({ index, register, control, errors, remove }) => {
  const errorFields = errors?.bankReferences?.[index];

  return (
    <div className="row">
      <div className="col-md-3">
        <label className="form-label">Institution Name</label>
        <input
          {...register(`bankReferences.${index}.institution`)}
          className={`form-control ${
            errorFields?.institution ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback">
          {errorFields?.institution?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label className="form-label">Savings Account Name</label>
        <input
          {...register(`bankReferences.${index}.savingsAccount`)}
          className={`form-control ${
            errorFields?.savingsAccount ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback">
          {errorFields?.savingsAccount?.message}
        </div>
      </div>
      <div className="col-md-3">
        <label className="form-label">Contact</label>
        <PhoneInput
          control={control}
          className={`form-control ${errorFields?.phone ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">
          {errorFields?.institution?.phone}
        </div>
      </div>
      <div className="col-md-2">
        <label className="form-label">Address</label>
        <input
          {...register(`bankReferences.${index}.address`)}
          className={`form-control ${errorFields?.address ? "is-invalid" : ""}`}
        />
        <div className="invalid-feedback">{errorFields?.address?.message}</div>
      </div>

      <div className="col-md-1 d-flex align-items-center">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => remove(index)}
        >
          ❌
        </button>
      </div>
    </div>
  );
};
