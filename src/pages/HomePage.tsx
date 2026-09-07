import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { BrandStatement } from '../components/home/BrandStatement';
import { WhatIsMute } from '../components/home/WhatIsMute';
import { ShutdownExperience } from '../components/home/ShutdownExperience';

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

    </div>
  );
};
