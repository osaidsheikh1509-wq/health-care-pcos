/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        plum: {
          50: '#FBF7FA',
          100: '#F6EFF4',
          200: '#EBDCE8',
          300: '#DABDD5',
          400: '#BA8BB2',
          500: '#8A4A81',
          600: '#6B2D62',
          700: '#53214C',
          800: '#4A1E48',
          900: '#381634',
          950: '#230B20',
        },
        blush: {
          50: '#FDF7F8',
          100: '#FCEEF1',
          200: '#F9DFE6',
          300: '#F2C1CE',
          400: '#E592A9',
          500: '#CF6685',
          600: '#AF4268',
          700: '#9B4368',
          800: '#7B2E48',
          900: '#672A3E',
        },
        warmIvory: '#FCFAF8',
        warmCard: '#FFFFFF',
        warmDark: '#161118',
        lavender: {
          50: '#FBF7FA',
          100: '#F6EFF4',
          200: '#EBDCE8',
          300: '#DABDD5',
          400: '#BA8BB2',
          500: '#8A4A81',
          600: '#6B2D62',
          700: '#53214C',
          800: '#4A1E48',
          900: '#381634',
        },
        sakhiTeal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        sakhiRose: {
          50: '#FDF7F8',
          100: '#FCEEF1',
          200: '#F9DFE6',
          300: '#F2C1CE',
          400: '#E592A9',
          500: '#9B4368',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(74, 30, 72, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        plum: '0 10px 30px -5px rgba(74, 30, 72, 0.25)',
        glow: '0 0 25px -5px rgba(155, 67, 104, 0.3)',
      }
    },
  },
  plugins: [],
}
