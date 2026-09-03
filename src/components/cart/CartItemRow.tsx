import React from 'react';
import { Trash2 } from 'lucide-react';
import type { CartItem } from '../../types/cart';
import { QuantitySelector } from '../common/QuantitySelector';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (newQty: number) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex gap-4 py-4 border-b border-[#1A1E23] last:border-b-0 group">
      {/* Product Image Thumbnail */}
      <div className="w-20 h-24 sm:w-22 sm:h-26 bg-[#0E1012] border border-[#20242A] flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain filter contrast-105"
        />
        {item.isSubscription && (
          <span className="absolute top-1 left-1 bg-[#1C2025] text-[9px] font-mono tracking-widest text-[#F3F3F0] px-1.5 py-0.5 border border-[#2A2F36]">
            SUB
          </span>
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase text-[#F3F3F0]">
              {item.name}
            </h4>
            <p className="text-xs text-[#8E9399] tracking-wide font-light">
              {item.packName} ({item.unitCount} {item.unitCount === 1 ? 'Can' : 'Cans'})
            </p>
            {item.isSubscription && (
              <p className="text-[10px] font-mono text-emerald-400 mt-0.5">
                Auto-replenish: {item.frequency?.replace('-', ' ')} (15% off)
              </p>
            )}
          </div>

          <div className="text-right">
            <span className="text-sm font-mono text-[#F3F3F0]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.quantity > 1 && (
              <p className="text-[10px] font-mono text-[#6B7280]">
                ${item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>

        {/* Quantity and Remove */}
        <div className="flex items-center justify-between mt-3">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.quantity - 1)}
            size="sm"
          />

          <button
            type="button"
            onClick={onRemove}
            className="text-[#6B7280] hover:text-[#E5484D] transition-colors p-1 flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};
