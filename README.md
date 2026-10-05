# Export-Import Business Community Web Application

A production-ready, mobile-first full-stack web application for an Export-Import Business Networking Community built with **Next.js 15+**, **React 19**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, **PostgreSQL**, **Easebuzz Payment Gateway**, and **WhatsApp Cloud API Automation**.

---

## 🚀 Key Features & Flow

```
Instagram Ads → Landing Page → Registration Details → Easebuzz ₹199 Payment
        ↓
Server-Side Signature Verification & Storage
        ↓
Automatic WhatsApp Confirmation Sent to Customer
        ↓
Admin Dashboard Review & Verification Desk
        ↓
Admin Approval → Automatic WhatsApp Group Access Instructions Sent
```

1. **High-Converting Landing Page**: Inspired by modern B2B trade platforms with strikethrough pricing (₹2,499 → ₹199), desktop & mobile responsiveness, zero fake timers, and trustworthy corporate aesthetics.
2. **Seamless Registration Flow**: Zod-validated multi-step checkout modal with Indian +91 phone validation, UTM campaign attribution tracking (`utm_source`, `utm_medium`, `utm_campaign`), and Terms checkbox.
3. **Backend Payment Enforcement**: Strict server-side price enforcement (`199.00` / `19900` paise). Frontend client prices are completely ignored to prevent tampering.
4. **Easebuzz Gateway Integration**: Full server-side SHA-512 signature hash generation & response callback/webhook verification with a dev fallback sandbox mode for instant local testing.
5. **WhatsApp Automation Service**: Provider-agnostic WhatsApp service supporting Meta Cloud API and template rendering (`payment_confirmation`, `verification_pending`, `registration_approved`, `group_access`, `registration_rejected`).
6. **Secure Admin Dashboard**: Full admin portal (`/admin/login`, `/admin/dashboard`, `/admin/customers`) featuring real-time revenue stats, candidate filtering, status transitions, manual WhatsApp resend, and CSV data export.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Database**: PostgreSQL with Prisma ORM (plus fallback in-memory store for instant dev preview)
- **Validation**: Zod + React Hook Form
- **Payment Gateway**: Easebuzz API + Server-side SHA-512 Callback Logic
- **Messaging**: Meta WhatsApp Business Cloud API / Webhook Integration
- **Authentication**: JWT Cookies + Bcryptjs Password Hashing

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                       # Main Landing Page
│   ├── layout.tsx                     # Root Layout & Structured Metadata
│   ├── globals.css                    # Tailwind CSS Base & Theme Setup
│   ├── privacy-policy/page.tsx        # Privacy Policy
│   ├── terms/page.tsx                 # Terms & Conditions
│   ├── refund-policy/page.tsx         # Refund & Cancellation Policy
│   ├── disclaimer/page.tsx            # Earnings & Trade Disclaimer
│   ├── contact/page.tsx               # Customer Support Page
│   ├── payment/
│   │   ├── success/page.tsx           # Payment Success Confirmation Screen
│   │   └── failed/page.tsx            # Payment Retry Screen
│   ├── admin/
│   │   ├── login/page.tsx             # Admin Login Screen
│   │   ├── dashboard/page.tsx         # Admin KPI Dashboard & Revenue Cards
│   │   └── customers/page.tsx         # Customer Management, Actions & Export
│   └── api/
│       ├── registration/route.ts      # Customer Registration API
│       ├── payment/
│       │   ├── create/route.ts        # Payment Order Creation
│       │   ├── callback/route.ts      # Easebuzz Webhook / Callback Handler
│       │   ├── mock-checkout/route.ts # Dev Sandbox Payment Checkout
│       │   └── status/[id]/route.ts   # Registration Status Polling
│       ├── whatsapp/send/route.ts     # WhatsApp Message Dispatch
│       └── admin/
│           ├── login/route.ts         # Admin Auth API
│           ├── customers/             # Customer Listing & Detail APIs
│           └── export/route.ts        # CSV Export Generator
├── components/                        # Clean UI Modular Components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WhatYouGet.tsx
│   ├── WhoShouldJoin.tsx
│   ├── HowItWorks.tsx
│   ├── NetworkingSection.tsx
│   ├── FAQ.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── RegistrationModal.tsx
│   └── AdminSidebar.tsx
├── lib/
│   ├── db.ts                          # Prisma Client Singleton
│   ├── easebuzz.ts                    # Easebuzz Payment Helper & SHA-512
│   ├── whatsapp.ts                    # WhatsApp Cloud API Service Wrapper
│   ├── store.ts                       # Unified Data Store (Prisma + Dev Fallback)
│   ├── auth.ts                        # Admin Auth & JWT Cookie Helper
│   └── validation.ts                  # Zod Validation Schemas
├── prisma/
│   └── schema.prisma                  # PostgreSQL Database Schema
└── .env.example                       # Environment Variable Template
```

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your credentials:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/exim_community"
EASEBUZZ_KEY="YOUR_EASEBUZZ_KEY"
EASEBUZZ_SALT="YOUR_EASEBUZZ_SALT"
EASEBUZZ_ENV="test"
WHATSAPP_ACCESS_TOKEN="YOUR_WHATSAPP_TOKEN"
WHATSAPP_PHONE_NUMBER_ID="YOUR_PHONE_ID"
WHATSAPP_COMMUNITY_LINK="https://chat.whatsapp.com/YourPrivateGroup"
ADMIN_EMAIL="admin@eximpcommunity.com"
```

### 3. Database Migration
```bash
npx prisma db push
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Admin Portal Credentials

- **URL**: `http://localhost:3000/admin/login`
- **Default Email**: `admin@eximpcommunity.com`
- **Default Password**: `admin123`

---

## 🚀 Production Deployment (Vercel + Supabase)

1. **Database Setup**: Create a free PostgreSQL instance on [Supabase](https://supabase.com). Copy the connection string to `DATABASE_URL`.
2. **Push Database Schema**:
   ```bash
   npx prisma db push
   ```
3. **Deploy to Vercel**: Connect your GitHub repository to [Vercel](https://vercel.com) and add the environment variables in the Vercel Dashboard.

---

## 📄 License
Commercial License - Export-Import Business Community Platform.
