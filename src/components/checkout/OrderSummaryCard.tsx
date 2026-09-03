import React from 'react';
import type { CartItem, CartTotals, PromoCode } from '../../types/cart';
import { ShieldCheck, Truck } from 'lucide-react';

interface OrderSummaryCardProps {
  items: CartItem[];
  totals: CartTotals;
  appliedPromo: PromoCode | null;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  totals,
  appliedPromo,
}) => {
  return (
    <div className="bg-[#0A0C0E] border border-[#20242A] p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#1A1E23] pb-4">
        <h4 className="font-mono text-xs uppercase tracking-widest text-[#F3F3F0]">
          SUMMARY ({items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS)
        </h4>
        <span className="font-mono text-[10px] text-[#8E9399]">MUTE® CARTON</span>
      </div>

      {/* Items List */}
      <div className="divide-y divide-[#14171A] max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 bg-[#121518] border border-[#1F242B] p-1 flex-shrink-0 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#F3F3F0] uppercase tracking-wide">
                  {item.name} — {item.packName}
                </p>
                <p className="text-[10px] font-mono text-[#8E9399]">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <span className="font-mono text-xs text-[#F3F3F0]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t border-[#1A1E23] pt-4 font-mono text-xs text-[#8E9399]">
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
          <span>{totals.shipping === 0 ? 'COMPLIMENTARY' : `$${totals.shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>${totals.tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-[#1C2025] text-sm text-[#F3F3F0] font-sans font-medium">
          <span className="tracking-widest uppercase">Order Total</span>
          <span className="font-mono text-base font-semibold text-white">
            ${totals.total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Guarantee & Shipping info */}
      <div className="pt-4 border-t border-[#14171A] space-y-2 text-[10px] font-mono text-[#5A606A] uppercase">
        <div className="flex items-center gap-2">
          <Truck size={12} className="text-[#8E9399]" />
          <span>Carbon-neutral dispatch within 24h</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-[#8E9399]" />
          <span>30-Day unconditional stillness guarantee</span>
        </div>
      </div>
    </div>
  );
};
