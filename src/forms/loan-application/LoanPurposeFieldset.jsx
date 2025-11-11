// LoanPurposeFieldset.jsx
import React from "react";
import { useWatch } from "react-hook-form";

export const LoanPurposeFieldset = ({ control, register, errors }) => {
  const loanPurpose = useWatch({ control, name: "loanPurpose" });

  return (
    <fieldset className="col-md-12" aria-describedby="loanPurpose-error">
      <legend className="form-label fs-6">Purpose of Loan</legend>
      {["Education", "Business", "Home Improvement", "House Buying", "Investment", "Other"].map(
        (purpose) => (
          <div className="form-check form-check-inline" key={purpose}>
            <input
              id={`loan-${purpose}`}
              type="radio"
              value={purpose}
              {...register("loanPurpose")}
              className="form-check-input"
              aria-invalid={!!errors.loanPurpose}
            />
            <label htmlFor={`loan-${purpose}`} className="form-check-label">
              {purpose}
            </label>
          </div>
        )
      )}

      {errors.loanPurpose && (
        <div id="loanPurpose-error" className="text-danger small">
          {errors.loanPurpose.message}
        </div>
      )}

      {loanPurpose === "Other" && (
        <div className="mt-2">
          <label htmlFor="otherPurpose" className="form-label">
            Other Purpose
          </label>
          <textarea
            id="otherPurpose"
            {...register("otherPurpose")}
            className="form-control"
            rows="2"
          />
        </div>
      )}
    </fieldset>
  );
};
