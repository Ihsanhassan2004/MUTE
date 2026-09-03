import type { ProductDetails } from '../types/product';

export const MUTE_PRODUCT: ProductDetails = {
  id: 'mute-anti-energy',
  name: 'MUTE',
  tagline: "The World Won't Stop Talking. But you can stop listening.",
  secondaryTagline: 'The 10-Minute System Shutdown.',
  category: 'Anti-Energy Drink',
  volume: '250 ML',
  basePrice: 4.50,
  description:
    'MUTE is an anti-energy drink created for the moments when you don’t need more stimulation. Designed around slowing down, disconnecting from noise, calming the mind, and creating a short intentional pause in a constantly connected world.',
  extendedDescription:
    'You don’t always need to go faster. You don’t always need to do more. Sometimes you need to pause. MUTE is crafted around the idea of a short intentional shutdown — a physical and mental ritual to step away from the screen and reset your baseline.',
  images: {
    hero: './images/mute-can.jpg',
    macro: './images/mute-macro.jpg',
    ritual: './images/mute-ritual.jpg',
  },
  packs: [
    {
      id: 'pack-1',
      name: 'Single Can',
      unitCount: 1,
      subtitle: 'The Trial Experience',
      price: 4.50,
      pricePerCan: 4.50,
      savingsPercentage: 0,
    },
    {
      id: 'pack-4',
      name: 'The Ritual 4-Pack',
      unitCount: 4,
      subtitle: 'For your weekly pause',
      price: 16.00,
      originalPrice: 18.00,
      pricePerCan: 4.00,
      savingsPercentage: 11,
    },
    {
      id: 'pack-12',
      name: 'The Rest 12-Pack',
      unitCount: 12,
      subtitle: 'Our signature system carton',
      price: 42.00,
      originalPrice: 54.00,
      pricePerCan: 3.50,
      popular: true,
      freeShipping: true,
      savingsPercentage: 22,
    },
    {
      id: 'pack-24',
      name: 'The Reset 24-Pack',
      unitCount: 24,
      subtitle: 'Daily intentional shutdown for a month',
      price: 78.00,
      originalPrice: 108.00,
      pricePerCan: 3.25,
      bestValue: true,
      freeShipping: true,
      savingsPercentage: 28,
    },
  ],
  tastingNotes: [
    {
      title: 'Botanical Stillness',
      description: 'Subtle notes of wild chamomile, crushed lavender, and crisp mountain spring water.',
    },
    {
      title: 'Zero Syrupy Heaviness',
      description: 'Zero cloying sweetness. Light, crisp micro-carbonation designed to be sipped slowly.',
    },
    {
      title: 'Cool Lingering Cleanliness',
      description: 'A smooth mineral finish with delicate hints of lemon balm and dark slate earthiness.',
    },
  ],
  specifications: {
    volume: '250 mL (8.4 fl oz)',
    servingSize: '1 Can (250 mL)',
    caffeine: '0 mg (100% Caffeine Free)',
    sugar: '0g Added Sugar',
    calories: '5 Calories',
    carbonation: 'Ultra-Fine Micro Sparkle',
  },
  benefits: [
    {
      number: '01',
      title: 'LESS NOISE',
      description: 'Crafted without synthetic stimulants, jitters, or artificial spikes. Just crisp, unadulterated stillness.',
    },
    {
      number: '02',
      title: 'INTENTIONAL PAUSE',
      description: 'A physical anchor to step away from notifications, close your tabs, and reclaim 10 uninterrupted minutes.',
    },
    {
      number: '03',
      title: '10-MINUTE RESET',
      description: 'Built around the cadence of the breath. Slow your heart rate, soften your focus, and quiet the inner dialogue.',
    },
    {
      number: '04',
      title: 'MUTE THE MOMENT',
      description: 'Not more energy to burn out on. An intentional boundary between hustle and peaceful presence.',
    },
  ],
  accordions: [
    {
      id: 'inside',
      title: "WHAT'S INSIDE?",
      content:
        'MUTE is formulated with purified mountain water, sparkling botanicals, L-Theanine from organic green tea (without caffeine), Chamomile extract, Lemon Balm, Magnesium Glycinate, and subtle natural botanical aromatics. [PLACEHOLDER FORMULATION CONFIGURATION]',
    },
    {
      id: 'how-it-works',
      title: 'HOW DOES IT WORK?',
      content:
        'MUTE combines functional botanical calming agents with the behavioral ritual of the 10-Minute System Shutdown. As you sip slowly, the refreshing chill and botanical aromatics signal your parasympathetic nervous system to downshift away from high-stimulation fight-or-flight states.',
    },
    {
      id: 'when-to-drink',
      title: 'WHEN SHOULD I DRINK IT?',
      content:
        'Whenever your day feels overly loud. Perfect transitions include: after closing your laptop at 6 PM, in the afternoon when reaching for an unnecessary 3rd coffee, before deep creative work, or as a wind-down ritual before bed.',
    },
    {
      id: 'serving-size',
      title: 'SERVING SIZE & SPECIFICATIONS',
      content:
        '1 can = 250 ML (8.45 FL OZ). Recommended intake: 1–2 cans per day during intentional pause windows. Best served ice-cold directly from the matte aluminum can or poured over dark slate ice rocks.',
    },
    {
      id: 'ingredients',
      title: 'FULL INGREDIENTS LIST',
      content:
        'Purified Carbonated Mountain Water, Natural Botanical Extracts (Chamomile, Lemon Balm, Ashwagandha Root), L-Theanine (200mg), Magnesium Glycinate (50mg), Natural Yuzu & Blackberry Essence, Citric Acid, Himalayan Pink Salt. Zero Artificial Sweeteners. [PLACEHOLDER]',
    },
    {
      id: 'nutrition',
      title: 'NUTRITION FACTS',
      content:
        'Per Serving (250ml): Calories 5, Total Fat 0g (0% DV), Sodium 15mg (1% DV), Total Carbohydrate 1g (0% DV), Total Sugars 0g (Includes 0g Added Sugars), Protein 0g, Magnesium 50mg (12% DV). [PLACEHOLDER DATA]',
    },
    {
      id: 'storage',
      title: 'STORAGE & SHELF LIFE',
      content:
        'Store in a cool, dark, dry place away from direct sunlight. Chill thoroughly before opening for maximum crispness. Shelf life is 12 months from the production date stamped on the bottom of each can.',
    },
    {
      id: 'shipping',
      title: 'SHIPPING & RETURNS',
      content:
        'Complimentary carbon-neutral standard shipping on all 12-pack & 24-pack orders (or orders over $35). Orders placed before 2 PM EST ship same-day in 100% recyclable, discreet matte black packaging. 30-day stillness guarantee.',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Julian V.',
      location: 'Berlin, DE',
      quote: 'I used to drink 4 espressos a day trying to push through afternoon brain fog. Switching my 3 PM ritual to a cold MUTE completely changed my nervous system. It is subtle, crisp, and deeply grounding.',
      verified: true,
      rating: 5,
      date: 'February 2026',
    },
    {
      id: 'rev-2',
      author: 'Elena R.',
      location: 'New York, NY',
      quote: 'The anti-energy concept felt almost counter-intuitive at first. But the 10-minute timer and the ice-cold herbal botanical taste are genuinely transformative after a 10-hour screen sprint.',
      verified: true,
      rating: 5,
      date: 'January 2026',
    },
    {
      id: 'rev-3',
      author: 'Marcus K.',
      location: 'Tokyo, JP',
      quote: 'Clean aesthetics, zero sugar crash, and a taste profile that feels more like an ultra-high-end aperitif than a canned drink. The packaging alone feels like art.',
      verified: true,
      rating: 5,
      date: 'February 2026',
    },
  ],
};

export const FAQ_DATA = [
  {
    category: 'Product & Philosophy',
    items: [
      {
        question: 'What is MUTE?',
        answer:
          'MUTE is an anti-energy drink created for moments when you do not need more stimulation. It is a functional botanical beverage designed around slowing down, calming the mind, and providing a sensory ritual to disconnect from noise.',
      },
      {
        question: 'Why is it called an anti-energy drink?',
        answer:
          'Traditional energy drinks push your nervous system into overdrive with extreme caffeine, taurine, and sugar. MUTE does the exact opposite: zero caffeine, functional calming botanicals, and a design centered on pausing rather than rushing.',
      },
      {
        question: 'When should I drink MUTE?',
        answer:
          'Enjoy MUTE whenever you need to step away from noise — during high-stress work transitions, mid-afternoon screen fatigue, creative contemplation, or before evening rest.',
      },
      {
        question: 'Does MUTE cause drowsiness or put you to sleep?',
        answer:
          'No. MUTE is crafted for relaxed mental clarity, not heavy sedation. It helps quiet mental chatter and nervous tension while leaving you alert and centered.',
      },
    ],
  },
  {
    category: 'Ingredients & Nutrition',
    items: [
      {
        question: 'What are the ingredients in MUTE?',
        answer:
          'Purified sparkling mountain water, botanical extracts (chamomile, lemon balm), sun-grown L-Theanine, Magnesium Glycinate, natural citrus and herbal essences, and a pinch of mineral sea salt. No artificial dyes or preservatives.',
      },
      {
        question: 'How many calories does it contain?',
        answer:
          'Each 250ml can contains approximately 5 calories and 0g of added sugar.',
      },
      {
        question: 'Is MUTE suitable for everyone?',
        answer:
          'MUTE is 100% plant-based, gluten-free, vegan, and non-GMO. As with any functional botanical beverage, consult your healthcare physician if you are pregnant, nursing, or taking prescription medication.',
      },
      {
        question: 'How should MUTE be stored?',
        answer:
          'Store at ambient room temperature in a dry area. We recommend chilling for at least 2 hours before drinking for the best crisp sensory profile.',
      },
    ],
  },
  {
    category: 'Orders, Shipping & Returns',
    items: [
      {
        question: 'How does shipping work?',
        answer:
          'We provide tracked, carbon-neutral shipping nationwide. Orders ship in 1-2 business days from our climate-controlled fulfillment hub. Free standard shipping applies to orders over $35.',
      },
      {
        question: 'Can I cancel or modify my order?',
        answer:
          'Yes. If your order has not yet been processed for dispatch, you can instantly modify or cancel it through your MUTE Account page or by contacting our concierge team.',
      },
      {
        question: 'How can I contact MUTE?',
        answer:
          'Reach our team via concierge@drinkmute.com or through our Contact page. We respond within 24 hours — without urgent push notifications.',
      },
    ],
  },
];
