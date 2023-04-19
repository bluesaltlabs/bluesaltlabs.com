// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

// Application theme colors
import colors from './theme/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media', // or 'class'
  theme: {
    colors: colors,
    extend: {},
  },
  plugins: [],
}
