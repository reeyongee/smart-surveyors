/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        red: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#db2225", // Primary brand red
          600: "#c41e3a",
          700: "#a91b2e",
          800: "#8b1820",
          900: "#7c1d20",
        },
        sand: {
          50: "#faf9f7",
          100: "#f5f2ed",
          200: "#ede6d8",
          300: "#e3d7c4",
          400: "#d8c5a8",
          500: "#E0C097", // Primary earth sand
          600: "#c9a982",
          700: "#b5956e",
          800: "#9c7f5a",
          900: "#866b4a",
        },
        "off-white": "#f8f8f8",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "sans-serif"],
        // Legacy font mappings
        work: ['"Playfair Display"', "serif"],
        manrope: ['"Inter"', "sans-serif"],
      },
      fontSize: {
        h1: ["2.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h3: ["1.75rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.75" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.05em",
      },
    },
  },
  plugins: [],
};
