import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center border border-[#2A2F36] bg-[#0C0E10] text-[#F3F3F0] select-none ${
        isSm ? 'h-8 px-2' : 'h-11 px-3'
      }`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="text-[#8E9399] hover:text-[#F3F3F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1"
        aria-label="Decrease quantity"
      >
        <Minus size={isSm ? 12 : 14} />
      </button>

      <span
        className={`font-mono text-center text-xs tracking-wider ${
          isSm ? 'w-7 text-[12px]' : 'w-10 text-xs'
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="text-[#8E9399] hover:text-[#F3F3F0] disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1"
        aria-label="Increase quantity"
      >
        <Plus size={isSm ? 12 : 14} />
      </button>
    </div>
  );
};
