import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "../../components/IntPhoneInput";
import { loanSchema } from "./schema";
import { BankReferences } from "./BankReferences";

export const LoanApplicationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(loanSchema),
    mode: "onBlur",
    defaultValues: {
      bankReferences: [
        { institution: "d", savingsAccount: "s", address: "", phone: "" },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "bankReferences",
  });

  const onSubmit = (data) => {
    console.log("Submitted ✅:", data);
  };
  const onError = (err) => console.error("Error ❌:", err);

  const loanPurpose = watch("loanPurpose");

  console.log("file", watch("bankStatement"));
  console.log("errors", errors);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Loan Application Form</h3>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="row g-3">
          {/* Loan Amount & Income */}
          <div className="col-md-6">
            <label className="form-label">Desired Loan Amount</label>
            <input
              type="number"
              {...register("loanAmount", { valueAsNumber: true })}
              className={`form-control ${
                errors.loanAmount ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.loanAmount?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Annual Income</label>
            <input
              type="number"
              {...register("annualIncome", { valueAsNumber: true })}
              className={`form-control ${
                errors.annualIncome ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.annualIncome?.message}
            </div>
          </div>

          {/* File Input */}
          <div className="col-md-6">
            <label className="form-label">
              Bank Statement (PDF, PNG, JPEG)
            </label>
            <div className="input-group has-validation">
              <input
                type="file"
                {...register("bankStatement", {
                  onChange: () => trigger("bankStatement"),
                })}
                accept=".pdf,.png,.jpg,.jpeg"
                className={`form-control ${
                  errors.bankStatement ? "is-invalid" : ""
                }`}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setValue("bankStatement", null);
                  trigger("bankStatement"); // re-trigger validation to show "required" error message when file is cleared
                }}
              >
                Clear
              </button>
              {/* placed error message inside input-group */}
              <div className="invalid-feedback">
                {errors.bankStatement?.message}
              </div>
            </div>
          </div>

          {/* Loan Purpose */}
          <div className="col-md-12">
            <label className="form-label">Purpose of Loan</label>
            <div>
              {[
                "Education",
                "Business",
                "Home Improvement",
                "House Buying",
                "Investment",
                "Other",
              ].map((purpose) => (
                <div className="form-check form-check-inline" key={purpose}>
                  <input
                    type="radio"
                    value={purpose}
                    {...register("loanPurpose")}
                    id={`loan-${purpose}`}
                    className="form-check-input"
                  />
                  <label
                    htmlFor={`loan-${purpose}`}
                    className="form-check-label"
                  >
                    {purpose}
                  </label>
                </div>
              ))}
              {errors.loanPurpose && (
                <div className="text-danger small">
                  {errors.loanPurpose.message}
                </div>
              )}
            </div>
          </div>

          {/* Conditional Other Purpose */}
          {loanPurpose === "Other" && (
            <div className="col-md-12">
              <label className="form-label">Other Purpose</label>
              <textarea
                {...register("otherPurpose")}
                className="form-control"
                rows="2"
              />
            </div>
          )}

          {/* Name and Title */}
          <div className="col-md-2">
            <label className="form-label">Title</label>
            <input
              {...register("title")}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.title?.message}</div>
          </div>
          <div className="col-md-5">
            <label className="form-label">First Name</label>
            <input
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
          <div className="col-md-5">
            <label className="form-label">Last Name</label>
            <input
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>

          {/* Marital Status */}
          <div className="col-md-12">
            <label className="form-label">Marital Status</label>
            <div>
              {["Single", "Married", "Divorced"].map((status) => (
                <div className="form-check form-check-inline" key={status}>
                  <input
                    type="radio"
                    value={status}
                    {...register("maritalStatus")}
                    id={`marital-${status}`}
                    className="form-check-input"
                  />
                  <label
                    htmlFor={`marital-${status}`}
                    className="form-check-label"
                  >
                    {status}
                  </label>
                </div>
              ))}
              {errors.maritalStatus && (
                <div className="text-danger small">
                  {errors.maritalStatus.message}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <PhoneInput
              control={control}
              className={`${errors.phone ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>

          {/* Address */}
          <div className="col-md-6">
            <label className="form-label">Street Address</label>
            <input
              {...register("street")}
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.street?.message}</div>
          </div>
          <div className="col-md-3">
            <label className="form-label">City</label>
            <input
              {...register("city")}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.city?.message}</div>
          </div>
          <div className="col-md-2">
            <label className="form-label">State</label>
            <input
              {...register("state")}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.state?.message}</div>
          </div>
          <div className="col-md-1">
            <label className="form-label">ZIP</label>
            <input
              {...register("postalCode")}
              className={`form-control ${
                errors.postalCode ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">{errors.postalCode?.message}</div>
          </div>

          {/* Employment */}
          <div className="col-md-4">
            <label className="form-label">Occupation</label>
            <input
              {...register("occupation")}
              className={`form-control ${
                errors.occupation ? "is-invalid" : ""
              }`}
              placeholder="Descriptive occupation e.g. Heart doctor, Frontend engineer, music artist etc."
            />
            <div className="invalid-feedback">{errors.occupation?.message}</div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Employer First Name</label>
            <input
              {...register("employerFirstName")}
              className={`form-control ${
                errors.employerFirstName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.employerFirstName?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Employer Last Name</label>
            <input
              {...register("employerLastName")}
              className={`form-control ${
                errors.employerLastName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.employerLastName?.message}
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              {...register("companyName")}
              className={`form-control ${
                errors.companyName ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.companyName?.message}
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Years of Experience</label>
            <input
              type="number"
              {...register("yearsExperience", {
                valueAsNumber: true,
                onBlur: (num) => setValue(Math.floor(num)),
              })}
              className={`form-control ${
                errors.yearsExperience ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.yearsExperience?.message}
            </div>
          </div>

          {/* Financials */}
          <div className="col-md-4">
            <label className="form-label">Gross Monthly Income</label>
            <input
              type="number"
              {...register("grossMonthlyIncome", { valueAsNumber: true })}
              className={`form-control ${
                errors.grossMonthlyIncome ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.grossMonthlyIncome?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Monthly Rent/Mortgage</label>
            <input
              type="number"
              {...register("monthlyRent", { valueAsNumber: true })}
              className={`form-control ${
                errors.monthlyRent ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.monthlyRent?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Down Payment Amount</label>
            <input
              type="number"
              {...register("downPayment", { valueAsNumber: true })}
              className={`form-control ${
                errors.downPayment ? "is-invalid" : ""
              }`}
            />
            <div className="invalid-feedback">
              {errors.downPayment?.message}
            </div>
          </div>

          {/* Comments */}
          <div className="col-md-12">
            <label className="form-label">Additional Comments</label>
            <textarea
              {...register("comments")}
              className="form-control"
              rows="3"
            />
          </div>

          {/*References*/}
          <div className="col-md-12">
            <BankReferences
              fields={fields}
              register={register}
              control={control}
            />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary mt-3">
              Submit Application
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
