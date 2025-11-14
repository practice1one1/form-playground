import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "../../components/IntPhoneInput";
import { loanSchema } from "./schema";
import { BankReferences } from "./BankReferences";
import { LoanPurposeFieldset } from "./LoanPurposeFieldset";

export const LoanApplicationForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(loanSchema),
    mode: "onBlur",
    defaultValues: {
      bankReferences: [
        { institution: "", savingsAccount: "", address: "", phone: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "bankReferences",
  });

  const onSubmit = (data) => console.log("Submitted ✅:", data);
  const onError = (err) => console.error("Error ❌:", err);

  // console.log("watch", watch("consent"));
  console.log("errors", errors);

  return (
    <main className="container mt-4">
      <h1 className="mb-4" id="loan-form-title">
        Loan Application Form
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        aria-labelledby="loan-form-title"
      >
        {/* Loan Amount */}
        <fieldset className="row g-3 mt-2">
          <legend className="border-bottom border-1 border-secondary">
            Loan Amount
          </legend>

          <div className="col-md-6">
            <label htmlFor="loanAmount" className="form-label">
              Desired Loan Amount
            </label>
            <input
              id="loanAmount"
              type="number"
              aria-invalid={!!errors.loanAmount}
              aria-describedby="loanAmount-error"
              {...register("loanAmount", { valueAsNumber: true })}
              className={`form-control ${
                errors.loanAmount ? "is-invalid" : ""
              }`}
            />
            <div id="loanAmount-error" className="invalid-feedback">
              {errors.loanAmount?.message}
            </div>
          </div>
          {/* Annual Income */}
          <div className="col-md-6">
            <label htmlFor="annualIncome" className="form-label">
              Annual Income
            </label>
            <input
              id="annualIncome"
              type="number"
              aria-invalid={!!errors.annualIncome}
              aria-describedby="annualIncome-error"
              {...register("annualIncome", { valueAsNumber: true })}
              className={`form-control ${
                errors.annualIncome ? "is-invalid" : ""
              }`}
            />
            <div id="annualIncome-error" className="invalid-feedback">
              {errors.annualIncome?.message}
            </div>
          </div>
          {/* File Input */}
          <div className="col-md-6">
            <label htmlFor="bankStatement" className="form-label">
              Bank Statement (PDF, PNG, JPEG)
            </label>
            <div className="input-group has-validation">
              <input
                id="bankStatement"
                type="file"
                aria-invalid={!!errors.bankStatement}
                aria-describedby="bankStatement-error"
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
              <div id="bankStatement-error" className="invalid-feedback">
                {errors.bankStatement?.message}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Loan Purpose */}
        <LoanPurposeFieldset
          control={control}
          register={register}
          errors={errors}
        />

        {/* Personal Information */}
        <fieldset className="row g-3 mt-2">
          <legend className="border-bottom border-1 border-secondary">
            Personal information
          </legend>
          <div className="col-md-2">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
              {...register("title")}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
            />
            <div id="title-error" className="invalid-feedback">
              {errors.title?.message}
            </div>
          </div>
          <div className="col-md-5">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              aria-invalid={!!errors.firstName}
              aria-describedby="firstName-error"
              {...register("firstName")}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div id="firstName-error" className="invalid-feedback">
              {errors.firstName?.message}
            </div>
          </div>
          <div className="col-md-5">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              aria-invalid={!!errors.lastName}
              aria-describedby="lastName-error"
              {...register("lastName")}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div id="lastName-error" className="invalid-feedback">
              {errors.lastName?.message}
            </div>
          </div>
          {/* Marital Status */}
          <fieldset
            className="col-md-12"
            aria-describedby="maritalStatus-error"
          >
            <legend className="form-label fs-6">Marital Status</legend>
            {["Single", "Married", "Divorced"].map((status) => (
              <div className="form-check form-check-inline" key={status}>
                <input
                  id={`marital-${status}`}
                  type="radio"
                  value={status}
                  {...register("maritalStatus")}
                  className="form-check-input"
                  aria-invalid={!!errors.maritalStatus}
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
              <div id="maritalStatus-error" className="text-danger small">
                {errors.maritalStatus.message}
              </div>
            )}
          </fieldset>
          {/* Contact Info */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div id="email-error" className="invalid-feedback">
              {errors.email?.message}
            </div>
          </div>
          <div className="col-md-6">
            <PhoneInput name="phone" control={control} errors={errors} />
          </div>
          {/* Address */}
          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street Address
            </label>
            <input
              id="street"
              aria-invalid={!!errors.street}
              aria-describedby="street-error"
              {...register("street")}
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
            />
            <div id="street-error" className="invalid-feedback">
              {errors.street?.message}
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              id="city"
              aria-invalid={!!errors.city}
              aria-describedby="city-error"
              {...register("city")}
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
            />
            <div id="city-error" className="invalid-feedback">
              {errors.city?.message}
            </div>
          </div>
          <div className="col-md-2">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              id="state"
              aria-invalid={!!errors.state}
              aria-describedby="state-error"
              {...register("state")}
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
            />
            <div id="state-error" className="invalid-feedback">
              {errors.state?.message}
            </div>
          </div>
          <div className="col-md-1">
            <label htmlFor="postalCode" className="form-label">
              ZIP
            </label>
            <input
              id="postalCode"
              aria-invalid={!!errors.postalCode}
              aria-describedby="postalCode-error"
              {...register("postalCode")}
              className={`form-control ${
                errors.postalCode ? "is-invalid" : ""
              }`}
            />
            <div id="postalCode-error" className="invalid-feedback">
              {errors.postalCode?.message}
            </div>
          </div>
        </fieldset>

        {/* Employment */}
        <fieldset className="row g-3 mt-2">
          <legend className="border-bottom border-1 border-secondary">
            Employment
          </legend>
          <div className="col-md-4">
            <label htmlFor="occupation" className="form-label">
              Occupation
            </label>
            <input
              id="occupation"
              aria-invalid={!!errors.occupation}
              aria-describedby="occupation-error"
              {...register("occupation")}
              className={`form-control ${
                errors.occupation ? "is-invalid" : ""
              }`}
              placeholder="Descriptive occupation e.g. Heart doctor, Frontend engineer, music artist etc."
            />
            <div id="occupation-error" className="invalid-feedback">
              {errors.occupation?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="employerFirstName" className="form-label">
              Employer First Name
            </label>
            <input
              id="employerFirstName"
              aria-invalid={!!errors.employerFirstName}
              aria-describedby="employerFirstName-error"
              {...register("employerFirstName")}
              className={`form-control ${
                errors.employerFirstName ? "is-invalid" : ""
              }`}
            />
            <div id="employerFirstName-error" className="invalid-feedback">
              {errors.employerFirstName?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="employerLastName" className="form-label">
              Employer Last Name
            </label>
            <input
              id="employerLastName"
              aria-invalid={!!errors.employerLastName}
              aria-describedby="employerLastName-error"
              {...register("employerLastName")}
              className={`form-control ${
                errors.employerLastName ? "is-invalid" : ""
              }`}
            />
            <div id="employerLastName-error" className="invalid-feedback">
              {errors.employerLastName?.message}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              id="companyName"
              aria-invalid={!!errors.companyName}
              aria-describedby="companyName-error"
              {...register("companyName")}
              className={`form-control ${
                errors.companyName ? "is-invalid" : ""
              }`}
            />
            <div id="companyName-error" className="invalid-feedback">
              {errors.companyName?.message}
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="yearsExperience" className="form-label">
              Years of Experience
            </label>
            <input
              id="yearsExperience"
              type="number"
              aria-invalid={!!errors.yearsExperience}
              aria-describedby="yearsExperience-error"
              {...register("yearsExperience", {
                valueAsNumber: true,
                onBlur: (num) => setValue(Math.floor(num)),
              })}
              className={`form-control ${
                errors.yearsExperience ? "is-invalid" : ""
              }`}
            />
            <div id="yearsExperience-error" className="invalid-feedback">
              {errors.yearsExperience?.message}
            </div>
          </div>
          {/* Financials */}
          <div className="col-md-4">
            <label htmlFor="grossMonthlyIncome" className="form-label">
              Gross Monthly Income
            </label>
            <input
              id="grossMonthlyIncome"
              type="number"
              aria-invalid={!!errors.grossMonthlyIncome}
              aria-describedby="grossMonthlyIncome-error"
              {...register("grossMonthlyIncome", { valueAsNumber: true })}
              className={`form-control ${
                errors.grossMonthlyIncome ? "is-invalid" : ""
              }`}
            />
            <div id="grossMonthlyIncome-error" className="invalid-feedback">
              {errors.grossMonthlyIncome?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="monthlyRent" className="form-label">
              Monthly Rent/Mortgage
            </label>
            <input
              id="monthlyRent"
              type="number"
              aria-invalid={!!errors.monthlyRent}
              aria-describedby="monthlyRent-error"
              {...register("monthlyRent", { valueAsNumber: true })}
              className={`form-control ${
                errors.monthlyRent ? "is-invalid" : ""
              }`}
            />
            <div id="monthlyRent-error" className="invalid-feedback">
              {errors.monthlyRent?.message}
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="downPayment" className="form-label">
              Down Payment Amount
            </label>
            <input
              id="downPayment"
              type="number"
              aria-invalid={!!errors.downPayment}
              aria-describedby="downPayment-error"
              {...register("downPayment", { valueAsNumber: true })}
              className={`form-control ${
                errors.downPayment ? "is-invalid" : ""
              }`}
            />
            <div id="downPayment-error" className="invalid-feedback">
              {errors.downPayment?.message}
            </div>
          </div>
          {/* Comments */}
          <div className="col-md-12">
            <label htmlFor="comments" className="form-label">
              Additional Comments
            </label>
            <textarea
              {...register("comments")}
              className="form-control"
              rows="3"
            />
          </div>
        </fieldset>

        {/* Bank References */}
        <section className="col-md-12" aria-label="Bank References Section">
          <BankReferences
            fields={fields}
            register={register}
            control={control}
            append={append}
            remove={remove}
            errors={errors}
          />
        </section>

        {/* Consent and Declaration */}
        <fieldset className="col-md-6">
          <legend className="h5">Consent</legend>

          <div className="form-check">
            <div className="d-flex align-items-start">
              <input
                id="consent"
                type="checkbox"
                aria-invalid={!!errors.consent}
                aria-describedby="consent-error"
                className={`form-check-input me-2 ${
                  errors.consent ? "is-invalid" : ""
                }`}
                {...register("consent", {
                  onChange: () => trigger("consent"),
                })}
              />
              <label htmlFor="consent" className="form-check-label">
                I authorize prospective Credit Grantors/Lending/Leasing
                Companies to obtain personal and credit information about me
                from my employer and credit bureau, or credit reporting agency,
                any person who has or may have any financial dealing with me, or
                from any references I have provided. This information, as well
                as that provided by me in the application, will be referred to
                in connection with this lease and any other relationships we may
                establish from time to time. Any personal and credit information
                obtained may be disclosed from time to time to other lenders,
                credit bureaus or other credit reporting agencies.
              </label>
            </div>
            {/* `.invalid-feedback` needs to be at same level of nesting as `.form-check-input`, but nesting it inside `.d-flex` above doesn't position it below the text hence applied `.form-check` as well */}
            <div id="consent-error" className="invalid-feedback d-block">
              {errors.consent?.message}
            </div>
          </div>
        </fieldset>

        <fieldset className="col-md-6">
          <legend className="h5">Declaration</legend>
          <div className="form-check">
            <div className="d-flex align-items-start">
              <input
                id="declaration"
                type="checkbox"
                aria-invalid={!!errors.declaration}
                aria-describedby="declaration-error"
                className={`form-check-input me-2 ${
                  errors.declaration ? "is-invalid" : ""
                }`}
                {...register("declaration", {
                  onChange: () => trigger("declaration"),
                })}
              />
              <label htmlFor="declaration" className="form-check-label">
                I hereby agree that the information given is true, accurate and
                complete as of the date of this application submission.
              </label>
            </div>
            <div id="declaration-error" className="invalid-feedback d-block">
              {errors.declaration?.message}
            </div>
          </div>
        </fieldset>

        <div className="col-12 text-end">
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            Submit Application
          </button>
        </div>
      </form>
    </main>
  );
};
