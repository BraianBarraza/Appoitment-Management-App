/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue,ts,jsx,tsx}"],
  theme: {
  extend: {
    backgroundImage: {
      app: "url('/img/1.jpg')",
    }
  },
},
plugins: [],
}
