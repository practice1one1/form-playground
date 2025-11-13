import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pureGlowCream from "../../assets/pure-glow-cream.jpeg";
import formSchema from "./schema";
import { postData } from "./api";
import { PhoneInput } from "../../components/IntPhoneInput";

// Components for each step
const Step1 = () => (
  <div className="text-center">
    <img
      src={pureGlowCream}
      className="img-thumbnail"
      style={{ height: "50vh" }}
      alt="Pure Glow Cream"
    />
    <h4>Pure Glow Cream</h4>
    <p className="text-muted">
      A skin rejuvenating cream for radiant, glowing skin.
    </p>
    <h5>Price: UGX 115,000</h5>
  </div>
);

const Step2 = ({ register, errors, control }) => (
  <div>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input {...register("name")} className="form-control" />
      {errors.name && (
        <small className="text-danger">{errors.name.message}</small>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="email"
        inputMode="email"
        {...register("email")}
        className="form-control"
      />
      {errors.email && (
        <small className="text-danger">{errors.email.message}</small>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">Phone</label>
      <PhoneInput name={"phone"} control={control} errors={errors} />
      {errors.phone && (
        <small className="text-danger">{errors.phone.message}</small>
      )}
    </div>
  </div>
);

const Step3 = ({ register, errors }) => (
  <div>
    <div className="mb-3">
      <label className="form-label">Address</label>
      <input {...register("address")} className="form-control" />
      {errors.address && (
        <small className="text-danger">{errors.address.message}</small>
      )}
    </div>
    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">City</label>
        <input {...register("city")} className="form-control" />
        {errors.city && (
          <small className="text-danger">{errors.city.message}</small>
        )}
      </div>
      <div className="col-md-3 mb-3">
        <label className="form-label">ZIP</label>
        <input
          inputMode="numeric"
          {...register("zip")}
          className="form-control"
        />
        {errors.zip && (
          <small className="text-danger">{errors.zip.message}</small>
        )}
      </div>
      <div className="col-md-3 mb-3">
        <label className="form-label">State</label>
        <input {...register("state")} className="form-control" />
        {errors.state && (
          <small className="text-danger">{errors.state.message}</small>
        )}
      </div>
    </div>
  </div>
);

const Step4 = ({ register, watch, errors, setValue, trigger }) => {
  const fields = watch(["method", "sameBillingShipping"]);
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">Payment Method</label>
        <div>
          <div className="form-check">
            <input
              {...register("method")}
              type="radio"
              value="cod"
              className="form-check-input"
              id="cod"
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>
          <div className="form-check">
            <input
              {...register("method")}
              type="radio"
              value="card"
              className="form-check-input"
              id="card"
            />
            <label className="form-check-label" htmlFor="card">
              Pay with Card
            </label>
          </div>
          {errors.method && (
            <small className="text-danger">{errors.method.message}</small>
          )}
        </div>
      </div>

      {fields[0] === "card" && (
        <div className="border p-3 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              inputMode="numeric"
              {...register("cardNumber", {
                onChange: (e) => {
                  const digits = e.target.value;
                  let noSpaceDigits = digits.replace(/\s+/g, "");
                  const areAllDigits = /^\d+$/.test(noSpaceDigits);

                  if (!areAllDigits || noSpaceDigits.length > 16) {
                    noSpaceDigits = noSpaceDigits.substring(
                      0,
                      noSpaceDigits.length - 1 // eliminate the last entered character to simulate that user's input was rejected
                    );
                  }

                  setValue("cardNumber", groupToFour(noSpaceDigits));

                  function groupToFour(digits) {
                    return digits.match(/.{1,4}/g)?.join(" ") || digits;
                  }
                },
              })}
              className="form-control"
              placeholder="1234 1234 1234 1234"
            />
            {errors.cardNumber && (
              <small className="text-danger">{errors.cardNumber.message}</small>
            )}
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Expiry Date</label>
              <input
                {...register("expiry", {
                  onChange: (e) => {
                    let values = e.target.value.replace(/\D/g, ""); // keep only digits

                    if (values.length > 2) {
                      values = `${values.slice(0, 2)} / ${values.slice(2, 4)}`;
                    }

                    setValue("expiry", values);
                  },
                  onBlur: () => {
                    trigger("expiry"); // validate on blur instead of on change as in card number
                  },
                })}
                className="form-control"
                placeholder="MM / YY"
              />
              {errors.expiry && (
                <small className="text-danger">{errors.expiry.message}</small>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">CVC</label>
              <input
                inputMode="numeric"
                {...register("cvc")}
                className="form-control"
              />
              {errors.cvc && (
                <small className="text-danger">{errors.cvc.message}</small>
              )}
            </div>
          </div>

          <div className="mb-3">
            <input
              id="sameBillingShippingAddresses"
              type="checkbox"
              defaultChecked
              {...register("sameBillingShipping", { valueAsBoolean: true })}
            />
            <label htmlFor="sameBillingShippingAddresses">
              Billing address is same as for shipping
            </label>
            {fields[1] === false && (
              <div>
                <div className="mb-3">
                  <label className="form-label">Billing Address</label>
                  <input
                    {...register("billingAddress")}
                    className="form-control"
                  />
                  {errors.billingAddress && (
                    <small className="text-danger">
                      {errors.billingAddress.message}
                    </small>
                  )}
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Billing State</label>
                  <input
                    {...register("billingState")}
                    className="form-control"
                  />
                  {errors.billingState && (
                    <small className="text-danger">
                      {errors.billingState.message}
                    </small>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Step5 = ({ data }) => (
  <div>
    <h5>Review Your Order</h5>
    <ul className="list-group">
      <li className="list-group-item">
        Product: Pure Glow Cream - UGX 115,000
      </li>
      <li className="list-group-item">Name: {data.name}</li>
      <li className="list-group-item">Email: {data.email}</li>
      <li className="list-group-item">Phone: {data.phone}</li>
      <li className="list-group-item">
        Address: {data.address}, {data.city}, {data.state} - {data.zip}
      </li>
      <li className="list-group-item">
        Payment: {data.method === "cod" ? "Cash on Delivery" : "Card Payment"}
      </li>
      {data.method === "card" && (
        <>
          <li className="list-group-item">Card Number: {data.cardNumber}</li>
          <li className="list-group-item">Expiry: {data.expiry}</li>
          <li className="list-group-item">CVC: {data.cvc}</li>
        </>
      )}
    </ul>
  </div>
);

// Main Component:
export function CheckOutForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // validate in end (default in RHF). However, validations are manually triggered per step in next()
  });
  console.log("errors", errors);

  const [step, setStep] = useState(1);

  const onSubmit = async (data) => postData(data);
  const onError = (errors) => console.error("Submit errors:", errors);

  const next = async () => {
    let isValid = false;
    switch (step) {
      case 1:
        setStep((s) => s + 1);
        break;
      case 2:
        isValid = await trigger(["name", "email", "phone"]);
        break;
      case 3:
        isValid = await trigger(["address", "city", "zip", "state"]);
        break;
      case 4:
        isValid = await trigger(["method", "cardNumber", "expiry", "cvc"]);
        break;
    }
    if (isValid) setStep((s) => s + 1);
  };

  const back = () => setStep((s) => s - 1);

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3 text-center">Checkout - Step {step}/5</h3>

          {step === 1 && <Step1 />}
          {step === 2 && (
            <Step2 register={register} errors={errors} control={control} />
          )}
          {step === 3 && <Step3 register={register} errors={errors} />}
          {step === 4 && (
            <Step4
              register={register}
              watch={watch}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
            />
          )}
          {step === 5 && <Step5 data={getValues()} />}

          <div className="d-flex justify-content-end mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="btn btn-secondary me-3"
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button type="button" onClick={next} className="btn btn-primary">
                Next
              </button>
            ) : (
              <input
                type="submit"
                className="btn btn-success"
                value="Submit Order"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
