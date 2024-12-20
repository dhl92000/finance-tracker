// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // added for nextui + tailwind
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  
  ],
  theme: {
    extend: {
    },
  },
  // darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            mint1: '#E4EEEB',
            mint2: '#D6F0E2',
            mint3 : '#BFDBC8',
            yellow1: '#FFF6DB',
            yellow2: '#FFEAB8',
            yellow3: '#FFE8A4'
        },
        },
        dark: {
          // ...
          colors: {

          },
        }
      }
    }),
  ],
};


