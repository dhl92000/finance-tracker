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
    extend: {},
  },
  //darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: { },
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


