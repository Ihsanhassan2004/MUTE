import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10">
        <div>
          <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
            TERMS OF SERVICE
          </span>
          <h1 className="font-display font-light text-3xl sm:text-4xl tracking-tight text-[#F3F3F0] uppercase mt-1">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs font-mono text-[#6B7280] mt-2">
            EFFECTIVE AS OF FEBRUARY 2026
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#8E9399] font-light leading-relaxed border-t border-[#14171A] pt-8">
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              1. OVERVIEW
            </h2>
            <p>
              By visiting our website and purchasing our single-product beverage (MUTE Anti-Energy Drink), you engage in our service and agree to be bound by the following terms and conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              2. INTENDED USE & NO MEDICAL CLAIMS
            </h2>
            <p>
              MUTE is a botanical beverage designed to support intentional pause and cognitive calm. MUTE is not a drug, pharmaceutical treatment, or intended to diagnose, cure, treat, or prevent any medical condition or anxiety disorder. Statements regarding botanical components have not been evaluated by the FDA.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              3. SUBSCRIPTION & REPLENISHMENT
            </h2>
            <p>
              Subscription orders receive a 15% discount and recur at the chosen interval (every 2, 4, or 8 weeks). You may adjust, pause, skip, or cancel your replenishment anytime via your MUTE Account without penalty.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              4. 30-DAY STILLNESS GUARANTEE & RETURNS
            </h2>
            <p>
              If your first carton of MUTE does not deliver the intentional stillness you desired, contact concierge@drinkmute.com within 30 days of delivery for a full refund on your initial trial carton.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
