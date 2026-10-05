import { z } from "zod";

const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;

export const businessTypeOptions = [
  "Exporter",
  "Importer",
  "Manufacturer",
  "Supplier",
  "Trader",
  "Distributor",
  "Beginner",
  "Other",
] as const;

export const interestedInOptions = [
  "Finding Buyers",
  "Finding Suppliers",
  "Export Opportunities",
  "Import Opportunities",
  "Business Networking",
  "Product Requirements",
  "Learning Export-Import",
  "Other",
] as const;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number"),
  whatsappNumber: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid 10-digit WhatsApp number"),
  email: z.string().email("Enter a valid email address"),
  businessType: z.enum(businessTypeOptions, {
    errorMap: () => ({ message: "Please select a valid business type" }),
  }),
  businessName: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  country: z.string().default("India"),
  interestedIn: z.enum(interestedInOptions, {
    errorMap: () => ({ message: "Please select what you are interested in" }),
  }),
  howDidYouHear: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Conditions and Privacy Policy" }),
  }),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Valid admin email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

export const statusUpdateSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "GROUP_ACCESS_SENT"]),
  rejectionReason: z.string().optional(),
});
