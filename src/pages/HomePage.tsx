import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BrandStatement } from '../components/home/BrandStatement';
import { WhatIsMute } from '../components/home/WhatIsMute';
import { ShutdownExperience } from '../components/home/ShutdownExperience';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { BenefitsGrid } from '../components/home/BenefitsGrid';
import { WhyMuteSection } from '../components/home/WhyMuteSection';
import { ProductDetailsAccordion } from '../components/product/ProductDetailsAccordion';
import { TestimonialSection } from '../components/home/TestimonialSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Cinematic Entry Hero */}
      <HeroSection />

      {/* 2. Brand Statement & Typography */}
      <BrandStatement />

      {/* 3. What is MUTE */}
      <WhatIsMute />

      {/* 4. The 10-Minute System Shutdown (Signature Interactive Feature) */}
      <ShutdownExperience />

      {/* 5. Meet MUTE / Product Showcase */}
      <ProductShowcase />

      {/* 6. Four Benefits Pillars */}
      <BenefitsGrid />

      {/* 7. Why MUTE (3-Column Contrast) */}
      <WhyMuteSection />

      {/* 8. Specifications & FAQ Accordion Section */}
      <section className="py-24 sm:py-32 bg-[#050607] text-[#F3F3F0] border-t border-[#14171A]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <ProductDetailsAccordion />
        </div>
      </section>

      {/* 9. Testimonials & Social Proof */}
      <TestimonialSection />
    </div>
  );
};
