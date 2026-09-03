import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-10">
        <div>
          <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
            LEGAL COMPLIANCE
          </span>
          <h1 className="font-display font-light text-3xl sm:text-4xl tracking-tight text-[#F3F3F0] uppercase mt-1">
            PRIVACY POLICY
          </h1>
          <p className="text-xs font-mono text-[#6B7280] mt-2">
            LAST REVISED: FEBRUARY 2026 • PRIVACY BY DESIGN
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#8E9399] font-light leading-relaxed border-t border-[#14171A] pt-8">
          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              1. PHILOSOPHY ON DATA STILLNESS
            </h2>
            <p>
              At MUTE, our anti-noise ethos extends directly to how we treat your personal information. We do not sell, rent, monetize, or harvest your data. We collect solely the information necessary to fulfill your orders, process payments, and ensure seamless delivery of your pause shipments.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              2. INFORMATION WE COLLECT
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Name, shipping address, email address, phone number for carbon-neutral delivery dispatch.</li>
              <li><strong>Payment Data:</strong> Handled securely by encrypted payment processors (Stripe / Razorpay compliant standards). We never store raw credit card numbers or security CVV codes on our servers.</li>
              <li><strong>Authentication Data:</strong> When signing in with Google OAuth or email, Firebase Authentication secures your credential session tokens.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              3. NO UNNECESSARY TRACKING & MARKETING SPAM
            </h2>
            <p>
              We do not run invasive cross-site advertising pixels or send promotional push notifications. When you subscribe to our "Stay Quiet" dispatch, you receive only rare announcements regarding batch releases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
              4. YOUR RIGHTS & DELETION
            </h2>
            <p>
              You have the right to inspect, correct, or permanently erase your member profile and order history at any time. Simply email concierge@drinkmute.com with your deletion request.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
