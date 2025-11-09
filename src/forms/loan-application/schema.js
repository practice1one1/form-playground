import z from "zod";

export const loanSchema = z.object({
  loanAmount: z
    .number({ error: "Enter a valid amount" })
    .positive("Must be greater than 0"),
  annualIncome: z
    .number({ error: "Enter a valid income" })
    .positive("Must be greater than 0 for you to qualify"),
  bankStatement: z
    .custom((files) => files && files.length > 0, "Bank statement is required")
    .refine(
      (files) =>
        files &&
        ["application/pdf", "image/png", "image/jpeg"].includes(files[0]?.type),
      "Only PDF, PNG, or JPEG formats are allowed"
    ),
  loanPurpose: z.literal(
    [
      "Education",
      "Business",
      "Home Improvement",
      "House Buying",
      "Investment",
      "Other",
    ],
    "Select a loan purpose"
  ),
  otherPurpose: z.string().optional(),
  title: z.string().min(1, "Please enter your title e.g. Mr., Mrs., Dr. etc."),
  firstName: z.string().min(2, "Too short"),
  lastName: z.string().min(2, "Too short"),
  maritalStatus: z.literal(
    ["Single", "Married", "Divorced"],
    "Select marital status"
  ),
  email: z.email("Invalid email"),
  phone: z.preprocess(
    (val) => val ?? "", // nullish coalescing is same as (val) => (val === null || val === undefined) ? "" : val
    z
      .string()
      .trim()
      .regex(
        /^\+?[0-9\s\-()]{5,20}$/, // smallest number with min 4 phone number digits + 1 country code digit. Largest number with 17 phone number digits + 3 country code digits
        "Please enter a valid phone number including country code"
      )
  ),
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  postalCode: z.string().min(3, "Invalid postal/ZIP"),
  occupation: z.string().min(1, "Please enter a descriptive occupation name"),
  employerFirstName: z
    .string()
    .min(
      1,
      "Employer name is required (Write your own compnay name if you are self-employed)"
    ),
  employerLastName: z.string().optional(),
  companyName: z.string().min(1, "Current company name is required"),
  yearsExperience: z.number({ error: "Enter a valid number of years" }).min(0),
  grossMonthlyIncome: z.number({ error: "Enter a valid amount" }).min(0),
  monthlyRent: z.number({ error: "Enter a valid amount" }).min(0),
  downPayment: z.number({ error: "Enter a valid amount" }).min(0),
  comments: z.string().optional(),
  bankReferences: z.array(
    z.object({
      institution: z.string().optional(),
      savingsAccount: z.string().optional(),
      address: z.string().optional(),
      phone: z
        .preprocess(
          (val) => val ?? "",
          z
            .string()
            .trim()
            .regex(
              /^\+?[0-9\s\-()]{5,20}$/,
              "Please enter a valid phone number including country code"
            )
        )
        .optional(),
    })
  ),
  consent: z.coerce
    .boolean()
    .refine((bool) => bool, "Please show consent to the above actions"),
});
