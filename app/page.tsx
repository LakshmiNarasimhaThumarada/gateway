"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WhatYouGet } from "@/components/WhatYouGet";
import { WhoShouldJoin } from "@/components/WhoShouldJoin";
import { HowItWorks } from "@/components/HowItWorks";
import { NetworkingSection } from "@/components/NetworkingSection";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { RegistrationModal } from "@/components/RegistrationModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar onOpenRegister={handleOpenRegister} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenRegister={handleOpenRegister} />

        {/* What You Get Section */}
        <WhatYouGet />

        {/* Who Should Join Section */}
        <WhoShouldJoin />

        {/* How It Works Section */}
        <HowItWorks onOpenRegister={handleOpenRegister} />

        {/* B2B Networking & About Section */}
        <NetworkingSection />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Banner */}
        <FinalCTA onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Bar for Mobile Devices */}
      <StickyMobileCTA onOpenRegister={handleOpenRegister} />

      {/* Registration & Payment Modal */}
      <RegistrationModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
}
