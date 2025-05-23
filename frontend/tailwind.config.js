/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // ✅ enables toggleable dark mode
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FADADD',
          green: '#D6F5E3',
          blue: '#DAE8FC',
          yellow: '#FFF5BA',
          red: '#FFD6D6',
        },
      },
    },
  },
  plugins: [],
}