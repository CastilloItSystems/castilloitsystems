import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — dark navy (not pure black)
        ink: '#07091A',
        'surface-1': '#0C1228',
        'surface-2': '#121E38',
        'surface-3': '#192948',
        // Text — blue-tinted for harmony
        'text-1': '#E8EEFF',
        'text-2': '#8896C0',
        'text-3': '#5B6A90',
        'text-mute': '#3D4F72',
        // Brand — electric blue, richer
        brand: '#3476F5',
        'brand-hi': '#5490FF',
        'brand-lo': '#1E58D8',
        'brand-glow': '#79AAFF',
        // Status
        ok: '#10b981',
        warn: '#f59e0b',
        err: '#ef4444',
        // Legacy aliases
        copper: '#3476F5',
        'copper-hi': '#5490FF',
        flare: '#79AAFF',
        'scada-ok': '#10b981',
        'scada-warn': '#f59e0b',
        'scada-err': '#ef4444',
        primary: '#07091A',
        accent: '#3476F5',
        secondary: '#5490FF',
        highlight: '#79AAFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
      animation: {
        'pulse-slow': 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'modal-in': 'modalIn 0.25s ease-out forwards',
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
        'scada-blink': 'scadaBlink 1.6s ease-in-out infinite',
      },
      keyframes: {
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scadaBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
