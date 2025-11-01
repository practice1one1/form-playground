import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ------------------ Schemas ------------------
const personalSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(10, "Phone number is too short"),
});

const shippingSchema = z.object({
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.coerce
    .number("Please enter a number ZIP code")
    .min(3, "ZIP code required"),
  state: z.string().min(2, "State is required"),
});

const paymentSchema = z.object({
  method: z.literal(["cod", "card"], {
    error: "Select a payment method",
  }),
  cardNumber: z.coerce
    .number()
    .optional()
    .refine((val) => !val || /^\d{16}$/.test(val), {
      error: "Card number must be 16 digits",
    }),
  expiry: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{2}\/\d{2}$/.test(val), {
      error: "Use MM/YY format",
    }),
  cvc: z.coerce
    .number()
    .optional()
    .refine((val) => !val || /^\d{3,4}$/.test(val), {
      error: "Invalid CVC",
    }),
});

const formSchema = z
  .object({
    name: personalSchema.shape.name,
    email: personalSchema.shape.email,
    phone: personalSchema.shape.phone,
    address: shippingSchema.shape.address,
    city: shippingSchema.shape.city,
    zip: shippingSchema.shape.zip,
    state: shippingSchema.shape.state,
    method: paymentSchema.shape.method,
    cardNumber: paymentSchema.shape.cardNumber,
    expiry: paymentSchema.shape.expiry,
    cvc: paymentSchema.shape.cvc,
  })
  .refine(
    (data) =>
      data.method === "cod" || (data.cardNumber && data.expiry && data.cvc),
    {
      message: "Card details are required for card payment",
      path: ["cardNumber"],
    }
  );

// ------------------ Steps ------------------
const Step1 = () => (
  <div className="text-center">
    <h4>Pure Glow Cream</h4>
    <p className="text-muted">
      A skin rejuvenating cream for radiant, glowing skin.
    </p>
    <h5>Price: UGX 115,000</h5>
  </div>
);

const Step2 = ({ register, errors }) => (
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
      <input type="email" {...register("email")} className="form-control" />
      {errors.email && (
        <small className="text-danger">{errors.email.message}</small>
      )}
    </div>
    <div className="mb-3">
      <label className="form-label">Phone</label>
      <input {...register("phone")} className="form-control" />
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
        <input type="number" {...register("zip")} className="form-control" />
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

const Step4 = ({ register, watch, errors }) => {
  const method = watch("method");
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

      {method === "card" && (
        <div className="border p-3 rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="number"
              {...register("cardNumber")}
              className="form-control"
            />
            {errors.cardNumber && (
              <small className="text-danger">{errors.cardNumber.message}</small>
            )}
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Expiry Date</label>
              <input
                {...register("expiry")}
                className="form-control"
                placeholder="MM/YY"
              />
              {errors.expiry && (
                <small className="text-danger">{errors.expiry.message}</small>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">CVC</label>
              <input
                type="number"
                {...register("cvc")}
                className="form-control"
              />
              {errors.cvc && (
                <small className="text-danger">{errors.cvc.message}</small>
              )}
            </div>
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
    </ul>
  </div>
);

// ------------------ Main Component ------------------
export function CheckOutForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
  });
  console.log("errors", errors);

  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    console.log("Final submission:", data);
    alert("Order submitted successfully!");
  };

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
          {step === 2 && <Step2 register={register} errors={errors} />}
          {step === 3 && <Step3 register={register} errors={errors} />}
          {step === 4 && (
            <Step4 register={register} watch={watch} errors={errors} />
          )}
          {step === 5 && <Step5 data={getValues()} />}

          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={back}
                className="btn btn-secondary"
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
