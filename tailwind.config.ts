import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-noto-sans)',
          'var(--font-sc)',
          'var(--font-tc)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        'soft':      '0 2px 8px 0 rgba(230, 57, 107, 0.06)',
        'card':      '0 4px 24px 0 rgba(230, 57, 107, 0.08)',
        'card-hover':'0 8px 40px 0 rgba(230, 57, 107, 0.14)',
        'button':    '0 4px 16px 0 rgba(230, 57, 107, 0.30)',
        'button-lg': '0 6px 24px 0 rgba(230, 57, 107, 0.38)',
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in':          'fadeIn 0.5s ease-out',
        'fade-in-up':       'fadeInUp 0.6s ease-out',
        'fade-in-delay-1':  'fadeIn 0.5s ease-out 0.15s both',
        'fade-in-delay-2':  'fadeIn 0.5s ease-out 0.30s both',
        'scale-in':         'scaleIn 0.2s ease-out',
        'shimmer':          'shimmer 2s infinite',
        'float':            'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
