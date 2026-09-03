import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { MUTE_PRODUCT } from '../data/product';
import type { ProductPack } from '../types/product';
import { useCart } from '../context/CartContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { Button } from '../components/common/Button';
import { ProductDetailsAccordion } from '../components/product/ProductDetailsAccordion';

export const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [selectedPack, setSelectedPack] = useState<ProductPack>(
    MUTE_PRODUCT.packs.find((p) => p.popular) || MUTE_PRODUCT.packs[2]
  );
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'every-2-weeks' | 'every-4-weeks' | 'every-8-weeks'>('every-4-weeks');
  const [quantity, setQuantity] = useState<number>(1);
  const [showAddedToast, setShowAddedToast] = useState<boolean>(false);

  const price = isSubscription ? +(selectedPack.price * 0.85).toFixed(2) : selectedPack.price;

  const handleAddToCart = () => {
    addToCart(selectedPack, quantity, isSubscription, frequency);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2500);
  };

  const handleInstantBuy = () => {
    addToCart(selectedPack, quantity, isSubscription, frequency);
    navigate('/checkout');
  };

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Multi-Angle Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ProductGallery />
          </div>

          {/* Right Column: Purchasing Configuration */}
          <div className="lg:col-span-6 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2 font-mono text-[10px] text-[#8E9399] tracking-[0.25em] uppercase">
                <span>01 // STORE</span>
                <span>•</span>
                <span className="text-emerald-400">BATCH 04 RESERVES OPEN</span>
              </div>

              <h1 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
                MUTE ANTI-ENERGY DRINK
              </h1>

              <p className="text-xs sm:text-sm text-[#8E9399] mt-2 font-light italic font-serif">
                "The World Won't Stop Talking. But you can stop listening."
              </p>

              {/* Price & Unit Breakdown */}
              <div className="flex items-baseline gap-4 mt-4 pt-4 border-t border-[#14171A]">
                <span className="font-mono text-3xl sm:text-4xl text-white font-medium">
                  ${price.toFixed(2)}
                </span>
                {isSubscription && (
                  <span className="font-mono text-base text-[#6B7280] line-through">
                    ${selectedPack.price.toFixed(2)}
                  </span>
                )}
                <span className="font-mono text-xs text-[#8E9399]">
                  ${(price / selectedPack.unitCount).toFixed(2)} / 250ml can
                </span>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-[11px] text-[#8E9399] uppercase tracking-widest">
                <span>1. SELECT CARTON CONFIGURATION</span>
                {selectedPack.freeShipping && (
                  <span className="text-emerald-400 text-[10px]">Free Carbon-Neutral Shipping</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MUTE_PRODUCT.packs.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPack(pack)}
                      className={`relative p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-[#F3F3F0] bg-[#14171A] shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                          : 'border-[#20242A] bg-[#0A0C0E] hover:border-[#2E343D]'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#F3F3F0] text-[#050607] text-[9px] font-mono tracking-widest px-2 py-0.5 font-bold uppercase">
                          MOST POPULAR
                        </span>
                      )}
                      {pack.bestValue && (
                        <span className="absolute -top-2.5 right-3 bg-emerald-500 text-black text-[9px] font-mono tracking-widest px-2 py-0.5 font-bold uppercase">
                          BEST VALUE (-28%)
                        </span>
                      )}

                      <div className="font-medium text-sm text-[#F3F3F0] tracking-wide mb-1">
                        {pack.name}
                      </div>
                      <p className="text-[11px] text-[#8E9399] font-light mb-2">{pack.subtitle}</p>
                      <div className="text-xs text-[#C5C9D0] font-mono font-medium">
                        ${pack.price.toFixed(2)}{' '}
                        <span className="text-[10px] text-[#6B7280]">
                          (${pack.pricePerCan.toFixed(2)}/can)
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purchase Type: One-Time vs Subscribe & Save */}
            <div className="space-y-3 pt-2">
              <label className="font-mono text-[11px] text-[#8E9399] uppercase tracking-widest block">
                2. PURCHASE SCHEDULE
              </label>

              <div className="space-y-3">
                {/* One-Time Option */}
                <div
                  onClick={() => setIsSubscription(false)}
                  className={`p-4 border cursor-pointer transition-all ${
                    !isSubscription
                      ? 'border-[#F3F3F0] bg-[#14171A]'
                      : 'border-[#1F242B] bg-[#0A0C0E] text-[#8E9399]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        !isSubscription ? 'border-white' : 'border-[#383D45]'
                      }`}>
                        {!isSubscription && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span className="text-xs font-mono font-medium text-[#F3F3F0] uppercase">
                        One-Time Shipment
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#F3F3F0]">${selectedPack.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Subscription Option */}
                <div
                  onClick={() => setIsSubscription(true)}
                  className={`p-4 border cursor-pointer transition-all ${
                    isSubscription
                      ? 'border-[#F3F3F0] bg-[#14171A]'
                      : 'border-[#1F242B] bg-[#0A0C0E] text-[#8E9399]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSubscription ? 'border-white' : 'border-[#383D45]'
                      }`}>
                        {isSubscription && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-medium text-[#F3F3F0] uppercase">
                            Continuous Pause Subscription
                          </span>
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] font-mono px-1.5 py-0.2 uppercase">
                            Save 15%
                          </span>
                        </div>
                        <p className="text-[11px] text-[#8E9399] mt-0.5">
                          Cancel or pause anytime. Never run out of stillness.
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-white font-medium">
                      ${(selectedPack.price * 0.85).toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Cadence Selector (Sub only) */}
                  {isSubscription && (
                    <div className="mt-4 pt-3 border-t border-[#20242A] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#8E9399] uppercase">
                        Replenishment Interval:
                      </span>
                      <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value as any)}
                        className="bg-[#0A0C0E] border border-[#2A2F36] text-[11px] font-mono text-[#F3F3F0] px-2.5 py-1 focus:outline-none"
                      >
                        <option value="every-2-weeks">Every 2 Weeks</option>
                        <option value="every-4-weeks">Every 4 Weeks (Recommended)</option>
                        <option value="every-8-weeks">Every 8 Weeks</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-[#181B1F]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-[#8E9399] uppercase tracking-wider">
                  QUANTITY:
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  icon={<ShoppingBag size={14} />}
                >
                  ADD TO CART
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleInstantBuy}
                  icon={<ArrowRight size={14} />}
                >
                  BUY NOW
                </Button>
              </div>

              {showAddedToast && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#0E1012] border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center gap-2"
                >
                  <Check size={14} />
                  <span>Added {quantity} × {selectedPack.name} to bag.</span>
                </motion.div>
              )}
            </div>

            {/* Reassurance */}
            <div className="pt-2 border-t border-[#14171A] space-y-2 text-[11px] font-mono text-[#6B7280]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-[#8E9399]" />
                <span>30-Day Stillness Guarantee • 100% Recyclable Matte Cans</span>
              </div>
              <p>Carbon-Neutral Courier Delivery • No Artificial Preservatives</p>
            </div>
          </div>
        </div>

        {/* Tasting Notes & Sensory Profile */}
        <div className="border-t border-[#14171A] pt-16">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
            <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
              SENSORY PROFILE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-light tracking-wide uppercase text-[#F3F3F0]">
              TASTING NOTES
            </h3>
            <p className="text-xs text-[#8E9399] font-light">
              Formulated to feel light, crisp, and refreshing on the palate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MUTE_PRODUCT.tastingNotes.map((note, idx) => (
              <div key={idx} className="bg-[#0A0C0E] border border-[#1A1E23] p-6 space-y-3">
                <span className="font-mono text-[10px] text-[#8E9399] tracking-widest block">
                  NOTE 0{idx + 1} //
                </span>
                <h4 className="font-mono text-sm font-medium text-[#F3F3F0] uppercase">
                  {note.title}
                </h4>
                <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Accordion Specifications */}
        <div className="border-t border-[#14171A] pt-16 max-w-4xl mx-auto">
          <ProductDetailsAccordion />
        </div>
      </div>
    </div>
  );
};
