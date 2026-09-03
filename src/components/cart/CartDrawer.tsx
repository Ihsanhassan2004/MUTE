import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from './CartItemRow';
import { Button } from '../common/Button';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    totals,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCartDrawer();
    };
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    closeCartDrawer();
    navigate('/cart');
  };

  const freeShippingProgress = Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-[#050607]/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-[#0C0E10] border-l border-[#20242A] text-[#F3F3F0] flex flex-col justify-between shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#1A1E23]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#8E9399] tracking-widest uppercase">
                      01 / BAG
                    </span>
                    <h2 className="text-base font-medium tracking-[0.2em] uppercase text-[#F3F3F0]">
                      YOUR MUTE
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={closeCartDrawer}
                    className="text-[#8E9399] hover:text-[#F3F3F0] p-1 transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                {items.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#14171A]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8E9399] mb-1.5">
                      {totals.hasFreeShipping ? (
                        <span className="text-emerald-400">
                          ✓ Complimentary Carbon-Neutral Shipping Active
                        </span>
                      ) : (
                        <span>
                          Add <strong className="text-[#F3F3F0]">${totals.amountToFreeShipping.toFixed(2)}</strong> for free shipping
                        </span>
                      )}
                      <span>{Math.round(freeShippingProgress)}%</span>
                    </div>
                    <div className="w-full bg-[#181B1F] h-1 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8E9399] to-[#F3F3F0] transition-all duration-500 ease-out"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Body / Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#14171A] border border-[#20242A] flex items-center justify-center text-[#6B7280]">
                      <span className="font-mono text-xs">MUTE</span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium tracking-widest uppercase text-[#F3F3F0]">
                        NOTHING HERE.
                      </h3>
                      <p className="text-xs text-[#8E9399] mt-1 font-light italic">
                        Maybe that's the point.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        closeCartDrawer();
                        navigate('/shop');
                      }}
                      icon={<ArrowRight size={13} />}
                    >
                      EXPLORE MUTE
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#1A1E23]">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                        onRemove={() => removeFromCart(item.id)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#1A1E23] bg-[#0E1012]/80 backdrop-blur-md space-y-4">
                  {/* Promo Input */}
                  <div>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between bg-[#14171A] border border-emerald-900/40 px-3 py-2 text-xs">
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
                          className="bg-[#14171A] border border-[#2A2F36] focus:border-[#F3F3F0] px-3 py-2 text-xs text-[#F3F3F0] placeholder-[#5A606A] uppercase tracking-wider flex-1 focus:outline-none"
                        />
                        <Button type="submit" variant="secondary" size="sm">
                          Apply
                        </Button>
                      </form>
                    )}
                    {promoFeedback && (
                      <p
                        className={`text-[10px] font-mono mt-1 ${
                          promoFeedback.success ? 'text-emerald-400' : 'text-red-400'
                        }`}
                      >
                        {promoFeedback.message}
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#8E9399] font-mono">
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

                    <div className="flex justify-between pt-2 border-t border-[#1C2025] text-sm text-[#F3F3F0] font-sans font-medium">
                      <span className="tracking-widest uppercase">Estimated Total</span>
                      <span className="font-mono">${totals.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA */}
                  <div className="space-y-2 pt-2">
                    <Button
                      variant="primary"
                      fullWidth
                      size="md"
                      onClick={handleCheckoutClick}
                      icon={<ArrowRight size={14} />}
                    >
                      CONTINUE TO CHECKOUT
                    </Button>

                    <button
                      type="button"
                      onClick={handleViewCartClick}
                      className="w-full text-center text-[11px] font-mono tracking-widest text-[#8E9399] hover:text-[#F3F3F0] py-1 transition-colors uppercase"
                    >
                      View Detailed Bag
                    </button>
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#5A606A] uppercase tracking-wider">
                    <ShieldCheck size={12} />
                    <span>30-Day Stillness Guarantee • Encrypted Checkout</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
