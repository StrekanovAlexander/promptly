/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        baloo2: ['"Baloo 2"', 'cursive'],
        sans: ['"Roboto Flex"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { textShadow: '0 0 10px rgba(56,189,248,0.25), 0 0 20px rgba(56,189,248,0.15)' },
          '50%': { textShadow: '0 0 20px rgba(56,189,248,0.35), 0 0 30px rgba(56,189,248,0.2)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56,189,248,0.25)' },
          '50%': { boxShadow: '0 0 30px rgba(56,189,248,0.45)' },
        },
      },
      animation: {
        pulseNeon: 'pulseNeon 2s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};