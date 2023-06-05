/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "node_modules/tv-*/dist/tv-*.umd.min.js"
  ],
  theme: {
    extend: {
      colors: {
        "base-gray": "#E8E8E8",
        "base-white": "#FFFFFF",
        "base-red" : "#FF2E2E",
        "base-black": "#403838",
      }
    },
  },
  plugins: [],
}

