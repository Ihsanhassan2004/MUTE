import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  className = '',
}) => {
  const [expanded, setExpanded] = useState<string[]>(defaultExpandedIds);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setExpanded((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setExpanded((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[#20242A] border-y border-[#20242A] ${className}`}>
      {items.map((item, index) => {
        const isOpen = expanded.includes(item.id);
        const itemNumber = (index + 1).toString().padStart(2, '0');

        return (
          <div key={item.id} className="transition-colors duration-200">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="w-full py-5 sm:py-6 flex items-center justify-between text-left group hover:text-white transition-colors"
            >
              <div className="flex items-center gap-4 sm:gap-6 pr-4">
                <span className="font-mono text-[11px] text-[#8E9399] tracking-widest">
                  {itemNumber}
                </span>
                <span className="text-xs sm:text-sm tracking-[0.18em] uppercase font-medium text-[#F3F3F0] group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
              <div className="text-[#8E9399] group-hover:text-[#F3F3F0] transition-colors flex-shrink-0">
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-8 sm:pl-12 pr-4 text-xs sm:text-sm leading-relaxed text-[#8E9399] font-light">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
