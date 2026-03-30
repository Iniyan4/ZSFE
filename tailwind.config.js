// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effef3',
          100: '#d9fbe3',
          200: '#b6f4ca',
          300: '#84eaa8',
          400: '#4fd97f',
          500: '#28c35d',
          600: '#179c47',
          700: '#147a39',
          800: '#156031',
          900: '#134f2b'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
}
