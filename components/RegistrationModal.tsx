"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Lock, Loader2, CheckCircle2 } from "lucide-react";
import {
  registrationSchema,
  RegistrationFormData,
  businessTypeOptions,
  interestedInOptions,
} from "@/lib/validation";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sameAsPhone, setSameAsPhone] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      country: "India",
      agreeTerms: true,
    },
  });

  const watchPhone = watch("phone");

  // Keep WhatsApp number synced if "sameAsPhone" is active
  useEffect(() => {
    if (sameAsPhone && watchPhone) {
      setValue("whatsappNumber", watchPhone, { shouldValidate: true });
    }
  }, [sameAsPhone, watchPhone, setValue]);

  // Read UTM parameters from URL search query on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setValue("utmSource", urlParams.get("utm_source") || "instagram");
      setValue("utmMedium", urlParams.get("utm_medium") || "paid");
      setValue("utmCampaign", urlParams.get("utm_campaign") || "export_import");
      setValue("utmContent", urlParams.get("utm_content") || undefined);
      setValue("utmTerm", urlParams.get("utm_term") || undefined);
    }
  }, [setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Step 1: Submit Registration details to backend API
      const regRes = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const regJson = await regRes.json();
      if (!regRes.ok || !regJson.success) {
        throw new Error(regJson.message || "Registration failed. Please check your details.");
      }

      const { registrationId } = regJson.data;

      // Step 2: Create Payment Order on backend (Amount strictly ₹199 set on server)
      const payRes = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      const payJson = await payRes.json();
      if (!payRes.ok || !payJson.success) {
        throw new Error(payJson.message || "Failed to initialize payment gateway.");
      }

      // Step 3: Redirect to Easebuzz checkout URL or mock payment URL
      if (payJson.payment_url) {
        window.location.href = payJson.payment_url;
      } else {
        throw new Error("Payment gateway checkout URL was not returned.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold">Community Group Access</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Complete details & pay ₹199 one-time registration fee
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Offer Price: ₹199 (Original ₹2,499)</span>
          </div>
          <span className="text-[11px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded font-bold">
            SAVE 92%
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rajesh Kumar"
              {...register("fullName")}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Mobile / WhatsApp Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mobile / WhatsApp Number (+91) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              {...register("phone")}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="e.g. rajesh@company.com"
              {...register("email")}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Business Type & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Business Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register("businessType")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              >
                <option value="">Select your profile...</option>
                {businessTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p className="text-red-500 text-xs mt-1">{errors.businessType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Company / Business Name
              </label>
              <input
                type="text"
                placeholder="e.g. Kumar Exports India"
                {...register("businessName")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Location: City & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Guntur / Surat"
                {...register("city")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                State / Province
              </label>
              <input
                type="text"
                placeholder="e.g. Andhra Pradesh"
                {...register("state")}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Interested In */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Interested In <span className="text-red-500">*</span>
            </label>
            <select
              {...register("interestedIn")}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            >
              <option value="">Select main interest...</option>
              {interestedInOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.interestedIn && (
              <p className="text-red-500 text-xs mt-1">{errors.interestedIn.message}</p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreeTerms")}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 shrink-0"
              />
              <span>
                I agree to the <a href="/terms" target="_blank" className="underline text-emerald-700 font-semibold">Terms & Conditions</a>, <a href="/privacy-policy" target="_blank" className="underline text-emerald-700 font-semibold">Privacy Policy</a> and <a href="/refund-policy" target="_blank" className="underline text-emerald-700 font-semibold">Refund Policy</a>.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-75 text-white font-bold text-base py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Pay ₹199</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2">
              🔒 Encrypted server verification via Easebuzz Payment Gateway
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};
