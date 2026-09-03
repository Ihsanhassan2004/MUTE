import React from 'react';
import { MUTE_PRODUCT } from '../../data/product';
import { Accordion } from '../common/Accordion';

interface ProductDetailsAccordionProps {
  className?: string;
}

export const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({ className = '' }) => {
  const accordionItems = MUTE_PRODUCT.accordions.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
  }));

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-[#20242A]">
        <div>
          <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
            SPECIFICATION & COMPLIANCE
          </span>
          <h3 className="font-display text-lg sm:text-xl font-light tracking-wider text-[#F3F3F0] uppercase mt-1">
            PRODUCT DETAILS & SENSORY
          </h3>
        </div>
        <span className="font-mono text-xs text-[#5A606A]">08 TOPICS</span>
      </div>

      <Accordion items={accordionItems} defaultExpandedIds={['inside', 'how-it-works']} />
    </div>
  );
};
