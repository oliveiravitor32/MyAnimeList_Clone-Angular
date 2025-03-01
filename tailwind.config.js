/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        blue: {
          extralight: "#abc4ed",
          light: "#4F74C8",
          default: "#4065BA",
          dark: "#2E51A2",
        },
        gray: {
          extralight: "#333333",
          light: "#222222",
          default: "#181818",
          dark: "#121212",
        },
      },
    },
  },
  plugins: [],
};
