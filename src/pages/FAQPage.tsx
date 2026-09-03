import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FAQ_DATA } from '../data/product';
import { Accordion } from '../components/common/Accordion';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...FAQ_DATA.map((c) => c.category)];

  // Filter items
  const filteredCategories = FAQ_DATA.map((cat) => {
    const items = cat.items.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || selectedCategory === cat.category;
      return matchesSearch && matchesCategory;
    });
    return { ...cat, items };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.35em] uppercase">
            CONCIERGE & KNOWLEDGE BASE
          </span>
          <h1 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light">
            Everything you need to know about the formulation, ritual, storage, and dispatch.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH TOPICS OR INGREDIENTS..."
              className="w-full bg-[#0A0C0E] border border-[#20242A] focus:border-[#F3F3F0] px-4 py-3 pl-11 text-xs text-[#F3F3F0] placeholder-[#5A606A] font-mono tracking-wider focus:outline-none"
            />
            <Search size={16} className="absolute left-4 top-3.5 text-[#6B7280]" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-all ${
                  selectedCategory === cat
                    ? 'border-[#F3F3F0] bg-[#14171A] text-[#F3F3F0]'
                    : 'border-[#1A1E23] bg-[#0A0C0E] text-[#8E9399] hover:border-[#2A2F36]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="p-12 text-center bg-[#0A0C0E] border border-[#1A1E23] space-y-2">
              <p className="font-mono text-sm text-[#8E9399] uppercase">
                No matching queries found.
              </p>
              <p className="text-xs text-[#6B7280]">
                Feel free to message our concierge team directly.
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.category} className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#8E9399] border-b border-[#1A1E23] pb-2">
                  {cat.category}
                </h3>
                <Accordion
                  items={cat.items.map((item, idx) => ({
                    id: `${cat.category}-${idx}`,
                    title: item.question,
                    content: item.answer,
                  }))}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
