// @ts-check

/**
 * @type {import('tailwindcss/defaultTheme')}
 */
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "2.5xl": "1.625rem",
      "3xl": "1.875rem",
      "3.5xl": "2.125rem",
      "4xl": "2.25rem",
      "4.5xl": "2.5rem",
      "5xl": "3rem",
      "5.5xl": "3.5rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    extend: {
      colors: {
        primary: "#005b99",
        link: "#005b99",
        "link-hover": "#1a202c",
        tag: "#5f3f33",
        "tag-background": "#f0eeeb",
        text: {
          DEFAULT: "#333538",
          light: "#4f5969",
          dark: "#1a202c",
        },
        heading: {
          DEFAULT: "#1a202c",
          dark: "#000000",
        },
        accent: "#d1dce5",
      },
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
        enonly: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
