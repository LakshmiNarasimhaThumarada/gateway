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
  fullName: z.string().optional(),
  phone: z
    .string()
    .regex(indianPhoneRegex, "Enter a valid 10-digit Indian mobile number"),
  whatsappNumber: z
    .string()
    .optional(),
  email: z.string().email("Enter a valid Gmail / Email address"),
  businessType: z.string().optional().default("Exporter"),
  businessName: z.string().optional(),
  city: z.string().optional().default("India"),
  state: z.string().optional(),
  country: z.string().default("India"),
  interestedIn: z.string().optional().default("Business Networking"),
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
