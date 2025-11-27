/** @type {import('tailwindcss').Config} */
export default {
  important: '[data-takaui]',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles completely
  },
}
