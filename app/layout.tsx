import type { Metadata } from "next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://eximpcommunity.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Export-Import Business Community | Join for ₹199",
  description:
    "Connect with exporters, importers, suppliers, manufacturers and traders through our export-import business networking community.",
  keywords: [
    "export import community",
    "export buyers india",
    "exporters whatsapp group",
    "importers directory",
    "b2b trade networking",
    "indian manufacturers exports",
  ],
  authors: [{ name: "Export-Import Business Community Network" }],
  openGraph: {
    title: "Export-Import Business Community | Join for ₹199",
    description:
      "Connect with exporters, importers, suppliers, manufacturers and traders through our export-import business networking community.",
    url: baseUrl,
    siteName: "Export-Import Business Community",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Export-Import Business Community | Join for ₹199",
    description:
      "Connect with exporters, importers, suppliers, manufacturers and traders through our export-import business networking community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Export-Import Business Community",
    url: baseUrl,
    description:
      "Private business networking community connecting verified exporters, importers, manufacturers and traders.",
    offers: {
      "@type": "Offer",
      price: "199.00",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
