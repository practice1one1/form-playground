import { z } from "zod";

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
  cardNumber: z
    .string()
    .trim()
    .refine(
      (val) => val === "" || /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(val), // allow empty string as well
      "Card number must be 16 digits with 3 spaces between"
    ),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\s\/\s\d{2}$/, "Use MM/YY format")
    .or(z.literal("")) // allow empty string as well
    .optional(),
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
      message: "All card details are required for card payment",
      path: ["cvc"],
    }
  );

export default formSchema;
