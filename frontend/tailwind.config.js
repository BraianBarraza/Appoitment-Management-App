/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.theme.ts"
  ],
  theme: {
    extend: {
      backgroundImage: {
        app: "url('/img/1.jpg')",
      },
      colors: {
        "vtd-primary": colors.sky,
      }
    },
  },
  plugins: [],
}
