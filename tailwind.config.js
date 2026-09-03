/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mute: {
          black: '#050607',
          charcoal: '#0c0e10',
          graphite: '#14171a',
          surface: '#181b1f',
          slate: '#20242a',
          border: '#2a2f36',
          'border-subtle': '#1a1e23',
          muted: '#6b7280',
          silver: '#9ca3af',
          light: '#e2e4e9',
          white: '#f3f3f0',
          accent: '#d1d5db',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
        'widest-3xl': '0.5em',
      },
      animation: {
        'slow-pulse': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 10s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at 50% 50%, rgba(20, 23, 26, 0.5) 0%, #050607 85%)',
        'radial-glow': 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)',
      }
    },
  },
  plugins: [],
}
