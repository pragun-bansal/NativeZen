/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;
import {Svg} from "react-native-svg";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        colors: {
          gridBlack: "rgba(0, 0, 0, 0.2)",
          gridWhite: "rgba(255, 255, 255, 0.2)",
          neutral: colors.neutral,
        },
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-grid": {
          <Svg height="100%" width="100%" viewBox="0 0 32 32">
            <Path d="M0 0.5H32M0 0V32" stroke="currentColor" />
          </Svg>
        },
        ".bg-grid-small": {
          // Placeholder utility for smaller grids
        },
        ".bg-dot": {
          // Placeholder utility for dotted backgrounds
        },
      };

      addUtilities(newUtilities);
    },
    function addVariablesForColors({ addBase, theme }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
          Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
}