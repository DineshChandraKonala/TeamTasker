/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: '#748873',
      secondary: '#D1A980',
      light: '#E5E0D8',
      background: '#F8F8F8',
    },
  },
},
  plugins: [],
}
