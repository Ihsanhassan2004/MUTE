import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Tag, Trash2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    totals,
    appliedPromo,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const freeShippingProgress = Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100);

  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#0E1012] border border-[#20242A] flex items-center justify-center">
          <span className="font-mono text-sm tracking-widest text-[#6B7280]">MUTE</span>
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-light text-3xl sm:text-4xl tracking-tight text-[#F3F3F0] uppercase">
            NOTHING HERE.
          </h1>
          <p className="text-sm text-[#8E9399] font-light italic font-serif">
            Maybe that's the point.
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/shop')}
            icon={<ArrowRight size={14} />}
          >
            EXPLORE MUTE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#14171A] pb-6">
          <div>
            <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
              01 // CART OVERVIEW
            </span>
            <h1 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase mt-1">
              YOUR MUTE.
            </h1>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-mono text-[#6B7280] hover:text-[#E5484D] transition-colors self-start sm:self-auto uppercase tracking-wider"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#0A0C0E] border border-[#1A1E23] p-4 sm:p-5 max-w-2xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#8E9399] mb-2">
            {totals.hasFreeShipping ? (
              <span className="text-emerald-400">
                ✓ Complimentary Carbon-Neutral Shipping Unlocked
              </span>
            ) : (
              <span>
                Add <strong className="text-[#F3F3F0]">${totals.amountToFreeShipping.toFixed(2)}</strong> more to qualify for Free Shipping
              </span>
            )}
            <span>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#14171A] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8E9399] to-[#F3F3F0] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Grid: Items vs Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Items Table */}
          <div className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-[#1A1E23] border-y border-[#1A1E23]">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-24 bg-[#0E1012] border border-[#20242A] p-2 flex-shrink-0 flex items-center justify-center relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-medium tracking-wide uppercase text-[#F3F3F0]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#8E9399] font-light">
                        {item.packName} ({item.unitCount} {item.unitCount === 1 ? 'Can' : 'Cans'})
                      </p>
                      {item.isSubscription && (
                        <p className="text-[10px] font-mono text-emerald-400">
                          Auto-replenish ({item.frequency?.replace('-', ' ')}) • 15% Off
                        </p>
                      )}
                      <p className="font-mono text-xs text-[#6B7280]">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <span className="font-mono text-base text-[#F3F3F0]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        size="sm"
                      />

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B7280] hover:text-[#E5484D] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#8E9399] hover:text-[#F3F3F0] uppercase tracking-wider"
              >
                <ArrowLeft size={13} />
                <span>Continue Exploring Products</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8 space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#F3F3F0] border-b border-[#1A1E23] pb-4">
              ORDER SUMMARY
            </h3>

            {/* Promo Code Form */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-[#14171A] border border-emerald-900/40 px-3.5 py-2.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono">
                    <Tag size={13} />
                    <span>{appliedPromo.code} (-{appliedPromo.discountPercentage}%)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="text-[#8E9399] hover:text-white text-[11px] uppercase font-mono"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE (e.g. PAUSE10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="bg-[#14171A] border border-[#2A2F36] focus:border-[#F3F3F0] px-3.5 py-2.5 text-xs text-[#F3F3F0] placeholder-[#5A606A] uppercase tracking-wider flex-1 focus:outline-none"
                  />
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </form>
              )}
              {promoFeedback && (
                <p
                  className={`text-[10px] font-mono mt-1.5 ${
                    promoFeedback.success ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 font-mono text-xs text-[#8E9399] border-t border-[#1A1E23] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#F3F3F0]">${totals.subtotal.toFixed(2)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Carbon-Neutral Shipping</span>
                <span>{totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-[#1C2025] text-sm text-[#F3F3F0] font-sans font-medium">
                <span className="tracking-widest uppercase">Total</span>
                <span className="font-mono text-lg font-semibold text-white">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
                icon={<ArrowRight size={14} />}
              >
                CONTINUE TO CHECKOUT →
              </Button>
            </div>

            {/* Reassurance */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#5A606A] uppercase pt-2 border-t border-[#14171A]">
              <ShieldCheck size={13} />
              <span>30-Day Stillness Guarantee • Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
