import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { navy: '#101D35', royal: '#172C4D', gold: { DEFAULT: '#C6A15B', light: '#E8C777', text: '#8A6A1F' }, mist: '#F6F7F9', ink: '#202B3C', muted: '#566074' },
      fontFamily: { heading: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'], sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
