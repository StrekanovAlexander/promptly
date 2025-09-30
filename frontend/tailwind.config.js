/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto Flex"', 'sans-serif'],
        baloo: ['"Baloo 2"', 'cursive'],
      },
    },
  },
  plugins: [],
};