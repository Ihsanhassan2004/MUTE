import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { OperatingMode } from '../components/home/OperatingMode';
import { BrandStatement } from '../components/home/BrandStatement';
import { WhatIsMute } from '../components/home/WhatIsMute';
import { PrecisionChallenge } from '../components/home/PrecisionChallenge';
import { PrecisionOfferPopup } from '../components/common/PrecisionOfferPopup';

export const HomePage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className="space-y-0">
      {/* 15-second timed offer popup */}
      <PrecisionOfferPopup />

      {/* 1. Cinematic Entry Hero */}
      <HeroSection selectedRole={selectedRole} onRoleChange={setSelectedRole} />

      {/* 2. Operating Mode — Protocol Selector */}
      <OperatingMode selectedRole={selectedRole} />

      {/* 3. Brand Statement & Typography */}
      <BrandStatement />

      {/* 4. What is MUTE */}
      <WhatIsMute />

      {/* 5. Zero-jitter precision challenge */}
      <PrecisionChallenge />
    </div>
  );
};
